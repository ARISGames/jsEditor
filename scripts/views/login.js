define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'models/session',
	'text!../../templates/login.tpl'
], function($, _, Backbone, Marionette, Session, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template)
	});
});
