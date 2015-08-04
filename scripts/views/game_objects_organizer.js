define([
  'backbone',
  'text!templates/game_objects_organizer.tpl',
  'views/dialog_organizer',
  'views/plaque_organizer',
  'views/item_organizer',
  'views/web_page_organizer',
  'views/factory_organizer',
  'views/event_package_organizer',
  'vent'
],
function(
  Backbone,
  Template,
  DialogOrganizerView,
  PlaqueOrganizerView,
  ItemOrganizerView,
  WebPageOrganizerView,
  FactoryOrganizerView,
  EventPackageOrganizerView,
  vent
)
{
  return Backbone.Marionette.Layout.extend(
  {
    template: _.template(Template),

    regions:
    {
      dialogs_region:        "#dialog-region",
      plaques_region:        "#plaque-region",
      items_region:          "#item-region",
      web_pages_region:      "#web-page-region",
      factories_region:      "#factory-region",
      event_packages_region: "#event-package-region",
    },

    initialize: function(options)
    {
      var self = this;
      self.storage = options.storage;
    },

    onShow: function()
    {
      var self = this;
      self.dialogs_region.show       (new DialogOrganizerView      ({collection:self.storage.dialogs,             storage:self.storage}));
      self.plaques_region.show       (new PlaqueOrganizerView      ({collection:self.storage.plaques,             storage:self.storage}));
      self.items_region.show         (new ItemOrganizerView        ({collection:self.storage.items,               storage:self.storage}));
      self.web_pages_region.show     (new WebPageOrganizerView     ({collection:self.storage.web_page_collection, storage:self.storage}));
      self.factories_region.show     (new FactoryOrganizerView     ({collection:self.storage.factorys,            storage:self.storage}));
      self.event_packages_region.show(new EventPackageOrganizerView({collection:self.storage.event_packages,      storage:self.storage}));
    },

  });
});
 
