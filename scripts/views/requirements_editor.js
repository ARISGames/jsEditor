
define([
	'underscore',
	'backbone',
	'text!templates/requirements_editor.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template)
	});
});

