/*
  User Games Model (just a list of user->game associations- a bit of a weird model)
  Takes instantiated aris_model object, and hijacks config attributes.
  Include/Require returns an instantiated object.
*/

define([
  'underscore',
  'newfangled/aris_model',
],
function(
  _,
  aris_model
)
{
  var self = _.clone(aris_model);

  self.getMethod        = "";
  self.createMethod     = "";
  self.updateMethod     = "";
  self.deleteMethod     = "";
  self.getForGameMethod = "";
  self.getForUserMethod = "games.getGamesForUser";

  self.defaultObject =
  {
    "game_id":0,
    "user_id":0,
  };

  self.idAttribute = ""; //!!

  self.reqGetAllForUser = function(id, callbacks)
  {
    var self = this;
    var reqData = {};
    reqData.user_id = id;
    
    req.request(self.getForUserMethod,reqData,
      {
        success:function(response)
        {
          var newMembers = [];
          for(var i = 0; i < response.data.length; i++)
          {
            newMembers[i] = self.genMember();
            //manually merge, because response is actually game objects
            newMembers[i].user_id = id;
            newMembers[i].game_id = response.data[i].game_id;
          }
          self.mergeIntoMembers(newMembers);
          if(callbacks && callbacks.success) callbacks.success(self.getAllForGame(id));
        },
        fail:function() { if(callbacks && callbacks.fail) callbacks.fail(); }
      }
    );
  }

  return self;
});

