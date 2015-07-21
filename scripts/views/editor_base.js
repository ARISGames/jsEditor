define(
function(require)
{
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Marionette = Backbone.Marionette;

  return Backbone.Marionette.CompositeView.extend({

    templateBaseHelpers:  {
      // Field logic
      is_checked: function(value) {
        return value === "1" ? "checked" : "";
      },

      radio_selected: function(boolean_statement) {
        return boolean_statement ? "checked" : "";
      },

      tab_selected: function(boolean_statement) {
        return boolean_statement ? "active" : "";
      },

      tab_visible: function(boolean_statement) {
        return boolean_statement ? "" : "style='display: none;'";
      },
      option_selected: function(boolean_statement) {
        return boolean_statement ? "selected" : "";
      },
      sanitize_html: function(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        var scripts = div.getElementsByTagName('script');
        var i = scripts.length;
        while (i--) {
          scripts[i].parentNode.removeChild(scripts[i]);
        }

        var styles = div.getElementsByTagName('style');
        var i = styles.length;
        while (i--) {
          styles[i].parentNode.removeChild(styles[i]);
        }

        return div.textContent || div.innerText;
      }

    },

    mixinTemplateHelpers: function(target){
      target = target || {};

      // View helpers for bootstrap fields
      var templateBaseHelpers = Marionette.getOption(this, "templateBaseHelpers");
      if (_.isFunction(templateBaseHelpers)){
        templateBaseHelpers = templateBaseHelpers.call(this);
      }
      _.extend(target, templateBaseHelpers);

      // Sub class methods
      var templateHelpers = Marionette.getOption(this, "templateHelpers");
      if (_.isFunction(templateHelpers)){
        templateHelpers = templateHelpers.call(this);
      }
      return _.extend(target, templateHelpers);
    }
  });
});

