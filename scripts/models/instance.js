define([
	'models/json_base',
	'models/dialog',
	'models/plaque'
], function(JsonBaseModel, Dialog, Plaque) {

	return JsonBaseModel.extend({
		idAttribute: 'instance_id',

		amfphp_url_templates: {
			read:   "instances.getInstance",
			update: "instances.updateInstance",
			create: "instances.createInstance",
			delete: "instances.deleteInstance"
		},

		amfphp_url_attributes: [
			"instance_id",
			"game_id",
			"object_id",
			"object_type"
        ],

		// For creating new instances.
		type_for: function(object) {
			if(object instanceof Dialog) { return "DIALOG" }

			else { throw "cant determine type of: " + object }
		},

		// For loading the right class from the instance
		object_class: function() {
			var type = this.get("object_type");

			if(type === "DIALOG") { return Dialog }
			if(type === "PLAQUE") { return Plaque }
			else { throw "cant determine class of: " + type }
		}
	});
});
