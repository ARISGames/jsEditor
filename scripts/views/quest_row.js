define(function(require)
{
	var _               = require('underscore');
	var Backbone        = require('backbone');
	var Template        = require('text!templates/quest_row.tpl');
	var QuestEditorView = require('views/quest_editor');
	var vent            = require('vent');

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		events: {
			"click .edit": "onClickEdit"
		},

		modelEvents: {
			"change": "render"
		},

		onClickEdit: function() {
			var view = this;

			var quest_editor = new QuestEditorView({model: view.model});
			vent.trigger("application:popup:show", quest_editor, "Edit Quest");
		}

	});
});
