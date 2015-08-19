/*
  ARIS Model
  The "base class" of any ARIS model.
  An ARIS model is simply a canonical array of known objects of a certain type*.
  It has the ability to CRUD these objects, which will result in their merging into this array.

  It's goal is to be INCREDIBLY simple. An array of objects with some simple helpful accessors.
  It is NOT smart. It's just an array with some functionality to sync explicit parts of it with a server. 

  Include/Requre returns an instantiated object.

  * These objects must conform to a few simple rules:
    - they must be flat. there is NO management of any web of references, and will not maintain itself according to anything external
    - they will be assumed to have attributes conforming to that of this model's "self.defaultObject"
    - they will be assumed to have an identifying attribute conforming to this model's "self.idAttribute"
    - they need a function "mergeIn" that must:
    - - take in another object and a list of attributes as arguments: mergeIn(obj,attribs)
    - - maps all of that object's attributes onto itself
    - - returns true if any changes were made, false otherwise

    (^ wouldn't it be great if there were some kind of system that could manage and enforce these kind of reqs statically,
    rather than in a really long comment at the top of a file that will likely rarely get opened????? javascript tho... so good... amirite?)
*/

define([
  'newfangled/aris_req',
  'newfangled/aris_do',
],
function(
  req,
  aris_do
)
{
  return new (function()
  {
    // NOTE-
    // use 'this' rather than 'self' (via 'var self = this;') at object level,
    // as this object will get hijacked, and functions need to refer to the hijacker, not... er... this.
    // 'self' is safe to use if self is grabbed from within a function.

    this.getMethod    = "model.getModel";
    this.createMethod = "model.createModel";
    this.updateMethod = "model.updateModel";
    this.deleteMethod = "model.deleteModel";
    this.getForGameMethod = "model.getModelsForGame";

    this.defaultObject =
    {
      "attributeName":"attributeDefaultVal",
    };

    this.idAttribute = "model_id";

    this.members = [];
    this.mergeIntoMembers = function(new_members)
    {
      var self = this;
      var found;
      for(var i = 0; i < new_members.length; i++)
      {
        found = false;
        for(var j = 0; j < self.members.length; j++)
        {
          if(new_members[i][self.idAttribute] == self.members[j][self.idAttribute])
          {
            found = true;
            if(self.members[j].mergeIn(new_members[i],Object.keys(self.defaultObject)))
            {
              //notify of delta
            }
          }
        }
        if(!found)
        {
          self.members.push(new_members[i]);
          //notify of addition
        }
      }
    }

    // Generates member. Don't know how to express via function name that:
    // "this is a free-floating object- it's not part of this model or anything",
    // which is valuable info!
    this.genMember = function()
    {
      var self = this;
      var m = new aris_do();
      aris_do.merge_in(self.defaultObject,Object.keys(self.defaultObject));
      return m;
    }

    this.getById = function(id)
    {
      var self = this;
      for(var i = 0; i < self.members.length; i++)
      {
        if(self.members[i][self.idAttribute] == id)
          return self.members[i];
      }
      return 0;
    }

    this.getAllMatching = function(attributeName,attribute)
    {
      var self = this;
      var matching_members = [];
      for(var i = 0; i < self.members.length; i++)
      {
        if(self.members[i][attributeName] == attribute)
          matching_members.push(self.members[i]);
      }
      return matching_members;
    }

    this.getAllForGame = function(id)
    {
      var self = this;
      return self.getAllMatching("game_id",id);
    }

    this.reqGetById = function(id, callbacks)
    {
      var self = this;
      var reqData = {};
      reqData[self.idAttribute] = id;

      req.request(self.getMethod,reqData,
        {
          success:function(response)
          {
            self.mergeIntoMembers([response.data]);
            if(callbacks && callbacks.success) callbacks.success(self.getById(id));
          },
          fail:function() { if(callbacks && callbacks.fail) callbacks.fail(); }
        }
      );
    }

    this.reqCreate = function(member, callbacks)
    {
      var self = this;
      var reqData = {};
      var keys = Object.keys(self.defaultObject);
      for(var i= 0; i < keys.length; i++)
        reqData[keys[i]] = member[keys[i]];

      req.request(self.createMethod,reqData,
        {
          success:function(response)
          {
            self.mergeIntoMembers([response.data]);
            if(callbacks && callbacks.success) callbacks.success(self.getById(response.data[self.idAttribute]));
          },
          fail:function() { if(callbacks && callbacks.fail) callbacks.fail(); }
        }
      );
    }

    this.reqUpdate = function(member, callbacks)
    {
      var self = this;
      var reqData = {};
      var keys = Object.keys(self.defaultObject);
      for(var i= 0; i < keys.length; i++)
        reqData[keys[i]] = member[keys[i]];

      req.request(self.updateMethod,reqData,
        {
          success:function(response)
          {
            self.mergeIntoMembers([response.data]);
            if(callbacks && callbacks.success) callbacks.success(self.getById(member[self.idAttribute]));
          },
          fail:function() { if(callbacks && callbacks.fail) callbacks.fail(); }
        }
      );
    }

    this.reqDelete = function(member, callbacks)
    {
      var self = this;
      var reqData = {};
      reqData[self.idAttribute] = member[self.idAttribute];

      req.request(self.updateMethod,reqData,callbacks); //can pass callbacks directly
    }

    this.reqGetAllForGame = function(id, callbacks)
    {
      var self = this;
      var reqData = {};
      reqData.game_id = id;
      
      req.request(self.getForGameMethod,reqData,
        {
          success:function(response)
          {
            self.mergeIntoMembers(response.data);
            if(callbacks && callbacks.success) callbacks.success(self.getAllForGame(id));
          },
          fail:function() { if(callbacks && callbacks.fail) callbacks.fail(); }
        }
      );
    }

  })();
});

