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
			delete: "media.deleteMedia"
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
			"name": "",
			"file_name": ""
		},


		is_video: function() {
			return this.get("file_name").match(/\.(avi|mp4|mkv|mpeg|mpg|mov|m4v|3gp)/);
		},

		is_audio: function() {
			return this.get("file_name").match(/\.(wav|mp3|alac|flac|caf|m4a)/);
		},


		// TODO show video in place!
		thumbnail: function() {
			if(this.id === "0") {
				return "images/default128.png";
			}
			else if(this.is_video()) {
				return "images/video128.png";
			}
			else if(this.is_audio()) {
				return "images/audio128.png";
			}
			else {
				return this.get("thumb_url");
			}
		},

		content: function() {
			return this.get("url");
		}
	});
});
