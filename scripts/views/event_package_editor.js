define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/event_package_editor.tpl',
  'views/event_editor',
  'collections/events',
  'models/event',
  'storage',
  'vent',
],
function(
  _,
  $,
  Backbone,
  Template,
  EventEditorView,
  EventsCollection,
  Event,
  storage,
  vent
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
      };
    },

    ui:
    {
      "save":   ".save",
      "delete": ".delete",
      "cancel": ".cancel",
      "name": "#event-package-name",
      "new-event": ".new-event",
    },

    itemView: EventEditorView,
    itemViewContainer: ".events",

    itemViewOptions: function(model, index)
    {
      var self = this;
      return { items:storage.items }
    },

    initialize: function(options)
    {
      var self = this;

      self.storePreviousAttributes();
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
      "click @ui.new-event": "onClickNewEvent",
      "change @ui.name":     "onChangeName",
    },

    onClickNewEvent:function()
    {
      var self = this;
      var event = new Event({game_id:self.model.get("game_id"),event_package_id:self.model.get("event_package_id")});
      self.collection.add(event);
    },

    onClickSave:function(event)
    {
      var self = this;

      // Save Event Package with children json
      self.model.set("events", self.collection);

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
        },
      });
    },

    onClickCancel:function()
    {
      var self = this;
      self.model.set(self.previous_attributes);
    },

    onClickDelete:function()
    {
      var self = this;
      self.model.destroy(
      {
        success:function() { vent.trigger("application:popup:hide"); }
      });
    },

    onChangeName:function() { var self = this; self.model.set("name",self.ui.name.val()); },

    // Child View Events
    onItemviewEventRemove:function(item_view, event)
    {
      var self = this;
      self.collection.remove(event);
    },

    storePreviousAttributes: function()
    {
      var self = this;
      self.previous_attributes = _.clone(self.model.attributes)
    },

    // Marionette Collection Override
    appendBuffer: function(compositeView, buffer)
    {
      var self = this;
      var $container = self.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, itemView, index)
    {
      var self = this;
      if(compositeView.isBuffering)
      {
        compositeView.elBuffer.appendChild(itemView.el);
      }
      else
      {
        // If we've already rendered the main collection, just
        // append the new items directly into the element.
        var $container = self.getItemViewContainer(compositeView);
        $container.find(".foot").before(itemView.el);
      }
    },

  });
});

