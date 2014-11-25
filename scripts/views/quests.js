define(function(require)
{
	var EditorCollectionView = require('views/editor_collection_base');

	var _               = require('underscore');
	var Template        = require('text!templates/quests.tpl');
	var QuestRowView    = require('views/quest_row');
	var QuestEditorView = require('views/quest_editor');
	var Quest           = require('models/quest');
	var vent            = require('vent');


	return EditorCollectionView.extend({
		template: _.template(Template),

		itemView: QuestRowView,
		itemViewContainer: '.quests',

		className: 'quests-editor',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var view = this;

			var quest = new Quest({game_id: this.model.get("game_id")});

			var quest_editor = new QuestEditorView({model: quest});

			quest_editor.on("quest:add", function(quest) {
				view.collection.add(quest);
			});

			vent.trigger("application:popup:show", quest_editor, "Create Quest");
		}
	});
});
