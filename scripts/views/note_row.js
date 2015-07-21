define(
function(require)
{
  var _              = require('underscore');
  var _S             = require('underscore.string');
  var Backbone       = require('backbone');
  var Template       = require('text!templates/note_row.tpl');
  var NoteEditorView = require('views/note_editor');
  var Media          = require('models/media');
  var vent           = require('vent');

  return Backbone.Marionette.ItemView.extend({
    template: _.template(Template),

    // Bootstrap
    tagName: 'a',
    className: "list-group-item clearfix",

    initialize: function(options)
    {
      // FIXME my having sub views this can be removed.
      this.model.user ().on('change', this.render);
      this.model.media().on('change', this.render);
      this.model.tag  ().on('change', this.render);
    },

    templateHelpers: function()
    {
      return {
        tag_name:  this.model.tag  ().get("tag"),
        user_name: this.model.user ().get("display_name"),
        media_url: this.model.media().thumbnail_for(this.model)
      }
    },

    modelEvents: { "change": "render"      },
    events:      { "click":  "onClickEdit" },

    onClickEdit: function()
    {
      var note_editor = new NoteEditorView({model: this.model, collection: this.model.comments()});
      vent.trigger("application:popup:show", note_editor, this.model.get("name") || "Note");
    }
  });
});

