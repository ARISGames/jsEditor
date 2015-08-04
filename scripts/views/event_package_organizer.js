define([
  'backbone',
  'text!templates/event_package_organizer.tpl',
  'views/event_package_organizer_row',
  'views/event_package_editor',
  'models/event_package',
  'collections/events',
  'collections/items',
  'storage',
  'vent',
],
function(
  Backbone,
  Template,
  EventPackageOrganizerRowView,
  EventPackageEditorView,
  EventPackage,
  EventsCollection,
  ItemsCollection,
  storage,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),
    itemView: EventPackageOrganizerRowView,
    itemViewContainer: ".event_packages",

    initialize: function(options)
    {
      var self = this;
    },

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var self = this;
      var items  = storage.items;

      $.when(
        items.fetch()
      ).done(
        function()
        {
          var event_package = new EventPackage({game_id:storage.game.id});
          var events = new EventsCollection([], {parent:event_package});
          var event_package_editor = new EventPackageEditorView({model:event_package, collection:events});
          vent.trigger("application:popup:show", event_package_editor, "Create Event", true);
        }
      );
    },

  });
});

