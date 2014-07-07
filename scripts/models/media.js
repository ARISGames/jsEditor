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


		amfphp_url_attributes: function() {
			var attribute_list = [
				"game_id",
				"media_id",
				"name",
				"file_name",
				"data"
			];

			// FIXME temporary fix for optional attribute, might need to remove the fixed attribute logic and make it a white list (with non nulls) that gets sent? (make sure nothing ever needs to be nulled out)
			if(this.get("data")) {
				return attribute_list;
			}
			else {
				return _.without(attribute_list, "data");
			}
		},


		defaults: {
			"display_name": ""
		}
	});
});
