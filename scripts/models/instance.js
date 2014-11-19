define([
	'models/json_base',
	'models/dialog',
	'models/plaque',
	'models/item',
	'models/web_page',
	'models/scene',
	'models/factory',
	'storage'
], function(JsonBaseModel, Dialog, Plaque, Item, WebPage, Scene, Factory, storage) {

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
			"object_type",
			"qty",
			"infinite_qty"
        ],

		defaults: {
			"qty": "0",
			"infinite_qty": "0"
		},

		// For loading the right class from the instance
		object_class: function() {
			var type = this.get("object_type");

			if(type === "DIALOG")   { return Dialog  }
			if(type === "PLAQUE")   { return Plaque  }
			if(type === "ITEM")     { return Item    }
			if(type === "WEB_PAGE") { return WebPage }
			if(type === "SCENE")    { return Scene   }
			if(type === "FACTORY")  { return Factory }
			else { throw "cant determine class of: " + type }
		},

		// For creating new instances.
		type_for: function(object) {
			if(object instanceof Dialog)  { return "DIALOG"   }
			if(object instanceof Item)    { return "ITEM"     }
			if(object instanceof Plaque)  { return "PLAQUE"   }
			if(object instanceof WebPage) { return "WEB_PAGE" }
			if(object instanceof Scene)   { return "SCENE"    }
			if(object instanceof Factory) { return "FACTORY"  }

			else { throw "cant determine type of " + object.idAttribute + ": " + object.id; }
		},

		/* Associations */

		game_object: function()
		{
			var type = this.get("object_type");
			var id   = this.get("object_id");

			if(type === "DIALOG")   { return storage.dialogs.retrieve(id)   }
			if(type === "PLAQUE")   { return storage.plaques.retrieve(id)   }
			if(type === "ITEM")     { return storage.items.retrieve(id)     }
			if(type === "WEB_PAGE") { return storage.web_pages.retrieve(id) }

			//if(type === "SCENE")    { return Scene   }
			//if(type === "FACTORY")  { return Factory }

			else { throw "cant fetch game object of type: " + type }
		}
	},
	// Static methods
	{
		// For creating new instances.
		type_for: function(object) {
			if(object instanceof Dialog)  { return "DIALOG"   }
			if(object instanceof Item)    { return "ITEM"     }
			if(object instanceof Plaque)  { return "PLAQUE"   }
			if(object instanceof WebPage) { return "WEB_PAGE" }
			if(object instanceof Scene)   { return "SCENE"    }
			if(object instanceof Factory) { return "FACTORY"  }

			else { throw "cant determine type of " + object.idAttribute + ": " + object.id; }
		}
	});
});
