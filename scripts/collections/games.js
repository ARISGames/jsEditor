define([
	'jquery',
	'underscore',
	'backbone',
	'models/game',
	'collections/row_collection_base',
	'models/session',
	'vent'
], function($, _, Backbone, Game, RowCollectionBase, Session, vent) {
	return RowCollectionBase.extend({

		model: Game,


		url: function() {
			var session = new Session;
			return this.amfphp_url_root+"games.getGamesForEditor/"+session.editor_id()+"/"+session.auth_token();
		},


		parse: function(json, response) {
			return json.data;
		},

	});
});
