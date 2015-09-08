define([
  'jquery',
  'backbone',
  'text!templates/conversation_script.tpl',
  'models/dialog_option',
  'models/dialog_script',
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
  ConversationOptionView,
  DialogScriptEditorView,
  storage,
  vent
)
{
  var ConversationScriptView = Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),
    templateHelpers: function()
    {
      return {
        root_node: this.model.has('root_node'),

        strip_js: function(html)
        {
          var div = document.createElement('div');
          div.innerHTML = html;

          var scripts = div.getElementsByTagName('script');
          for(var i = scripts.length-1; i >= 0; i--)
            scripts[i].parentNode.removeChild(scripts[i]);

          var styles = div.getElementsByTagName('style');
          for(var i = styles.length-1; i >= 0; i--)
            styles[i].parentNode.removeChild(styles[i]);

          return div.textContent || div.innerText;
        },
      }
    },

    itemView: ConversationOptionView,
    itemViewContainer: '.script_options',

    itemViewOptions: function(model, index)
    {
      var self = this;
      return {
        dialog: self.dialog,
        scripts: self.my_scripts,
        script_options: self.my_options,
        characters: self.characters,
        conversation_script_view: ConversationScriptView,
      }
    },

    initialize: function(options)
    {
      var self = this;

      self.my_scripts = options.my_scripts;
      self.my_options = options.my_options;
      self.dialog  = options.dialog;
      self.instance_parent_option = options.instance_parent_option;
      self.characters = storage.dialog_characters;

      // FIXME keep track of this in a parent view or controller/app
      self.model.set("rendered", true);

      self.change_media();
      self.listenTo(self.model.get("character"), "change:media_id", self.change_media);
    },

    change_media: function()
    {
      var self = this;
      if(self.character_media)
      {
        self.stopListening(self.character_media);
      }

      self.character_media = self.model.get("character").media();

      self.set_media(self.character_media);
      self.listenTo(self.character_media, "change", self.set_media);
    },

    events: {
      "click .edit-script": "onClickEdit",
      "click .add-option": "onClickAdd",
    },

    set_media: function()
    {
      var self = this;
      var element = $(self.$el.find('.thumbnail img').get(0));
      element.attr('src', self.model.get("character").media_thumbnail());
    },

    onClickEdit: function()
    {
      var self = this;
      var script_editor = new DialogScriptEditorView({model:self.model, scripts:self.my_scripts, characters:self.characters, script_options:self.my_options, instance_parent_option:self.instance_parent_option});
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
          self.my_scripts.push(script);

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
              self.my_options.push(option);

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
                  self.my_options.push(option);

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
  return ConversationScriptView;
});

