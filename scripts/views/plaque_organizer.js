define([
       'backbone',
       'text!templates/plaque_organizer.tpl',
       'views/plaque_organizer_row',
       'vent'
], function(Backbone, Template, PlaqueOrganizerRowView, vent) {

       return Backbone.Marionette.CompositeView.extend({
               template: _.template(Template),

               itemView: PlaqueOrganizerRowView,
               itemViewContainer: ".plaques"
       });
});
