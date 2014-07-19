define([
       'backbone',
       'text!templates/item_organizer.tpl',
       'views/item_organizer_row',
       'vent'
], function(Backbone, Template, ItemOrganizerRowView, vent) {

       return Backbone.Marionette.CompositeView.extend({
               template: _.template(Template),

               itemView: ItemOrganizerRowView,
               itemViewContainer: ".items",

	   		initialize: function() {
				console.log("items");
			}
       });
});
