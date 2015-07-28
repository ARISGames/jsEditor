define([
  'underscore',
  'underscore.string',
  'jquery',
  'views/editor_base',
  'text!templates/event_inference_row.tpl',
  'models/instance',
  'vent',
  'storage',
],
function(
  _,
  _S,
  $,
  EditorView,
  Template,
  Instance,
  vent,
  storage
)
{
  return EditorView.extend(
  {
    template:_.template(Template),

    templateHelpers: function()
    {
      return {
        event_name:  this.event_name(),
        object_name: this.object_name(),
        object_type: this.class_name(),
        icon_thumbnail: this.icon_for_inference()
      }
    },

    className: "inference_thumbnail",

    onRender: function()
    {
      this.$el.find('[data-toggle="popover"]').popover({trigger:'hover',placement:'top',delay:300});
    },

    /* Inference helpers */

    object_name: function()
    {
      return this.model.modified_by().get("name") || this.model.modified_by().name()
    },

    icon_for_inference: function()
    {
      var object = this.model.modified_by();
      var thumbnail;
      var icon;
      if(object.idAttribute == "plaque_id")         { icon = object.icon();        thumbnail = object.icon_thumbnail(); }
      if(object.idAttribute == "quest_id" )         { icon = object.active_icon(); thumbnail = object.active_icon_thumbnail();  }
      if(object.idAttribute == "dialog_script_id")  { icon = object.icon();        thumbnail = object.icon_thumbnail(); }

      if(!icon) { throw "cant determine type of " + object.idAttribute + ": " + object.id; }

      this.listenTo(icon, "change", this.render);

      return thumbnail;
    },


    event_name: function()
    {
      var event = this.model.get("event");
      var qty   = this.model.get("qty");
      switch(event)
      {
        case "GIVE_ITEM":
        case "GIVE_ITEM_PLAYER":
          return "Give "+qty+" to Player";
        case "TAKE_ITEM":
        case "TAKE_ITEM_PLAYER":
          return "Take "+qty+" from Player";
        case "SET_ITEM_PLAYER":
          return "Set to "+qty+" for Player";

        case "GIVE_ITEM_GAME":
          return "Give "+qty+" to World";
        case "TAKE_ITEM_GAME":
          return "Take "+qty+" from World";
        case "SET_ITEM_GAME":
          return "Set to "+qty+" for Game";

        case "GIVE_ITEM_GROUP":
          return "Give "+qty+" to Player Group";
        case "TAKE_ITEM_GROUP":
          return "Take "+qty+" from Player Group";
        case "SET_ITEM_GROUP":
          return "Set to "+qty+" for Group";

        default:
          console.error("cant humanize event "+event+" on "+this.model.idAttribute+" "+this.model.id);
          return "N/A";
      }
    },


    class_name: function()
    {
      var object = this.model.modified_by();
      if(object.idAttribute == "plaque_id")         { return "Plaque" }
      if(object.idAttribute == "quest_id" )         { return "Quest"  }
      if(object.idAttribute == "dialog_script_id")  { return "Dialog Line" }

      throw "cant determine type of " + object.idAttribute + ": " + object.id;
    }
  });
});

