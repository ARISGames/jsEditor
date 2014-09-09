define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/trigger_location_editor.tpl',
	'vent'
], function(_, $, Backbone, Template, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				icon_thumbnail_url:  this.icon.thumbnail(),

				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},

				radio_selected: function(boolean_statement) {
					return boolean_statement ? "checked" : "";
				}
			};
		},

		initialize: function(options) {
			this.icon     = options.icon;
		},

		ui: {
			"title":      "#trigger-title",
			"latitude":   "#trigger-latitude",
			"longitude":  "#trigger-longitude",
			"distance":   "#trigger-distance",
			"wiggle":     "#trigger-wiggle",
			"show_title": "#trigger-show_title"
		},

		events: {
			"click .save":   "onClickSave",
			"click .delete": "onClickDelete",
			"click .cancel": "onClickCancel"
		},

		modelEvents: {
			"change": "modelChanged"
		},

		modelChanged: function() {
			this.render();
		},

		onClickDelete: function() {
			var view = this;

			this.model.destroy({
				success: function() {
					// FIXME hack events
					view.model.trigger("delete_map");
					view.close();
				}
			});
		},

		onClickCancel: function() {
			this.close();
		},

		onClickSave: function() {
			var view = this;
			var trigger  = this.model;

			trigger.set("title",      view.ui.title.val());
			trigger.set("latitude",   view.ui.latitude.val());
			trigger.set("longitude",  view.ui.longitude.val());
			trigger.set("distance",   view.ui.distance.val());
			trigger.set("wiggle",     view.ui.wiggle.is(":checked") ? "1" : "0");
			trigger.set("show_title", view.ui.show_title.is(":checked") ? "1" : "0");

			trigger.trigger("update_map");
			trigger.save();
		}

	});
});
