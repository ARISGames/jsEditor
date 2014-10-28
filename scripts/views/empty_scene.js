define([
	'backbone',
	'text!templates/empty_scene.tpl',
	'vent'
], function(Backbone, Template) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template)
	});
});

