define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'event_id',

		amfphp_url_templates: {
			read:   "events.getEvent",
			update: "events.updateEvent",
			create: "events.createEvent",
			delete: "events.deleteEvent"
		},

		amfphp_url_attributes: [
			"game_id",
			"event_id",
			"event",
			"content_id",
			"qty"
        ],

		defaults: {
			"event": "GIVE_ITEM",
		   	"content_id": "0",
			"qty": "0"
		}

	});
});

