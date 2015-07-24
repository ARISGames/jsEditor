define([
  'underscore',
  'backbone',
  'text!templates/event_package_editor.tpl',
  'views/event_editor',
  'collections/events',
  'models/event',
  'vent'
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

    itemView: EventEditorView,
    itemViewContainer: ".events",

    itemViewOptions: function(model, index)
    {
      return { items: this.items }
    },

    initialize: function(options)
    {
      this.items = options.items;
      this.back_view = options.back_view;
    },

    events:
    {
      "click .new-event": "onClickNewEvent",
      "click .save-all":  "onClickSaveAll",
      "click .cancel":    "onClickCancel"
    },

    onClickNewEvent: function()
    {
      var event = new Event({game_id: this.model.get("game_id")});
      this.collection.add(event);
    },

    onClickSaveAll: function(event)
    {
      var view = this;
      event.preventDefault();

      // Save Event Package with children json
      view.model.set("events", view.collection);

      // Don't save package 0
      if(view.model.get("event_package_id") === "0")
      {
        view.model.unset("event_package_id");
      }

      view.model.save({},
      {
        success: function()
        {
          view.trigger("event_package:save", view.model);
        }
      });
    },

    onClickCancel: function()
    {
      this.trigger("cancel");
    },

    // Child View Events
    onItemviewEventRemove: function(item_view, event)
    {
      this.collection.remove(event);
    },

    // Marionette Collection Override
    appendBuffer: function(compositeView, buffer)
    {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, itemView, index)
    {
      if(compositeView.isBuffering)
      {
        compositeView.elBuffer.appendChild(itemView.el);
      }
      else
      {
        // If we've already rendered the main collection, just
        // append the new items directly into the element.
        var $container = this.getItemViewContainer(compositeView);
        $container.find(".foot").before(itemView.el);
      }
    }

  });
});

