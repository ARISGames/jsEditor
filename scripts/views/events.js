define([
	'underscore',
	'backbone',
	'text!templates/events.tpl',
	'views/event_editor',
	'collections/events',
	'models/event',
	'vent'
], function(_, Backbone, Template, EventEditorView, EventsCollection, Event, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: EventEditorView,
		itemViewContainer: ".events",

		itemViewOptions: function(model, index) {
			return { items: this.items }
		},

		initialize: function(options) {
			this.items = options.items;
			this.back_view = options.back_view;
		},

		events: {
			"click .new-event": "onClickNewEvent",
			"click .save-all":  "onClickSaveAll",
			"click .cancel":    "onClickCancel"
		},

		onClickNewEvent: function() {
			var event = new Event({game_id: this.model.get("game_id")});
			this.collection.add(event);
		},

		onClickSaveAll: function() {
			var view = this;
			event.preventDefault();

			// Save Event Package with children json

			this.model.set("events", this.collection);
			this.model.save({}, {
				success: function() {
					vent.trigger("application:popup:show", view.back_view);
				}
			});
		},

		onClickCancel: function() {
			vent.trigger("application:popup:show", this.back_view);
		},


		// Child View Events
		onItemviewEventRemove: function(item_view, event) {
			this.collection.remove(event);
		},

		// Marionette Collection Override
		appendBuffer: function(compositeView, buffer) {
			var $container = this.getItemViewContainer(compositeView);
			$container.find(".foot").before(buffer);
		},

		appendHtml: function(compositeView, itemView, index){
			if (compositeView.isBuffering) {
			  compositeView.elBuffer.appendChild(itemView.el);
			}
			else {
			  // If we've already rendered the main collection, just
			  // append the new items directly into the element.
			  var $container = this.getItemViewContainer(compositeView);
			  $container.find(".foot").before(itemView.el);
			}
		}
	});
});

