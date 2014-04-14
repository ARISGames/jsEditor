define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_scene.tpl',
	'views/scene_info',
	'vent'
], function($, _, Backbone, Marionette, Template, SceneInfoView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		className: "scene",

		events: {
			"click .title": "onClickTitle"
		},

		/* TODO cleanest way to do this? */
		modelEvents: {
			"change": "modelChanged"
		},

		modelChanged: function() {
			this.render();
		},

		onRender: function() {
			$(this.$el).draggable({ containment: "parent" });
		},

		onClickTitle: function() {
			vent.trigger("application:info:show", new SceneInfoView({model: this.model}));
		}
	});
});
