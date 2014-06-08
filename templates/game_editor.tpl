<div class="shrink-center well well-lg">
	<form class="form">
	<h4>
		<% if(is_new) { %>
			Create Game
		<% } else { %>
			Edit Game <span class="object-id text-muted"><%= game_id %></span>
		<% } %>
	</h4>

	<div class="form-group">
		<label for="game-name">Name</label>
		<input type="text" class="form-control" id="game-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="game-description">Description</label>
		<input type="text" class="form-control" id="game-description" placeholder="Description" value="<%= description %>">
	</div>


	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>
		<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
	</div>
	</form>
</div>
