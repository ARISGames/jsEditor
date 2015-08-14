define([
  'jquery',
  'backbone',
  'text!templates/conversation_script.tpl',
  'models/dialog_option',
  'models/dialog_script',
  'models/dialog_character',
  'models/media',
  'views/conversation_option',
  'views/dialog_script_editor',
  'storage',
  'vent',
],
function(
  $,
  Backbone,
  Template,
  DialogOption,
  DialogScript,
  DialogCharacter,
  Media,
  ConversationOptionView,
  DialogScriptEditorView,
  storage,
  vent
)
{
  var ConversationScriptView = Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),
    templateHelpers: function()
    {
      var self = this;
      return {
        root_node:self.model.has('root_node'),
        character:self.character,
      }
    },

    itemView:ConversationOptionView,
    itemViewContainer:'.script_options',

    itemViewOptions: function(model, index)
    {
      var self = this;
      return {
        conversation_script_view:ConversationScriptView,
      };
    },

    initialize: function(options)
    {
      var self = this;
      self.model.set("rendered", true);

      //START GET/ORGANIZE DIALOG_OPTIONS
      var dialog_options = storage.dialog_options.where({parent_dialog_script_id:self.model.id});
      dialog_options.sort(
        function(a,b)
        {
          if(parseInt(a.get("sort_index")) < parseInt(b.get("sort_index"))) return -1;
          if(parseInt(a.get("sort_index")) > parseInt(b.get("sort_index"))) return 1;
          return 0;
        }
      );
      for(var i = 0; i < dialog_options.length; i++)
      {
        var oldindex = dialog_options[i].get("sort_index");
        dialog_options[i].set("sort_index",i);

        if(oldindex != dialog_options[i].get("sort_index")) dialog_options[i].save();

        dialog_options[i].firstOption = false;
        dialog_options[i].lastOption = false;
      }
      if(dialog_options.length > 0)
      {
        dialog_options[0].firstOption = true;
        dialog_options[dialog_options.length-1].lastOption = true;
      }
      //END GET/ORGANIZE DIALOG_OPTIONS
      self.collection = dialog_options;

      self.change_media(); //force get of self.character/self.character_media
      //self.listenTo(self.character, "change:media_id", self.change_media);
    },

    change_media: function()
    {
      var self = this;
      //if(self.character_media) { self.stopListening(self.character_media); }

      if(!self.model.dialog_character_id || self.model.dialog_character_id == "0")
      {
        self.model.set("dialog_character_id","0");
        self.character = new DialogCharacter({name:"You", dialog_character_id:"0", title:"The Player"})
        self.character_media = new Media({media_id:"0"});
      }
      else
      {
        self.character = storage.dialog_characters.findWhere({dialog_character_id:self.model.dialog_character_id});
        self.character_media = self.character.media();
        self.character_media = new Media({media_id:"0"});
      }

      self.set_media(self.character_media);
      //self.listenTo(self.character_media, "change", self.set_media);
    },

    events:
    {
      "click .edit-script": "onClickEdit",
      "click .add-option": "onClickAdd",
    },

    set_media: function()
    {
      var self = this;
      var element = $(self.$el.find('.thumbnail img').get(0));
      element.attr('src', self.character.media_thumbnail());
    },

    onClickEdit: function()
    {
      var self = this;
      var script_editor = new DialogScriptEditorView(
        {
          model:self.model,
        }
      );
      vent.trigger("application:info:show", script_editor);
      return false;
    },

    onClickAdd: function()
    {
      var self = this;

      var script = new DialogScript();
      script.set("game_id",self.model.get("game_id"));
      script.set("dialog_id",self.model.get("dialog_id"));
      script.set("text","Hello");
      script.save({}, {
        success: function()
        {
          storage.dialog_scripts.push(script);

          var option = new DialogOption();
          option.set("game_id",self.model.get("game_id"));
          option.set("dialog_id",self.model.get("dialog_id"));
          option.set("parent_dialog_script_id",self.model.get("dialog_script_id"));
          option.set("link_type","DIALOG_SCRIPT");
          option.set("link_id",script.get("dialog_script_id"));
          option.set("prompt","Continue");
          option.save({}, {
            success:function()
            {
              storage.dialog_options.push(option);

              option = new DialogOption();
              option.set("game_id",self.model.get("game_id"));
              option.set("dialog_id",self.model.get("dialog_id"));
              option.set("parent_dialog_script_id",script.get("dialog_script_id"));
              option.set("link_type","EXIT");
              option.set("prompt","Exit");
              option.save({}, {
                success:function()
                {
                  storage.dialog_options.push(option);

                  vent.trigger("conversation:update");
                }
              });
            }
          });
        }
      });

      return false;
    },

  });
  return ConversationScriptView;
});

