define([
	'underscore',
	'backbone',
	'text!templates/quest_row.tpl',
	'views/quest_editor',
	'models/media',
	'vent'
], function(_, Backbone, Template, QuestEditorView, Media, vent) {
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

			var icons = {
				active_icon:    new Media({media_id: this.model.get("active_icon_media_id"  )}),
				active_media:   new Media({media_id: this.model.get("active_media_id"       )}),
				complete_icon:  new Media({media_id: this.model.get("complete_icon_media_id")}),
				complete_media: new Media({media_id: this.model.get("complete_media_id"     )})
			};

			$.when(icons.active_icon.fetch(), icons.active_media.fetch(), icons.complete_icon.fetch(), icons.complete_media.fetch()).done(function()
			{
				var quest_editor = new QuestEditorView(_.extend({model: view.model}, icons));
				vent.trigger("application:popup:show", quest_editor, "Edit Quest");
			});
		}

	});
});
