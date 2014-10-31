<h4>Location <span class="object-id text-muted"><%= trigger_id %></span></h4>

<form class="form" role="form" onsubmit="return false;">

<!-- Trigger by Location Attributes -->

<div id="LOCATION-fields" class="trigger-tab">

	<div class="form-group">
		<button type="button" class="btn btn-warning btn-block edit-requirements">
			<span class="glyphicon glyphicon-lock"></span>
			Locks
		</button>
	</div>

	<div class="form-group">
		<label for="trigger-latitude">Latitude</label>
		<input type="text" class="form-control" id="trigger-latitude" placeholder="Latitude" value="<%= latitude %>">
	</div>

	<div class="form-group">
		<label for="trigger-longitude">Longitude</label>
		<input type="text" class="form-control" id="trigger-longitude" placeholder="Longitude" value="<%= longitude %>">
	</div>

	<div class="checkbox">
		<label>
			<input type="checkbox" id="trigger-infinite" <%= is_checked(infinite_distance) %>>
			Available Anywhere
		</label>
	</div>

	<div class="form-group range-container">
		<label for="trigger-distance">Within Range</label>
		<div class="input-group">
			<input type="number" class="form-control" id="trigger-distance" placeholder="Range" value="<%= distance %>">
			<span class="input-group-addon addon-bg-info">Meters</span>
		</div>
	</div>

	<div class="form-group">
		<label>
			When in range, trigger:
		</label>
		<div class="btn-group btn-group-sm btn-group-justified trigger-trigger_on_enter">
			<label class="btn btn-info">
				<input type="radio" name="trigger-trigger_on_enter" value="1" <%= radio_selected(trigger_on_enter === "1") %>>
				<span class="glyphicon glyphicon-flash"></span>
				Immediately
			</label>
			<label class="btn btn-info">
				<input type="radio" name="trigger-trigger_on_enter" value="0" <%= radio_selected(trigger_on_enter === "0") %>>
				<span class="glyphicon glyphicon-hand-up"></span>
				By Touch
			</label>
		</div>
	</div>

	<div id="trigger-1-fields" class="enter-trigger-tab">
		<div class="checkbox">
			<label>
				<input type="checkbox" id="trigger-hidden" <%= is_checked(hidden) %>>
				Hidden from Map on Client
			</label>
		</div>
	</div>

	<hr>

	<div class="checkbox">
		<label>
			<input type="checkbox" id="trigger-show_title" <%= is_checked(show_title) %>>
			Show Title
		</label>
	</div>

	<div class="form-group">
		<input type="text" class="form-control" id="trigger-title" placeholder="Title" value="<%= title %>">
	</div>

	<!-- Icon Selector -->
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

	<div class="checkbox">
		<label>
			<input type="checkbox" id="trigger-wiggle" <%= is_checked(wiggle) %>>
			Animate Icon on Map
		</label>
	</div>
</div>

<hr>

<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<button type="button" class="btn btn-danger delete">Delete</button>
	<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
</div>
</form>
