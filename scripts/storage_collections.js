define(function(require, exports, module)
{
	var Backbone   = require("backbone"  );
	var Marionette = require("marionette");

	var UsersCollection = require("collections/users");
	var TagsCollection  = require("collections/tags" );
	var MediaCollection = require("collections/media");
	var GamesCollection = require("collections/games");

	var TriggersCollection  = require("collections/game_triggers");
	var InstancesCollection = require("collections/instances");
	var ScenesCollection    = require("collections/scenes");

	var PlaquesCollection   = require("collections/plaques");
	var ItemsCollection     = require("collections/items");
	var DialogsCollection   = require("collections/dialogs");
	var WebPagesCollection  = require("collections/web_pages");
	var FactoriesCollection = require("collections/factories");

	return Marionette.Controller.extend(
	{},
	/* Static methods */
	{
		inject: function(storage)
		{
			storage.users = new UsersCollection ();
			storage.tags  = new TagsCollection  ();
			storage.media = new MediaCollection ();
			storage.games = new GamesCollection ();

			storage.triggers  = new TriggersCollection  ();
			storage.instances = new InstancesCollection ();
			storage.scenes    = new ScenesCollection    ();

			storage.plaques   = new PlaquesCollection   ();
			storage.items     = new ItemsCollection     ();
			storage.dialogs   = new DialogsCollection   ();
			storage.web_pages = new WebPagesCollection  ();
			storage.factories = new FactoriesCollection ();

		}
	});
});
