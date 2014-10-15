define([
	'underscore',
	'backbone',
	'text!templates/tab_row.tpl',
	'views/tab_editor',
	'models/media',
	'models/game',
	'models/tab',
	'collections/items',
	'collections/plaques',
	'collections/web_pages',
	'collections/dialogs',
	'vent'
], function(_, Backbone, Template, TabEditorView, Media, Game, Tab, ItemsCollection, PlaquesCollection, WebPagesCollection, DialogsCollection, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		events: {
			"click": "onClickEdit"
		},

		modelEvents: {
			"change": "render"
		},

		templateHelpers: function() {
			return {
				display_type: this.model.get("name") !== Tab.tab_types[this.model.get("type")],
				tab_type: Tab.tab_types[this.model.get("type")]
			}
		},

		onClickEdit: function() {
			var view = this;

			var game = new Game({game_id: this.model.get("game_id")});
			var icon = new Media({media_id: this.model.get("icon_media_id")});

			var contents = {
				plaques:    new PlaquesCollection  ([], {parent: game}),
				items:      new ItemsCollection    ([], {parent: game}),
				web_pages:  new WebPagesCollection ([], {parent: game}),
				dialogs:    new DialogsCollection  ([], {parent: game}),
			};

			$.when(icon.fetch(), contents.plaques.fetch(), contents.items.fetch(), contents.web_pages.fetch(), contents.dialogs.fetch()).done(function()
			{
				var tab_editor = new TabEditorView({model: view.model, icon: icon, contents: contents});
				vent.trigger("application:popup:show", tab_editor, "Edit Tab");
			});
		}

	});
});
