define(function(require)
{
	var Backbone          = require('backbone');
	var Template          = require('text!templates/web_page_organizer_row.tpl');
	var WebPageEditorView = require('views/web_page_editor');
	var vent              = require('vent');


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
