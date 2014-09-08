define([
       'backbone',
       'text!templates/factory_organizer.tpl',
       'views/factory_organizer_row',
	   'views/factory_editor',
	   'models/factory',
	   'models/media',
       'vent'
], function(Backbone, Template, FactoryOrganizerRowView, FactoryEditorView, Factory, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: FactoryOrganizerRowView,
		itemViewContainer: ".factories",


		initialize: function(options) {
			var view = this;

			vent.on("factory:add", function(factory) {
				view.collection.add(factory);
			});
		},


		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			var factory  = new Factory({game_id: this.model.get("game_id")});

			var icon  = new Media({media_id: factory.get("trigger_icon_media_id")});

			$.when(icon.fetch()).done(function () {
				var factory_editor = new FactoryEditorView({model: factory, icon: icon});
				vent.trigger("application:popup:show", factory_editor, "Create Factory");
			});
		}
	});
});
