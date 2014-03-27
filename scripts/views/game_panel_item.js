define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_panel_item.tpl',
	'vent',
	'views/game_item_info',
], function($, _, Backbone, Marionette, Template, vent, GameItemInfoView) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			"click .info":         "onClickInfo"
		},


		onClickInfo: function() {
			// trigger the selection/dialog but no address change?
			// just forward an event, don't care who receives it, since scene manager will pick it up
			// or the sidebar (which isnt rendered yet?)
			//
			//vent.trigger("application.show", new EditAmfModelView({model: this.model}));
			//Backbone.history.navigate("#games/"+this.model.get('game_id')+"/locations/"+this.model.get('location_id')+"/edit", {trigger: false});

			vent.trigger("application:info:show", new GameItemInfoView({model: this.model}));
		},
	});
});
