define([
  'views/editor_collection_base',
  'underscore',
  'jquidrag',
  'text!templates/tabs.tpl',
  'views/tab_row',
  'views/tab_editor',
  'models/tab',
  'models/media',
  'models/game',
  'collections/items',
  'collections/plaques',
  'collections/web_pages',
  'collections/dialogs',
  'vent',
],
function(
  EditorCollectionView,
  _,
  jQueryUiDraggable,
  Template,
  TabRowView,
  TabEditorView,
  Tab,
  Media,
  Game,
  ItemsCollection,
  PlaquesCollection,
  WebPagesCollection,
  DialogsCollection,
  vent
)
{
  return EditorCollectionView.extend(
  {
    template: _.template(Template),

    itemView: TabRowView,
    itemViewContainer: '.tabs',

    className: 'tabs-editor',

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function() {
      var view = this;

      var game = this.model;
      var tab  = new Tab({game_id: game.id});

      var contents = {
        plaques:    new PlaquesCollection  ([], {parent: game}),
        items:      new ItemsCollection    ([], {parent: game}),
        web_pages:  new WebPagesCollection ([], {parent: game}),
        dialogs:    new DialogsCollection  ([], {parent: game}),
      };

      $.when(contents.plaques.fetch(), contents.items.fetch(), contents.web_pages.fetch(), contents.dialogs.fetch()).done(function()
      {
        var tab_editor = new TabEditorView({model: tab, contents: contents});

        tab_editor.on("tab:add", function(tab) {
          view.collection.add(tab);
        });

        vent.trigger("application:popup:show", tab_editor, "Create Tab");
      });
    },

    onRender: function()
    {
      var sort_options = {
        items: '.draggable-game-tab',
        handle: '.tab-drag-handle',
        stop: function( event, ui ) { vent.trigger("tabrow:released", ui.item, ui.item.index()); }
      };

      this.$el.find('.list-group.tabs').sortable(sort_options);
    }
  });
});

