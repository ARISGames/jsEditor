define([
  'underscore',
  'underscore.string',
  'backbone',
  'text!templates/migration_game_row.tpl',
  'vent',
  'text!templates/migration_game_prompt.tpl',
  'views/alert_dialog',
],
function(
  _,
  _S,
  Backbone,
  Template,
  vent,
  MigrationPromptTemplate,
  AlertDialog
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    // Bootstrap
    tagName: 'a',
    className: "list-group-item clearfix",

    initialize: function(options)
    {
      this.listenTo(this.model, 'change', this.render);
      this.alert_dialog = null;
    },

    templateHelpers: function()
    {
      return {
        icon_thumb_url:     this.model.icon_thumbnail(),
        my_migration_count: this.model.get("my_prev_migrations").length,
        migration_count:    this.model.get("prev_migrations"   ).length
      }
    },

    events:
    {
      "click": "onClickMigrate"
    },

    onClickMigrate: function() {
      var view = this;
      var game = this.model;

      // TODO move into templates
      var migrating_text = '<i class="migrating-spinner"></i> <p style="text-align: center">Importing. Please do not close this window until finished.</p>';
      var migrate_text = _.template(MigrationPromptTemplate)();

      // Reuse dialog to track it
      if(view.alert_dialog)
      {
        // Did user re open alert while migrating?
        if(game.get("migrating") === "true")
        {
          view.show_spinner_alert(migrating_text);
        }
      }
      else
      {
        view.alert_dialog = new AlertDialog({
          text: migrate_text,
          confirm_button: true,
          cancel_button: true,
          confirm_text: "Import"
        });

        view.alert_dialog.on("confirm", function()
        {
          // Keep track of migrations to prevent navigation
          window.onbeforeunload = function() {
            return "Your game is still importing, please wait until it finishes.";
          }
          window.running_migrations || (window.running_migrations = {});
          window.running_migrations[game.id] = true;

          view.show_spinner_alert(migrating_text);

          game.migrate({
            success: function() {
              // Clear navigation warning
              delete window.running_migrations[game.id];
              if(Object.keys(window.running_migrations).length === 0)
              {
                window.onbeforeunload = null;
              }

              vent.trigger("application:popup:hide:ifself", view.alert_dialog);
              view.alert_dialog = null;
            }
          });
        });

        this.alert_dialog.on("cancel", function() {
          vent.trigger("application:popup:hide");
        });
      }

      vent.trigger("application:popup:show", view.alert_dialog, "Import Legacy Game");
    },

    show_spinner_alert: function(migrating_text) {
      this.alert_dialog.set_text(migrating_text);
      this.alert_dialog.hide_controls();
    }
  });
});
