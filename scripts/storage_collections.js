define([
  "backbone",
  "marionette",
  "collections/users",
  "collections/tags",
  "collections/tabs",
  "collections/quests",
  "collections/media",
  "collections/web_hooks",
  "collections/games",
  "collections/game_triggers",
  "collections/instances",
  "collections/scenes",
  "collections/plaques",
  "collections/items",
  "collections/dialogs",
  "collections/web_pages",
  "collections/factories",
  "collections/game_dialog_scripts",
  "collections/event_packages",
],
function(
  Backbone,
  Marionette,
  UsersCollection,
  TagsCollection,
  TabsCollection,
  QuestsCollection,
  MediaCollection,
  WebhooksCollection,
  GamesCollection,
  TriggersCollection,
  InstancesCollection,
  ScenesCollection,
  PlaquesCollection,
  ItemsCollection,
  DialogsCollection,
  WebPagesCollection,
  FactoriesCollection,
  DialogScriptsCollection,
  EventPackagesCollection
)
{
  return Marionette.Controller.extend(
  {},
  /* Static methods */
  {
    inject: function(storage)
    {
      storage.users          = new UsersCollection();
      storage.tags           = new TagsCollection();
      storage.tabs           = new TabsCollection();
      storage.quests         = new QuestsCollection();
      storage.media          = new MediaCollection();
      storage.web_hooks      = new WebhooksCollection();
      storage.games          = new GamesCollection();

      storage.triggers       = new TriggersCollection();
      storage.instances      = new InstancesCollection();
      storage.scenes         = new ScenesCollection();

      storage.plaques        = new PlaquesCollection();
      storage.items          = new ItemsCollection();
      storage.dialogs        = new DialogsCollection();
      storage.web_pages      = new WebPagesCollection();
      storage.factories      = new FactoriesCollection();

      storage.dialog_scripts = new DialogScriptsCollection();
      storage.event_packages = new EventPackagesCollection();
    }
  });
});

