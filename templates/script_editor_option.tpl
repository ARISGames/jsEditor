<div style="display: inline-block; text-align: center;">
	<div class="script-option-panel panel panel-default" style="padding: 0.25em; display: inline-block; width: 250px; margin-bottom: 5px;">
		<div class="form-group">
			<input type="text" class="form-control" value="<%= prompt %>">
		</div>

		<div class="form-group">
			<select class="form-control boolean-operator">
				<% _.each(link_types, function(type_name, type_value) { %>
					<option value="<%= type_value %>" <%= option_selected(link_type === type_value) %>><%= type_name %></option>
				<% }); %>
			</select>
		</div>

		<div class="form-group">
			<select class="form-control boolean-operator">
				<% scripts.each(function(script) { %>
					<option value="<%= script.id %>" <%= option_selected(link_id === script.id) %>><%= _.str.prune(script.get("text"), 30) %></option>
				<% }); %>
			</select>
		</div>

		<!--
		<div class="form-group">
			<input type="text" class="form-control" value="<%= link_info %>">
		</div>-->

		<button type="button" class="btn btn-block btn-warning edit-requirements">
			<span class="glyphicon glyphicon-lock"></span>
			Locks
		</button>
	</div>

	<br/>

	<div class="child_script_<%= dialog_option_id %>">
	</div>
</div>
