define(function(require)
{
	var EditorCollectionView = require('views/editor_collection_base');

	var _             = require('underscore');
	var Template      = require('text!templates/tags.tpl');
	var TagRowView    = require('views/tag_row');
	var TagEditorView = require('views/tag_editor');
	var Tag           = require('models/tag');
	var vent          = require('vent');


	return EditorCollectionView.extend({
		template: _.template(Template),

		itemView: TagRowView,
		itemViewContainer: '.tags',

		className: 'tags-editor',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var view = this;

			var tag = new Tag({game_id: this.model.get("game_id")});

			var tag_editor = new TagEditorView({model: tag});

			tag_editor.on("tag:add", function(tag) {
				view.collection.add(tag);
			});

			vent.trigger("application:popup:show", tag_editor, "Create Tag");
		}
	});
});
