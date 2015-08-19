define([
  'underscore',
  'backbone',
  'text!templates/conversation_option.tpl',
  'models/dialog_script',
  'models/dialog_option',
  'views/conversation_script',
  'views/dialog_option_editor',
  'vent',
],
function(
  _,
  Backbone,
  Template,
  DialogScript,
  DialogOption,
  ConversationScriptView,
  DialogOptionEditor,
  vent
)
{
  return Backbone.Marionette.ItemView.extend({
    template: _.template(Template),

    className: "script_option",

    events: {
      "click .edit-option": "onClickEdit",
      "click .inject-option": "onClickInject"
    },

    initialize: function(options)
    {
      var self = this;

      self.scripts = options.scripts;
      self.dialog  = options.dialog;
      self.script_options = options.script_options;
      self.contents = options.contents;
      self.plaques   = options.contents.plaques;
      self.items     = options.contents.items;
      self.web_pages = options.contents.web_pages;
      self.dialogs   = options.contents.dialogs;
      self.tabs      = options.contents.tabs;
      self.characters = options.characters;
      self.conversation_script_view = options.conversation_script_view;
    },


    templateHelpers: function()
    {
      var self = this;
      return {
        model:self.model,
        scripts:self.scripts,
        cid:self.model.cid,
        link_icon:self.linkIcon(),
        link_color:self.linkColor(),
        isFirst:self.model.firstOption,
        isLast:self.model.lastOption
      }
    },

    onClickEdit: function()
    {
      var self = this;
      var option_editor = new DialogOptionEditor({model:self.model, dialog:self.dialog, scripts:self.scripts, script_options:self.script_options, contents:self.contents, DialogScript:DialogScript, DialogOption:DialogOption});
      vent.trigger("application:info:show", option_editor);
      return false;
    },

    onClickInject: function()
    {
      var self = this;

      var script = new DialogScript();
      script.set("game_id",self.model.get("game_id"));
      script.set("dialog_id",self.model.get("dialog_id"));
      script.set("text","Hello");
      script.save({}, {
        success: function()
        {
          var option = new DialogOption();
          option.set("game_id",self.model.get("game_id"));
          option.set("dialog_id",self.model.get("dialog_id"));
          option.set("parent_dialog_script_id",self.model.get("parent_dialog_script_id"));
          option.set("link_type","DIALOG_SCRIPT");
          option.set("link_id",script.get("dialog_script_id"));
          option.set("prompt","Continue");
          option.set("sort_index",self.model.get("sort_index"));
          option.save({},{
            success: function()
            {
              self.model.set("parent_dialog_script_id",script.get("dialog_script_id"));
              self.model.save({},{
                success: function()
                {
                  self.scripts.push(script);
                  self.script_options.push(option);
                  vent.trigger("conversation:update");
                }
              });
            }
          });

        }
      })

      return false;
    },

    linkIcon: function()
    {
      var self = this;
      switch(self.model.get("link_type"))
      {
        case "DIALOG_SCRIPT": return "arrow-down";
        case "EXIT": return "export";
        case "EXIT_TO_DIALOG": return "comment";
        case "EXIT_TO_PLAQUE": return "align-justify";
        case "EXIT_TO_ITEM": return "stop";
        case "EXIT_TO_WEB_PAGE": return "globe";
        case "EXIT_TO_TAB": return "list-alt";
      }
    },

    linkColor: function()
    {
      var self = this;
      switch(self.model.get("link_type"))
      {
        case "DIALOG_SCRIPT": return "info";
        case "EXIT": return "success";
        case "EXIT_TO_DIALOG": return "success";
        case "EXIT_TO_PLAQUE": return "success";
        case "EXIT_TO_ITEM": return "success";
        case "EXIT_TO_WEB_PAGE": return "success";
        case "EXIT_TO_TAB": return "success";
      }
    },

    /* Nested rendering */
    onRender: function()
    {
      var self = this;
      if(self.model.get("link_type") === "DIALOG_SCRIPT")
      {
        var dialog_script = self.scripts.findWhere({dialog_script_id: self.model.get("link_id")});

        if(dialog_script.get("rendered") === false)
        {
          var child_view = self.$el.find(".child_script_"+self.model.cid);

          var conversation_view = new self.conversation_script_view(
            {
              model:dialog_script,
              collection:dialog_script.get("dialog_options"),
              dialog:self.dialog,
              scripts:self.scripts,
              script_options:self.script_options,
              characters:self.characters,
              contents:self.contents,
              el:child_view,
              instance_parent_option:self.model
            });
          //THERE IS A BUG HERE AND I DON'T YET UNDERSTAND IT
          conversation_view.render();
        }
      }
    }
  });
});
