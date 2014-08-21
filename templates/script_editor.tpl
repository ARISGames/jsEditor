<div style="text-align: center; display: inline-block;">

	<% if(root_node) { %>
		<div class="script-option-panel panel panel-primary" style="display: inline-block; width: 200px; margin-bottom: 5px;">
			<div class="panel-heading">
				<div class="option-text" style="overflow: hidden;">
					Start
				</div>
			</div>
		</div>

		<br />
	<% } %>

	<div class="script-panel panel panel-default clearfix" style="display: inline-block; width: 300px; margin-bottom: 20px;">
		<div class="panel-body" style="padding: 0.5em;">
			<div class="thumbnail change-active-icon pull-left" style="width: 25%; margin-bottom: 0;">
				<img style="height: auto; width: 100%" src="<%= character.get("media").thumbnail() %>">
			</div>

			<div class="script-text pull-left" style="width: 70%; white-space: normal; text-align: left; padding-left: 0.5em;">
				<%= text %>
			</div>
		</div>
		<!--
		<div class="form-group">
			<textarea class="form-control" rows=3><%= text %></textarea>
		</div>-->

		<!-- <button type="button" class="btn btn-block btn-info edit-events">
			<span class="glyphicon glyphicon-user"></span>
			Modify Player
		</button>
		-->
	</div> <!-- script form -->

	<br/>

	<div class="script_options clearfix">
	</div>
</div>
