define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'models/game',
	'collections/json_collection_base',
	'models/session',
	'vent'
], function(module, $, _, Backbone, Game, JsonCollection, session, vent) {
	console.log(module.id);

	return JsonCollection.extend({

		model: Game,


		url: function() {
			return this.amfphp_url_root+"games.getGamesForUser/"+session.editor_id()+"/"+session.auth_token();
		},
	});
});
