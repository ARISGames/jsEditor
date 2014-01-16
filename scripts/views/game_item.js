define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_item.tpl',
	'models/game',
], function($, _, Backbone, Marionette, Template, Game) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template)
	});
});
