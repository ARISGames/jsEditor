define([
  'underscore',
  'jquery',
  'views/editor_base',
  'vent',
  'storage',
  'text!templates/trigger_editor.tpl',
  'qrcode',
  'models/item',
  'models/instance',
  'views/media_chooser',
  'collections/media',
  'collections/events',
  'collections/ar_targets',
  'views/requirements',
  'models/requirement_package',
  'collections/and_packages',
  'collections/atoms',
  'views/trigger_editor_object_selector',
  'views/trigger_editor_ar_target_selector',
  'util',
],
function(
  _,
  $,
  EditorView,
  vent,
  storage,
  Template,
  QRCode,
  Item,
  Instance,
  MediaChooserView,
  MediaCollection,
  EventsCollection,
  ARTargetsCollection,
  RequirementsEditorView,
  RequirementPackage,
  AndPackagesCollection,
  AtomsCollection,
  TriggerObjectSelectorView,
  TriggerARTargetSelectorView,
  util
)
{
  return EditorView.extend(
  {
    template: _.template(Template),

    ui:
    {
      "save":   ".save",
      "delete": ".delete",
      "cancel": ".cancel",

      "change_icon":       ".change-icon",
      "edit_game_object":  ".edit-game_object",
      "edit_requirements": ".edit-requirements",

      "name":        "#object-name",

      "title":           "#trigger-title",
      "latitude":        "#trigger-latitude",
      "longitude":       "#trigger-longitude",
      "distance":        "#trigger-distance",
      "infinite":        "#trigger-infinite",
      "wiggle":          "#trigger-wiggle",
      "show_title":      "#trigger-show_title",
      "hidden":          "#trigger-hidden",
      "code":            "#trigger-code",
      "seconds":         "#trigger-seconds",
      "beacon_uuid":     "#trigger-beacon_uuid",
      "beacon_major":    "#trigger-beacon_major",
      "beacon_minor":    "#trigger-beacon_minor",
      "quantity":        "#instance-infinite_quantity",
      "quantity_amount": "#instance-quantity",

      "trigger_types": ".trigger-type",
      "trigger_enter": ".trigger-enter",
      "beacon_enter": ".beacon-enter",
      "beacon_distance": ".beacon-distance",

      "trigger_type_tabs":  ".type-trigger-tab",
      "trigger_enter_tabs": ".enter-trigger-tab",

      "title_container":    ".title-container",
      "quantity_container": ".quantity-container",

      "object_name": ".game_object-name",

      "qr_image":   ".qr_image",
      "map_canvas": ".map-canvas",
      "icon":       ".change-icon img",

      "autofocus":  "input[autofocus]"
    },

    templateHelpers: function()
    {
      var self = this;
      return {
        is_new: self.model.isNew(),
        in_modal: self.options.in_modal,

        // Using views icon since we are not directly changing the model until save.
        icon_thumbnail_url: self.icon.thumbnail_for(self.model),

        // Game Object Attributes
        game_object_id: self.game_object.id,
        name: self.game_object.get('name'),

        // Instance Attributes
        quantity_fields_visible: self.game_object.is_a(Item),
        instance_infinite_quantity: self.instance.get("infinite_qty"),
        instance_quantity: self.instance.get("qty")
      }
    },

    set_icon: function(media)
    {
      var self = this;
      // if not 0 use this, else thumb for self.game_model
      if(self.model.get("icon_media_id") === "0") self.ui.icon.attr("src", self.game_object.icon_thumbnail());
      else                                        self.ui.icon.attr("src", media.thumbnail_for(self.model));
    },

    set_name: function(game_object)
    {
      var self = this;
      var name = game_object.get("name");
      self.ui.object_name.text(name);
      self.ui.title.attr('placeholder', name);
    },

    // FIXME bug where new view is created before previous is reset if clicking on same object. (Need to use proxy objects for edit views)
    onClose: function()
    {
      var self = this;
      self.instance.attributes = _.clone(self.previous_instance_attributes);
    },

    initialize: function(options)
    {
      var self = this;
      self.icon        = self.model.icon();

      self.scene       = options.scene;
      self.game_object = options.game_object;
      self.instance    = options.instance;

      self.previous_instance_attributes = _.clone(self.instance.attributes);

      self.bindIconAssociation();
      self.bindGameObjectAssociation();
    },

    onShow: function()
    {
      var self = this;
      self.ui.autofocus.focus();
    },

    onRender: function()
    {
      var self = this;
      self.object_selector_view = new TriggerObjectSelectorView({model:self.model, el:self.$el.find('#trigger_object_selector')});
      self.object_selector_view.render();

      self.listenTo(self.object_selector_view, "game_object:choose", self.onChangeGameObject);

      self.ar_target_selector_view = new TriggerARTargetSelectorView({model:self.model, el:self.$el.find('#trigger_ar_target_selector')});
      self.ar_target_selector_view.render();
      self.listenTo(self.ar_target_selector_view, "trigger_target:choose", self.onChangeARTarget);

      self.hide_type_tabs();

      setTimeout(function() {self.renderMap()}, 300);
      self.initializeQR();
    },

    events:
    {
      "click @ui.save":   "onClickSave",
      "click @ui.delete": "onClickDelete",
      "click @ui.cancel": "onClickCancel",

      "click @ui.change_icon":       "onClickChangeIcon",
      "click @ui.edit_requirements": "onClickEditRequirements",

      "change @ui.quantity":      "onChangeQuantity",
      "change @ui.infinite":      "onChangeInfinity",
      "change @ui.show_title":    "onChangeShowTitle",
      "change @ui.trigger_types": "onChangeType",
      "change @ui.trigger_enter": "onChangeTriggerEnter",
      "change @ui.beacon_enter": "onChangeBeaconEnter",
      "change @ui.beacon_distance": "onChangeBeaconDistance",

      "change @ui.code": "onChangeCode",
      "keyup  @ui.code": "onChangeCode",
      "change @ui.seconds": "onChangeSeconds",
    },

    onClickSave: function()
    {
      var self = this;

      var instance    = self.instance;
      var game_object = self.game_object;
      var trigger     = self.model;

      // TODO unwravel unto promises with fail delete (or a single api call that has a transaction)

      /*this is terrible*/
      if(game_object.type_name == 'EventPackage' && game_object.id) //game object already exists, need to slap on its collection otherwise save will override (this is ridiculous)
      {
        var events = new EventsCollection([], {parent:game_object});

        $.when(
          events.fetch()
        ).done(function()
        {
          game_object.set("events", events);
          self.finishSaving(true);
        });
      }
      else
        self.finishSaving(true);
    },

    saveNoClose: function()
    {
      var self = this;

      var instance    = self.instance;
      var game_object = self.game_object;
      var trigger     = self.model;

      // TODO unwravel unto promises with fail delete (or a single api call that has a transaction)

      /*this is terrible*/
      if(game_object.type_name == 'EventPackage' && game_object.id) //game object already exists, need to slap on its collection otherwise save will override (this is ridiculous)
      {
        var events = new EventsCollection([], {parent:game_object});

        $.when(
          events.fetch()
        ).done(function()
        {
          game_object.set("events", events);
          self.finishSaving(false);
        });
      }
      else
        self.finishSaving(false);
    },

    //this is necessary because the above infrastructure is ridiculous
    finishSaving: function(closeAfterSave)
    {
      var self = this;

      var instance    = self.instance;
      var game_object = self.game_object;
      var trigger     = self.model;

      game_object.save({},
      {
        create: function()
        {
          storage.add_game_object(game_object);
        },
        success: function()
        {
          // Save Instance

          instance.set("object_id",   game_object.id);
          instance.set("object_type", Instance.type_for(game_object));

          if(game_object.is_a(Item))
          {
            instance.set("qty", self.ui.quantity_amount.val());
            instance.set("infinite_qty", self.ui.quantity.is(":checked") ? "1" : "0");
          }

          instance.save({},
          {
            create: function()
            {
              storage.add_game_object(instance);
            },

            success: function()
            {
              // For undo
              self.previous_instance_attributes = _.clone(instance.attributes);

              // Save Trigger
              trigger.set("instance_id", instance.id);

              trigger.set("title",             self.ui.title.val());
              trigger.set("qr_code",           self.ui.code.val());

              trigger.set("wiggle",            self.ui.wiggle.is    (":checked") ? "1" : "0");
              trigger.set("show_title",        self.ui.show_title.is(":checked") ? "1" : "0");
              trigger.set("hidden",            self.ui.hidden.is    (":checked") ? "1" : "0");
              trigger.set("infinite_distance", self.ui.infinite.is  (":checked") ? "1" : "0");

              trigger.set("type",              self.$el.find(".trigger-type:checked").val());
              trigger.set("trigger_on_enter",  self.$el.find(".trigger-enter:checked").val());

              trigger.set("icon_media_id",     self.icon.get("media_id"));
              trigger.set("seconds",           self.ui.seconds.val());

              if (trigger.get('type') === 'BEACON') {
                trigger.set("beacon_uuid",       self.ui.beacon_uuid.val());
                trigger.set("beacon_major",      self.ui.beacon_major.val());
                trigger.set("beacon_minor",      self.ui.beacon_minor.val());
                trigger.set("distance",          self.$el.find(".beacon-distance:checked").val());
                trigger.set("trigger_on_enter",  self.$el.find(".beacon-enter:checked").val());
              }

              trigger.save({},
              {
                create: function()
                {
                  storage.add_game_object(trigger);

                  if (closeAfterSave) vent.trigger("application:popup:hide");
                }
              }); /* Trigger save */
            }
          }); /* Instance save */
        }
      }); /* Game Object save */
    },

    onClickDelete: function()
    {
      var self = this;

      self.model.destroy(
      {
        success: function()
        {
          self.close();
        }
      });
    },

    onClickCancel: function()
    {
      var self = this;
      self.close();
      vent.trigger("application:popup:hide");
    },

    /* Association Binding */

    unbindIconAssociation: function()
    {
      var self = this;
      self.stopListening(self.icon);
      self.stopListening(self.game_object.icon());
    },

    bindIconAssociation: function()
    {
      var self = this;
      self.listenTo(self.icon,               'change', self.set_icon);
      self.listenTo(self.game_object.icon(), 'change', self.set_icon);
    },

    bindGameObjectAssociation: function()
    {
      var self = this;

      self.listenTo(self.game_object, "update", function(game_object)
      {
        self.unbindIconAssociation();
        self.bindIconAssociation();
        self.set_name(self.game_object);
        self.set_icon(self.icon);
      });

      self.listenTo(self.game_object, "destroy", self.close);
    },

    unbindGameObjectAssociation: function()
    {
      var self = this;
      self.stopListening(self.game_object);
      self.unbindIconAssociation();
    },

    onChangeGameObject: function(game_object)
    {
      var self = this;
      self.unbindGameObjectAssociation();

      self.instance.set("object_id",   game_object.id);
      self.instance.set("object_type", Instance.type_for(game_object));
      self.game_object = game_object;
      self.bindGameObjectAssociation();
      self.icon = self.model.icon();

      self.set_name(self.game_object);
      self.set_icon(self.icon);

      // Change to sequence if scene or factory.
      if(self.instance.get("object_type") === "SCENE" || self.instance.get("object_type") === "FACTORY")
      {
        var trigger_radio = ".trigger-type[value=IMMEDIATE]";
        self.$el.find(trigger_radio).click();

        self.$el.find('.trigger-type').parent().addClass('hidden');
        self.$el.find('.trigger-type[value=IMMEDIATE]').parent().removeClass('hidden');
        self.$el.find('.trigger-type[value=IMMEDIATE]').parent().addClass('only_button');
      }
      else
      {
        // Unhide buttons
        self.$el.find('.trigger-type').parent().removeClass('hidden');
        self.$el.find('.trigger-type[value=IMMEDIATE]').parent().removeClass('only_button');
      }

      // Toggle quantity visibility.
      if(self.game_object.is_a(Item))
      {
        self.$el.find('#instance-quantity-fields').removeClass('hidden');
      }
      else
      {
        self.$el.find('#instance-quantity-fields').addClass('hidden');
      }
    },

    onChangeARTarget: function(trigger_target_id)
    {
      var self = this;

      self.instance.set("ar_target_id", trigger_target_id);
    },

    hide_type_tabs: function()
    {
      var self = this;
      if(self.instance.get("object_type") === "SCENE" || self.instance.get("object_type") === "FACTORY")
      {
        self.$el.find('.trigger-type').parent().addClass('hidden');
        self.$el.find('.trigger-type[value=IMMEDIATE]').parent().removeClass('hidden');
        self.$el.find('.trigger-type[value=IMMEDIATE]').parent().addClass('only_button');
      }
    },

    /* Radio Logic */

    onChangeType: function()
    {
      var self = this;

      // Hide radio buttons and add bootstrap classes
      //
      var selected_radio = self.$el.find(".trigger-type:checked");

      self.ui.trigger_types.parent().removeClass("active");
      selected_radio.parent().addClass("active");

      // Hide all and open selected tab
      //
      self.ui.trigger_type_tabs.hide();

      var display_tab = "#" + selected_radio.val() + "-fields";
      self.$el.find(display_tab).show();

      // Hidden maps have rendering issues.
      setTimeout(function() {self.renderMap()}, 300);
    },

    onChangeTriggerEnter: function()
    {
      var self = this;

      // Hide radio buttons and add bootstrap classes
      var selected_radio = self.$el.find(".trigger-enter:checked");

      self.ui.trigger_enter.parent().removeClass("active");
      selected_radio.parent().addClass("active");

      // Hide all and open selected tab
      self.ui.trigger_enter_tabs.hide();

      var display_tab = "#" + selected_radio.val() + "-fields";
      self.$el.find(display_tab).show();
    },

    onChangeBeaconEnter: function()
    {
      var self = this;

      // Hide radio buttons and add bootstrap classes
      var selected_radio = self.$el.find(".beacon-enter:checked");

      self.ui.beacon_enter.parent().removeClass("active");
      selected_radio.parent().addClass("active");
    },

    onChangeBeaconDistance: function()
    {
      var self = this;

      // Hide radio buttons and add bootstrap classes
      var selected_radio = self.$el.find(".beacon-distance:checked");

      self.ui.beacon_distance.parent().removeClass("active");
      selected_radio.parent().addClass("active");
    },

    onChangeInfinity: function()
    {
      var self = this;
      if(self.ui.infinite.is(":checked"))
      {
        self.drag_marker.setIcon("images/marker-green.png");
        self.range_marker.setVisible(false);
      }
      else
      {
        self.drag_marker.setIcon();
        self.range_marker.setVisible(true);
      }
    },

    onChangeQuantity: function()
    {
      var self = this;
      if(self.ui.quantity.is(":checked")) self.ui.quantity_container.hide();
      else                                self.ui.quantity_container.show();
    },

    onChangeShowTitle: function()
    {
      var self = this;
      if(self.ui.show_title.is(":checked")) self.ui.title_container.show();
      else                                  self.ui.title_container.hide();
    },


    /* Media Selector */

    onClickChangeIcon: function()
    {
      var self = this;
      self.saveNoClose();

      var game  = self.model.game();
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          /* Add default */
          media.unshift(self.model.default_icon());

          /* Icon */
          var icon_chooser = new MediaChooserView({collection: media, selected: self.icon, context: self.model});
          vent.trigger("application:popup:show", icon_chooser, "Choose Icon");

          icon_chooser.on("media:choose", function(media)
          {
            self.unbindIconAssociation();
            self.icon = media;
            self.bindIconAssociation();
            self.set_icon(media);
            vent.trigger("application:popup:hide");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:hide");
          });
        }
      });
    },

    onClickEditRequirements: function()
    {
      var self = this;

      var requirement_package = new RequirementPackage({requirement_root_package_id: self.model.get("requirement_root_package_id"), game_id: self.model.get("game_id")});

      var game = self.model.game();

      var contents =
      {
        tags:      storage.tags,
        quests:    storage.quests,
        web_hooks: storage.web_hooks,
        items:     storage.items,
        plaques:   storage.plaques,
        web_pages: storage.web_pages,
        dialogs:   storage.dialogs,

        dialog_scripts: storage.dialog_scripts
      };
      contents.event_packages = storage.event_packages;

      if(requirement_package.id === "0") { requirement_package.fetch = function() {}; }

      $.when(
        contents.items.fetch(),
        contents.tags.fetch(),
        contents.plaques.fetch(),
        contents.dialogs.fetch(),
        contents.dialog_scripts.fetch(),
        contents.web_pages.fetch(),
        contents.quests.fetch(),
        contents.web_hooks.fetch(),
        requirement_package.fetch()
      ).done(function()
      {
        // Load associations into collections
        var and_packages = new AndPackagesCollection(requirement_package.get("and_packages"));
        requirement_package.set("and_packages", and_packages);

        and_packages.each(function(and_package)
        {
          var atoms = new AtomsCollection(and_package.get("atoms"));
          and_package.set("atoms", atoms);
        });

        // launch editor
        var requirements_editor = new RequirementsEditorView({model: requirement_package, collection: and_packages, contents: contents});

        requirements_editor.on("cancel", function()
        {
          vent.trigger("application:popup:hide");
        });

        requirements_editor.on("requirement_package:save", function(requirement_package)
        {
          self.model.set("requirement_root_package_id", requirement_package.id);
          self.model.save({"requirement_root_package_id": requirement_package.id});

          vent.trigger("application:popup:hide");
        });

        vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
      });
    },

    initializeQR: function()
    {
      var self = this;
      self.qr_code = new QRCode(self.ui.qr_image.get(0), self.model.get("qr_code"));
    },

    onChangeCode: function()
    {
      var self = this;
      self.qr_code.makeCode(self.ui.code.val());
    },

    onChangeSeconds: function()
    {
      var self = this;
    },

    renderMap: function()
    {
      var self = this;

      // Render Map
      var element = self.ui.map_canvas.get(0);

      // Add Trigger Location to map
      var location_position;
      if(self.model.get("latitude") == "0")
        location_position = new google.maps.LatLng(util.default_location().latitude, util.default_location().longitude);
      else
        location_position = new google.maps.LatLng(self.model.get("latitude"), self.model.get("longitude"));

      var map_options =
      {
        zoom: 8,
        center: location_position,
        scrollwheel:false,
        zoomControl:true,
      };
      var map = new google.maps.Map(element, map_options);
      var boundary = new google.maps.LatLngBounds();

      boundary.extend(location_position);

      var circle_marker = new google.maps.Circle({
        center: location_position,
        draggable: true,
        editable: true,
        radius: parseFloat(self.model.get("distance")),
        suppressUndo: true,
        map: map,
        fillColor: '#428bca',
        strokeColor: '#428bca'
      });

      var drag_marker = new google.maps.Marker({
        position: location_position,
        title: self.model.get("title"),
        map: map,
        draggable: true
      });

      self.range_marker = circle_marker;
      self.drag_marker  = drag_marker;

      if(self.ui.infinite.is(":checked"))
      {
        drag_marker.setIcon("images/marker-green.png");
        circle_marker.setVisible(false);
      }

      circle_marker.bindTo('center', drag_marker, 'position');

      var center_on = function(circle)
      {
        // Add circle radius to map boundary
        boundary = circle.getBounds();

        // Fit map to all locations
        map.setCenter(boundary.getCenter());
        map.fitBounds(boundary);
      }

      // Initial view
      center_on(circle_marker);

      // Track drag and resize
      google.maps.event.addListener(circle_marker, 'radius_changed', 
        function(event)
        {
          self.model.set("distance", circle_marker.getRadius());
          center_on(circle_marker);
        }
      );

      google.maps.event.addListener(circle_marker, 'dragend', 
        function(event)
        {
          var center = circle_marker.getCenter();
          self.model.set("latitude",  center.lat());
          self.model.set("longitude", center.lng());
          center_on(circle_marker);
        }
      );

      google.maps.event.addListener(drag_marker, 'dragend', 
        function(event)
        {
          var center = circle_marker.getCenter();
          self.model.set("latitude",  center.lat());
          self.model.set("longitude", center.lng());
          center_on(circle_marker);
        }
      );
    }
  });
});

