/* Event Singleton */

define(function(require, exports, module)
{
	var Backbone   = require("backbone"  );
	var Marionette = require("marionette");

	var UsersCollection = require("collections/users");
	var TagsCollection  = require("collections/tags" );
	var MediaCollection = require("collections/media");

	var Storage = Marionette.Controller.extend(
	{
		initialize: function(options)
		{
			this.users = new UsersCollection ();
			this.tags  = new TagsCollection  ();
			this.media = new MediaCollection ();
		},

		for: function(game)
		{
			this.users.parent = game;
			this.tags.parent  = game;
			this.media.parent = game;
		}
	});

	return new Storage();
});
