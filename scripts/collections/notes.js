define([
	'collections/json_collection_base',
	'models/note'
], function(JsonCollection, Note) {

	return JsonCollection.extend({

		model: Note,

		amfphp_url: "notes.getNotesForGame"
	});
});
