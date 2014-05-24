define([
	'jquery',
	'underscore',
	'backbone',
	'jqueryui',
	'bootstrap',
	'text!../../templates/scenes.tpl',
	'models/scene',
	'views/scene',
	'views/scene_info',
	'vent'
], function($, _, Backbone, jQueryUi, Bootstrap, Template, Scene, GameSceneView, SceneInfoView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: GameSceneView,
		itemViewContainer: ".scenes",

		itemViewOptions: function() {
			return { game: this.model }
		},

		events: {
			"click .new-scene": "onClickNewScene"
		},

		onClickNewScene: function() {
			var scene = new Scene({game_id: this.model.id});
			this.collection.add(scene);
			vent.trigger("application:info:show", new SceneInfoView({model: scene}));
		},


		/* Line Drawing Code */

		getPos: function(ele, targetParent){
			var x=0;
			var y=0;
			while(true){
				x += ele.offsetLeft;
				y += ele.offsetTop;
				if(ele.offsetParent === null || ele.offsetParent === targetParent){
					break;
				}
				ele = ele.offsetParent;
			}
			return [x, y];
		},

		onRender: function() {
			var view = this;
			// make draggable
			//$(this.$el.find(".scene")).draggable({ containment: "parent" });
			//$(this.$el.find(".scene-item")).draggable({ containment: "parent", delay: 100 });

			var scene_container = this.$el.find('.scenes').get(0);
			var link_ends   = this.$el.find('.link-end'  );
			var link_starts = this.$el.find('.link-start');
			var link_lines  = this.$el.find('.link-line' );

			this.$el.find(".link-end, .link-start, .scene").on("drag", function(event, ui) {
				//view.drawLinks(link_starts, link_ends, link_lines, scene_container);
			});

			//setTimeout(function(){ view.drawLinks(link_starts, link_ends, link_lines, scene_container); },100);
		},

		drawLinks: function(link_starts, link_ends, link_lines, scene_container) {
			var view = this;

			link_starts.each(function(index, link_start)
			{
				var end_pos   = view.getPos( link_ends.get(index), scene_container );
				var start_pos = view.getPos( link_start,           scene_container );

				$(link_lines.get(index)).attr("d", "M" + (start_pos[0] + 37) + " " + (start_pos[1] + 27) + " L" + (end_pos[0] + 37) + " " + (end_pos[1] + 27));
			});
		}

	});
});
