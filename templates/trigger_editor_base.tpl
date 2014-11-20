<% if(!in_modal) { %>
	<h4><%= parent_label %> Trigger <span class="object-id text-muted"><%= is_new ? "" : trigger_id %></span></h4>
	<h5 class="game_object-name"><%= name %> <span class="object-id text-muted"><%= is_new ? "" : game_object_id %></span></h5>
<% } %>

<form class="form" role="form" onsubmit="return false;">
<% if(visible_fields === "create_game_object_with_trigger" ) { %>

<!-- Game Object attributes -->

<div class="form-group">
	<label class="sr-only" for="object-name">Conversation Name</label>
	<input type="text" autofocus class="form-control" id="object-name" placeholder="Enter Name" value="<%= name %>">
</div>

<% } %>


<% if(visible_fields === "trigger") { %>

<!-- Edit Object -->

<div class="form-group">
	<button type="button" class="btn btn-primary btn-block edit-game_object">
		<span class="glyphicon glyphicon-<%= parent_icon %>"></span>
		Edit <%= parent_label %>
	</button>
</div>

<!-- Locks -->

<div class="form-group">
	<button type="button" class="btn btn-warning btn-block edit-requirements">
		<span class="glyphicon glyphicon-lock"></span>
		Locks
	</button>
</div>

<!-- Trigger Attributes -->

<div class="btn-group btn-group-sm btn-group-justified trigger-types">
	<label class="btn btn-info <%= tab_selected(type === "LOCATION") %>">
		<input type="radio" class="trigger-type" name="trigger-type" value="LOCATION"  <%= radio_selected(type === "LOCATION") %>>
		<span class="glyphicon glyphicon-map-marker"></span>
		Location
	</label>
	<label class="btn btn-info <%= tab_selected(type === "QR") %>">
		<input type="radio" class="trigger-type" name="trigger-type" value="QR"        <%= radio_selected(type === "QR") %>>
		<span class="glyphicon glyphicon-qrcode"></span>
		QR Code
	</label>
	<label class="btn btn-info  <%= tab_selected(type === "IMMEDIATE") %>">
		<input type="radio" class="trigger-type" name="trigger-type" value="IMMEDIATE" <%= radio_selected(type === "IMMEDIATE") %>>
		<span class="glyphicon glyphicon-link"></span>
		Sequence
	</label>
</div>

<br>

<!-- Trigger by Location Attributes -->

<div id="LOCATION-fields" class="type-trigger-tab" <%= tab_visible(type === "LOCATION") %>>

	<div class="map-canvas" style="height: 150px; width: 100%"></div>

	<div class="checkbox">
		<input type="checkbox" id="trigger-infinite" <%= is_checked(infinite_distance) %>>
		<label for="trigger-infinite">
			Available Anywhere
		</label>
	</div>


	<div class="checkbox">
		<input type="checkbox" id="trigger-show_title" <%= is_checked(show_title) %>>
		<label for="trigger-show_title">
			Show Map Title
		</label>
	</div>

	<div class="form-group title-container"  <%= tab_visible(show_title === "1") %>>
		<input type="text" class="form-control" id="trigger-title" placeholder="<%= name %>" value="<%= title %>">
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
		<input type="checkbox" id="trigger-wiggle" <%= is_checked(wiggle) %>>
		<label for="trigger-wiggle">
			Animate Icon on Map
		</label>
	</div>

	<div class="form-group">
		<label>
			When in range, trigger:
		</label>
		<div class="btn-group btn-group-sm btn-group-justified trigger-trigger_on_enter">
			<label class="btn btn-info <%= tab_selected(trigger_on_enter === "1") %>">
				<input type="radio" class="trigger-enter" name="trigger-trigger_on_enter" value="1" <%= radio_selected(trigger_on_enter === "1") %>>
				<span class="glyphicon glyphicon-flash"></span>
				Immediately
			</label>
			<label class="btn btn-info <%= tab_selected(trigger_on_enter === "0") %>">
				<input type="radio" class="trigger-enter" name="trigger-trigger_on_enter" value="0" <%= radio_selected(trigger_on_enter === "0") %>>
				<span class="glyphicon glyphicon-hand-up"></span>
				By Touch
			</label>
		</div>
	</div>

	<div id="1-fields" class="enter-trigger-tab" <%= tab_visible(trigger_on_enter === "1") %>>
		<div class="checkbox">
			<input type="checkbox" id="trigger-hidden" <%= is_checked(hidden) %>>
			<label for="trigger-hidden">
				Hidden from Map on Client
			</label>
		</div>
	</div>
</div>


<!-- Trigger by Code Attributes -->

<div id="QR-fields" class="type-trigger-tab" <%= tab_visible(type === "QR") %>>
	<div class="form-group">
		<label for="trigger-code">QR Code</label>
		<input type="text" class="form-control" id="trigger-code" placeholder="QR Code" value="<%= qr_code %>">
		<div class="qr_image"></div>
	</div>
</div>


<!-- Trigger Immediate Attributes -->

<div id="IMMEDIATE-fields" class="type-trigger-tab" <%= tab_visible(type === "IMMEDIATE") %>>
	<div class="alert alert-info">
		<span class="glyphicon glyphicon-info-sign"></span>
		Will be triggered as soon as all locks are satisfied.
	</div>
</div>


<!-- Quantity of Instance -->
<% if(quantity_fields_visible) { %>
	<label>Quantity Available</label>
	<div class="checkbox" style="margin-top: 0">
		<input type="checkbox" id="instance-infinite_quantity" <%= is_checked(instance_infinite_quantity) %>>
		<label for="instance-infinite_quantity">
			Unlimited
		</label>
	</div>

	<div class="form-group quantity-container"  <%= tab_visible(instance_infinite_quantity === "0") %>>
		<input type="number" class="form-control" id="instance-quantity" placeholder="Quantity" min="0" value="<%= instance_quantity %>">
	</div>
<% } %> <!-- quantity fields visible -->

<% } %> <!-- if visible fields == trigger -->

<!-- create vs update -->

<hr>

<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<% if(!is_new) { %>
		<button type="button" class="btn btn-danger delete">Delete</button>
	<% } %>
	<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
</div>
</form>
