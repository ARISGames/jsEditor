/*
  ARIS Session

  Basic store of session info, keeps in sync with cookies if possible.
*/

define([
  'jquery',
  'cookie',
],
function(
  $,
  Cookie
)
{
  return new (function()
  {
    var self = this;

    self.user_name = undefined;
    self.user_id = undefined;
    self.read_write_key = undefined;
    if($.cookie('user_name') && $.cookie('user_id') && $.cookie('read_write_key'))
    {
      self.user_name = $.cookie('user_name');
      self.user_id = $.cookie('user_id');
      self.read_write_key = $.cookie('read_write_key');
    }

    self.logIn = function(user_name, user_id, read_write_key)
    {
      self.user_name = user_name;
      self.user_id = user_id;
      self.read_write_key = read_write_key;

      $.cookie('user_name', self.user_name);
      $.cookie('user_id', self.user_id);
      $.cookie('read_write_key', self.read_write_key);
    }
    self.logOut = function()
    {
      self.user_name = undefined;
      self.user_id = undefined;
      self.read_write_key = undefined;

      $.removeCookie('user_name');
      $.removeCookie('user_id');
      $.removeCookie('read_write_key');
    }

    self.loggedIn = function()
    {
      return (self.user_name && self.user_id && self.read_write_key);
    }
    self.authPackage = function()
    {
      return {"key": self.read_write_key, "user_id":self.user_id};
    }

  })();
});

