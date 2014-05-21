<div class="scene-info">
	<h4>Scene <span class="scene-id text-muted"><%= scene_id %></span></h4>
	<div class="form-group">
		<label for="scene-name">Name</label>
		<input type="text" class="form-control" id="scene-name" placeholder="Name" value="<%= name %>">
	</div>

	<button type="button" class="btn btn-primary save-scene">Save</button>
	<% if(!model.isNew()) { %>
		<button class="btn btn-danger delete-scene">Delete</button>
	<% } %>
</div>
