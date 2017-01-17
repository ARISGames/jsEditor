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
    },

    initialize: function()
    {
      vent.on("ar_target:upload", function(ar_target)
      {
        this.render();
        //window.location.reload();
      });
    },

    onRender: function()
    {
    },

    onClickUpload: function()
    {
      var ar_target_db = new ARTargetDB({game_id: this.model.get("game_id")});
      vent.trigger("application:popup:show", new ARTargetUploadView({model: ar_target_db}), "Upload ARTarget");
    },

  });
});

