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
      if(window.running_migrations && Object.keys(window.running_migrations).length > 0) {
        alert(window.onbeforeunload.call());
        return;
      }

      var game = new Game();
      vent.trigger("application.show", new GameCreateView({model: game}));
    },

    onClickImportZip: function()
    {
      var fileInput = $('<input type="file" />');
      fileInput.on('change', function(){
        var file = fileInput[0].files[0];
        if (file == null) return;
        var reader = new FileReader();
        reader.onload = function(evt)
        {
          var zip_data = evt.target.result;
          zip_data = zip_data.substr(zip_data.indexOf(",")+1);

          var import_data = {
            auth: session.auth_json(),
            zip_data: zip_data,
            zip_name: file.name,
          };

          $('.import-zip').text('Importing, please wait...');
          $.ajax({
            url: config.aris_api_url + "duplicate.importGame",
            type: 'POST',
            data: JSON.stringify(import_data),
            processData: false,
            success: function(result) {
              var json = JSON.parse(result);
              if (json.returnCode === 0) {
                //var game = new Game();
                //game.attributes = json.data;
                window.location.reload();
              }
            }
          });
        }
        reader.readAsDataURL(file);
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
