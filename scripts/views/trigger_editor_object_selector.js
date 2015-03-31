define(function(require)
{
	var _                = require('underscore');
	var $                = require('jquery');
	var Backbone         = require('backbone');
	var Template         = require('text!templates/trigger_editor_object_selector.tpl');

	var vent             = require('vent');
	var storage          = require('storage');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		/* View */

		templateHelpers: function() {
			return {
				game_object_id: this.model.get("object_id"),

				// Dropdown game objects
				items:     storage.items,
				plaques:   storage.plaques,
				dialogs:   storage.dialogs,
				web_pages: storage.web_pages,
				factories: storage.factories,
				scenes:    storage.scenes,

				// Helpers
				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},
			}
		},


		/* Constructor */

		initialize: function() {
		},

		onRender: function() {
			console.log("im rendered");
		}
	});
});
