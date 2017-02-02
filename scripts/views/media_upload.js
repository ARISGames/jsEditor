define([
  'underscore',
  'backbone',
  'text!templates/media_upload.tpl',
  'vent',
  'config'
],
function(
  _,
  Backbone,
  Template,
  vent,
  config
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    initialize: function()
    {
      this.reader = new FileReader();
      this.reader.onload = this.onReadFile.bind(this);
    },


    ui: {
      name: "#media-name",
      preview: ".upload-preview",
      autoplay: "#media-autoplay",
    },


    events: {
      "click .save": "onClickSave",
      "change #uploader": "onChangeFile"
    },


    /* File selected from browser file picker */
    onChangeFile: function(event)
    {
      var input_file = event.target.files[0];

      this.model.set("file_name", input_file.name.toLowerCase());
      this.reader.readAsDataURL(input_file);
      this.input_file = input_file;

      vent.trigger("application:alert:hide");
    },


    /* FileReader onload callback */
    onReadFile: function(event)
    {
      var data = event.target.result;

      // Preview
      this.ui.preview.attr("src", data);
      this.switchMediaPreviewer();
    },


    onClickSave: function(event)
    {
      var view = this;

      view.model.set("name", view.ui.name.val());
      view.model.set("autoplay", view.ui.autoplay.is(":checked"));

      view.showProgressBar();

      var formData = new FormData;
      formData.append('raw_upload', view.input_file);
      $.ajax({
        url: config.base_url + 'rawupload.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        xhr: function() {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
              view.showProgressPercent(evt.loaded / evt.total);
            }
          }, false);
          return xhr;
        },
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
              vent.trigger("application:popup:hide");
            },

            amf_error: function(code, message)
            {
              vent.trigger("application:alert", {text: "Cannot save media: " + message});
              view.resetProgressBar();
            }
          });
        },
      });

      event.preventDefault();
    },


    /* Media Previews by Type */

    switchMediaPreviewer: function()
    {
      this.$el.find('.media-previewer').hide();

      if     (this.model.is_video()) { this.$el.find('.video-preview').show(); }
      else if(this.model.is_audio()) { this.$el.find('.audio-preview').show(); }
      else                           { this.$el.find('.image-preview').show(); }
    },


    /* Progress Bar Section */

    showProgressBar: function()
    {
      // fadeTo instead of fadeOut to prevent display: none;
      this.$el.find(".progress").fadeTo(0, 0.0);
      this.$el.find(".progress").removeClass("invisible");
      this.$el.find(".progress").fadeTo(1000, 1.0);
    },

    resetProgressBar: function()
    {
      this.$el.find(".bar").width("0%");
      this.$el.find(".bar-text").text("");
      this.$el.find(".progress").fadeTo(1000, 0.0);
    },

    /* Progress from 0 to 1 */
    showProgressPercent: function(percentage)
    {
      this.$el.find(".bar").width(percentage * 100 + "%");
      this.$el.find(".bar-text").text("Uploading " + Math.ceil(percentage * 100) + "%");
    }
  });
});

