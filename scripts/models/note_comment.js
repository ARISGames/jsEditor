define(function(require)
{
	var JsonBaseModel = require('models/json_base');
	var storage       = require('storage');


	return JsonBaseModel.extend({
		idAttribute: 'note_comment_id',

		amfphp_url_templates: {
			read:   "",
			update: "",
			create: "",
			delete: "note_comments.deleteNoteComment"
		},

		amfphp_url_attributes: [
			"note_comment_id",
		   	"game_id"
		],

		defaults: {
		},

		user: function() {
			return storage.users.retrieve(this.get('user'));
		},
	});
});

