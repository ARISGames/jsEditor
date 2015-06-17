define([
	'collections/json_collection_base',
	'models/event',
	'vent'
], function(JsonCollection, Event) {

	return JsonCollection.extend({

		model: Event,

		amfphp_url: "events.getEventsForGame"
	});
});
