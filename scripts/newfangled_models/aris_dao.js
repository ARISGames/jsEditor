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

