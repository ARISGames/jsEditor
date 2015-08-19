/*
  ARIS Data Object
  Really, just has a generalized-ish "mergeIn" function that assumes a flat object,
  which fulfills two of the requirements for being a member of a model.

  Include/Require DOES NOT return an instantiated object!
*/

define([
],
function(
)
{
  return function()
  {
    var self = this;

    self.mergeIn = function(obj,attribs)
    {
      var diff = false;
      for(var i = 0; i < attribs.length; i++)
      {
        if(self[attribs[i]] != obj[attribs[i]])
        {
          diff = true;
          self[attribs[i]] = obj[attribs[i]];
        }
      }
      return diff;
    }
  };
});

