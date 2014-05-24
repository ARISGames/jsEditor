define([
	'underscore',
	'backbone',
	'text!../../templates/game_item_panel.tpl',
	'views/game_panel_item',
	'vent'
], function(_, Backbone, Template, GamePanelItemView, vent) {

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
