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
  var aris_do = function() { };
  aris_do.prototype.mergeIn = function(obj,attribs)
  {
    var self = this;

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

  return aris_do;
});

