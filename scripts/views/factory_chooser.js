define([
	'backbone',
	'text!templates/factory_chooser.tpl',
	'models/factory',
	'models/trigger',
	'models/instance',
	'models/media',
	'views/factory_chooser_row',
	'views/factory_trigger_editor',
	'vent'
], function(Backbone, Template, Factory, Trigger, Instance, Media, FactoryChooserRowView, FactoryTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: FactoryChooserRowView,
		itemViewContainer: ".factorys",

		itemViewOptions: function(model, index) {
			return {
			  parent: this.options.parent
			}
		},

		events: {
			"click .new-factory": "onClickNewFactory"
		},

		/* TODO move complex sets like this into a controller */
		onClickNewFactory: function() {
			var factory   = new Factory   ({game_id: this.options.parent.get("game_id")});
			var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"),scene_id: this.options.parent.get("scene_id")});
			var instance = new Instance ({game_id: this.options.parent.get("game_id")});
			var icon     = new Media    ({media_id: trigger.get("icon_media_id")});

			var trigger_editor = new FactoryTriggerEditorView({scene: this.options.parent, icon: icon, factory: factory, instance: instance, model: trigger, visible_fields: "create_factory_with_trigger"});
			vent.trigger("application:popup:show", trigger_editor, "Add Web Page to Scene");
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
