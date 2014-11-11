define(function(require)
{
	var _             = require('underscore');
	var Backbone      = require('backbone');
	var Template      = require('text!templates/tag_row.tpl');
	var TagEditorView = require('views/tag_editor');
	var vent          = require('vent');


	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		events: {
			"click": "onClickEdit"
		},

		modelEvents: {
			"change": "render"
		},

		onClickEdit: function() {
			var tag_editor = new TagEditorView({model: this.model});
			vent.trigger("application:popup:show", tag_editor, "Edit Tag");
		}

	});
});
