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
			var view = this;

			return {
				game_object: this.model.game_object(),

				// Dropdown game objects
				attribute_items: new Backbone.Collection(storage.items.where({type: "ATTRIB"})),
				web_items:       new Backbone.Collection(storage.items.where({type: "URL"})),
				items:           new Backbone.Collection(storage.items.where({type: "NORMAL"})),
				plaques:   storage.plaques,
				dialogs:   storage.dialogs,
				web_pages: storage.web_pages,
				factories: storage.factories,
				scenes:    new Backbone.Collection(storage.scenes.filter(function(scene) { return scene !== view.model.scene(); })),

				// Helpers
				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},
			}
		},

		/* Constructor */

		initialize: function() {
			this.listenTo(storage.items,     "change add remove", this.render);
			this.listenTo(storage.plaques,   "change add remove", this.render);
			this.listenTo(storage.dialogs,   "change add remove", this.render);
			this.listenTo(storage.web_pages, "change add remove", this.render);
			this.listenTo(storage.factories, "change add remove", this.render);
			this.listenTo(storage.scenes,    "change add remove", this.render);
		}
	});
});
