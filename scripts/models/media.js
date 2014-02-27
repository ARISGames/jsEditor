define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/content'
], function($, _, Backbone, AmfBaseModel, Content) {

	return AmfBaseModel.extend({
		idAttribute: 'media_id',


		initialize: function() {
			this.on("create", function(model) {
				var folder = new Content({content_id: model.get(model.idAttribute), content_type: "Npc", game_id: model.get("game_id")});
				folder.save();
			});
		},


		amfphp_url_templates: {
			read:   "media.getMediaObject",
			update: null,
			create: "media.createMedia",
			delete: "media.deleteMiedia"
		},


		amfphp_url_attributes: [
			"game_id",
			"media_id",
			"file_name",
			"is_icon"
		],


		defaults: {
			file_name: "",
			is_icon: 0
		}
	});
});
