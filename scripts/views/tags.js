define([
  'views/editor_collection_base',
  'underscore',
  'text!templates/tags.tpl',
  'views/tag_row',
  'views/tag_editor',
  'models/tag',
  'vent',
],
function(
  EditorCollectionView,
  _,
  Template,
  TagRowView,
  TagEditorView,
  Tag,
  vent
)
{
  return EditorCollectionView.extend(
  {
    template: _.template(Template),

    itemView: TagRowView,
    itemViewContainer: '.tags',

    className: 'tags-editor',

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var view = this;

      var tag = new Tag({game_id: this.model.get("game_id")});

      var tag_editor = new TagEditorView({model: tag});

      tag_editor.on("tag:add", function(tag)
      {
        view.collection.add(tag);
      });

      vent.trigger("application:popup:show", tag_editor, "Create Tag");
    }
  });
});

