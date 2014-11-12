define(function(require)
{
	var _             = require('underscore');
	var _S            = require('underscore.string');
	var JsonBaseModel = require('models/json_base');

	return JsonBaseModel.extend({
		idAttribute: 'media_id',


		amfphp_url_templates: {
			read:   "media.getMedia",
			update: "media.updateMedia",
			create: "media.createMedia",
			delete: "media.deleteMedia"
		},


		amfphp_url_attributes: function() {
			var attribute_list = [
				"game_id",
				"media_id",
				"name",
				"file_name",
				"data"
			];

			// FIXME temporary fix for optional attribute, might need to remove the fixed attribute logic and make it a white list (with non nulls) that gets sent? (make sure nothing ever needs to be nulled out)
			if(this.get("data")) {
				return attribute_list;
			}
			else {
				return _.without(attribute_list, "data");
			}
		},


		defaults: {
			"name": "Default",
			"file_name": ""
		},


		is_video: function() {
			return this.get("file_name").match(/\.(avi|mp4|mkv|mpeg|mpg|mov|m4v|3gp)/);
		},

		is_audio: function() {
			return this.get("file_name").match(/\.(wav|mp3|alac|flac|caf|m4a)/);
		},


		// TODO show video in place!
		thumbnail: function() {
			if(this.id === "0") {
				return "images/default128.png";
			}
			else if(this.is_video()) {
				return "images/video128.png";
			}
			else if(this.is_audio()) {
				return "images/audio128.png";
			}
			else {
				return this.get("thumb_url");
			}
		},


		thumbnail_for: function(object) {
			if(this.id === "0")
			{
				var icon_name = "default";

				if(object)
				{
					// NOTE using this instead of instance of to remove possible require.js cycle reference
					if(object.idAttribute === "dialog_id")   { icon_name = "conversation" }
					if(object.idAttribute === "item_id")     { icon_name = "item"         }
					if(object.idAttribute === "plaque_id")   { icon_name = "plaque"       }
					if(object.idAttribute === "web_page_id") { icon_name = "webpage"      }
					if(object.idAttribute === "game_id")     { icon_name = "aris"         }

					if(object.idAttribute === "trigger_id")  {
						// NOTE this only works in scene triggers until storage is fixed.
						return object.game_object().icon_thumbnail();
					}

					if(object.idAttribute === "tab_id") {
						if(object.get("type") === "QUESTS")    { icon_name = "quests"    }
						if(object.get("type") === "MAP")       { icon_name = "map"       }
						if(object.get("type") === "INVENTORY") { icon_name = "inventory" }
						if(object.get("type") === "SCANNER")   { icon_name = "scanner"   }
						if(object.get("type") === "DECODER")   { icon_name = "scanner"   }
						if(object.get("type") === "PLAYER")    { icon_name = "player"    }
						if(object.get("type") === "NOTEBOOK")  { icon_name = "notebook"  }

						if(object.game_object())
						{
							return object.game_object().icon_thumbnail();
						}
					}

					if(object.idAttribute === "factory_id") {
						if(object.game_object())
						{
							return object.game_object().icon_thumbnail();
						}
					}
				}

				return "images/"+icon_name+"_icon_120.png"
			}
			else
			{
				return this.thumbnail();
			}
		},

		name_for: function(object) {
			if(object && object.idAttribute === "trigger_id" && this.id === "0")
			{
				var name = object.game_object().get('name') || 'Parent'
				return _.str.truncate(name, 7) + "'s Icon"
			}
			else
			{
				return this.get("name");
			}
		},

		content: function() {
			return this.get("url");
		}
	});
});
