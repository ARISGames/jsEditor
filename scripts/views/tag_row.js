define([
  'underscore',
  'backbone',
  'text!templates/tag_row.tpl',
  'views/tag_editor',
  'vent',
],
function(
  _,
  Backbone,
  Template,
  TagEditorView,
  vent
)
{
  return Backbone.Marionette.ItemView.extend(
  {
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

