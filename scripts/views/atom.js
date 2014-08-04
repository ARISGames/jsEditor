define([
	'underscore',
	'backbone',
	'text!templates/atom.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
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
			requirement: ".requirement",
			quantity: ".quantity"
		},

		events: {
			"change @ui.requirement": "onChangeRequirement",
			"change @ui.quantity":    "onChangeQuantity",
			"click .delete-atom":     "onClickDeleteAtom"
		},

		onChangeRequirement: function() {
			var value = this.ui.requirement.find("option:selected").val();
			this.model.set("requirement", value);
		},


		onChangeQuantity: function() {
			this.model.set("qty", this.ui.quantity.val());
		},

		onClickDeleteAtom: function() {
			this.trigger("atom:remove", this.model);
		}

	});
});

