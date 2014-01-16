define([
	'jquery',
	'underscore',
	'backbone',
	'models/game',
	'models/session'
], function($, _, Backbone, Game, Session) {
	return Backbone.Collection.extend({

		model: Game,

		url: function() {
			var session = new Session;
			return "http://arisgames.org/server/json.php/v1.games.getGamesForEditor/"+session.editor_id+"/"+session.auth_token;
		}
	});
});
