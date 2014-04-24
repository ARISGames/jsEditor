define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/character_instance_info.tpl',
	'vent'
], function($, _, Backbone, Marionette, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function () {
			return {
				//name: this.model.get("character").get("name")
				name: this.model.get("character_name")
			}
		}
	});
});
