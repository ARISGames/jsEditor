define([
  'views/editor_collection_base',
  'underscore',
  'text!templates/quests.tpl',
  'views/quest_row',
  'views/quest_editor',
  'models/quest',
  'vent',
],
function(
  EditorCollectionView,
  _,
  Template,
  QuestRowView,
  QuestEditorView,
  Quest,
  vent
)
{

  return EditorCollectionView.extend({
    template: _.template(Template),

    itemView: QuestRowView,
    itemViewContainer: '.quests',

    className: 'quests-editor',

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var view = this;

      var quest = new Quest({game_id: this.model.get("game_id")});

      var quest_editor = new QuestEditorView({model: quest});

      quest_editor.on("quest:add", function(quest)
      {
        view.collection.add(quest);
      });

      vent.trigger("application:popup:show", quest_editor, "Create Quest");
    },

    onRender: function()
    {
      var sort_options = {
        items: '.draggable-quest',
        handle: '.tab-drag-handle',
        stop: function( event, ui ) { vent.trigger("questrow:released", ui.item, ui.item.index()); }
      };

      this.$el.find('.list-group.quests').sortable(sort_options);
    }
  });
});

