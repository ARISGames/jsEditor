/*
  ARIS Session

  Basic store of session info, keeps in sync with cookies if possible.
*/

define([
  'jquery',
],
function(
  $
)
{
  return new (function()
  {
    var self = this;

    self.user_name = undefined;
    self.user_id = undefined;
    self.auth_token = undefined;
    if($.cookie('user_name') && $.cookie('user_id') && $.cookie('auth_token'))
    {
      self.user_name = $.cookie('user_name');
      self.user_id = $.cookie('user_id');
      self.auth_token = $.cookie('auth_token');
    }

    self.logIn = function(user_name, user_id, auth_token)
    {
      self.user_name = user_name;
      self.user_id = user_id;
      self.auth_token = auth_token;

      $.cookie('user_name') = self.user_name;
      $.cookie('user_id') = self.user_id;
      $.cookie('auth_token') = self.auth_token;
    }
    self.logOut = function()
    {
      self.user_name = undefined;
      self.user_id = undefined;
      self.auth_token = undefined;

      $.removeCookie('user_name');
      $.removeCookie('user_id');
      $.removeCookie('auth_token');
    }

    self.loggedIn = function()
    {
      return (self.user_name && self.user_id && self.auth_token);
    }
    self.authPackage = function()
    {
      return {"key": self.auth_token, "user_id":self.user_id};
    }

  })();
});

