define([
	'models/user',
	'models/json_base',
	'storage'
], function(User, JsonBaseModel, storage) {

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
			media_id: "0"
		},

		user: function() {
			return storage.users.retrieve(this.get('user'));
		},

		media: function() {
			return storage.media.retrieve(this.get('media_id'));
		},

		tag: function() {
			return storage.tags.retrieve(this.get('tag_id'));
		}

	});
});

