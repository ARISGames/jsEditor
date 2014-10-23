define([
	'collections/json_collection_base',
	'models/user',
	'vent'
], function(JsonCollection, User) {

	return JsonCollection.extend({

		model: User,

		amfphp_url: ""
	});
});
