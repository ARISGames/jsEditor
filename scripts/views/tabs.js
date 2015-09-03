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
  'storage',
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
  storage,
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

    onClickNew: function()
    {
      var self = this;

      var game = this.model;
      var tab  = new Tab({game_id: game.id});

      var contents = {
        plaques:    storage.plaques,
        items:      storage.items,
        web_pages:  storage.web_pages,
        dialogs:    storage.dialogs,
      };

      var tab_editor = new TabEditorView({model:tab, contents:contents});

      tab_editor.on("tab:add", function(tab) { self.collection.add(tab); });

      vent.trigger("application:popup:show", tab_editor, "Create Tab");
    },

    onRender: function()
    {
      var sort_options =
      {
        items: '.draggable-game-tab',
        handle: '.tab-drag-handle',
        stop: function(event, ui)
        {
          /* 
          //phil is commenting this out to sidestep the overarchitected complexity of this,
          //so he can just iterate over the elements and save whatever order they are in.
          console.log(ui);
          vent.trigger("tabrow:released", ui.item, ui.item.index());
          */
          var list_cells = document.getElementById("tab-cell-list").childNodes;
          for(var i = 1; i < list_cells.length-2; i++) //starts at 1 and ends at length-2 because architecture is over architected
          {
            var list_cell_media_cell = list_cells[i].childNodes[0];
            var id = list_cell_media_cell.getAttribute('model-id');

            var tab = storage.tabs.findWhere({"tab_id":id});
            tab.save({"sort_index":(i-1)});
          }
        }
      };

      this.$el.find('.list-group.tabs').sortable(sort_options);
    }
  });
});

