<form class="form tab-editor" role="form" onsubmit="return false;">
	<!-- Tab attributes -->

	<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
		<span class="object-id text-muted"><%= is_new ? "" : tab_id %></span>
	</h4>

	<div class="form-group">
		<label for="name">Name</label>
		<input type="text" autofocus class="form-control" id="name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="info">Info</label>
		<input type="text" class="form-control" id="info" placeholder="Info" value="<%= info %>">
	</div>

	<div class="form-group">
		<div class="thumbnail change-icon">
			<img src=<%= icon_thumbnail_url %>>
			<div class="caption">
				<button type="button" class="btn btn-link btn-info btn-block change-icon">
					<span class="glyphicon glyphicon-picture"></span>
					Icon
				</button>
			</div>
		</div>
	</div>

	<div class="form-group">
		<button type="button" class="btn btn-block btn-warning edit-requirements">
			<span class="glyphicon glyphicon-lock"></span>
			Locks
		</button>
	</div> <!-- Buttons -->

	<div class="form-group">
		<label for="type">Type</label>

		<select class="form-control" id="type">
			<% _.each(tab_types, function(tab_name, tab_value) { %>
				<option value="<%= tab_value %>" <%= option_selected(type === tab_value) %>><%= tab_name %></option>
			<% }); %>
		</select>
	</div>

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>

		<% if(!is_new) { %>
			<button type="button" class="btn btn-danger delete">
				Delete
			</button>
		<% } %>

		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
