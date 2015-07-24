define([
  'backbone',
  'text!templates/event_package_organizer_row.tpl',
  'views/event_package_editor',
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
  EventPackageEditorView,
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
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    events:
    {
      "click .edit":"onClickEdit"
    },

    initialize: function()
    {
      this.listenTo(this.model, "update", this.render);
    },

    tagName:'tr',

    onClickEdit: function()
    {
      var event_package_editor = new EventPackageEditorView({model:this.model});
      vent.trigger("application:popup:show", event_package_editor, "Edit Event", true);
    }
  });
});

