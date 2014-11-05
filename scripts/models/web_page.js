define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'web_page_id',

		amfphp_url_templates: {
			read:   "web_pages.getWebPage",
			update: "web_pages.updateWebPage",
			create: "web_pages.createWebPage",
			delete: "web_pages.deleteWebPage"
		},

		amfphp_url_attributes: [
			"game_id",
			"web_page_id",
			"name",
			"url",
			"icon_media_id"
        ],

		defaults: {
			name: "",
			url: "",
			icon_media_id: "0"
		},


		/* Associations */

		icon: function() {
			return storage.media.retrieve(this.get('icon_media_id'));
		},

		default_icon: function() {
			return storage.media.retrieve('0');
		},

		/* Helpers */

		icon_thumbnail: function() {
			return this.icon().thumbnail_for(this);
		}

	});
});

