define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_item_panel.tpl',
	'views/game_panel_item',
	'vent'
], function(module, $, _, Backbone, Marionette, Template, GamePanelItemView, vent) {
    console.log(module.id);

	return Backbone.Marionette.CompositeView.extend({
		template:  _.template(Template),

		itemView: GamePanelItemView,
		itemViewContainer: ".itemViewContainer",

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
		}
	});

});
