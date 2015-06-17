define([
	'models/json_base',
	'storage'
], function(JsonBaseModel, storage) {

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
			"event": "GIVE_ITEM_PLAYER",
		   	"content_id": "0",
			"qty": "1"
		},


		/* Inference */
		modified_by: function()
		{
			var object;
			var event_package_id = this.get("event_package_id");

			object = storage.quests.findWhere({active_event_package_id: event_package_id});
			if(object) return object;

			object = storage.quests.findWhere({complete_event_package_id: event_package_id});
			if(object) return object;

			object = storage.plaques.findWhere({event_package_id: event_package_id});
			if(object) return object;

			object = storage.dialog_scripts.findWhere({event_package_id: event_package_id});
			if(object) return object;

			throw "Can not locate game object with event_package_id: "+event_package_id;
		}
	});
});

