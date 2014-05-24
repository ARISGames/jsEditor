define([
	'underscore',
	'backbone',
	'text!../../templates/requirements.tpl',
	'collections/requirements',
	'views/requirement_item',
], function(_, Backbone, Template, RequirementCollection, RequirementItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: RequirementItemView,

	    // Bootstrap wrapper
		tagName: "table",
		className: "table",


		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			// this needs to be smart to know the type of parent we're using.
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+"/requirements/new", {trigger: true});
		}
	});
});
