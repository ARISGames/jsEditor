define([
       'backbone',
       'text!templates/web_page_organizer.tpl',
       'views/web_page_organizer_row',
	   'views/web_page_editor',
	   'models/web_page',
	   'models/media',
       'vent'
], function(Backbone, Template, WebPageOrganizerRowView, WebPageEditorView, WebPage, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: WebPageOrganizerRowView,
		itemViewContainer: ".web_pages",

		initialize: function(options) {
			var view = this;

			vent.on("web_page:add", function(web_page) {
				view.collection.add(web_page);
			});
		},


		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			var web_page  = new WebPage({game_id: this.model.get("game_id")});

			var icon  = new Media({media_id: web_page.get("icon_media_id")});

			$.when(icon.fetch()).done(function () {
				var web_page_editor = new WebPageEditorView({model: web_page, icon: icon});
				vent.trigger("application:popup:show", web_page_editor, "Create Web Page");
			});
		}
   });
});
