define([
	'underscore',
	'backbone',
	'text!../../templates/games.tpl',
	'collections/games',
	'views/game_row',
	'views/game_editor',
	'models/game',
	'vent'
], function(_, Backbone, Template, GameCollection, GameRowView, GameEditorView, Game, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: GameRowView,
		itemViewContainer: '.games',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var game = new Game();
			vent.trigger("application.show", new GameEditorView({model: game}));
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
