define([
  'underscore',
  'backbone',
  'text!templates/conversation_editor.tpl',
  'views/conversation_script',
  'models/dialog_script',
  'models/dialog_option',
  'models/dialog_character',
  'models/media',
  'collections/dialog_options',
  'storage',
  'vent',
],
function(
  _,
  Backbone,
  Template,
  ConversationScriptView,
  DialogScript,
  DialogOption,
  DialogCharacter,
  Media,
  DialogOptionsCollection,
  storage,
  vent
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template:_.template(Template),
    templateHelpers:function() { var self = this; },
    className:'conversation-editor',
    ui: {
      conversation_pan_region:'.conversation_pan_region',
    },

    initialize:function(options)
    {
      var self = this;
      
      if(!self.model.get("intro_dialog_script_id"))
      {
        var dialog_script = new DialogScript({text:"Hello",     game_id:storage.game.id, dialog_id:self.model.id});
        var dialog_option = new DialogOption({prompt:"Bye bye", game_id:storage.game.id, dialog_id:self.model.id});
        dialog_script.set("dialog_options", new DialogOptionsCollection([dialog_option]));

        var character = new DialogCharacter({name:"You"})
        var media = new Media({media_id:"0"});

        character.set("media", media);
        dialog_script.set("character", character);

        $.when(
          dialog_script.save()
        ).done(function()
        {
          self.model.set("intro_dialog_script_id", dialog_script.id);
          dialog_option.set("parent_dialog_script_id", dialog_script.id);

          self.incoming_options.scripts.add(dialog_script);
          self.incoming_options.script_options.add(dialog_option);

          $.when(
            self.model.save(),
            dialog_option.save()
          ).done(
            self.render
          );
        });
      }









      self.intro_dialog_script = storage.dialog_scripts.findWhere({dialog_script_id:self.model.get("intro_dialog_script_id")});
      self.dialog_scripts = storage.dialog_scripts.where({dialog_id:self.model.id});
      self.dialog_options = storage.dialog_options.where({dialog_id:self.model.id});
      self.dialog_characters = storage.dialog_characters;
    },

    getTreeWidth:function(option)
    {
      var self = this;
      var w = 0;

      if(option.get("link_type") == "DIALOG_SCRIPT")
      {
        var script = undefined;
        for(var i = 0; i < self.dialog_scripts.length; i++)
          if(self.dialog_scripts[i].id == option.get("link_id")) script = self.dialog_scripts[i];
        if(!script || script.counted) w += 1;
        else
        { 
          script.counted = true;
          for(var i = 0; i < self.dialog_options.length; i++)
            if(self.dialog_options[i].get("parent_dialog_script_id") == script.id) w += self.getTreeWidth(self.dialog_options[i]);
        }
      }
      else w += 1;

      option.known_width = w;
      return w;
    },

    /*
    Intuitions to note-
    You are NOT rendering a TREE- you are rendering a GRAPH.
    However, all cycles in the graph have been cut, leaving a note (rather than fully rendering the edge) where the node ought actually point.
    This leaves the appearance of a tree.

    The edges rendered are calculated by a minimum spanning BF traversal, starting with the "intro_dialog_script" node.

    This gets *slightly* more complicated, as every option MUST be rendered exactly once, even if an edge is redundant. (script = node, option = edge)
    However, every node must be rendered FULLY exactly once, but we can stub in dead-end notes for nodes that get accessed redundantly.

    The way we accomplish this is by rendering at least the "first half" of every edge.
    So, in rendering a node, we render the "script" (the node itself), then all of its options (the "first half" of all its edges),
    and then if any edges travel to an already-visited node, we just stub in a dead-end note saying "hey this represents some node back there".

    For simplicity, it's actually more straightforward to consider the "edges" as the first-order content to be rendered.
    (We can consider the width of that edge and its subtree absolutely, as it is only represented exactly once.)
    For this to work, I stub in a bogus edge that points to the "intro_dialog_script", and render that.
    */
    onRender:function()
    {
      var self = this;
      
      if(self.intro_dialog_script)
      {
        var bogus_start_option = new DialogOption({"link_type":"DIALOG_SCRIPT","link_id":self.intro_dialog_script.id,"prompt":"Begin"});

        for(var i = 0; i < self.dialog_scripts.length; i++) //two traversals- one for count, one for render. both need to be cleared.
        {
          self.dialog_scripts[i].counted = false;
          self.dialog_scripts[i].rendered = false;
        }
        self.getTreeWidth(bogus_start_option);
        self.ui.conversation_pan_region[0].style.width = (bogus_start_option.known_width*300)+"px";
        self.renderOptionIntoDiv(bogus_start_option,self.ui.conversation_pan_region[0]);
      }
    },

    renderOptionIntoDiv:function(option,div)
    {
      var self = this;

      var optionView = new self.OptionView(self.makeEl);
      optionView.option = option;
      div.appendChild(optionView.render());
      div.appendChild(document.createElement('br'));

      var scriptView = new self.ScriptView(self.makeEl);

      if(option.get("link_type") == 'DIALOG_SCRIPT')
      {
        var script = undefined;
        for(var i = 0; i < self.dialog_scripts.length; i++)
          if(self.dialog_scripts[i].id == option.get("link_id")) script = self.dialog_scripts[i];

        scriptView.script = script;
        
        div.appendChild(self.makeLine(10));
        div.appendChild(self.makeEl('br',{},{}));
        div.appendChild(scriptView.render());
        div.appendChild(self.makeEl('br',{},{}));
        div.appendChild(self.makeLine(10));
        div.appendChild(self.makeEl('br',{},{}));

        if(script && !script.rendered)
        {
          script.rendered = true;

          var opsdiv = document.createElement('div');
          opsdiv.style.width = (option.known_width*300)+"px";
          opsdiv.style.float="clear";
          div.appendChild(opsdiv);

          var options = [];
          for(var i = 0; i < self.dialog_options.length; i++)
            if(self.dialog_options[i].get("parent_dialog_script_id") == script.id) options.push(self.dialog_options[i]);

          for(var i = 0; i < options.length; i++)
          {
            var opdiv = document.createElement('div');
            opdiv.style.width = (options[i].known_width*300)+"px";
            opdiv.style.float="left";
            opsdiv.appendChild(opdiv);

            opdiv.appendChild(self.makeLine(20));
            opdiv.appendChild(self.makeEl('br',{},{}));
            self.renderOptionIntoDiv(options[i],opdiv);
          }
        }
      }
      else
      {
        //script_div.innerHTML += "Other kind of link thing";
      }
    },

    makeLine:function(len)
    {
      var self = this;
      return self.makeEl('div',{},{display:"inline",height:len+"px",width:"0px",border:"1px solid black"});
    },

    OptionView:function(makeEl)
    {
      var self = this;
      self.makeEl = makeEl; //hack. whatever for now.
      self.option = undefined;

      self.render = function()
      {

        function linkIcon()
        {
          switch(self.option.get("link_type"))
          {
            case "DIALOG_SCRIPT":    return "arrow-down";
            case "EXIT":             return "export";
            case "EXIT_TO_DIALOG":   return "comment";
            case "EXIT_TO_PLAQUE":   return "align-justify";
            case "EXIT_TO_ITEM":     return "stop";
            case "EXIT_TO_WEB_PAGE": return "globe";
            case "EXIT_TO_TAB":      return "list-alt";
          }
        };

        function linkColor()
        {
          switch(self.option.get("link_type"))
          {
            case "DIALOG_SCRIPT":    return "info";
            case "EXIT":             return "success";
            case "EXIT_TO_DIALOG":   return "success";
            case "EXIT_TO_PLAQUE":   return "success";
            case "EXIT_TO_ITEM":     return "success";
            case "EXIT_TO_WEB_PAGE": return "success";
            case "EXIT_TO_TAB":      return "success";
          }
        };

        var div = self.makeEl('div',{},
        {
          display:"inline-block",
          textAlign:"center",
        });

        var c1el = self.makeEl('div',
        {
          className:"script-option-panel panel panel-"+linkColor()+" info edit-option",
        },
        {
          display:"inline-block",
          position:"relative",
          width:"200px",
        });
        var c2el = self.makeEl('div',{className:"panel-heading"},{});
        var c3el = self.makeEl('div',
        {
          className:"option-text"
        },
        {
          overflow:"hidden",
          padding:"10px",
        });
        var c4el = self.makeEl('span',{className:"glyphicon glyphicon-"+linkIcon()},{});
        var c5el = self.makeEl('span',{},{});
        c5el.innerHTML = self.option.get("prompt");

        c4el.appendChild(c5el);
        c3el.appendChild(c4el);
        c2el.appendChild(c3el);
        c1el.appendChild(c2el);
        div.appendChild(c1el);

        return div;
      }
    },

    ScriptView:function(makeEl)
    {
      var self = this;
      self.makeEl = makeEl; //hack. whatever for now.
      self.script = undefined;
      self.render = function()
      {
        var div = self.makeEl('div',{},
        {
          display:"inline-block",
          textAlign:"center",
          width:"300px",
        });

        var c1el = self.makeEl('div',
        {
          className:"script-panel panel panel-default clearfix edit-script",
        },
        {
          display:"inline-block",
          width:"300px",
        });

        var c2el = self.makeEl('div',
        {
          className:"panel-body",
        },
        {
          padding:"0.5em",
        });

        var c3el1 = self.makeEl('div',
        {
          className:"thumbnail change-active-icon pull-left",
        },
        {
          width:"25%",
        });

        if(!self.script.dialog_character_id || self.script.dialog_character_id == "0")
        {
          self.script.set("dialog_character_id","0");
          var character = new DialogCharacter({name:"You", dialog_character_id:"0", title:"The Player"})
        }
        else
        {
          var character = storage.dialog_characters.findWhere({dialog_character_id:self.script.dialog_character_id});
        }

        var c4el1 = self.makeEl('img',
        {
          src:character.media_thumbnail(),
        },
        {
          height:"auto",
          width:"100%",
        });

        var c3el2 = self.makeEl('div',
        {
          className:"script-text pull-left",
        },
        {
          width:"70%",
          whiteSpace:"normal",
          textAlign:"left",
          paddingLeft:"0.5em",
        });

        if(!self.script)
          c3el2.innerHTML = "Oh no! Couldn't find script!";
        else if(self.script.rendered)
          c3el2.innerHTML = self.script.text+"- Already Rendered!";
        else
          c3el2.innerHTML = self.script.get("text");


        c2el.appendChild(c3el2);
        c3el1.appendChild(c4el1);
        c2el.appendChild(c3el1);
        c1el.appendChild(c2el);
        div.appendChild(c1el);

        return div;
      }
    },

  });
});

