<h4>Location Trigger <span class="object-id text-muted"><%= trigger_id %></span></h4>
<h5 class="game_object-name"><%= name %> <span class="object-id text-muted"><%= game_object_id %></span></h5>

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
		<input type="checkbox" id="trigger-infinite" <%= is_checked(infinite_distance) %>>
		<label for="trigger-infinite">
			Available Anywhere
		</label>
	</div>

	<div class="form-group range-container">
		<label for="trigger-distance">Availability Range</label>
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
			<input type="checkbox" id="trigger-hidden" <%= is_checked(hidden) %>>
			<label for="trigger-hidden">
				Hidden from Map on Client
			</label>
		</div>
	</div>

	<hr>


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
		<input type="checkbox" id="trigger-wiggle" <%= is_checked(wiggle) %>>
		<label for="trigger-wiggle">
			Animate Icon on Map
		</label>
	</div>

	<div class="checkbox">
		<input type="checkbox" id="trigger-show_title" <%= is_checked(show_title) %>>
		<label for="trigger-show_title">
			Show Title
		</label>
	</div>

	<div class="form-group">
		<input type="text" class="form-control" id="trigger-title" placeholder="<%= name %>" value="<%= title %>">
	</div>
</div>


<!-- Quantity of Instance -->
<% if(quantity_fields_visible) { %>
	<hr>

	<label>Quantity Available</label>
	<div class="checkbox" style="margin-top: 0">
		<input type="checkbox" id="instance-infinite_quantity" <%= is_checked(instance_infinite_quantity) %>>
		<label style="font-weight: normal;" for="instance-infinite_quantity">
			Unlimited
		</label>
	</div>

	<div class="form-group quantity-container"  <%= tab_visible(instance_infinite_quantity === "0") %>>
		<input type="number" class="form-control" id="instance-quantity" placeholder="Quantity" min="0" value="<%= instance_quantity %>">
	</div>
<% } %> <!-- quantity fields visible -->


<hr>

<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<button type="button" class="btn btn-danger delete">Delete</button>
	<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
</div>
</form>
