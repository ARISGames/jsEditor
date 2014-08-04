define([
	'underscore',
	'backbone',
	'text!templates/requirements.tpl',
	'views/and_package_editor',
	'models/and_package',
	'collections/atoms',
	'models/atom',
	'vent'
], function(_, Backbone, Template, AndPackageEditorView, AndPackage, AtomsCollection, Atom, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: AndPackageEditorView,
		itemViewContainer: ".and_packages",

		itemViewOptions: function(model, index) {
			return {
				collection: model.get("atoms"),
				items: this.items
			}
		},

		initialize: function(options) {
			this.items = options.items;
		},

		events: {
			"click .new-and-package": "onClickNewAndPackage",
			"click .save-all":  "onClickSaveAll",
			"click .cancel":    "onClickCancel"
		},

		onClickNewAndPackage: function() {
			var atom = new Atom();
			var atoms = new AtomsCollection([atom]);
			var and_package = new AndPackage({atoms:atoms});

			this.collection.add(and_package);
		},

		onClickSaveAll: function() {
			var view = this;
			event.preventDefault();

			// Save Event Package with children json
			//view.model.set("and_packages", view.collection);

			// Don't save package 0
			if(view.model.get("requirement_package_id") === "0") {
				view.model.unset("requirement_package_id");
			}

			view.model.save({}, {
				success: function() {
					view.trigger("requirement_package:save", view.model);
				}
			});
		},

		onClickCancel: function() {
			this.trigger("cancel");
		},


		// Child View Events
		onItemviewAndpackageRemove: function(item_view, and_package) {
			this.collection.remove(and_package);
		}
	});
});

