<% if(!in_modal) { %>
	<h4>Dialog <span class="object-id text-muted"><%= is_new ? "" : dialog_id %></span></h4>
<% } %>

<form class="form" role="form" onsubmit="return false;">
<% if(visible_fields === "create_dialog_with_trigger" ) { %>
<!-- Dialog attributes -->

<div class="form-group">
	<label class="sr-only" for="dialog-name">Dialog Name</label>
	<input type="text" autofocus class="form-control" id="dialog-name" placeholder="Enter Name" value="<%= name %>">
</div>

<% } %>


<% if(visible_fields === "trigger") { %>

<div class="form-group">
	<button type="button" class="btn btn-primary btn-block edit-dialog">
		<span class="glyphicon glyphicon-comment"></span>
		Edit Dialog
	</button>
</div>



<!-- Trigger Attributes -->

<div class="btn-group btn-group-sm btn-group-justified trigger-types">
	<label class="btn btn-info">
		<input type="radio" name="trigger-type" value="LOCATION" <%= type == "LOCATION" ? "checked" : "" %>>
		<span class="glyphicon glyphicon-map-marker"></span>
		Location
	</label>
	<label class="btn btn-info">
		<input type="radio" name="trigger-type" value="QR" <%= type == "QR" ? "checked" : "" %>>
		<span class="glyphicon glyphicon-qrcode"></span>
		QR Code
	</label>
	<label class="btn btn-info">
		<input type="radio" name="trigger-type" value="IMMEDIATE" <%= type == "IMMEDIATE" ? "checked" : "" %>>
		<span class="glyphicon glyphicon-flash"></span>
		Immediate
	</label>
</div>

<br/>

<!-- Trigger by Location Attributes -->

<div id="LOCATION-fields" class="trigger-tab">

	<div class="map-canvas" style="height: 150px; width: 100%"></div>

	<br>

	<div class="form-group">
		<label for="trigger-title">Map Title</label>
		<input type="text" class="form-control" id="trigger-title" placeholder="Title" value="<%= title %>">
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


<!-- Trigger by Code Attributes -->

<div id="QR-fields" class="trigger-tab">
	<div class="form-group">
		<label for="trigger-code">QR Code</label>
		<input type="text" class="form-control" id="trigger-code" placeholder="QR Code" value="<%= code %>">
		<div class="qr_image"></div>
	</div>
</div>


<!-- Trigger Immediate Attributes -->

<div id="IMMEDIATE-fields" class="trigger-tab">
	<div class="alert alert-info">
		<span class="glyphicon glyphicon-info-sign"></span>
		Will be triggered immediately when requirements are satisfied.
	</div>
</div>


<!-- requirements here -->
<div class="form-group">
	<button type="button" class="btn btn-info btn-block edit-requirements" disabled>
		<span class="glyphicon glyphicon-ok"></span>
		Edit Requirements
	</button>
</div>


<% } %>

<!-- create vs update -->

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
