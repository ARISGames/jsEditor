define([
	'jquery',
	'backbone',
	'text!templates/web_page_organizer_row.tpl',
	'views/web_page_editor',
	'models/media',
	'vent'
], function($, Backbone, Template, WebPageEditorView, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		initialize: function() {
			var view = this;

			vent.on("game_object:update", function(game_object) {
				if(game_object.is(view.model))
				{
					view.model = game_object;
					view.render();
				}
			});
		},

		tagName: 'tr',

		onClickEdit: function() {
			var view  = this;

			var web_page_editor = new WebPageEditorView({model: view.model});
			vent.trigger("application:popup:show", web_page_editor, "Edit Web Page");
		}
	});
});
