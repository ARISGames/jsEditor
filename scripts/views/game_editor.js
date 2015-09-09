define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/game_editor.tpl',
  'qrcode',
  'collections/media',
  'views/media_chooser',
  'views/alert_dialog',
  'models/game',
  'vent',
],
function(
  _,
  $,
  Backbone,
  Template,
  QRCode,
  MediaCollection,
  MediaChooserView,
  AlertDialog,
  Game,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    /* View */

    template: _.template(Template),

    className: "games-list-container",

    templateHelpers: function()
    {
      var self = this;
      return {
        is_new : self.model.isNew(),
        icon_thumbnail_url:  self.icon.thumbnail_for(self.model),
        media_thumbnail_url: self.media.thumbnail_for(),

        option_selected: function(boolean_statement) { return boolean_statement ? "selected" : ""; }, 
        is_checked: function(value) { return value === "1" ? "checked" : ""; }, 
        radio_selected: function(boolean_statement) { return boolean_statement ? "checked" : ""; }, 
        tab_selected: function(boolean_statement) { return boolean_statement ? "active" : ""; }, 
        tab_visible: function(boolean_statement) { return boolean_statement ? "" : "style='display:none;'"; }, 

        scenes: self.scenes
      };
    },

    ui: {
      "save":      ".save",
      "delete":    ".delete",
      "duplicate": ".duplicate",
      "export":    ".export",
      "cancel":    ".cancel",

      "change_icon":  ".change-icon",
      "change_media": ".change-media",
      "game_published": ".game-published",

      "name":        "#game-name",
      "description": "#game-description",
      "type":        "#game-type",
      "intro_scene": "#game-intro_scene_id",

      "game_map_canvas": ".game-map-canvas",
      "tab_map_canvas":  ".tab-map-canvas",
      "tab_map_container": ".tab-map-container",

      "network_levels":".network_level",
      "preload_media":  "#game-preload_media",

      "map_type":         "#game-map_type",
      "map_focus":        "#game-map_focus",
      "map_zoom_level":   "#game-map_zoom_level",
      "map_show_player":  "#game-map_show_player",
      "map_show_players": "#game-map_show_players",
      "map_offsite_mode": "#game-map_offsite_mode",

      "notebook_allow_comments":    "#game-notebook_allow_comments",
      "notebook_allow_likes":       "#game-notebook_allow_likes",

      "inventory_weight_cap": "#game-inventory_weight_cap",

      "icon":  ".change-icon img",
      "media": ".change-media img",

      "qr_image":           ".qr_image",
      "login_group":        "#login-group",
      "login_disable_exit": "#login-disable-exit",

      "autofocus":  "input[autofocus]"
    },


    /* Dom manipulation */

    set_icon: function(media)
    {
      this.ui.icon.attr("src", media.thumbnail_for(this.model));
    },

    set_media: function(media)
    {
      this.ui.media.attr("src", media.thumbnail_for());
    },

    onShow: function()
    {
      this.ui.autofocus.focus();
    },


    /* Initialization and Rendering */

    initialize: function(options)
    {
      this.icon   = this.model.icon();
      this.media  = this.model.media();
      this.scenes = options.scenes;

      /* Icon media change events */

      this.bindIconAssociation();

      /* QR settings */

      this.qr_group_name = "";
      this.qr_disable_leave = "0";
    },

    onRender: function()
    {
      var self = this;
      self.$el.find('[data-toggle="popover"]').popover({trigger: 'hover',placement: 'top', delay: 400 });
      setTimeout(function() {self.renderGameMap(); self.renderTabMap();}, 300);
      self.initializeQR();
    },

    /* QR */
    initializeQR: function()
    {
      this.qr_code = new QRCode(this.ui.qr_image.get(0), this.loginQrString());
    },

    onChangeLoginOptions: function()
    {
      this.qr_group_name    = this.ui.login_group.val();
      this.qr_disable_leave = this.ui.login_disable_exit.is(":checked") ? "1" : "0";

      this.qr_code.makeCode(this.loginQrString());
    },

    loginQrString: function()
    {
      //v1.0 (dep)  - // 1,group_name,game_id,disable_leave_game
      //var qr_string = "1,"+this.qr_group_name+","+this.model.id+","+this.qr_disable_leave;

      //v2.0 - // 2,pauto_profile_enabled,grgroup_name,ggame_id,lleave_game_enabled
      var qr_string = "2,gr"+this.qr_group_name+",g"+this.model.id+",l"+this.qr_disable_leave;
      return qr_string;
    },


    /* View Events */

    events: {
      "click @ui.save":      "onClickSave",
      "click @ui.cancel":    "onClickCancel",
      "click @ui.duplicate": "onClickDuplicate",
      "click @ui.export":    "onClickExport",
      "click @ui.delete":    "onClickDelete",

      "click @ui.change_icon":  "onClickIcon",
      "click @ui.change_media": "onClickMedia",

      "change @ui.game_published": "onChangePublished",
      "change @ui.network_levels": "onChangeNetworkLevel",

      "change @ui.login_group":        "onChangeLoginOptions",
      "keyup @ui.login_group":         "onChangeLoginOptions",
      "change @ui.login_disable_exit": "onChangeLoginOptions",
      "change @ui.map_focus":          "onChangeMapFocus",
    },


    /* Crud */

    onClickSave: function()
    {
      var view = this;

      this.model.set("name",           this.ui.name.val());
      this.model.set("description",    this.ui.description.val());
      this.model.set("published",      this.$el.find(".game-published:checked").val());
      this.model.set("intro_scene_id", this.ui.intro_scene.val());

      this.model.set("type", this.ui.type.val());

      this.model.set("icon_media_id", this.icon.id);
      this.model.set("media_id",      this.media.id);

      this.model.set("preload_media",  this.ui.preload_media.is(":checked") ? "1" : "0");

      this.model.set("map_type",         this.ui.map_type.val());
      this.model.set("map_focus",        this.ui.map_focus.val());
      this.model.set("map_zoom_level",   this.ui.map_zoom_level.val());
      this.model.set("map_show_player",  this.ui.map_show_player.is(":checked") ? "1" : "0");
      this.model.set("map_show_players", this.ui.map_show_players.is(":checked") ? "1" : "0");
      this.model.set("map_offsite_mode", this.ui.map_offsite_mode.is(":checked") ? "1" : "0");

      this.model.set("notebook_allow_comments",    this.ui.notebook_allow_comments.is(":checked") ? "1" : "0");
      this.model.set("notebook_allow_likes",       this.ui.notebook_allow_likes.is(":checked") ? "1" : "0");
      this.model.set("inventory_weight_cap",       this.ui.inventory_weight_cap.val());

      this.model.save({}, {
        update: function()
        {
          Backbone.history.navigate("#games/"+view.model.get('game_id')+"/scenes", {trigger: true});
        }
      });
    },

    onClickCancel: function()
    {
      Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true});
    },

    onClickExport: function()
    {
      var view = this;
      var game = this.model;

      if (game.get("exporting") === "true") {
        // do nothing
      } else {
        text = $('.export').text();
        $('.export').text('Exporting...');
        game.export({
          success: function(url) {
            $('.export').text(text);
            window.location.href = url;
          }
        });
      }
    },

    onClickDuplicate: function()
    {
      var view = this;
      var game = this.model;

      // TODO move into templates
      var duplicating_text = '<i class="migrating-spinner"></i> <p style="text-align: center">Duplicating. Please do not close this window until finished.</p>';
      var duplicate_text = "This will create a copy of this game, all its game objects, and media. The copy will show up in your games list.";

      // Reuse dialog to track it
      if(view.alert_dialog)
      {
        // Did user re open alert while duplicating?
        if(game.get("duplicating") === "true")
        {
          view.show_spinner_alert(duplicating_text);
        }
      }
      else
      {
        view.alert_dialog = new AlertDialog({
          text: duplicate_text,
          confirm_button: true,
          cancel_button: true,
          confirm_text: "Duplicate"
        });

        view.alert_dialog.on("confirm", function()
        {
          // Keep track of duplication to prevent navigation
          window.onbeforeunload = function()
          {
            return "Your game is still duplicating, please wait until it finishes.";
          }
          window.running_duplications || (window.running_duplications = {});
          window.running_duplications[game.id] = true;

          view.show_spinner_alert(duplicating_text);

           game.duplicate({
            success: function()
            {
              // Clear navigation warning
              delete window.running_duplications[game.id];
              if(Object.keys(window.running_duplications).length === 0)
              {
                window.onbeforeunload = null;
              }

              vent.trigger("application:popup:hide:ifself", view.alert_dialog);
              view.alert_dialog = null;
            }
          });
        });

        this.alert_dialog.on("cancel", function()
        {
          vent.trigger("application:popup:hide");
        });
      }

      vent.trigger("application:popup:show", view.alert_dialog, "Duplicate Game");
    },

    show_spinner_alert: function(duplicating_text)
    {
      this.alert_dialog.set_text(duplicating_text);
      this.alert_dialog.hide_controls();
    },

    onClickDelete: function()
    {
      var view = this;

      var alert_dialog = new AlertDialog({text: "Are you sure you want to delete this game? All data will be lost.", danger_button: true, cancel_button: true});

      alert_dialog.on("danger", function()
      {
        view.model.destroy({
          success: function()
          {
            Backbone.history.navigate("#games", {trigger: true});
          }
        });
        vent.trigger("application:popup:hide");
      });

      alert_dialog.on("cancel", function()
      {
        vent.trigger("application:popup:hide");
      });

      vent.trigger("application:popup:show", alert_dialog, "Delete Game?");
    },

    /* Association Binding */

    unbindIconAssociation: function()
    {
      this.stopListening(this.icon);
      this.stopListening(this.media);
    },

    bindIconAssociation: function()
    {
      this.listenTo(this.icon,  'change', this.set_icon);
      this.listenTo(this.media, 'change', this.set_media);
    },


    /* Radio Logic */

    onChangePublished: function()
    {
      var view = this;

      // Hide radio buttons and add bootstrap classes
      //
      var selected_radio = this.$el.find(".game-published:checked");

      this.$el.find(".game-published").parent().removeClass("active");
      selected_radio.parent().addClass("active");
    },


    /* Media Selectors */

    onClickIcon: function(event)
    {
      var view = this;
      event.preventDefault();

      var media = new MediaCollection([], {parent: this.model});

      media.fetch({
        success: function()
        {
          /* Add default */
          media.unshift(view.model.default_icon());

          /* Icon */
          var icon_chooser = new MediaChooserView({collection: media, selected: view.icon, context: view.model});
          vent.trigger("application:popup:show", icon_chooser, "Game Icon");

          icon_chooser.on("media:choose", function(media)
          {
            view.unbindIconAssociation();
            view.icon = media;
            view.bindIconAssociation();
            view.set_icon(media);
            vent.trigger("application:popup:hide");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:hide");
          });
        }
      });
    },

    onClickMedia: function(event)
    {
      var view = this;
      event.preventDefault();

      var media = new MediaCollection([], {parent: this.model});

      media.fetch({
        success: function()
        {
          /* Add default */
          media.unshift(view.model.default_icon());

          /* Icon */
          var icon_chooser = new MediaChooserView({collection: media, selected: view.media});

          vent.trigger("application:popup:show", icon_chooser, "Game Media");

          icon_chooser.on("media:choose", function(media)
          {
            view.unbindIconAssociation();
            view.media = media;
            view.bindIconAssociation();
            view.set_media(media);
            vent.trigger("application:popup:hide");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:hide");
          });
        }
      });
    },

    onChangeNetworkLevel: function()
    {
      var self = this;
      var selected_radio = self.$el.find(".network_level:checked");

      self.model.set("network_level", selected_radio.val());

      self.ui.network_levels.parent().removeClass("active");
      selected_radio.parent().addClass("active");
    },

    renderGameMap: function()
    {
      var self = this;

      var loc = new google.maps.LatLng(self.model.get("latitude"), self.model.get("longitude"));

      var map = new google.maps.Map(self.ui.game_map_canvas.get(0), {
        zoom:8,
        center:loc,
        scrollwheel:false
      });
      var marker = new google.maps.Marker({
        position:loc,
        map:map,
        draggable:true
      });

      google.maps.event.addListener(marker, 'dragend', 
        function(event)
        {
          var center = marker.position;
          self.model.set("latitude",  center.lat());
          self.model.set("longitude", center.lng());
          map.setCenter(center);
        }
      );

    },

    renderTabMap: function()
    {
      var self = this;

      var loc = new google.maps.LatLng(self.model.get("map_latitude"), self.model.get("map_longitude"));

      var map = new google.maps.Map(self.ui.tab_map_canvas.get(0), {
        zoom:8,
        center:loc,
        scrollwheel:false
      });
      var marker = new google.maps.Marker({
        position:loc,
        map:map,
        draggable:true
      });

      google.maps.event.addListener(marker, 'dragend', 
        function(event)
        {
          var center = marker.position;
          self.model.set("map_latitude",  center.lat());
          self.model.set("map_longitude", center.lng());
          map.setCenter(center);
        }
      );

    },

    onChangeMapFocus: function()
    {
      var self = this;
      this.model.set("map_focus", this.ui.map_focus.val());
      if(self.model.get("map_focus") == "FIT_LOCATIONS")
      {
        self.ui.tab_map_container.get(0).style.display = 'block';
        self.renderTabMap();
      }
      else
        self.ui.tab_map_container.get(0).style.display = 'none';
    },

  });
});

