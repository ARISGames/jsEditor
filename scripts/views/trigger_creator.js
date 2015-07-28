define([
  'underscore',
  'jquery',
  'views/editor_base',
  'vent',
  'storage',
  'text!templates/trigger_creator.tpl',
  'models/instance',
],
function(
  _,
  $,
  EditorView,
  vent,
  storage,
  Template,
  Instance
)
{
  return EditorView.extend(
  {

    /* View */

    template: _.template(Template),

    ui: {
      "save":   ".save",
      "cancel": ".cancel",

      "name":   "#object-name",

      "autofocus":  "input[autofocus]"
    },

    templateHelpers: function() {
      return {
      }
    },


    /* Initialization and Rendering */

    initialize: function(options) {
      this.scene       = options.scene;
      this.game_object = options.game_object;
      this.instance    = options.instance;
    },

    onShow: function() {
      this.ui.autofocus.focus();
    },


    /* View Events */

    events: {
      "click @ui.save":   "onClickSave",
      "click @ui.cancel": "onClickCancel"
    },


    /* Crud */

    onClickSave: function() {
      var view = this;
      var instance    = this.instance;
      var game_object = this.game_object;
      var trigger     = this.model;

      game_object.set("name", view.ui.name.val());

      game_object.save({}, {
        create: function() {
          storage.add_game_object(game_object);
        },
        success: function() {
          // Save Instance

          instance.set("object_id",   game_object.id);
          instance.set("object_type", Instance.type_for(game_object));

          instance.save({}, {
            create: function() {
              storage.add_game_object(instance);
            },

            success: function() {

              // Save Trigger
              trigger.set("instance_id", instance.id);

              trigger.save({},
              {
                create: function()
                {
                  storage.add_game_object(trigger);

                  vent.trigger("application:popup:hide");
                }
              }); /* Trigger save */
            }
          }); /* Instance save */
        }
      }); /* Game Object save */
    },

    onClickCancel: function() {
      this.close();
      vent.trigger("application:popup:hide");
    }

  });
});

