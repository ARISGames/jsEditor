define([
	'collections/json_collection_base',
	'models/dialog_script',
	'vent'
], function(JsonCollection, DialogScript) {

	return JsonCollection.extend({

		model: DialogScript,

		amfphp_url: "dialogs.getDialogScriptsForDialog"
	});
});
