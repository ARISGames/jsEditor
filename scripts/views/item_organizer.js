define(
function(require)
{
  var Backbone             = require('backbone');
  var Template             = require('text!templates/item_organizer.tpl');
  var ItemOrganizerRowView = require('views/item_organizer_row');
  var ItemEditorView       = require('views/item_editor');
  var Item                 = require('models/item');
  var vent                 = require('vent');

  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: ItemOrganizerRowView,
    itemViewContainer: ".items",

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function() {
      var item  = new Item({game_id: this.model.get("game_id")});

      var item_editor = new ItemEditorView({model: item});
      vent.trigger("application:popup:show", item_editor, "Create Item");
    }
  });
});

