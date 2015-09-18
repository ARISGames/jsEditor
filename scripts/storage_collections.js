define([
  "backbone",
  "marionette",
  "collections/users",
  "collections/editors",
  "collections/tags",
  "collections/tabs",
  "collections/groups",
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
  "collections/game_dialog_options",
  "collections/game_dialog_characters",
  "collections/event_packages",
],
function(
  Backbone,
  Marionette,
  UsersCollection,
  EditorsCollection,
  TagsCollection,
  TabsCollection,
  GroupsCollection,
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
  DialogOptionsCollection,
  DialogCharactersCollection,
  EventPackagesCollection
)
{
  return Marionette.Controller.extend(
  {},
  /* Static methods */
  {
    inject: function(storage)
    {
      storage.users             = new UsersCollection();
      storage.editors           = new EditorsCollection();
      storage.groups            = new GroupsCollection();
      storage.tags              = new TagsCollection();
      storage.tabs              = new TabsCollection();
      storage.quests            = new QuestsCollection();
      storage.media             = new MediaCollection();
      storage.web_hooks         = new WebhooksCollection();
      storage.games             = new GamesCollection();
      storage.triggers          = new TriggersCollection();
      storage.instances         = new InstancesCollection();
      storage.scenes            = new ScenesCollection();
      storage.plaques           = new PlaquesCollection();
      storage.items             = new ItemsCollection();
      storage.dialogs           = new DialogsCollection();
      storage.dialog_scripts    = new DialogScriptsCollection();
      storage.dialog_options    = new DialogOptionsCollection();
      storage.dialog_characters = new DialogCharactersCollection();
      storage.web_pages         = new WebPagesCollection();
      storage.event_packages    = new EventPackagesCollection();
      storage.factories         = new FactoriesCollection();
    }
  });
});

