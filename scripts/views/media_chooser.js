define([
  'underscore',
  'backbone',
  'text!templates/media_chooser.tpl',
  'collections/media',
  'models/media',
  'views/media_chooser_thumbnail',
  'vent'
],
function(
  _,
  Backbone,
  Template,
  MediaCollection,
  Media,
  MediaChooserThumbnailView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: MediaChooserThumbnailView,
    itemViewContainer: '.itemViewContainer',

    itemViewOptions: function(model, index)
    {
      return {
        is_selected: this.options.selected ? this.options.selected.is(model) : false,
        context:  this.options.context
      }
    },

    triggers: {
      "click .cancel-chooser": "cancel"
    },

    onItemviewMediaChoose: function(item_view, media)
    {
      this.trigger("media:choose", media);
    }
  });
});
