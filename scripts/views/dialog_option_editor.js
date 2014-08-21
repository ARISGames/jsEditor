define([
	'underscore',
	'backbone',
	'text!templates/dialog_option_editor.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template)
	});
});
