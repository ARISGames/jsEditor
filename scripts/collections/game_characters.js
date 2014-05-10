define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'models/game_character',
	'collections/json_collection_base',
	'models/session',
	'vent'
], function(module, $, _, Backbone, Character, JsonCollection, session, vent) {
	console.log(module.id);

	return JsonCollection.extend({

		model: Character,

		url: function() {
			return this.amfphp_url_root+"npcs.getNpcsForGame/"+this.parent.get("game_id")+"/"+session.editor_id()+"/"+session.auth_token();
		},
	});
});
