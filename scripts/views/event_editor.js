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
		},

		ui: {
			event: ".event-select",
			content: ".content-select",
			quantity: ".quantity"
		},

		events: {
			"change @ui.event":    "onChangeEvent",
			"change @ui.content":  "onChangeContent",
			"change @ui.quantity": "onChangeQuantity",
			"click .delete":       "onClickDeleteEvent"
		},

		onChangeEvent: function() {
			var value = this.ui.event.find("option:selected").val();
			this.model.set("event", value);
		},

		onChangeContent: function() {
			var value = this.ui.content.find("option:selected").val();
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

