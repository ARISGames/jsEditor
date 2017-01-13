define([
  'underscore',
  'backbone',
  'text!templates/ar_target_editor.tpl',
  'collections/ar_targets',
  'models/ar_target',
  'models/ar_target_db',
  'views/ar_target_editor_thumbnail',
  'views/ar_target_upload',
  'vent'
],
function(
  _,
  Backbone,
  Template,
  ARTargetCollection,
  ARTarget,
  ARTargetDB,
  ARTargetThumbnailView,
  ARTargetUploadView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: ARTargetThumbnailView,
    itemViewContainer: '.itemViewContainer',

    className: 'ar_target-editor',

    events:
    {
      "click .upload": "onClickUpload",
      "dragenter .ar_target-drop-target": "onDragEnter",
      "dragleave .ar_target-drop-target": "onDragLeave",
      "dragend .ar_target-drop-target": "onDragEnd",
      "dragover .ar_target-drop-target": "onDragOver",
      "drop .ar_target-drop-target": "onDrop",
    },

    initialize: function()
    {
      var view = this;

      this.reader = new FileReader();
      this.reader.onload = this.onReadFile.bind(this);
    },

    onRender: function()
    {
    },

    onClickUpload: function()
    {
      var ar_target_db = new ARTargetDB({game_id: this.model.get("game_id")});
      vent.trigger("application:popup:show", new ARTargetUploadView({model: ar_target_db}), "Upload ARTarget");
    },


    onDragEnter: function(event)
    {
      this.$el.find(".ar_target-drop-target").addClass("ar_target-hover");
      event.preventDefault();
      return false;
    },

    onDragOver: function(event)
    {
      this.$el.find(".ar_target-drop-target").addClass("ar_target-hover");
      event.preventDefault();
      return false;
    },

    onDragEnd: function(event)
    {
      this.$el.find(".ar_target-drop-target").addClass("ar_target-hover");
      event.preventDefault();
      return false;
    },

    onDragLeave: function(event)
    {
      this.$el.find(".ar_target-drop-target").removeClass("ar_target-hover");
      event.preventDefault();
      return false;
    },

    onDrop: function(event)
    {
      this.$el.find(".ar_target-drop-target").removeClass("ar_target-hover");
      event.preventDefault();

      var file = event.originalEvent.dataTransfer.files[0];

      this.reader.readAsDataURL(file);

      return false;
    },

    // TODO or pop up editor? single vs multiple file workflow.
    onReadFile: function(event)
    {
      var view = this;

      var data = event.target.result;

      // strip base64 header
      var start = data.indexOf(",") + 1;
      var data  = data.substr(start);

      vent.trigger("ar_target:upload", view.model);
    }
  });
});

