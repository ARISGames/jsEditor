define(
function(require)
{
  var Backbone                   = require('backbone');
  var Template                   = require('text!templates/character_organizer.tpl');
  var CharactersOrganizerRowView = require('views/character_organizer_row');
  var CharacterEditorView        = require('views/character_editor');
  var Character                  = require('models/character');
  var vent                       = require('vent');

  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: CharactersOrganizerRowView,
    itemViewContainer: ".characters",

    events: {
      "click .new": "onClickNew"
    },

    initialize: function(options) {
      var view = this;

      vent.on("character:add", function(character) {
        view.collection.add(character);
      });
    },

    onClickNew: function() {
      var character = new Character({game_id: this.model.get("game_id")});

      var character_editor = new CharacterEditorView({model: character});
      vent.trigger("application:popup:show", character_editor, "Create Character");
    }
  });
});

