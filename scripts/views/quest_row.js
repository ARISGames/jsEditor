define(function(require)
{
	var _               = require('underscore');
	var Backbone        = require('backbone');
	var Template        = require('text!templates/quest_row.tpl');
	var QuestEditorView = require('views/quest_editor');
	var vent            = require('vent');

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				sanitize_html: this.sanitize_html
			}
		},

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		events: {
			"click .edit": "onClickEdit"
		},

		modelEvents: {
			"change": "render"
		},

		onClickEdit: function() {
			var view = this;

			var quest_editor = new QuestEditorView({model: view.model});
			vent.trigger("application:popup:show", quest_editor, "Edit Quest");
		},

		sanitize_html: function(html) {
			// Attempt 1
			//html.replace(/(<([^>]+)>)/ig,"")

			// Attempt 2
			//var tmp = document.createElement("DIV");
			//tmp.innerHTML = html;
			//return tmp.textContent || tmp.innerText;

			// Attempt 3
			var div = document.createElement('div');
			div.innerHTML = html;
			var scripts = div.getElementsByTagName('script');
			var i = scripts.length;
			while (i--) {
			  scripts[i].parentNode.removeChild(scripts[i]);
			}

			var styles = div.getElementsByTagName('style');
			var i = styles.length;
			while (i--) {
			  styles[i].parentNode.removeChild(styles[i]);
			}

			return div.textContent || div.innerText;
		}

	});
});
