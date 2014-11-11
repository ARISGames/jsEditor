define(function(require, exports, module)
{
	var Backbone   = require("backbone"  );
	var Marionette = require("marionette");

	var UsersCollection = require("collections/users");
	var TagsCollection  = require("collections/tags" );
	var MediaCollection = require("collections/media");
	var GamesCollection = require("collections/games");

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
		}
	});
});
