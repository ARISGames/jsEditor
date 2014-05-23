define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/scene_instance_trigger.tpl',
	'vent'
], function($, _, Backbone, Marionette, Template, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		tagName: 'li',
		className: 'scene-item'

		// get instance and object here, remove name from display
	});
});
