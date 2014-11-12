/* Storage Singleton */

/* The containers are injected from application.js to fix circular issues */

define(function(require, exports, module)
{
	var Backbone   = require("backbone"  );
	var Marionette = require("marionette");

	var Storage = Marionette.Controller.extend(
	{
		for: function(game)
		{
			this.users.parent = game;
			this.tags.parent  = game;
			this.media.parent = game;

			this.instances.parent = game;
			this.triggers.parent  = game;

			this.web_pages.parent = game;
			this.dialogs.parent   = game;
			this.plaques.parent   = game;
			this.items.parent     = game;

			this.games.add(game);
		}
	});

	return new Storage();
});
