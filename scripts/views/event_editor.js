define([
	'underscore',
	'backbone',
	'text!templates/event_editor.tpl',
	'models/event',
	'vent'
], function(_, Backbone, Template, Event, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},
				items: this.items
			};
		},

		// Bootstrap
		tagName: 'li',
		className: "list-group-item",

		initialize: function(options) {
			this.items = options.items;
			console.log("event model", this.model.attributes);
		},

		ui: {
			event: ".event-select",
			content: ".content-select",
			quantity: ".quantity"
		},

		events: {
			"change .event-select":   "onChangeEvent",
			"change .content-select": "onChangeContent",
			"change .quantity":       "onChangeQuantity",
			"click .delete":          "onClickDeleteEvent"
		},

		onChangeEvent: function() {
			var value = this.ui.event.find("option:selected").val();
			console.log("event", value);
			this.model.set("event", value);
		},

		onChangeContent: function() {
			var value = this.ui.content.find("option:selected").val();
			console.log("content", value);
			this.model.set("content_id", value);
		},

		onChangeQuantity: function() {
			this.model.set("qty", this.ui.quantity.val());
		},

		onClickDeleteEvent: function() {
			this.trigger("event:remove", this.model);
		}

	});
});

