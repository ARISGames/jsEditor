define([
  'underscore',
  'backbone',
  'text!templates/media_editor.tpl',
  'collections/media',
  'models/media',
  'views/media_editor_thumbnail',
  'views/media_upload',
  'vent',
  'config'
],
function(
  _,
  Backbone,
  Template,
  MediaCollection,
  Media,
  MediaThumbnailView,
  MediaUploadView,
  vent,
  config
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: MediaThumbnailView,
    itemViewContainer: '.itemViewContainer',

    className: 'media-editor',

    events:
    {
      "click .upload": "onClickUpload",
      "dragenter .media-drop-target": "onDragEnter",
      "dragleave .media-drop-target": "onDragLeave",
      "dragend .media-drop-target": "onDragEnd",
      "dragover .media-drop-target": "onDragOver",
      "drop .media-drop-target": "onDrop",
    },

    initialize: function()
    {
      var view = this;
      vent.on("media:upload", function(media)
      {
        view.collection.add(media);
      });
    },

    onRender: function()
    {
      //this.$el.find(".media-drop-target").on("drop", this.onDrop.bind(this));
    },


    onClickUpload: function()
    {
      var media = new Media({game_id: this.model.get("game_id"), name: ""});
      vent.trigger("application:popup:show", new MediaUploadView({model: media}), "Upload Media");
    },


    onDragEnter: function(event)
    {
      this.$el.find(".media-drop-target").addClass("media-hover");
      event.preventDefault();
      return false;
    },

    onDragOver: function(event)
    {
      this.$el.find(".media-drop-target").addClass("media-hover");
      event.preventDefault();
      return false;
    },

    onDragEnd: function(event)
    {
      this.$el.find(".media-drop-target").addClass("media-hover");
      event.preventDefault();
      return false;
    },

    onDragLeave: function(event)
    {
      this.$el.find(".media-drop-target").removeClass("media-hover");
      event.preventDefault();
      return false;
    },

    onDrop: function(event)
    {
      this.$el.find(".media-drop-target").removeClass("media-hover");
      event.preventDefault();

      var file = event.originalEvent.dataTransfer.files[0];

      this.model = new Media({game_id: this.model.get("game_id")});
      this.model.set("file_name",    file.name.toLowerCase());
      this.model.set("display_name", file.name.toLowerCase());

      var view = this;
      var formData = new FormData;
      formData.append('raw_upload', file);
      $.ajax({
        url: config.base_url + 'rawupload.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        error: function() {
          // TODO: error message
          vent.trigger("application:alert", {text: "Error when uploading media."});
          view.resetProgressBar();
        },
        success: function(e) {
          view.model.set('raw_upload_id', e);
          view.model.save({}, {
            success: function()
            {
              vent.trigger("media:upload", view.model);
            },
          });
        },
      });

      return false;
    }
  });
});
