/*
  Misc helper stuff to make dealing with html+css+javascript less horrible.
*/

define([
],
function(
)
{
  return new (function() //'new' means no need to reinstantiate every time (well, it auto-reinstantiates it on require...)
  {
    var self = this;
    self.el = function(type, options, style, children)
    {
      var self = this;
      var div = document.createElement(type);

      var defaultStyle = 
      {
        margin:"0px",
        padding:"0px",
        border:"0px",
      };

      var keys = Object.keys(options);
      for(var i = 0; i < keys.length; i++)
        div[keys[i]] = options[keys[i]];

      var keys = Object.keys(defaultStyle);
      for(var i = 0; i < keys.length; i++)
        div.style[keys[i]] = defaultStyle[keys[i]];

      var keys = Object.keys(style);
      for(var i = 0; i < keys.length; i++)
        div.style[keys[i]] = style[keys[i]];

      for(var i = 0; i < children.length; i++)
        div.appendChild(children[i]);

      return div;
    };

  });
});

