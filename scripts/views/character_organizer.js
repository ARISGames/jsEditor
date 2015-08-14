define([
  'backbone',
  'text!templates/character_organizer.tpl',
  'views/character_organizer_row',
  'views/character_editor',
  'models/dialog_character',
  'vent',
],
function(
  Backbone,
  Template,
  CharactersOrganizerRowView,
  CharacterEditorView,
  Character,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: CharactersOrganizerRowView,
    itemViewContainer: ".characters",

    events:
    {
      "click .new": "onClickNew"
    },

    initialize: function(options)
    {
      var view = this;

      vent.on("character:add", function(character)
      {
        view.collection.add(character);
      });
    },

    onClickNew: function()
    {
      var character = new Character({game_id: this.model.get("game_id")});

      var character_editor = new CharacterEditorView({model: character});
      vent.trigger("application:popup:show", character_editor, "Create Character");
    },

  });
});

