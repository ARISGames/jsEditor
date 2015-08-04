define([
  'backbone',
  'text!templates/event_package_organizer_row.tpl',
  'views/event_package_editor',
  'models/media',
  'models/game',
  'collections/items',
  'collections/events',
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
  EventsCollection,
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
      var self = this;
      self.listenTo(self.model, "update", self.render);
    },

    tagName:'tr',

    onClickEdit: function()
    {
      var self = this;
      var event_package = self.model;
      var events = new EventsCollection([], {parent:event_package});
      var items  = new ItemsCollection([], {parent:event_package.parent});

      $.when(
        items.fetch(),
        events.fetch()
      ).done(
        function()
        {
          var event_package_editor = new EventPackageEditorView({model:event_package, collection:events, items:items});
          vent.trigger("application:popup:show", event_package_editor, "Edit Event");
        }
      );

    }
  });
});

