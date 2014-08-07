define([
       'backbone',
       'text!templates/character_organizer.tpl',
       'views/character_organizer_row',
       'vent'
], function(Backbone, Template, CharactersOrganizerRowView, vent) {

       return Backbone.Marionette.CompositeView.extend({
			template: _.template(Template),

			itemView: CharactersOrganizerRowView,
			itemViewContainer: ".characters"
       });
});
