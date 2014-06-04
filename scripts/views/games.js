define([
	'underscore',
	'backbone',
	'text!../../templates/games.tpl',
	'collections/games',
	'views/game_row',
	'views/game_rows_empty',
	'views/game_editor',
	'models/game',
	'vent'
], function(_, Backbone, Template, GameCollection, GameRowView, GameRowsEmptyView, GameEditorView, Game, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: GameRowView,
		itemViewContainer: '.games',

		emptyView: GameRowsEmptyView,

		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			var game = new Game();
			vent.trigger("application.show", new GameEditorView({model: game}));
		}
	});
});
