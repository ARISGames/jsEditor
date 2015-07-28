define([
  'jquery',
  'backbone',
  'text!templates/character_organizer_row.tpl',
  'views/character_editor',
  'vent',
],
function(
  $,
  Backbone,
  Template,
  CharacterEditorView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    events:
    {
      "click .edit": "onClickEdit"
    },

    tagName: 'tr',

    initialize: function() {
      this.listenTo(this.model, "update", this.render);
    },

    onClickEdit: function() {
      var character_editor = new CharacterEditorView({model: this.model});
      vent.trigger("application:popup:show", character_editor, "Edit Character");
    }
  });
});

