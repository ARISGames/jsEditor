<form class="form quest-editor" role="form" onsubmit="return false;">
	<!-- Quest attributes -->

	<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
		<span class="object-id text-muted"><%= is_new ? "" : quest_id %></span>
	</h4>

	<div class="form-group">
		<label for="name">Name</label>
		<input type="text" autofocus class="form-control" id="name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="description">Description</label>
		<textarea id="description" placeholder="Description" class="form-control" rows="2"><%= description %></textarea>
	</div>

	<!-- Active Section -->
	<div class="panel panel-info">
		<div class="panel-heading">
			Start
		</div>
		<div class="panel-body">

			<div class="form-group row">
				<div class="col-xs-6 padded">
					<img src=<%= active_icon_thumbnail_url %>>
					<button type="button" class="btn btn-info btn-block change-active-icon">
						<span class="glyphicon glyphicon-picture"></span>
						Icon
					</button>
				</div>

				<div class="col-xs-6 padded">
					<img src=<%= active_media_thumbnail_url %>>
					<button type="button" class="btn btn-info btn-block change-active-media">
						<span class="glyphicon glyphicon-facetime-video"></span>
						Media
					</button>
				</div>
			</div>


			<div class="form-group row">
				<div class="col-xs-6 padded">
					<button type="button" class="btn btn-block btn-info edit-active-requirements">
						<span class="glyphicon glyphicon-lock"></span>
						Locks
					</button>
				</div>

				<div class="col-xs-6 padded">
					<button type="button" class="btn btn-block btn-info edit-active-events">
						<span class="glyphicon glyphicon-user"></span>
						Modify Player
					</button>
				</div>
			</div> <!-- Buttons -->

			<div class="form-group">
				<label for="active-description">Description</label>
				<textarea id="active-description" placeholder="Description" class="form-control" rows="2"><%= active_description %></textarea>
			</div>

			<div class="form-group row">
				<div class="col-xs-6 padded">
					<label for="active-notification-type">Notification Type</label>

					<select class="form-control active-function-select">
						<option value="NONE"        <%= option_selected(active_notification_type === "NONE")        %>>None</option>
						<option value="FULL_SCREEN" <%= option_selected(active_notification_type === "FULL_SCREEN") %>>Alert Box</option>
						<option value="DROP_DOWN"   <%= option_selected(active_notification_type === "DROP_DOWN")   %>>Top Banner</option>
					</select>
				</div>

				<div class="col-xs-6 padded active-function-box">
					<label for="active-function">Notification Button Action</label>

					<select class="form-control active-function-select">
						<option value="NONE"       <%= option_selected(active_function === "NONE")       %>>None</option>
						<option value="GPS"        <%= option_selected(active_function === "GPS")        %>>Gps</option>
						<option value="QUESTS"     <%= option_selected(active_function === "QUESTS")     %>>Quests</option>
						<option value="INVENTORY"  <%= option_selected(active_function === "INVENTORY")  %>>Inventory</option>
						<option value="PLAYER"     <%= option_selected(active_function === "PLAYER")     %>>Player</option>
						<option value="NOTE"       <%= option_selected(active_function === "NOTE")       %>>Notes</option>
						<option value="PICKGAME"   <%= option_selected(active_function === "PICKGAME")   %>>Game List</option>
						<option value="JAVASCRIPT" <%= option_selected(active_function === "JAVASCRIPT") %>>Javascript</option>
					</select>
				</div>
			</div>


		</div> <!-- Body -->
	</div> <!-- End Panel -->

	<!-- Complete Section -->
	<div class="panel panel-success">
		<div class="panel-heading">
			Complete
		</div>
		<div class="panel-body">

			<div class="form-group row">
				<div class="col-xs-6 padded">
					<img src=<%= complete_icon_thumbnail_url %>>
					<button type="button" class="btn btn-info btn-block change-complete-icon">
						<span class="glyphicon glyphicon-picture"></span>
						Icon
					</button>
				</div>

				<div class="col-xs-6 padded">
					<img src=<%= complete_media_thumbnail_url %>>
					<button type="button" class="btn btn-info btn-block change-complete-media">
						<span class="glyphicon glyphicon-facetime-video"></span>
						Media
					</button>
				</div>
			</div>

			<div class="form-group row">
				<div class="col-xs-6 padded">
					<button type="button" class="btn btn-block btn-info edit-complete-requirements">
						<span class="glyphicon glyphicon-lock"></span>
						Locks
					</button>
				</div>

				<div class="col-xs-6 padded">
					<button type="button" class="btn btn-block btn-info edit-complete-events">
						<span class="glyphicon glyphicon-user"></span>
						Modify Player
					</button>
				</div>
			</div> <!-- Buttons -->

			<div class="form-group">
				<label for="complete-description">Description</label>
				<textarea id="complete-description" placeholder="Description" class="form-control" rows="2"><%= complete_description %></textarea>
			</div>

			<div class="form-group row">
				<div class="col-xs-6 padded">
					<label for="complete-notification-type">Notification Type</label>

					<select class="form-control complete-function-select">
						<option value="NONE"        <%= option_selected(complete_notification_type === "NONE")        %>>None</option>
						<option value="FULL_SCREEN" <%= option_selected(complete_notification_type === "FULL_SCREEN") %>>Alert Box</option>
						<option value="DROP_DOWN"   <%= option_selected(complete_notification_type === "DROP_DOWN")   %>>Top Banner</option>
					</select>
				</div>

				<div class="col-xs-6 padded complete-function-box">
					<label for="complete-function">Notification Button Action</label>

					<select class="form-control complete-function-select">
						<option value="NONE"       <%= option_selected(complete_function === "NONE")       %>>None</option>
						<option value="GPS"        <%= option_selected(complete_function === "GPS")        %>>Gps</option>
						<option value="QUESTS"     <%= option_selected(complete_function === "QUESTS")     %>>Quests</option>
						<option value="INVENTORY"  <%= option_selected(complete_function === "INVENTORY")  %>>Inventory</option>
						<option value="PLAYER"     <%= option_selected(complete_function === "PLAYER")     %>>Player</option>
						<option value="NOTE"       <%= option_selected(complete_function === "NOTE")       %>>Notes</option>
						<option value="PICKGAME"   <%= option_selected(complete_function === "PICKGAME")   %>>Game List</option>
						<option value="JAVASCRIPT" <%= option_selected(complete_function === "JAVASCRIPT") %>>Javascript</option>
					</select>
				</div>
			</div>


		</div> <!-- Body -->
	</div> <!-- End Panel -->





	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>
		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
