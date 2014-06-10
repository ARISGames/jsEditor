<h4>Location <span class="object-id text-muted"><%= trigger_id %></span></h4>

<form class="form" role="form" onsubmit="return false;">

<!-- Trigger by Location Attributes -->

<div id="LOCATION-fields" class="trigger-tab">

	<div class="form-group">
		<label for="trigger-title">Map Title</label>
		<input type="text" class="form-control" id="trigger-title" placeholder="Title" value="<%= title %>">
	</div>

	<div class="form-group">
		<label for="trigger-latitude">Latitude</label>
		<input type="text" class="form-control" id="trigger-latitude" placeholder="Latitude" value="<%= latitude %>">
	</div>

	<div class="form-group">
		<label for="trigger-longitude">Longitude</label>
		<input type="text" class="form-control" id="trigger-longitude" placeholder="Longitude" value="<%= longitude %>">
	</div>

	<div class="form-group">
		<label for="trigger-distance">Distance</label>
		<input type="text" class="form-control" id="trigger-distance" placeholder="Distance" value="<%= distance %>">
	</div>


	<div class="form-group">
		<label>
			<input type="checkbox" id="trigger-show_title" <%= is_checked(show_title) %>>
			Show Title
		</label>
	</div>

	<div class="form-group">
		<label>
			<input type="checkbox" id="trigger-wiggle" <%= is_checked(wiggle) %>>
			Wiggle
		</label>
	</div>
</div>


<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<button type="button" class="btn btn-danger delete">Delete</button>
	<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
</div>
</form>
