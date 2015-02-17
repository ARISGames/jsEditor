define(function(require) {
	var JsonBaseModel = require('models/json_base');
	var storage       = require('storage');


	return JsonBaseModel.extend({
		idAttribute: 'game_id',

		amfphp_url_templates: {
			read:   "",
			update: "",
			create: "",
			delete: ""
		},

		amfphp_url_attributes: [
			"game_id"
		],

		defaults: {
			name: "",
			description: ""
		},


		/* Associations */

		icon: function() {
			return storage.media.retrieve('0');
		},

		/* Helpers */

		icon_thumbnail: function() {
			return this.icon().thumbnail_for(this);
		}
	});
});
