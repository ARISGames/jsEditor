define([
	'models/json_base'
], function(JsonBaseModel) {

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
			name: ""
		}

	});
});

