define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/plaque_editor.tpl',
  'collections/media',
  'collections/event_packages',
  'collections/items',
  'models/game',
  'models/event_package',
  'views/media_chooser',
  'views/event_package_editor',
  'vent',
  'storage',
],
function(
  _,
  $,
  Backbone,
  Template,
  MediaCollection,
  EventPackagesCollection,
  ItemsCollection,
  Game,
  EventPackage,
  MediaChooserView,
  EventPackageEditorView,
  vent,
  storage
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    templateHelpers: function()
    {
      var self = this;
      return {
        is_new: self.model.isNew(),
        icon_thumbnail_url:  self.model.icon_thumbnail(),
        media_thumbnail_url: self.model.media_thumbnail(),
      };
    },

    ui:
    {
      "save":   ".save",
      "delete": ".delete",
      "cancel": ".cancel",

      "change_icon":  ".change-icon",
      "change_media": ".change-media",
      "edit_events":  ".edit-events",

      "name": "#plaque-name",
      "description":  "#plaque-description"
    },

    initialize: function()
    {
      var self = this;
      self.storePreviousAttributes();
      self.bindAssociations();
      self.on("popup:hide", self.onClickCancel);
    },

    onShow: function()
    {
      var self = this;
      self.$el.find('input[autofocus]').focus();
    },

    events:
    {
      "click @ui.save":   "onClickSave",
      "click @ui.delete": "onClickDelete",
      "click @ui.cancel": "onClickCancel",

      "click @ui.change_icon":  "onClickChangeIcon",
      "click @ui.change_media": "onClickChangeMedia",
      "click @ui.edit_events":  "onClickEditEvents",

      // Field events
      "change @ui.name": "onChangeName",
      "change @ui.description": "onChangeDescription",
    },

    onClickSave:function()
    {
      var self = this;

      self.model.save({},
      {
        create:function()
        {
          self.storePreviousAttributes();
          storage.add_game_object(self.model);
          vent.trigger("application:popup:hide");
        },

        update:function()
        {
          self.storePreviousAttributes();
          vent.trigger("application:popup:hide");
        }
      });
    },

    onClickCancel:function()
    {
      var self = this;
      delete self.previous_attributes.event_package_id;
      self.model.set(self.previous_attributes);
    },

    onClickDelete:function()
    {
      var self = this;
      self.model.destroy(
      {
        success: function()
        {
          vent.trigger("application:popup:hide");
        }
      });
    },

    onChangeName:        function() { var self = this; self.model.set("name",        self.ui.name.val());        },
    onChangeDescription: function() { var self = this; self.model.set("description", self.ui.description.val()); },

    storePreviousAttributes: function()
    {
      var self = this;
      self.previous_attributes = _.clone(self.model.attributes)
    },

    unbindAssociations: function()
    {
      var self = this;
      self.stopListening(self.model.icon());
      self.stopListening(self.model.media());
    },

    bindAssociations: function()
    {
      var self = this;
      self.listenTo(self.model.icon(),  'change', self.render);
      self.listenTo(self.model.media(), 'change', self.render);
    },

    onClickChangeIcon: function()
    {
      var self = this;

      var game  = new Game({game_id: self.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          media.unshift(self.model.default_icon());
          var icon_chooser = new MediaChooserView({collection: media, selected: self.model.icon(), context: self.model});

          icon_chooser.on("media:choose", function(media)
          {
            self.unbindAssociations();
            self.model.set("icon_media_id", media.id);
            self.bindAssociations();
            vent.trigger("application:popup:show", self, "Edit Plaque");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Plaque");
          });

          vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
        }
      });
    },

    onClickChangeMedia: function()
    {
      var self = this;

      var game  = new Game({game_id: self.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          media.unshift(self.model.default_icon());

          var media_chooser = new MediaChooserView({collection: media, selected: self.model.media()});
          vent.trigger("application:popup:show", media_chooser, "Choose Media");

          media_chooser.on("media:choose", function(media)
          {
            self.unbindAssociations();
            self.model.set("media_id", media.id);
            self.bindAssociations();
            vent.trigger("application:popup:show", self, "Edit Plaque");
          });

          media_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Plaque");
          });
        }
      });
    },

    /* Events Editor */

    onClickEditEvents: function()
    {
      var self = this;

      var event_package = new EventPackage({event_package_id: self.model.get("event_package_id"), game_id: self.model.get("game_id")});
      var events = new EventsCollection([], {parent: event_package});

      var game   = new Game({game_id: self.model.get("game_id")});
      var items  = new ItemsCollection([], {parent: game});

      $.when(items.fetch(), events.fetch()).done(
        function()
        {
          // launch editor
          var events_editor = new EventPackageEditorView({model: event_package, collection: events, items: items});

          events_editor.on("cancel",
            function()
            {
              vent.trigger("application:popup:show", self, "Edit Plaque");
            }
          );

          events_editor.on("event_package:save",
            function(event_package)
            {
              self.model.set("event_package_id", event_package.id);
              storage.event_packages.fetch();

              if(!self.model.isNew() && self.model.hasChanged("event_package_id"))
              {
                // Quicksave if moving from 0 so user has consistent experience
                self.model.save({"event_package_id": event_package.id}, {patch: true});
              }

              vent.trigger("application:popup:show", self, "Edit Plaque");
            }
          );

          vent.trigger("application:popup:show", events_editor, "Player Modifier");
        }
      );
    }
  });
});

