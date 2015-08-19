/* 
  ARIS App Model
  Doesn't conform to 'ARIS Model', as it really isn't an 'ARIS Model' in itself,
  it's more of a group of a bunch of 'ARIS Model's. 

  Used to easily load all the data for a game.
*/

define([
  'newfangled/aris_req',
  'newfangled/aris_session',
  'newfangled/users_model',
  'newfangled/games_model',
  'newfangled/user_games_model',
  'newfangled/groups_model',
  'newfangled/plaques_model',
  'newfangled/items_model',
  'newfangled/dialogs_model',
  'newfangled/dialog_characters_model',
  'newfangled/dialog_scripts_model',
  'newfangled/dialog_options_model',
  'newfangled/web_pages_model',
  'newfangled/event_packages_model',
  'newfangled/events_model',
  'newfangled/factories_model',
  'newfangled/scenes_model',
  'newfangled/instances_model',
  'newfangled/triggers_model',
  'newfangled/media_model',
  'newfangled/quests_model',
  'newfangled/requirement_root_packages_model',
  'newfangled/requirement_and_packages_model',
  'newfangled/requirement_atoms_model',
  'newfangled/tabs_model',
  'newfangled/tags_model',
],
function(
  aris_req,
  aris_session,
  users_model,
  games_model,
  user_games_model,
  groups_model,
  plaques_model,
  items_model,
  dialogs_model,
  dialog_characters_model,
  dialog_scripts_model,
  dialog_options_model,
  web_pages_model,
  event_packages_model,
  events_model,
  factories_model,
  scenes_model,
  instances_model,
  triggers_model,
  media_model,
  quests_model,
  requirement_root_packages_model,
  requirement_and_packages_model,
  requirement_atoms_model,
  tabs_model,
  tags_model
)
{
  return new (function()
  {
    var self = this;
    var numGameLoadModels = 22;

    self.users = users_model;
    self.games = games_model;
    self.user_games = user_games_model;
    self.groups = groups_model;
    self.plaques = plaques_model;
    self.items = items_model;
    self.dialogs = dialogs_model;
    self.dialog_characters = dialog_characters_model;
    self.dialog_scripts = dialog_scripts_model;
    self.dialog_options = dialog_options_model;
    self.web_pages = web_pages_model;
    self.event_packages = event_packages_model;
    self.events = events_model;
    self.factories = factories_model;
    self.scenes = scenes_model;
    self.instances = instances_model;
    self.triggers = triggers_model;
    self.media = media_model;
    self.quests = quests_model;
    self.requirement_root_packages = requirement_root_packages_model;
    self.requirement_and_packages = requirement_and_packages_model;
    self.requirement_atoms = requirement_atoms_model;
    self.tabs = tabs_model;
    self.tags = tags_model;

    self.loadDataForGameId = function(game_id,callbacks)
    {
      var n_success = 0;
      function success(){ n_success++; if(n_success >= numGameLoadModels && callbacks && callbacks.success) callbacks.success(); }
      function fail(){ if(callbacks && callbacks.fail) callbacks.fail(); }

      games_model.reqGetById(game_id,{success:success,fail:fail});
      groups_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      plaques_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      items_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      dialogs_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      dialog_characters_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      dialog_scripts_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      dialog_options_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      web_pages_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      event_packages_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      events_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      factories_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      scenes_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      instances_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      triggers_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      media_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      quests_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      requirement_root_packages_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      requirement_and_packages_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      requirement_atoms_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      tabs_model.reqGetAllForGame(game_id,{success:success,fail:fail});
      tags_model.reqGetAllForGame(game_id,{success:success,fail:fail});
    };

    self.logIn = function(name, pass,callbacks)
    {
      function fail()
      {
        if(callbacks && callbacks.fail) callbacks.fail();
      }

      aris_req.request('users.logIn',{user_name:name,password:pass,permission:"read_write"},{
        success:function(response)
        {
          self.users_model.reqGetById(response.data.user_id,{
            success:function()
            {
              aris_session.logIn(response.data.user_name, response.data.user_id, response.data.read_write_key);
              if(callbacks && callbacks.success) callbacks.success();
            },
            fail:fail
          });
        },
        fail:fail
      });
    };

  })();
});

