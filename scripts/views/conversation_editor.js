define([
  'underscore',
  'panzoom',
  'backbone',
  'text!templates/conversation_editor.tpl',
  'views/conversation_script',
  'models/dialog_script',
  'models/dialog_option',
  'models/character',
  'models/media',
  'collections/dialog_options',
  'storage',
  'vent'
],
function(
  _,
  $panzoom,
  Backbone,
  Template,
  ConversationScriptView,
  DialogScript,
  DialogOption,
  Character,
  Media,
  DialogOptionsCollection,
  storage,
  vent
)
{
  return Backbone.Marionette.ItemView.extend({
    template: _.template(Template),

    templateHelpers: function()
    {
      var self = this;
      return { no_intro_script:!self.model }
    },

    className: 'conversation-editor',

    ui:
    {
      intro_script_region: '.intro_script_region'
    },

    events:
    {
      'click .add-intro-script': "onClickNew"
    },

    initialize: function(options)
    {
      var self = this;
      self.dialog = options.dialog;
      self.my_scripts = options.my_scripts;
      self.my_options = options.my_options;

      self.incoming_options = options;

      vent.on("conversation:update", self.render);
    },

    onRender: function()
    {
      var self = this;

      // re-wire up children, characters, and media
      self.my_scripts.each(function(script)
      {
        // Flag to prevent infinitely recursive rendering
        script.set("rendered", false);

        var script_options = self.my_options.where({parent_dialog_script_id: script.id});

        script_options.sort(function(a,b){ if(parseInt(a.get("sort_index")) < parseInt(b.get("sort_index"))) return -1; if(parseInt(a.get("sort_index")) > parseInt(b.get("sort_index"))) return 1; return 0; });

        //Normalizes sort_indexes, adds property of first/last for rendering
        for(var i = 0; i < script_options.length; i++)
        {
          var oldindex = script_options[i].get("sort_index");
          script_options[i].set("sort_index",i);

          if(oldindex != script_options[i].get("sort_index")) script_options[i].save();

          script_options[i].firstOption = false;
          script_options[i].lastOption = false;
        }
        if(script_options.length > 0)
        {
          script_options[0].firstOption = true;
          script_options[script_options.length-1].lastOption = true;
        }

        script.set("dialog_options", new DialogOptionsCollection(script_options));

        var character = storage.dialog_characters.findWhere({dialog_character_id: script.get("dialog_character_id")});
        script.set("character", character);
      });

      if(self.model)
      {
        self.model.set("root_node", true)
        var conversation_script =
          new ConversationScriptView(
            _.extend(self.incoming_options, {el: self.ui.intro_script_region, model: self.model, collection: self.model.get("dialog_options")}));
        conversation_script.render();

        if(!self.centered_once)
        {
          setTimeout(function() { self.centered_once = true; self.$el.get(0).scrollLeft = (self.$el.get(0).scrollWidth - self.$el.get(0).clientWidth) / 2 }, 200);
        }
      }

      /*setTimeout(function()
      {
        self.$el.find('.conversation_pan_region').panzoom({
          contain: 'invert'
        });

      }, 300);*/
    },

    onClickNew: function()
    {
      var self = this;

      // Add them to collection for saving
      //
      self.model = new DialogScript({text:"Hello", game_id:storage.game.id, dialog_id:self.dialog.id});
      storage.dialog_scripts.push(self.model);

      var dialog_option = new DialogOption({prompt:"Bye bye", game_id:storage.game.id, dialog_id:self.dialog.id});
      storage.dialog_options.push(dialog_option);
      self.model.set("dialog_options", new DialogOptionsCollection([dialog_option]));

      var character = new Character({name:"You"})
      var media = new Media({media_id:"0"});

      character.set("media", media);
      self.model.set("character", character);

      // FIXME make them temporary until 'saved'
      $.when(
        self.model.save()
      ).done(function()
      {
          self.dialog.set("intro_dialog_script_id", self.model.id);
          dialog_option.set("parent_dialog_script_id", self.model.id);

          self.incoming_options.my_scripts.add(self.model);
          self.incoming_options.my_options.add(dialog_option);

          $.when(self.dialog.save(), dialog_option.save()).done(self.render);
      });
    }
  });
});

