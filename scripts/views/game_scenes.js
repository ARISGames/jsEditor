define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'jqueryui',
	'text!../../templates/game_scenes.tpl',
	//'collections/scenes',
	//'views/game_scene',
], function($, _, Backbone, Marionette, jQueryUi, Template, GameCollection, GameItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: GameItemView,

		onRender: function() {
			// make draggable
			console.log("FIND", this.$el.find(".scene"));
			$(this.$el.find(".scene")).draggable({ containment: "parent" });
			$(this.$el.find(".scene-item")).draggable({ containment: "parent", delay: 100 });
		}

	});
});
