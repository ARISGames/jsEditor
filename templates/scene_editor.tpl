<div class="scene-info">
	<h4>Scene <span class="object-id text-muted"><%= is_new ? "" : scene_id %></span></h4>
	<form class="form" role="form">
		<div class="form-group">
			<label for="scene-name" class="sr-only">Name</label>
			<input type="text" class="form-control" id="scene-name" placeholder="Name" value="<%= name %>">
		</div>

		<div class="form-group">
				<button type="submit" class="btn btn-primary save-scene">Save</button>
				<% if(!is_new) { %>
					<button class="btn btn-danger delete-scene">Delete</button>
				<% } %>
				<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
		</div>
	</form>
</div>
