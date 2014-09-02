<div style="text-align: center; display: inline-block;">

	<% if(root_node) { %>
		<div class="script-option-panel panel panel-primary" style="display: inline-block; width: 200px; margin-bottom: 5px;">
			<div class="panel-heading">
				<div class="option-text" style="overflow: hidden;">
					<span class="glyphicon glyphicon-play"></span>
					Start
				</div>
			</div>
		</div>

		<br />
	<% } %>

	<div class="script-panel panel panel-default clearfix edit-script" style="display: inline-block; width: 300px; margin-bottom: 20px;">
		<div class="panel-body" style="padding:0.5em;">
			<div class="thumbnail change-active-icon pull-left" style="width: 25%; margin-bottom: 0;">
				<img style="height: auto; width: 100%" src="<%= character.get("media").thumbnail() %>">
			</div>

			<div class="script-text pull-left" style="width: 70%; white-space: normal; text-align: left; padding-left: 0.5em;">
				<%= text %>
			</div>
		</div>
	</div>

	<br/>
	<div class="script-options-panel clearfix">
		<div class="script_options clearfix" style="position:relative;">
			<div class="script-option-add add-option" style="display:block; position:absolute; width:60px; top:15px; right:-20px; margin-bottom:5px;">
				<span class="glyphicon glyphicon-plus-sign"></span>
			</div>
		</div>
	</div>
</div>
