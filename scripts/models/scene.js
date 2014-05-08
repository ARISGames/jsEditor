define([
	'jquery',
	'underscore',
	'backbone',
	'models/json_base',
	'models/session'
], function($, _, Backbone, JsonBaseModel, session) {

	return JsonBaseModel.extend({
		idAttribute: 'scene_id',

		amfphp_url_templates: {
			read:   "scenes.getScene",
			update: "scenes.updateSceneJSON",
			create: "scenes.createSceneJSON",
			delete: "scenes.deleteScene"
		},

		amfphp_url_attributes: [
			"name",
			"game_id",
			"scene_id"
        ],

		defaults: {
			name: "New Scene"
		}

	});
});

