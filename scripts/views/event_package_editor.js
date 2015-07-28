define([
  'underscore',
  'backbone',
  'text!templates/event_package_editor.tpl',
  'views/event_editor',
  'collections/events',
  'models/event',
  'vent',
],
function(
  _,
  Backbone,
  Template,
  EventEditorView,
  EventsCollection,
  Event,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    templateHelpers: function()
    {
      return {
        is_new: true,
      };
    },

    ui:
    {
      "save": ".save",
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
      return { items: self.items }
    },

    initialize: function(options)
    {
      var self = this;
      self.items = options.items;
      self.back_view = options.back_view;
      self.on("popup:hide", self.onClickCancel);
    },

    onShow: function()
    {
      var self = this;
      self.$el.find('input[autofocus]').focus();
    },

    events:
    {
      "click @ui.new-event": "onClickNewEvent",
      "click @ui.save":      "onClickSave",
      "click @ui.cancel":    "onClickCancel",
      "change @ui.name":     "onChangeName",
    },

    onClickNewEvent: function()
    {
      var self = this;
      var event = new Event({game_id: self.model.get("game_id")});
      self.collection.add(event);
    },

    onClickSave: function(event)
    {
      var self = this;
      event.preventDefault();

      // Save Event Package with children json
      self.model.set("events", self.collection);

      // Don't save package 0
      if(self.model.get("event_package_id") === "0")
      {
        self.model.unset("event_package_id");
      }

      self.model.save({},
      {
        success: function()
        {
          self.trigger("event_package:save", self.model);
        }
      });
    },

    onClickCancel: function()
    {
      var self = this;
      self.trigger("cancel");
      //delete self.previous_attributes.event_package_id;
      //self.model.set(self.previous_attributes);
    },

    onClickDelete: function()
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

    onChangeName: function()
    {
      var self = this;
      self.model.set("name",self.ui.name.val());
    },

    // Child View Events
    onItemviewEventRemove: function(item_view, event)
    {
      var self = this;
      self.collection.remove(event);
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

