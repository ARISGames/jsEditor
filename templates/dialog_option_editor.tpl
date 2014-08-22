<br />

<h4>Edit Choice <span class="object-id text-muted"><%= is_new ? "" : dialog_option_id %></span></h4>

<form class="form" role="form" onsubmit="return false;">
<div class="form-group">
	<button type="button" class="btn btn-block btn-warning edit-requirements">
		<span class="glyphicon glyphicon-lock"></span>
		Locks
	</button>
</div>

<div class="form-group">
	<label>Prompt</label>
	<input autofocus type="text" class="form-control prompt" value="<%= prompt %>">
</div>

<div class="form-group">
	<label>Action</label>

	<select class="form-control link-type">
		<% _.each(link_types, function(type_name, type_value) { %>
			<option value="<%= type_value %>" <%= option_selected(link_type === type_value) %>><%= type_name %></option>
		<% }); %>
	</select>
</div>

<% if(link_options_visible) { %>
	<div class="form-group">
		<label>Destination</label>

		<select class="form-control link-id">
			<option value="0" selected disabled>- Select One -</option>

			<% if(link_scripts) { %>
				<% scripts.each(function(script) { %>
					<option value="<%= script.id %>" <%= option_selected(link_id === script.id) %>><%= _.str.prune(script.get("text"), 600) %></option>
				<% }); %>
			<% } %>

			<% if(link_plaques) { %>
				<% plaques.each(function(plaque) { %>
					<option value="<%= plaque.id %>" <%= option_selected(link_id === plaque.id) %>><%= plaque.get("name") %></option>
				<% }); %>
			<% } %>

			<% if(link_items) { %>
				<% items.each(function(item) { %>
					<option value="<%= item.id %>" <%= option_selected(link_id === item.id) %>><%= item.get("name") %></option>
				<% }); %>
			<% } %>

			<% if(link_web_pages) { %>
				<% web_pages.each(function(web_page) { %>
					<option value="<%= web_page.id %>" <%= option_selected(link_id === web_page.id) %>><%= web_page.get("name") %></option>
				<% }); %>
			<% } %>

			<% if(link_dialogs) { %>
				<% dialogs.each(function(dialog) { %>
					<option value="<%= dialog.id %>" <%= option_selected(link_id === dialog.id) %>><%= dialog.get("name") %></option>
				<% }); %>
			<% } %>

			<% if(link_tabs) { %>
				<% tabs.each(function(tab) { %>
					<option value="<%= tab.id %>" <%= option_selected(link_id === tab.id) %>><%= tab.get("name") %></option>
				<% }); %>
			<% } %>

		</select>
	</div>
<% } %> <!-- link options visible -->


<!-- For scanner tab only
<div class="form-group">
	<label>Destination</label>
	<input type="text" class="form-control" value="<%= link_info %>">
</div>
-->

<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<button type="button" class="btn btn-default cancel">
		Cancel
	</button>
</div>
</form>
