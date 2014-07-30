define([
       'backbone',
       'text!templates/web_page_organizer.tpl',
       'views/web_page_organizer_row',
       'vent'
], function(Backbone, Template, WebPageOrganizerRowView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: WebPageOrganizerRowView,
		itemViewContainer: ".web_pages",

		initialize: function(options) {
			var view = this;

			vent.on("web_page:add", function(web_page) {
				view.collection.add(web_page);
			});
		}
   });
});
