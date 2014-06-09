define([
	'backbone',
	'text!../../templates/game_objects_organizer.tpl',
	'views/game_objects_organizer_row',
	'vent'
], function(Backbone, Template, GameObjectsOrganizerView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: GameObjectsOrganizerView,
		itemViewContainer: ".game_objects"
	});
});
