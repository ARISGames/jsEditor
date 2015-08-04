define([
  'underscore',
  'backbone',
  'text!templates/scene_instance_trigger.tpl',
  'vent',
  'models/instance',
  'models/dialog',
  'models/plaque',
  'models/item',
  'models/web_page',
  'models/media',
  'models/scene',
  'models/factory',
  'models/event',
  'views/trigger_editor',
],
function(
  _,
  Backbone,
  Template,
  vent,
  Instance,
  Dialog,
  Plaque,
  Item,
  WebPage,
  Media,
  Scene,
  Factory,
  Event,
  TriggerEditorView
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    tagName: 'li',

    // Remove after upgrading to Marionette 2.0.x with `filter`
    className: function()
    {
      var self = this;
      // Hide triggers not from scene, user notes and factory triggers.
      if(
        self.model.get("scene_id") != self.options.scene.get("scene_id") ||
        self.model.instance().get("object_type") === "NOTE"
        || self.model.instance().get("factory_id") !== "0"
      )
      {
        return 'hidden';
      }
      return 'scene-trigger';
    },

    templateHelpers: function()
    {
      var self = this;
      return {
        object_name: self.object_name,
        object_icon: self.object_icon,
        type_icon:   self.type_icon,
        type_color:  self.type_color
      };
    },

    initialize: function(options)
    {
      var self = this;
      // Remove after upgrading to Marionette 2.0.x with `filter`
      if(self.model.get("scene_id") != self.options.scene.get("scene_id") || self.model.instance().get("object_type") === "NOTE")
      {
        self.render = function() {};
        return;
      }

      self.scene       = options.scene;
      self.instance    = self.model.instance();
      self.game_object = self.instance.game_object();

      // Assign icon and name from instance and game object
      self.loading_icon();
      self.update_icon ();

      // Listen to association events on on instance and game object
      self.bindModelEvents();
    },

    /* Model Event Binding */

    bindModelEvents: function()
    {
      var self = this;
      self.listenTo(self.model,       "update",  self.update_icon);
      self.listenTo(self.model,       "update",  self.update_game_object);
      self.listenTo(self.game_object, "update",  self.update_icon);
      self.listenTo(self.game_object, "destroy", self.triggerRemove.bind(self));
    },

    triggerRemove: function()
    {
      var self = this;
      // Alert parent they should remove me.
      self.trigger("trigger:remove", self.model);
    },

    update_game_object: function()
    {
      var self = this;
      self.stopListening(self.game_object);
      self.game_object = self.model.game_object();
      self.listenTo(self.game_object, "update",  self.update_icon);
      self.listenTo(self.game_object, "destroy", self.triggerRemove.bind(self));
      self.update_icon ();
    },

    /* Events */

    events:
    {
      "click .show": "onClickShow"
    },

    onClickShow: function()
    {
      var self = this;
      var trigger_editor = null;

      var options = {
        scene: self.scene,
        game_object: self.game_object,
        instance: self.instance,
        model: self.model
      };

      // launch based on type
      if(self.game_object instanceof Dialog ) { trigger_editor = new TriggerEditorself(options); }
      if(self.game_object instanceof Item   ) { trigger_editor = new TriggerEditorself(options); }
      if(self.game_object instanceof Plaque ) { trigger_editor = new TriggerEditorself(options); }
      if(self.game_object instanceof WebPage) { trigger_editor = new TriggerEditorself(options); }
      if(self.game_object instanceof Scene  ) { trigger_editor = new TriggerEditorself(options); }
      if(self.game_object instanceof Factory) { trigger_editor = new TriggerEditorself(options); }
      if(self.game_object instanceof Event  ) { trigger_editor = new TriggerEditorself(options); }

      if(trigger_editor === null)
      {
        throw "No editor for "+self.game_object.idAttribute+": "+self.game_object.id;
      }
      else
      {
        vent.trigger("application:info:show", trigger_editor);
      }
    },


    /* Dom Helpers */

    loading_icon: function()
    {
      var self = this;
      // FIXME delegate to different views for each object?
      self.object_name = "...";
      self.object_icon = "refresh";
      self.type_icon   = "question-sign";
      self.type_color  = "text-warning";

    },

    update_icon: function()
    {
      var self = this;
      var type = self.model.get("type");
      if(type === "QR")        { self.type_icon = "qrcode";     }
      if(type === "LOCATION")  { self.type_icon = "map-marker"; }
      if(type === "IMMEDIATE") { self.type_icon = "link"; }

      self.type_color  = "text-primary";
      if(self.model.get("infinite_distance") === "1" && type === "LOCATION") { self.type_color = "text-success"; }

      type = self.instance.get("object_type");
      if(type === "DIALOG")   { self.object_icon = "comment"; }
      if(type === "PLAQUE")   { self.object_icon = "align-justify"; }
      if(type === "ITEM")     { self.object_icon = "stop";    }
      if(type === "WEB_PAGE") { self.object_icon = "globe";   }
      if(type === "SCENE")    { self.object_icon = "film";    }
      if(type === "FACTORY")  { self.object_icon = "home";    }
      if(type === "EVENT")    { self.object_icon = "globe";    }

      self.object_name = self.game_object.get("name");

      self.render();
    }

  });
});

