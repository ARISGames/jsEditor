define([
	'backbone',
	'text!templates/script_line_option.tpl',
	'vent'
], function(Backbone, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template)
	});
});
