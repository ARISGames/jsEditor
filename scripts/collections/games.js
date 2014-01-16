define([
	'jquery',
	'underscore',
	'backbone',
	'models/game',
	'models/session',
	'vent'
], function($, _, Backbone, Game, Session, vent) {
	return Backbone.Collection.extend({

		model: Game,

		fetch: function(options) {
			var session = new Session;
			var self = this;
			$.ajax({
				url: "http://arisgames.org/server/json.php/v1.games.getGamesForEditor/"+session.editor_id()+"/"+session.auth_token(),
				success: function(data) {
					json = JSON.parse(data);

					_.each(json.data, function(game_json) {
						self.add(new Game(game_json));
					});

					options.success.call();
				}
			});
		}
	});
});
