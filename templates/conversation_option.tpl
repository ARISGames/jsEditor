<div style="display: inline-block; text-align: center;">

	<div style="margin:0px auto; width:200px; position:relative;">
		<!-- Hack- draw vertical 'line' with thin div w/ 1 px border. -->
		<div style="margin:0px auto; width:0px; height:40px; border-left:2px solid black;">
		</div>

		<div class="script-option-inject inject-option conversation-button" style="position:absolute; top:10px; left:80px;">
			<span class="glyphicon glyphicon-chevron-down"></span>
		</div>

	<!-- Holy wow is this a hack. Cover up horizontal line draw overflows with opaque divs at either end of options list. -->
	<% if(isFirst) { %>
		<div style="background-color:#D2D2D2; position:absolute; top:-5px; right:150px; width:49%; height:10px;"></div>
		<div style="background-color:#D2D2D2; position:absolute; top:-5px; left:0px; width:100px; height:10px;"></div>
	<% } %>
	<% if(isLast) { %>
		<div style="background-color:#D2D2D2; position:absolute; top:-5px; left:150px; width:49%; height:10px;"></div>
		<div style="background-color:#D2D2D2; position:absolute; top:-5px; right:0px; width:99px; height:10px;"></div>
	<% } %>
	</div>

	<div class="script-option-panel panel panel-<%= link_color %> info edit-option" style="display: inline-block; position:relative; width: 200px; margin-bottom: 5px;">

		<div class="panel-heading">
			<div class="option-text" style="overflow: hidden;">
				<span class="glyphicon glyphicon-<%= link_icon %>"></span>
				<%= sanitize_html(prompt) %>
			</div>
		</div>
	</div>

	<br/>

	<% if(model.get("link_type") === "DIALOG_SCRIPT") {
			var dialog_script = scripts.findWhere({dialog_script_id: model.get("link_id")});

			if(dialog_script.get("rendered") === true) { %>
				<div class="script-panel panel panel-warning clearfix" style="display: inline-block; width: 300px; margin-bottom: 20px; overflow:hidden;">
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
