define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/conversation_creator.tpl',
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
  return Backbone.Marionette.CompositeView.extend(
  {
    template:_.template(Template),

    ui:
    {
      "name":"#dialog-name",
    },

    onShow:function()
    {
      this.$el.find('input[autofocus]').focus();
    },

    events:
    {
      "click .save":"onClickSave",
    },

    onClickSave:function()
    {
      var self = this;
      var dialog = self.model;

      dialog.set("name", self.ui.name.val());

      dialog.save({},
      {
        success:function()
        {
          vent.trigger("application:popup:hide");
          self.trigger("dialog:create");
        }
      });
    },

    onClickChangeIcon:function()
    {
      var self = this;

      var game  = new Game({game_id:self.model.get("game_id")});
      var media = new MediaCollection([], {parent:game});

      media.fetch(
      {
        success:function()
        {
          var icon_chooser = new MediaChooserView({collection:media});

          icon_chooser.on("media:choose", function(media)
          {
            self.icon = media;
            self.model.set("icon_media_id", media.id);
            vent.trigger("application:popup:show", self, "Edit Conversation");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Conversation");
          });

          vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
        }
      });
    }

  });
});

