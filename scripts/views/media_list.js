define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/media_list.tpl',
	'collections/media',
	'views/media_item',
], function($, _, Backbone, Marionette, Template, MediaCollection, MediaItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: MediaItemView,
		itemViewContainer: '.itemViewContainer',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+"/media/new", {trigger: true});
		}

	});
});
