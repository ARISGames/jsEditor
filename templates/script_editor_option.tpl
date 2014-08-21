<div style="display: inline-block; text-align: center;">
	<div class="script-option-panel panel panel-<%= link_color %> info edit-option" style="display: inline-block; width: 200px; margin-bottom: 5px;">
		<div class="panel-heading">
			<div class="option-text" style="overflow: hidden;">
				<span class="glyphicon glyphicon-<%= link_icon %>"></span>
				<%= prompt %>
			</div>
		</div>
	</div>

	<br/>

	<% if(model.get("link_type") === "DIALOG_SCRIPT") {
			var dialog_script = scripts.findWhere({dialog_script_id: model.get("link_id")});

			if(dialog_script.get("rendered") === true) { %>
				<div class="script-panel panel panel-warning clearfix" style="display: inline-block; width: 300px; margin-bottom: 20px;">
					<div class="panel-heading" style="padding: 0.5em;">
						<span class="glyphicon glyphicon-open"></span>
						<%= dialog_script.get("text") %>
					</div>
				</div>
		<% }
	} %>

	<div class="child_script_<%= cid %>">
	</div>
</div>
