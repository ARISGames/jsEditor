define(function(require, exports, module)
{
	var Backbone   = require("backbone"  );
	var Marionette = require("marionette");

	var UsersCollection     = require("collections/users");
	var TagsCollection      = require("collections/tags");
	var TabsCollection      = require("collections/tabs");
	var QuestsCollection    = require("collections/quests");
	var MediaCollection     = require("collections/media");
	var WebhooksCollection  = require("collections/web_hooks");
	var GamesCollection     = require("collections/games");

	var TriggersCollection  = require("collections/game_triggers");
	var InstancesCollection = require("collections/instances");
	var ScenesCollection    = require("collections/scenes");

	var PlaquesCollection   = require("collections/plaques");
	var ItemsCollection     = require("collections/items");
	var DialogsCollection   = require("collections/dialogs");
	var WebPagesCollection  = require("collections/web_pages");
	var FactoriesCollection = require("collections/factories");

	var DialogScriptsCollection = require("collections/game_dialog_scripts");

	return Marionette.Controller.extend(
	{},
	/* Static methods */
	{
		inject: function(storage)
		{
			storage.users     = new UsersCollection    ();
			storage.tags      = new TagsCollection     ();
			storage.tabs      = new TabsCollection     ();
			storage.quests    = new QuestsCollection   ();
			storage.media     = new MediaCollection    ();
			storage.web_hooks = new WebhooksCollection ();
			storage.games     = new GamesCollection    ();

			storage.triggers  = new TriggersCollection  ();
			storage.instances = new InstancesCollection ();
			storage.scenes    = new ScenesCollection    ();

			storage.plaques   = new PlaquesCollection   ();
			storage.items     = new ItemsCollection     ();
			storage.dialogs   = new DialogsCollection   ();
			storage.web_pages = new WebPagesCollection  ();
			storage.factories = new FactoriesCollection ();

			storage.dialog_scripts = new DialogScriptsCollection ();
		}
	});
});
