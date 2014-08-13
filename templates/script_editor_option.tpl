<div style="display: inline-block; text-align: center;">
	<div class="panel panel-default" style="padding: 0.25em; display: inline-block; width: 250px; margin-bottom: 5px;">
		<div class="form-group">
			<input type="text" class="form-control" value="<%= prompt %>">
		</div>

		<div>
			<%= link_type %>
			<%= link_id %>
			<%= link_info %>
		</div>

		<button type="button" class="btn btn-block btn-warning">
			<span class="glyphicon glyphicon-lock"></span>
			Locks
		</button>
	</div>

	<br/>

	<div class="child_script_<%= dialog_option_id %>">
	</div>
</div>
