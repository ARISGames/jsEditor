define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/game_editor.tpl',
	'collections/media',
	'views/media_chooser',
	'models/game',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, MediaChooserView, Game, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		className: "games-list-container",

		templateHelpers: function() {
			return {
				is_new : this.model.isNew(),
				icon_thumbnail_url:  this.icon.thumbnail(),
				media_thumbnail_url: this.media.thumbnail(),

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},

				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				}
			};
		},

		ui: {
			"name": "#game-name",
			"description": "#game-description",
			"published":"#game-published",
			"type":"#game-type",
			"intro_scene_id":"#game-intro_scene_id",
			"map_type":"#game-map_type",
			"map_latitude":"#game-map_latitude",
			"map_longitude":"#game-map_longitude",
			"map_zoom_level":"#game-map_zoom_level",
			"map_show_player":"#game-map_show_player",
			"map_show_players":"#game-map_show_players",
			"map_offsite_mode":"#game-map_offsite_mode",
			"notebook_allow_comments":"#game-notebook_allow_comments",
			"notebook_allow_likes":"#game-notebook_allow_likes",
			"notebook_allow_player_tags":"#game-notebook_allow_player_tags",
			"inventory_weight_cap":"#game-inventory_weight_cap"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save": "onClickSave",
			"click .cancel": "onClickCancel",
			"click .change-icon": "onClickIcon",
			"click .change-media": "onClickMedia",
		},

		initialize: function(options) {
			this.icon    = options.icon;
			this.media   = options.media;
		},

		onClickIcon: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Game Icon");

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
						view.model.set("icon_media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Game");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Game");
					});
				}
			});
		},

		onClickMedia: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media});
					vent.trigger("application:popup:show", icon_chooser, "Game Media");

					icon_chooser.on("media:choose", function(media) {
						view.media = media;
						view.model.set("media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Game");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Game");
					});
				}
			});
		},


		onClickSave: function() {
			var view = this;

			this.model.set("name",        this.ui.name.val());
			this.model.set("description", this.ui.description.val());
			this.model.set("published", this.ui.published.is(":checked") ? "1" : "0");
			this.model.set("type", this.ui.type.val());
			this.model.set("intro_scene_id", this.ui.intro_scene_id.val());
			this.model.set("map_type", this.ui.map_type.val());
			this.model.set("map_latitude", this.ui.map_latitude.val());
			this.model.set("map_longitude", this.ui.map_longitude.val());
			this.model.set("map_zoom_level", this.ui.map_zoom_level.val());
			this.model.set("map_show_player", this.ui.map_show_player.is(":checked") ? "1" : "0");
			this.model.set("map_show_players", this.ui.map_show_players.is(":checked") ? "1" : "0");
			this.model.set("map_offsite_mode", this.ui.map_offsite_mode.is(":checked") ? "1" : "0");
			this.model.set("notebook_allow_comments", this.ui.notebook_allow_comments.is(":checked") ? "1" : "0");
			this.model.set("notebook_allow_likes", this.ui.notebook_allow_likes.is(":checked") ? "1" : "0");
			this.model.set("notebook_allow_player_tags", this.ui.notebook_allow_player_tags.is(":checked") ? "1" : "0");
			this.model.set("inventory_weight_cap", this.ui.inventory_weight_cap.val());

			this.model.save({}, {
				create: function() {
					Backbone.history.navigate("#games/"+view.model.get('game_id')+"/scenes", {trigger: true});
				},

				update: function() {
					Backbone.history.navigate("#games/"+view.model.get('game_id')+"/scenes", {trigger: true});
				}
			});
		},

		onClickCancel: function() {
			if(this.model.isNew()) {
				Backbone.history.navigate("#games", {trigger: true});
			}
			else {
				Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true});
			}
		}

	});
});

