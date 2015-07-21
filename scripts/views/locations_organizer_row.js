define([
  'backbone',
  'text!templates/locations_organizer_row.tpl',
  'views/trigger_location_editor',
  'vent'
],
function(
  Backbone,
  Template,
  TriggerLocationEditorView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    templateHelpers: function() {
      return {
        name: this.model.game_object().get('name')
      }
    },

    events: {
      "click .edit": "onClickEdit"
    },

    tagName: 'tr',

    modelEvents: {
      "change": "modelChanged"
    },

    modelChanged: function() {
      this.render();
    },

    onClickEdit: function() {
      var view = this;

      this.model.trigger("center_map");

      var location_editor = new TriggerLocationEditorView({model: view.model});
      vent.trigger("application:info:show", location_editor);
    }
  });
});
