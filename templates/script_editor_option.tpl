<div style="display: inline-block; text-align: center;">
	<div style="display: inline-block; width: 300px; padding-bottom: 10px; ">
		<div>
			<input type="text" value="<%= prompt %>">
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
