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
			this.listenTo(this.model, "update", this.render);
		},

		tagName: 'tr',

		onClickEdit: function() {
			var web_page_editor = new WebPageEditorView({model: this.model});
			vent.trigger("application:popup:show", web_page_editor, "Edit Web Page");
		}
	});
});
