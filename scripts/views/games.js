define([
	'underscore',
	'backbone',
	'text!templates/games.tpl',
	'collections/games',
	'views/game_row',
	'views/game_create',
	'models/game',
	'vent',
	'config'
], function(_, Backbone, Template, GameCollection, GameRowView, GameCreateView, Game, vent, config) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: GameRowView,
		itemViewContainer: '.games',

		templateHelpers: function() {
			return {
				migrate_path: config.migrate_path
			}
		},

		events: {
			"click .new": "onClickNew"
		},

		className: "games-list-container",

		onClickNew: function() {
			var game = new Game();
			vent.trigger("application.show", new GameCreateView({model: game}));
		},

		// Marionette override
		appendBuffer: function(compositeView, buffer) {
			var $container = this.getItemViewContainer(compositeView);
			$container.find(".foot").before(buffer);
		},

		appendHtml: function(compositeView, itemView, index){
			if (compositeView.isBuffering) {
			  compositeView.elBuffer.appendChild(itemView.el);
			}
			else {
			  // If we've already rendered the main collection, just
			  // append the new items directly into the element.
			  var $container = this.getItemViewContainer(compositeView);
			  $container.find(".foot").before(itemView.el);
			}
		}
	});
});
