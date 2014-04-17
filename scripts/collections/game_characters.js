define([
	'jquery',
	'underscore',
	'backbone',
	'models/game_character',
	'scripts/config.js.php?dummy',
	'vent'
], function($, _, Backbone, GameCharacter, config, vent) {
	return Backbone.Collection.extend({
		model: GameCharacter,

		url: config.mongo_url + "/characters"
	});
});

