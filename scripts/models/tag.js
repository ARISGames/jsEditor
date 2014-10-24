define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'tag_id',

		amfphp_url_templates: {
			read:   "tags.getTag",
			update: "tags.updateTag",
			create: "tags.createTag",
			delete: "tags.deleteTag"
		},

		amfphp_url_attributes: [
			"tag_id",
		   	"game_id",
			"tag",
			"visible",
		   	"media_id"
		],

		defaults: {
			tag: "",
		   	media_id: "0",
			visible: "1"
		}
	});
});

