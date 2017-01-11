<select class="form-control" id="instance-ar_target_id">
	<option value="0" selected disabled>- No AR Target -</option>

	<% ar_targets.each(function(ar_target) { %>
		<option value="<%= ar_target.id %>" <%= option_selected(trigger_target_id === ar_target.id) %>>
			<%= ar_target.get("name") %>
		</option>
	<% }); %>

</select>

