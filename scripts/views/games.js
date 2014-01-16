define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/games.tpl',
	'collections/games',
	'views/game_item',
], function($, _, Backbone, Marionette, Template, GameCollection, GameItemView) {
	return Backbone.Marionette.CollectionView.extend({
		template: _.template(Template),

		itemView: GameItemView
	});
});
