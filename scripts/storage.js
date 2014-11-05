/* Event Singleton */

define(function(require, exports, module)
{
	var Backbone   = require("backbone"  );
	var Marionette = require("marionette");

	var UsersCollection = require("collections/users");
	var TagsCollection  = require("collections/tags" );
	var MediaCollection = require("collections/media");
	var GamesCollection = require("collections/games");

	var Storage = Marionette.Controller.extend(
	{
		initialize: function(options)
		{
			this.users = new UsersCollection ();
			this.tags  = new TagsCollection  ();
			this.media = new MediaCollection ();
			this.games = new GamesCollection ();
		},

		for: function(game)
		{
			this.users.parent = game;
			this.tags.parent  = game;
			this.media.parent = game;

			this.games.add(game);
		}
	});

	return new Storage();
});
