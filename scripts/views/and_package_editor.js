define([
	'underscore',
	'backbone',
	'text!templates/and_package_editor.tpl',
	'views/atom',
	'models/atom',
	'vent'
], function(_, Backbone, Template, AtomEditorView, Atom, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: AtomEditorView,
		itemViewContainer: ".atoms",

		itemViewOptions: function(model, index) {
			return { items: this.items }
		},

		initialize: function(options) {
			this.items = options.items;
		},

		events: {
			"click .new-atom": "onClickNewAtom",
			"click .delete-and-package": "onClickDeleteAndPackage"
		},

		onClickNewAtom: function() {
			var atom = new Atom();
			this.collection.add(atom);
		},

		onClickDeleteAndPackage: function() {
			this.trigger("andpackage:remove", this.model);
		},

		// Child View Events
		onItemviewAtomRemove: function(item_view, atom) {
			this.collection.remove(atom);
		}
	});
});

