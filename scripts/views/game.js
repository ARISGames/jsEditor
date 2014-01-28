define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game.tpl',
	'vent'
], function(module, $, _, Backbone, Marionette, Template, vent) {
    console.log(module.id);

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),
	
		events: {
			"click .plaques": "onClickPlaques"
		},

		onClickPlaques: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/plaques", {trigger: true});
		},
	});
});
