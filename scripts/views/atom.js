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
			operator: ".boolean-operator",
			requirement: ".requirement",
			// content..
			quantity: ".quantity",
			latitude: ".latitude",
			longitude: ".longitude",
			distance: ".distance"
		},

		events: {
			"change @ui.operator":    "onChangeBooleanOperator",
			"change @ui.requirement": "onChangeRequirement",
			// content ID here...
			"change @ui.quantity":    "onChangeQuantity",
			"change @ui.distance":    "onChangeDistance",
			"change @ui.latitude":    "onChangeLatitude",
			"change @ui.longitude":   "onChangeLongitude",
			"click .delete-atom":     "onClickDeleteAtom"
		},

		onChangeBooleanOperator: function() {
			var value = this.ui.operator.find("option:selected").val();
			this.model.set("bool_operator", value);
		},

		onChangeRequirement: function() {
			var value = this.ui.requirement.find("option:selected").val();
			this.model.set("requirement", value);
		},

		onChangeQuantity: function() {
			this.model.set("qty", this.ui.quantity.val());
		},

		onChangeLatitude: function() {
			this.model.set("latitude", this.ui.latitude.val());
		},
		onChangeLongitude: function() {
			this.model.set("longitude", this.ui.longitude.val());
		},

		onChangeDistance: function() {
			this.model.set("distance", this.ui.distance.val());
		},

		onClickDeleteAtom: function() {
			this.trigger("atom:remove", this.model);
		}

	});
});

