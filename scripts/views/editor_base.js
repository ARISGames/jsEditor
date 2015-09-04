define([
  'underscore',
  'backbone',
],
function(
  _,
  Backbone
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    templateBaseHelpers:
    {
      is_checked:      function(value) { return value === "1" ? "checked" : ""; }, 
      radio_selected:  function(boolean_statement) { return boolean_statement ? "checked" : ""; }, 
      tab_selected:    function(boolean_statement) { return boolean_statement ? "active" : ""; }, 
      tab_visible:     function(boolean_statement) { return boolean_statement ? "" : "style='display: none;'"; },
      option_selected: function(boolean_statement) { return boolean_statement ? "selected" : ""; },

      sanitize_html: function(html)
      {
        var div = document.createElement('div');
        div.innerHTML = html;

        var scripts = div.getElementsByTagName('script');
        for(var i = scripts.length-1; i > 0; i--)
          scripts[i].parentNode.removeChild(scripts[i]);

        var styles = div.getElementsByTagName('style');
        for(var i = styles.length-1; i > 0; i--)
          styles[i].parentNode.removeChild(styles[i]);

        return div.textContent || div.innerText;
      }
    },

    mixinTemplateHelpers: function(target)
    {
      target = target || {};

      // View helpers for bootstrap fields
      var templateBaseHelpers = Backbone.Marionette.getOption(this, "templateBaseHelpers");
      if(_.isFunction(templateBaseHelpers))
        templateBaseHelpers = templateBaseHelpers.call(this);

      _.extend(target, templateBaseHelpers);

      // Sub class methods
      var templateHelpers = Backbone.Marionette.getOption(this, "templateHelpers");
      if(_.isFunction(templateHelpers))
        templateHelpers = templateHelpers.call(this);

      return _.extend(target, templateHelpers);
    }

  });
});

