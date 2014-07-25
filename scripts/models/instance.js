define([
	'models/json_base',
	'models/dialog',
	'models/plaque',
	'models/item',
	'models/web_page'
], function(JsonBaseModel, Dialog, Plaque, Item, WebPage) {

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
			if(object instanceof Dialog) { return "DIALOG"  }
			if(object instanceof Item)   { return "ITEM"    }
			if(object instanceof Plaque) { return "PLAQUE:" }

			else { throw "cant determine type of " + object.idAttribute + ": " + object.id; }
		},

		// For loading the right class from the instance
		object_class: function() {
			var type = this.get("object_type");

			if(type === "DIALOG")   { return Dialog  }
			if(type === "PLAQUE")   { return Plaque  }
			if(type === "ITEM")     { return Item    }
			if(type === "WEB_PAGE") { return WebPage }
			else { throw "cant determine class of: " + type }
		}
	});
});
