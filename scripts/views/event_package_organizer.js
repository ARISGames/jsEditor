define([
  'backbone',
  'text!templates/event_package_organizer.tpl',
  'views/event_package_organizer_row',
  'views/event_package_editor',
  'models/event_package',
  'collections/events',
  'collections/items',
  'vent',
  'storage'
],
function(
  Backbone,
  Template,
  EventPackageOrganizerRowView,
  EventPackageEditorView,
  EventPackage,
  EventsCollection,
  ItemsCollection,
  vent,
  storage
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
      self.storage = options.storage;
    },

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var self = this;
      var items  = new ItemsCollection([], {parent:self.storage.game});

      $.when(items.fetch()).done(
        function()
        {
          var eventPackage = new EventPackage({game_id:self.storage.game.id});
          var events = new EventsCollection([], {parent:eventPackage});
          var event_package_editor = new EventPackageEditorView({model:eventPackage, collection:events, items:items});
          vent.trigger("application:popup:show", event_package_editor, "Create Event", true);
        }
      );
    },

  });
});

