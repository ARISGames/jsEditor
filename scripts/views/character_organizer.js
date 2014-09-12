define([
       'backbone',
       'text!templates/character_organizer.tpl',
       'views/character_organizer_row',
	   'views/character_editor',
	   'models/character',
	   'models/media',
       'vent'
], function(Backbone, Template, CharactersOrganizerRowView, CharacterEditorView, Character, Media, vent) {

       return Backbone.Marionette.CompositeView.extend({
			template: _.template(Template),

			itemView: CharactersOrganizerRowView,
			itemViewContainer: ".characters",

			events: {
				"click .new": "onClickNew"
			},

	   		initialize: function(options) {
				var view = this;

				vent.on("character:add", function(character) {
					view.collection.add(character);
				});
			},

			onClickNew: function() {
				var character = new Character({game_id: this.model.get("game_id")});

				var media = new Media({media_id: character.get("media_id")});

				$.when(media.fetch()).done(function()
				{
					var character_editor = new CharacterEditorView({model: character, media: media});
					vent.trigger("application:popup:show", character_editor, "Create Character");
				});
			}
       });
});
