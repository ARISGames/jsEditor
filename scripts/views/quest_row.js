define([
	'underscore',
	'backbone',
	'text!templates/quest_row.tpl',
	'views/quest_editor',
	'vent'
], function(_, Backbone, Template, QuestEditorView, vent) {
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
			var quest_editor = new QuestEditorView({model: this.model});
			vent.trigger("application:popup:show", quest_editor, "Edit Quest");
		}

	});
});
