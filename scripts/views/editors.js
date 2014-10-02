define([
	'underscore',
	'backbone',
	'text!templates/editors.tpl',
	'views/editor_row',
	'views/user_search',
	'models/editor',
	'vent'
], function(_, Backbone, Template, EditorRowView, UserSearchView, Editor, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: EditorRowView,
		itemViewContainer: '.editors',
		itemViewOptions: function(model, index) {
			return {
				editors: this.collection
			}
		},

		className: 'editor-sharing',

		events: {
			"click .add": "onClickAdd"
		},

		onClickAdd: function() {
			var view = this;

			var user_search = new UserSearchView();

			user_search.on("add", function(user) {
				var editor = new Editor({user_id: user.get("user_id"), game_id: view.model.get("game_id"), display_name: user.get("display_name"), user_name: user.get("user_name")});

				editor.save({}, {
					success: function() {
						view.collection.add(editor);
						vent.trigger("application:popup:hide");
					}
				});

			});

			vent.trigger("application:popup:show", user_search, "Add Editor to Game");
		},


		// Marionette override
		appendBuffer: function(compositeView, buffer) {
			var $container = this.getItemViewContainer(compositeView);
			$container.find(".foot").before(buffer);
		},

		appendHtml: function(compositeView, itemView, index){
			if (compositeView.isBuffering) {
			  compositeView.elBuffer.appendChild(itemView.el);
			}
			else {
			  // If we've already rendered the main collection, just
			  // append the new items directly into the element.
			  var $container = this.getItemViewContainer(compositeView);
			  $container.find(".foot").before(itemView.el);
			}
		}
	});
});
