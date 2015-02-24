define(function(require)
{
	var _                    = require('underscore');
	var Backbone             = require('backbone');
	var Template             = require('text!templates/migration_games.tpl');
	var MigrationGameRowView = require('views/migration_game_row');
	var vent                 = require('vent');
	var config               = require('config');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: MigrationGameRowView,
		itemViewContainer: '.migration_games',

		events: {
		},

		className: "games-list-container"
	});
});
