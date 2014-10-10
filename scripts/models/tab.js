define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'tab_id',

		amfphp_url_templates: {
			read:   "tabs.getTab",
			update: "tabs.updateTab",
			create: "tabs.createTab",
			delete: "tabs.deleteTab"
		},

		amfphp_url_attributes: [
			"tab_id",
			"game_id",
			"name",
			"info",
			"type",
			"content_id",
			"icon_media_id",
			"requirement_root_package_id",
			"sort_index"
		],

		defaults: {
			name: "",
			info: "",
			type: "",
			content_id: "0",
			icon_media_id: "0",
			requirement_root_package_id: "0",
			sort_index: "0"
		}
	});
});

