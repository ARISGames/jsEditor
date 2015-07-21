define(
function(require)
{
  var Backbone         = require('backbone');
  var Template         = require('text!templates/dialog_organizer_row.tpl');
  var DialogEditorView = require('views/dialog_editor');
  var vent             = require('vent');


  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    events: {
      "click .edit": "onClickEditDialog"
    },

    initialize: function() {
      this.listenTo(this.model, "update", this.render);
    },

    tagName: 'tr',

    onClickEditDialog: function() {
      var dialog_editor = new DialogEditorView({model: this.model});
      vent.trigger("application:popup:show", dialog_editor, "Edit Conversation");
    }
  });
});

