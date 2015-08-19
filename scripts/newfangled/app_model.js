/* 
  ARIS App Model
  Doesn't conform to 'ARIS Model', as it really isn't an 'ARIS Model' in itself,
  it's more of a group of a bunch of 'ARIS Model's. 

  Used to easily load all the data for a game.
*/

define([
  'newfangled/users_model',
  'newfangled/games_model',
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
  users_model,
  games_model,
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
    var numModels = 22;

    self.loadDataForGameId = function(game_id,callbacks)
    {
      var n_success = 0;
      function success(){ n_success++; if(n_success >= numModels && callbacks && callbacks.success) callbacks.success(); }
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
    }
  })();
});

