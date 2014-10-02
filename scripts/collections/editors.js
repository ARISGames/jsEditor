define([
	'collections/json_collection_base',
	'models/editor',
	'vent'
], function(JsonCollection, Editor) {

	return JsonCollection.extend({

		model: Editor,

		amfphp_url: "editors.getEditorsForGame"
	});
});
