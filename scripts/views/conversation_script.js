define([
  'jquery',
  'backbone',
  'text!templates/conversation_script.tpl',
  'models/dialog_option',
  'models/dialog_script',
  'views/conversation_option',
  'views/dialog_script_editor',
  'vent',
],
function(
  $,
  Backbone,
  Template,
  DialogOption,
  DialogScript,
  ConversationOptionView,
  DialogScriptEditorView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),
    templateHelpers: function() {
      return {
        root_node: this.model.has('root_node')
      }
    },

    itemView: ConversationOptionView,
    itemViewContainer: '.script_options',

    itemViewOptions: function(model, index)
    {
      var self = this;
      return {
        scripts: this.scripts,
        script_options: this.script_options,
        dialog: this.dialog,
        characters: this.characters,
        conversation_script_view: self,
        contents: this.contents
      }
    },

    initialize: function(options) {
      this.scripts = options.scripts;
      this.dialog  = options.dialog;
      this.instance_parent_option = options.instance_parent_option;
      this.script_options = options.script_options;
      this.characters = options.characters;
      this.contents = options.contents;

      // FIXME keep track of this in a parent view or controller/app
      this.model.set("rendered", true);

      this.change_media();
      this.listenTo(this.model.get("character"), "change:media_id", this.change_media);
    },

    change_media: function() {
      if(this.character_media) {
        this.stopListening(this.character_media);
      }

      this.character_media = this.model.get("character").media();

      this.set_media(this.character_media);
      this.listenTo(this.character_media, "change", this.set_media);
    },

    events: {
      "click .edit-script": "onClickEdit",
      "click .add-option": "onClickAdd",
    },

    set_media: function() {
      var element = $(this.$el.find('.thumbnail img').get(0));
      element.attr('src', this.model.get("character").media_thumbnail());
    },

    onClickEdit: function() {
      var script_editor = new DialogScriptEditorView({model: this.model, scripts:this.scripts, characters: this.characters, script_options:this.script_options, instance_parent_option:this.instance_parent_option});
      vent.trigger("application:info:show", script_editor);
      return false;
    },
    onClickAdd: function() {
      var view = this;

      var script = new DialogScript();
      script.set("game_id",view.model.get("game_id"));
      script.set("dialog_id",view.model.get("dialog_id"));
      script.set("text","Hello");
      script.save({}, {
        success: function() {
          view.scripts.push(script);

          var option = new DialogOption();
          option.set("game_id",view.model.get("game_id"));
          option.set("dialog_id",view.model.get("dialog_id"));
          option.set("parent_dialog_script_id",view.model.get("dialog_script_id"));
          option.set("link_type","DIALOG_SCRIPT");
          option.set("link_id",script.get("dialog_script_id"));
          option.set("prompt","Continue");
          option.save({}, {
            success:function() {
              view.script_options.push(option);

              option = new DialogOption();
              option.set("game_id",view.model.get("game_id"));
              option.set("dialog_id",view.model.get("dialog_id"));
              option.set("parent_dialog_script_id",script.get("dialog_script_id"));
              option.set("link_type","EXIT");
              option.set("prompt","Exit");
              option.save({}, {
                success:function() {
                  view.script_options.push(option);

                  vent.trigger("conversation:update");
                }
              });
            }
          });
        }
      });

      return false;
    }

  });
});

