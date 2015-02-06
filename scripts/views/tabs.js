define(function(require)
{
	var EditorCollectionView = require('views/editor_collection_base');

	var _                  = require('underscore');
	var jQueryUiDraggable  = require('jquidrag');
	var Template           = require('text!templates/tabs.tpl');
	var TabRowView         = require('views/tab_row');
	var TabEditorView      = require('views/tab_editor');
	var Tab                = require('models/tab');
	var Media              = require('models/media');
	var Game               = require('models/game');
	var ItemsCollection    = require('collections/items');
	var PlaquesCollection  = require('collections/plaques');
	var WebPagesCollection = require('collections/web_pages');
	var DialogsCollection  = require('collections/dialogs');
	var vent               = require('vent');


	return EditorCollectionView.extend({
		template: _.template(Template),

		itemView: TabRowView,
		itemViewContainer: '.tabs',

		className: 'tabs-editor',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var view = this;

			var game = this.model;
			var tab  = new Tab({game_id: game.id});

			var contents = {
				plaques:    new PlaquesCollection  ([], {parent: game}),
				items:      new ItemsCollection    ([], {parent: game}),
				web_pages:  new WebPagesCollection ([], {parent: game}),
				dialogs:    new DialogsCollection  ([], {parent: game}),
			};

			$.when(contents.plaques.fetch(), contents.items.fetch(), contents.web_pages.fetch(), contents.dialogs.fetch()).done(function()
			{
				var tab_editor = new TabEditorView({model: tab, contents: contents});

				tab_editor.on("tab:add", function(tab) {
					view.collection.add(tab);
				});

				vent.trigger("application:popup:show", tab_editor, "Create Tab");
			});
		},

		onRender: function()
		{
			var sort_options = {
				items: '.draggable-game-tab',
				handle: '.tab-drag-handle',
				stop: function( event, ui ) { vent.trigger("tabrow:released", ui.item, ui.item.index()); }
			};

			this.$el.find('.list-group.tabs').sortable(sort_options);
		}
	});
});
