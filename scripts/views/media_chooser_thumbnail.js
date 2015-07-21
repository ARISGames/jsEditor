define([
  'underscore',
  'backbone',
  'text!templates/media_chooser_thumbnail.tpl',
  'vent'
],
function(
  _,
  Backbone,
  Template,
  vent
)
{
  return Backbone.Marionette.ItemView.extend({
    template: _.template(Template),

    templateHelpers: function() {
      return {
        is_selected: this.options.is_selected,
        thumb_url:   this.thumbnail_url(),
        thumb_name:  this.thumbnail_name(),
      }
    },

    /* Helpers for default media name and icon */
    thumbnail_url: function()
    {
      return this.model.thumbnail_for(this.options.context)
    },

    thumbnail_name: function()
    {
      // Return the models name unless its the default for non icons.
      if(this.model.id === "0" && !this.options.context)
      {
        return "No Media";
      }
      else
      {
        return this.model.name_for(this.options.context);
      }

    },


    className: "col-md-3 col-sm-4 col-xs-6 padded-small",

    events: {
      "click .choose": "onClickChoose",
    },

    onClickChoose: function() {
      this.trigger("media:choose", this.model);
    },
  });
});
