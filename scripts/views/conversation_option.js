define([
	'underscore',
	'backbone',
	'text!templates/conversation_option.tpl',
	'models/dialog_script',
	'models/dialog_option',
	'views/dialog_option_editor',
	'vent'
], function(_, Backbone, Template, DialogScript, DialogOption, DialogOptionEditor, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		className: "script_option",

		events: {
			"click .edit-option": "onClickEdit",
			"click .inject-option": "onClickInject"
		},

		initialize: function(options) {
			this.scripts = options.scripts;
			this.dialog  = options.dialog;
			this.script_options = options.script_options;
			this.conversation_script_view = options.conversation_script_view;

			this.contents = options.contents;

			this.plaques   = options.contents.plaques;
			this.items     = options.contents.items;
			this.web_pages = options.contents.web_pages;
			this.dialogs   = options.contents.dialogs;
			this.tabs      = options.contents.tabs;
		},


		templateHelpers: function() {
			return {
				model: this.model,
				scripts: this.scripts,
				cid: this.model.cid,
				link_icon: this.linkIcon(),
				link_color: this.linkColor(),
				isFirst: this.model.firstOption,
				isLast: this.model.lastOption
			}
		},

		onClickEdit: function() {
			var option_editor = new DialogOptionEditor({model: this.model, scripts: this.scripts, script_options: this.script_options, contents: this.contents, DialogScript: DialogScript, DialogOption: DialogOption});
			vent.trigger("application:info:show", option_editor);
			return false;
		},

		onClickInject: function() {
			var view = this;

			var script = new DialogScript();
			script.set("game_id",this.model.get("game_id"));
			script.set("dialog_id",this.model.get("dialog_id"));
			script.set("text","Hello");
			script.save({}, {
				success: function() {
					var option = new DialogOption();
					option.set("game_id",view.model.get("game_id"));
					option.set("dialog_id",view.model.get("dialog_id"));
					option.set("parent_dialog_script_id",view.model.get("parent_dialog_script_id"));
					option.set("link_type","DIALOG_SCRIPT");
					option.set("link_id",script.get("dialog_script_id"));
					option.set("prompt","Continue");
					option.set("sort_index",view.model.get("sort_index"));
					option.save({},{
						success: function() {
							view.model.set("parent_dialog_script_id",script.get("dialog_script_id"));
							view.model.save({},{
								success: function() {
									view.scripts.push(script);
									view.script_options.push(option);
									vent.trigger("conversation:update");
								}
							});
						}
					});

				}
			})

			return false;
		},

		linkIcon: function() {
			switch(this.model.get("link_type")) {
				case "DIALOG_SCRIPT":
					return "arrow-down";
				case "EXIT":
					return "export";
				case "EXIT_TO_DIALOG":
					return "comment";
				case "EXIT_TO_PLAQUE":
					return "align-justify";
				case "EXIT_TO_ITEM":
					return "stop";
				case "EXIT_TO_WEB_PAGE":
					return "globe";
				case "EXIT_TO_TAB":
					return "list-alt";
			}
		},

		linkColor: function() {
			switch(this.model.get("link_type")) {
				case "DIALOG_SCRIPT":
					return "info";
				case "EXIT":
					return "success";
				case "EXIT_TO_DIALOG":
					return "success";
				case "EXIT_TO_PLAQUE":
					return "success";
				case "EXIT_TO_ITEM":
					return "success";
				case "EXIT_TO_WEB_PAGE":
					return "success";
				case "EXIT_TO_TAB":
					return "success";
			}
		},


		/* Nested rendering */
		onRender: function() {
			if(this.model.get("link_type") === "DIALOG_SCRIPT") {

				var dialog_script = this.scripts.findWhere({dialog_script_id: this.model.get("link_id")});

				// TODO need a handle on events so all related options have a chance to re-render this object if it gets removed elsewhere
				if(dialog_script.get("rendered") === false) {
					var child_view = this.$el.find(".child_script_"+this.model.cid);

					var conversation_view = new this.conversation_script_view({model: dialog_script, collection: dialog_script.get("dialog_options"), dialog: this.dialog, scripts: this.scripts, script_options: this.script_options, contents: this.contents, el: child_view, instance_parent_option:this.model});
					conversation_view.render();
				}
			}
		}
	});
});
