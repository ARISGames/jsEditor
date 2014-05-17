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
			update: "scenes.updateScene",
			create: "scenes.createScene",
			delete: "scenes.deleteScene"
		},

		amfphp_url_attributes: [
			"scene_id",
			"name",
			"game_id"
        ],

		defaults: {
			name: "New Scene"
		}

	});
});

