define(function(require)
{
	var _               = require('underscore');
	var EditorView      = require('views/editor_base');
	var Template        = require('text!templates/quest_row.tpl');
	var QuestEditorView = require('views/quest_editor');
	var vent            = require('vent');

	return EditorView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		templateHelpers: function() {
			return {
				active_icon_thumbnail_url: this.model.active_icon_thumbnail()
			}
		},

		events: {
			"click": "onClickEdit"
		},

		initialize: function()
		{
			// Listen to association events on media
			this.active_icon = this.model.active_icon()
			this.bindEvents();
		},

		bindEvents: function()
		{
			// Model
			// TODO listen to new icon incase its not fully loaded
			this.listenTo(this.model, 'change', this.rebindEvents);

			// Thumbnail
			this.listenTo(this.active_icon, 'change', this.render);
		},

		rebindEvents: function(model)
		{
			if(model.hasChanged("active_icon_media_id"))
			{
				this.stopListening(this.active_icon);
				this.active_icon = this.model.active_icon()
				this.listenTo(this.active_icon, 'change', this.render);
			}
			this.render();
		},

		onClickEdit: function() {
			var view = this;

			var quest_editor = new QuestEditorView({model: view.model});
			vent.trigger("application:popup:show", quest_editor, "Edit Quest");
		}
	});
});
