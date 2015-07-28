define([
  'underscore',
  'backbone',
  'text!templates/locations_organizer.tpl',
  'views/locations_group_organizer',
  'collections/triggers',
  'vent'
],
function(
  _,
  Backbone,
  Template,
  LocationsGroupOrganizerView,
  TriggersCollection,
  vent
)
{
  return Backbone.Marionette.Layout.extend({
    template: _.template(Template),

    regions: {
      dialogs_region: "#dialog-region",
      plaques_region: "#plaque-region",
      items_region:   "#item-region",
      pages_region:   "#page-region",
      scenes_region:  "#scene-region"
    },

    initialize: function(options)
    {
      var instances = options.instances;
      var locations = options.locations;

      // TODO load game objects to have the name of object being referenced
      //
      _.each(locations.models, function(location)
      {
        location.set("instance", instances.findWhere({"instance_id": location.get("instance_id")}));
      });

      var dialog_selection = locations.filter(function(location) { return location.get("instance").get("object_type") === "DIALOG"; });
      this.dialog_locations = new TriggersCollection(dialog_selection);

      var plaque_selection = locations.filter(function(location) { return location.get("instance").get("object_type") === "PLAQUE"; });
      this.plaque_locations = new TriggersCollection(plaque_selection);

      var item_selection = locations.filter(function(location) { return location.get("instance").get("object_type") === "ITEM"; });
      this.item_locations = new TriggersCollection(item_selection);

      var page_selection  = locations.filter(function(location) { return location.get("instance").get("object_type") === "WEB_PAGE"; });
      this.page_locations = new TriggersCollection(page_selection);

      var scene_selection = locations.filter(function(location) { return location.get("instance").get("object_type") === "SCENE"; });
      this.scene_locations = new TriggersCollection(scene_selection);
    },

    onShow: function()
    {
      this.dialogs_region.show(new LocationsGroupOrganizerView({title: "Conversations",   object_icon: "comment",  collection: this.dialog_locations}));
      this.plaques_region.show(new LocationsGroupOrganizerView({title: "Plaques",   object_icon: "align-justify", collection: this.plaque_locations}));
      this.items_region.show  (new LocationsGroupOrganizerView({title: "Items & Player Attributes",     object_icon: "stop",    collection: this.item_locations  }));
      this.pages_region.show  (new LocationsGroupOrganizerView({title: "Web Pages", object_icon: "globe",    collection: this.page_locations  }));
      this.scenes_region.show (new LocationsGroupOrganizerView({title: "Scenes",    object_icon: "film",     collection: this.scene_locations }));
    },

  });
});

