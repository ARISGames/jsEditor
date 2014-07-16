define([
       'backbone',
       'text!templates/dialog_organizer.tpl',
       'views/dialog_organizer_row',
       'vent'
], function(Backbone, Template, DialogsOrganizerRowView, vent) {

       return Backbone.Marionette.CompositeView.extend({
               template: _.template(Template),

               itemView: DialogsOrganizerRowView,
               itemViewContainer: ".dialogs"
       });
});
