define([
  'views/editor_collection_base',
  'underscore',
  'jquidrag',
  'text!templates/groups.tpl',
  'views/group_row',
  'views/group_editor',
  'models/group',
  'models/game',
  'vent',
],
function(
  EditorCollectionView,
  _,
  jQueryUiDraggable,
  Template,
  GroupRowView,
  GroupEditorView,
  Group,
  Game,
  vent
)
{
  return EditorCollectionView.extend(
  {
    template: _.template(Template),

    itemView: GroupRowView,
    itemViewContainer: '.groups',

    className: 'groups-editor',

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var self = this;

      var game = self.model;
      var group  = new Group({game_id:game.id});
      var group_editor = new GroupEditorView({model:group});

      group_editor.on("group:add", function(group)
      {
        self.collection.add(group);
      });

      vent.trigger("application:popup:show", group_editor, "Create Group");
    },

    onRender: function()
    {
      var sort_options = {
        items: '.draggable-game-group',
        handle: '.tab-drag-handle',
        stop: function( event, ui ) { vent.trigger("grouprow:released", ui.item, ui.item.index()); }
      };

      this.$el.find('.list-group.groups').sortable(sort_options);
    }
  });
});

