define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_item.tpl',
], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template)
	});
});
