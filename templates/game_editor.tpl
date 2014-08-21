<div class="shrink-center well well-lg">
	<form class="form" role="form" onsubmit="return false;">
	<h4>
		<% if(is_new) { %>
			Create Game
		<% } else { %>
			Edit Game <span class="object-id text-muted"><%= game_id %></span>
		<% } %>
	</h4>

	<div class="form-group">
		<label for="game-name">Name</label>
		<input type="text" autofocus class="form-control" id="game-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="game-description">Description</label>
		<input type="text" class="form-control" id="game-description" placeholder="Description" value="<%= description %>">
	</div>

	<div class="panel panel-info">
		<div class="panel-heading">
			Media
		</div>
		<div class="panel-body">

			<div class="form-group row">
				<div class="col-xs-6 padded">
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

				<div class="col-xs-6 padded">
					<div class="thumbnail change-media">
						<img src=<%= media_thumbnail_url %>>
						<div class="caption">
							<button type="button" class="btn btn-link btn-info btn-block change-media">
								<span class="glyphicon glyphicon-facetime-video"></span>
								Media
							</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>


	<div class="form-group">
		<label>
			<input type="checkbox" id="game-ready_for_public" <%= is_checked(ready_for_public) %>>
			Published (available to public)
		</label>
	</div>

	<div class="form-group">
		<label for="game-intro_scene_id">Intro Scene</label>
		<input type="text" class="form-control" id="game-intro_scene_id" placeholder="0" value="<%= intro_scene_id %>">
	</div>


	<div class="panel panel-info">
		<div class="panel-heading">
			Map
		</div>
		<div class="panel-body">

			<div class="form-group">
				<label for="map_type">Type</label>

				<select class="form-control" id="game-map_type">
					<option value="NONE"        <%= option_selected(map_type === "STREET")    %>>Street</option>
					<option value="FULL_SCREEN" <%= option_selected(map_type === "SATELLITE") %>>Satellite</option>
					<option value="DROP_DOWN"   <%= option_selected(map_type === "HYBRID")    %>>Hybrid</option>
				</select>
			</div>

			<div class="form-group">
				<label for="game-map_latitude">Latitude</label>
				<input type="text" class="form-control" id="game-map_latitude" placeholder="0.0" value="<%= map_latitude %>">
			</div>

			<div class="form-group">
				<label for="game-map_longitude">Longitude</label>
				<input type="text" class="form-control" id="game-map_longitude" placeholder="0.0" value="<%= map_longitude %>">
			</div>

			<div class="form-group">
				<label for="game-map_zoom_level">Zoom</label>
				<input type="text" class="form-control" id="game-map_zoom_level" placeholder="0" value="<%= map_zoom_level %>">
			</div>

			<div class="form-group">
				<label>
					<input type="checkbox" id="game-map_show_player" <%= is_checked(map_show_player) %>>
					Show Player Location (Blue Dot)
				</label>
			</div>

			<div class="form-group">
				<label>
					<input type="checkbox" id="game-map_show_players" <%= is_checked(map_show_players) %>>
					Show Other Players' Locations
				</label>
			</div>

			<div class="form-group">
				<label>
					<input type="checkbox" id="game-map_offsite_mode" <%= is_checked(map_offsite_mode) %>>
					Offsite Mode (All locations temporarily infinite range)
				</label>
			</div>

		</div>
	</div>


	<div class="panel panel-info">
		<div class="panel-heading">
			Notebook
		</div>
		<div class="panel-body">

			<div class="form-group">
				<label>
					<input type="checkbox" id="game-notebook_allow_comments" <%= is_checked(notebook_allow_comments) %>>
					Comments Allowed
				</label>
			</div>

			<div class="form-group">
				<label>
					<input type="checkbox" id="game-notebook_allow_likes" <%= is_checked(notebook_allow_likes) %>>
					Likes Allowed
				</label>
			</div>

			<div class="form-group">
				<label>
					<input type="checkbox" id="game-notebook_allow_player_tags" <%= is_checked(notebook_allow_player_tags) %>>
					Player Created Tags Allowed
				</label>
			</div>

		</div>
	</div>

	<div class="panel panel-info">
		<div class="panel-heading">
			Inventory
		</div>
		<div class="panel-body">

			<div class="form-group">
				<label for="game-inventory_weight_cap">Weight Cap (0 = no weight cap)</label>
				<input type="text" class="form-control" id="game-inventory_weight_cap" placeholder="0" value="<%= inventory_weight_cap %>">
			</div>

		</div>
	</div>

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>
		<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
	</div>
	</form>
</div>
