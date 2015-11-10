define([
  'backbone',
  'text!templates/game_objects_organizer.tpl',
  'views/dialog_organizer',
  'views/plaque_organizer',
  'views/item_organizer',
  'views/web_page_organizer',
  'views/factory_organizer',
  'views/event_package_organizer',
  'storage',
  'vent',
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
  storage,
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
      event_packages_region: "#event-package-region",
      factories_region:      "#factory-region",
    },

    initialize: function(options)
    {
      var self = this;
    },

    onShow: function()
    {
      var self = this;

      var unused_event_packages_collection = new Backbone.Collection([]);
      storage.event_packages.each(function(ep)
      {
        var found = false;
        storage.plaques.each(function(p)
        {
          if(p.get("event_package_id") == ep.id) found = true;
        });
        storage.dialog_scripts.each(function(d)
        {
          if(d.get("event_package_id") == ep.id) found = true;
        });
        if(!found) unused_event_packages_collection.add(ep);
      });

      self.dialogs_region.show       (new DialogOrganizerView      ({collection:storage.dialogs}));
      self.plaques_region.show       (new PlaqueOrganizerView      ({collection:storage.plaques}));
      self.items_region.show         (new ItemOrganizerView        ({collection:storage.items}));
      self.web_pages_region.show     (new WebPageOrganizerView     ({collection:storage.web_pages}));
      self.event_packages_region.show(new EventPackageOrganizerView({collection:unused_event_packages_collection/*storage.event_packages*/}));
      self.factories_region.show     (new FactoryOrganizerView     ({collection:storage.factories}));
    },

  });
});
 
