define([
  'backbone',
  'text!templates/factory_organizer_row.tpl',
  'views/factory_editor',
  'models/media',
  'models/game',
  'collections/items',
  'collections/plaques',
  'collections/dialogs',
  'collections/web_pages',
  'vent',
  'storage'
],
function(
  Backbone,
  Template,
  FactoryEditorView,
  Media,
  Game,
  ItemsCollection,
  PlaquesCollection,
  DialogsCollection,
  WebPagesCollection,
  vent,
  storage
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    events:
    {
      "click .edit": "onClickEdit"
    },

    initialize: function()
    {
      this.listenTo(this.model, "update", this.render);
    },

    tagName: 'tr',

    onClickEdit: function()
    {
      var view = this;

      var contents = {
        items:     storage.items,
        plaques:   storage.plaques,
        dialogs:   storage.dialogs,
        web_pages: storage.web_pages
      };

      $.when(contents.items.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.web_pages.fetch()).done(function()
      {
        var factory_editor = new FactoryEditorView({model: view.model, contents: contents});
        vent.trigger("application:popup:show", factory_editor, "Edit Factory", true);
      });

    }
  });
});
