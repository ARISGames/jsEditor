define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/dialog_creator.tpl',
  'models/game',
  'vent'
],
function(
  _,
  $,
  Backbone,
  Template,
  Game,
  vent
)
{

  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    ui:
    {
      "name": "#dialog-name",
    },

    onShow: function()
    {
      this.$el.find('input[autofocus]').focus();
    },

    events:
    {
      "click .save": "onClickSave",
    },

    onClickSave: function()
    {
      var view   = this;
      var dialog = this.model;

      // Save Object
      dialog.set("name",          view.ui.name.val());

      dialog.save({}, {
        success: function()
        {
          vent.trigger("application:popup:hide");
          view.trigger("dialog:create");
        }
      });
    },

    onClickChangeIcon: function()
    {
      var view = this;

      var game  = new Game({game_id: this.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch({
        success: function()
        {
          /* Icon */
          var icon_chooser = new MediaChooserView({collection: media});

          icon_chooser.on("media:choose", function(media)
          {
            view.icon = media;
            view.model.set("icon_media_id", media.id);
            vent.trigger("application:popup:show", view, "Edit Conversation");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", view, "Edit Conversation");
          });

          vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
        }
      });
    }
  });
});
