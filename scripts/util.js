/* util Singleton */
define([
],
function(
)
{
  var util = {};

  //Location wrangling
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(
      function(p)
      {
        util.user_location = { latitude:p.coords.latitude, longitude:p.coords.longitude };
      },
      function(error) { }
    );
  }

  util.madison_location = { latitude:43.073, longitude:-89.4012 };
  util.last_location = undefined;
  util.game_location = undefined;
  util.user_location = undefined;

  util.default_location = function()
  {
    if(util.game_location && util.game_location.latitude != "0") return util.game_location;
    if(util.user_location) return util.user_location;
    if(util.last_location) return util.last_location;
    if(util.madison_location) return util.madison_location;
    return { latitude:0, longitude:0 };
  };

  return util;
});

