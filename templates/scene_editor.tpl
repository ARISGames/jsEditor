<div class="scene-info">
	<% if(!in_modal) { %>
		<h4>Scene <span class="object-id text-muted"><%= is_new ? "" : scene_id %></span></h4>
	<% } %>
	<form class="form" role="form" onsubmit="return false;">

		<div class="form-group">
			<label for="scene-name" class="sr-only">Name</label>
			<input type="text" class="form-control" autofocus id="scene-name" placeholder="Name" value="<%= name %>">
		</div>

		<div class="checkbox">
			<input type="checkbox" id="scene-intro" <%= is_checked(is_intro_scene ? "1" : "0") %>>
			<label for="scene-intro">
				Intro Scene
			</label>
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
