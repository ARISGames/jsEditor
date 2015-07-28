define([
  'backbone',
  'text!templates/factory_organizer.tpl',
  'views/factory_organizer_row',
  'views/factory_editor',
  'models/factory',
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
  FactoryOrganizerRowView,
  FactoryEditorView,
  Factory,
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

    itemView: FactoryOrganizerRowView,
    itemViewContainer: ".factories",


    events:
    {
      "click .new": "onClickNew"
    },


    onClickNew: function()
    {
      var factory = new Factory({game_id: this.model.id});

      var contents = {
        items:     storage.items,
        plaques:   storage.plaques,
        dialogs:   storage.dialogs,
        web_pages: storage.web_pages
      };

      $.when(contents.items.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.web_pages.fetch()).done(function()
      {
        var factory_editor = new FactoryEditorView({model: factory, contents: contents});
        vent.trigger("application:popup:show", factory_editor, "Create Factory", true);
      });
    }
  });
});
