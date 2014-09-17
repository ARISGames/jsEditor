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

	<div class="script-panel panel panel-default clearfix edit-script" style="display: inline-block; width: 300px; margin-bottom:0px;">
		<div class="panel-body" style="padding:0.5em;">
			<div class="thumbnail change-active-icon pull-left" style="width: 25%; margin-bottom: 0px;">
				<img style="height: auto; width: 100%" src="<%= character.get("media").thumbnail() %>">
			</div>

			<div class="script-text pull-left" style="width: 70%; white-space: normal; text-align: left; padding-left: 0.5em;">
				<%= text %>
			</div>
		</div>
	</div>

	<!-- Hack- draw vertical 'line' with thin div w/ 1 px border. -->
	<div style="margin:0px auto; width:200px; position:relative;">
		<div style="margin:0px auto; width:0px; height:40px; border-left:2px solid black;">
		</div>

		<div class="script-option-add add-option conversation-button" style="position:absolute; top:10px; right:80px;">
			<span class="glyphicon glyphicon-chevron-right"></span>
		</div>
	</div>

	<!-- Hack- draw horizontal 'line' with thin div w/ 1 px border. NOTE- will overflow past edge of end options. -->
	<div class="script-options-panel clearfix" style="border-top:2px solid black;">
		<div class="script_options clearfix" style="position:relative;">
		</div>
	</div>
</div>
