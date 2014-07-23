define([
       'backbone',
       'text!templates/web_page_organizer.tpl',
       'views/web_page_organizer_row',
       'vent'
], function(Backbone, Template, WebPageOrganizerRowView, vent) {

       return Backbone.Marionette.CompositeView.extend({
               template: _.template(Template),

               itemView: WebPageOrganizerRowView,
               itemViewContainer: ".web_pages"
       });
});
