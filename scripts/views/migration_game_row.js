define(function(require)
{
	var _        = require('underscore');
	var _S       = require('underscore.string');
	var Backbone = require('backbone');
	var Template = require('text!templates/migration_game_row.tpl');

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item clearfix",

		initialize: function(options)
		{
			this.listenTo(this.model, 'change', this.render);
		},

		templateHelpers: function()
		{
			return {
				icon_thumb_url:     this.model.icon_thumbnail(),
				my_migration_count: this.model.get("my_prev_migrations").length,
				migration_count:    this.model.get("prev_migrations"   ).length
			}
		},

		events: {
			"click": "onClickMigrate"
		},

		onClickMigrate: function() {
			this.model.migrate();
		}
	});
});
