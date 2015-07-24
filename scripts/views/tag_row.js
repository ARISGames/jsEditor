define(
function(require)
{
  var _             = require('underscore');
  var Backbone      = require('backbone');
  var Template      = require('text!templates/tag_row.tpl');
  var TagEditorView = require('views/tag_editor');
  var vent          = require('vent');

  return Backbone.Marionette.ItemView.extend({
    template: _.template(Template),

    // Bootstrap
    tagName: 'a',
    className: "list-group-item",

    templateHelpers: function() {
      return {
        media_thumb_url: this.model.media_thumbnail()
      }
    },

    events:
    {
      "click": "onClickEdit"
    },

    initialize: function()
    {
      // Model events
      this.listenTo(this.model, 'change', this.rebindEventsAndRender);
      this.rebindEventsAndRender();
    },

    rebindEventsAndRender: function(model)
    {
      // Thumbnail
      if(this.media)
      {
        this.stopListening(this.media);
      }

      this.media = this.model.media()
      this.listenTo(this.media, 'change', this.render);

      // Don't render while initializing
      if(model) { this.render(); }
    },

    onClickEdit: function() {
      var tag_editor = new TagEditorView({model: this.model});
      vent.trigger("application:popup:show", tag_editor, "Edit Tag");
    }

  });
});

