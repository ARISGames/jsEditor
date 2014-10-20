define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'note_id',

		amfphp_url_templates: {
			read:   "notes.getNote",
			update: "",
			create: "",
			delete: "notes.deleteNote"
		},

		amfphp_url_attributes: [
			"note_id",
		   	"game_id"
		],

		defaults: {
			media_id: "5628"
		}
	});
});

