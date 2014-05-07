define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'models/scene',
	'collections/json_collection_base',
	'models/session',
	'vent'
], function(module, $, _, Backbone, Scene, JsonCollection, session, vent) {
	console.log(module.id);

	return JsonCollection.extend({

		model: Scene,


		url: function() {
			return this.amfphp_url_root+"scenes.getScenesForGame/"+this.parent.get("game_id")+"/"+session.editor_id()+"/"+session.auth_token();
		},
	});
});

