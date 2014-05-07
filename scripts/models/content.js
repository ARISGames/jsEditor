define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
], function($, _, Backbone, AmfBaseModel) {

	return AmfBaseModel.extend({
		idAttribute: 'object_content_id',


		amfphp_url_templates: {
			read:   "editorFoldersAndContent.getContent",
			update: "editorFoldersAndContent.saveContent",
			create: "editorFoldersAndContent.saveContent"
		},


		amfphp_url_attributes: [
			"game_id",
			"object_content_id",
			"folder_id",
			"content_type",
			"content_id",
			"sort_order"
		],

		defaults: {
			object_content_id: 0,
			folder_id: 0,
			sort_order: 1
		}
	});
});
