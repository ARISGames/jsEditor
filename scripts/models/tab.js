define(function(require) {
	var JsonBaseModel = require('models/json_base');
	var storage       = require('storage');

	var Tab = JsonBaseModel.extend({
		idAttribute: 'tab_id',

		amfphp_url_templates: {
			read:   "tabs.getTab",
			update: "tabs.updateTab",
			create: "tabs.createTab",
			delete: "tabs.deleteTab"
		},

		amfphp_url_attributes: [
			"tab_id",
			"game_id",
			"name",
			"info",
			"type",
			"content_id",
			"icon_media_id",
			"requirement_root_package_id",
			"sort_index"
		],

		defaults: {
			name: "",
			info: "",
			type: "",
			content_id: "0",
			icon_media_id: "0",
			requirement_root_package_id: "0",
			sort_index: "0"
		},

		/* Associations */

		// FIXME use storage
		game_object: function(object) {
			if(object)
			{
				this.game_object_model = object;
			}

			return this.game_object_model;
		},

		game: function() {
			return storage.games.retrieve(this.get('game_id'));
		},

		icon: function() {
			return storage.media.retrieve(this.get('icon_media_id'));
		},

		default_icon: function() {
			return storage.media.retrieve('0');
		},

		/* Helpers */

		icon_thumbnail: function() {
			return this.icon().thumbnail_for(this);
		},

		tab_type_name: function() {
			return Tab.tab_types[this.get("type")];
		}
	},
	// Static
	{
		tab_types:
		{
			'MAP':       'Map',
			'DECODER':   'Decoder',
			'SCANNER':   'Scanner',
			'QUESTS':    'Quests',
			'INVENTORY': 'Inventory',
			'PLAYER':    'Player',
			'NOTEBOOK':  'Notebook',

			'DIALOG':    'Conversation',
			'ITEM':      'Item/Player Attribute',
			'PLAQUE':    'Plaque',
			'WEB_PAGE':  'Web Page'
		}
	});

	return Tab;
});

