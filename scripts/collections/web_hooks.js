define([
	'collections/json_collection_base',
	'models/web_hook'
], function(JsonCollection, WebHook) {

	return JsonCollection.extend({

		model: WebHook,

		amfphp_url: "webhooks.getWebHooksForGame"
	});
});
