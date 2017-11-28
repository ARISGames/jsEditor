define([
  'underscore',
  'backbone',
  'text!templates/games.tpl',
  'views/game_row',
  'views/game_create',
  'models/game',
  'vent',
  'config',
  'models/session',
],
function(
  _,
  Backbone,
  Template,
  GameRowView,
  GameCreateView,
  Game,
  vent,
  config,
  session
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: GameRowView,
    itemViewContainer: '.games',

    events: {
      "click .new": "onClickNew",
      "click .import-zip": "onClickImportZip"
    },

    onClickNew: function()
    {
      var game = new Game();
      vent.trigger("application.show", new GameCreateView({model: game}));
    },

    onClickImportZip: function()
    {
      var form = $('<form enctype="multipart/form-data" />');
      var fileInput = $('<input type="file" name="raw_upload" />');
      form.append(fileInput);
      fileInput.on('change', function(){
        var formData = new FormData(form[0]);
        $('.import-zip').text('Uploading...');
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
                var percentComplete = Math.floor((evt.loaded / evt.total) * 100);
                $('.import-zip').text('Uploading... (' + percentComplete + '%)');
              }
            }, false);
            return xhr;
          },
          error: function() {
            $('.import-zip').text('Upload failed. Click to try again.');
          },
          success: function(e) {
            var import_data = {
              auth: session.auth_json(),
              raw_upload_id: e,
              zip_name: 'game_to_import.zip',
            };
            $('.import-zip').text('Upload complete. Importing...');
            $.ajax({
              url: config.aris_api_url + 'duplicate.importGame',
              type: 'POST',
              data: JSON.stringify(import_data),
              processData: false,
              error: function() {
                $('.import-zip').text('Import is in progress. Please wait a few minutes, then refresh the page.');
              },
              success: function(result) {
                var json = JSON.parse(result);
                if (json.returnCode === 0) {
                  window.location.reload();
                }
              },
            });
          },
        });
      });
      fileInput.click();
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer)
    {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, itemView, index)
    {
      if (compositeView.isBuffering) {
        compositeView.elBuffer.appendChild(itemView.el);
      }
      else {
        // If we've already rendered the main collection, just
        // append the new items directly into the element.
        var $container = this.getItemViewContainer(compositeView);
        $container.find(".foot").before(itemView.el);
      }
    }
  });
});
