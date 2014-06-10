define([
	'jquery',
	'underscore',
	'backbone',
	'models/json_base'
], function($, _, Backbone, JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'media_id',


		amfphp_url_templates: {
			read:   "media.getMedia",
			update: "media.updateMedia",
			create: "media.createMedia",
			delete: "media.deleteMiedia"
		},


		amfphp_url_attributes: [
			"game_id",
			"media_id",
			"display_name",
			"file_name",
			"data"
		],


		defaults: {
			name: ""
		}
	});
});
