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
		itemViewContainer: '.itemViewContainer'

	});
});
