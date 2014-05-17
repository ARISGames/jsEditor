define([
	'models/json_base',
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'trigger_id',

		amfphp_url_templates: {
			read:   "",
			update: "",
			create: "",
			delete: ""
		},

		amfphp_url_attributes: [
			"trigger_id",
			"game_id",
			"name",
			"scene_id",
			"instance_id",
			"type",
			"qr_code"
        ],

		defaults: {
          game_id: 2,
          name: "my trigger",
          instance_id: 1,
          scene_id: 1,
          requirement_root_package_id: 132,
          type: "QR",
          qr_code: "abc123"
		}

	});
});

