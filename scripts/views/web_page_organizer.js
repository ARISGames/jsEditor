define(
function(require)
{
  var Backbone                = require('backbone');
  var Template                = require('text!templates/web_page_organizer.tpl');
  var WebPageOrganizerRowView = require('views/web_page_organizer_row');
  var WebPageEditorView       = require('views/web_page_editor');
  var WebPage                 = require('models/web_page');
  var vent                    = require('vent');


  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: WebPageOrganizerRowView,
    itemViewContainer: ".web_pages",


    events: {
      "click .new": "onClickNew"
    },


    onClickNew: function() {
      var web_page  = new WebPage({game_id: this.model.get("game_id")});

      var web_page_editor = new WebPageEditorView({model: web_page});
      vent.trigger("application:popup:show", web_page_editor, "Create Web Page");
    }
   });
});

