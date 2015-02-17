define(function(require)
{
	var _              = require('underscore');
	var Backbone       = require('backbone');
	var Template       = require('text!templates/games.tpl');
	var GameRowView    = require('views/game_row');
	var GameCreateView = require('views/game_create');
	var Game           = require('models/game');
	var vent           = require('vent');
	var config         = require('config');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: GameRowView,
		itemViewContainer: '.games',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var game = new Game();
			vent.trigger("application.show", new GameCreateView({model: game}));
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
