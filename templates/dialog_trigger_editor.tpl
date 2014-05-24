<h4>Dialog</h4>

<!-- Dialog attributes -->

<div class="form-group">
	<label for="dialog-name">Dialog Name</label>
	<input type="text" class="form-control" id="dialog-name" placeholder="Name" value="<%= name %>">
</div>

<div class="form-group">
	<label for="dialog-description">Description</label>
	<input type="text" class="form-control" id="dialog-description" placeholder="Description" value="<%= description %>">
</div>


<!-- Trigger Attributes -->

<div class="btn-group btn-group-justified trigger-types">
	<label class="btn btn-info">
		<input type="radio" name="type" value="LOCATION" <%= type == "LOCATION" ? "checked" : "" %>>
		<span class="glyphicon glyphicon-map-marker"></span>
		Location
	</label>
	<label class="btn btn-info">
		<input type="radio" name="type" value="QR" <%= type == "QR" ? "checked" : "" %>>
		<span class="glyphicon glyphicon-qrcode"></span>
		QR Code
	</label>
	<label class="btn btn-info">
		<input type="radio" name="type" value="IMMEDIATE" <%= type == "IMMEDIATE" ? "checked" : "" %>>
		<span class="glyphicon glyphicon-flash"></span>
		Immediate
	</label>
</div>


<!-- Trigger by Location Attributes -->

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
	<label for="trigger-wiggle">Wiggle</label>
	<input type="text" class="form-control" id="trigger-wiggle" placeholder="Wiggle" value="<%= wiggle %>">
</div>

<div class="form-group">
	<label for="trigger-show_title">Show Title</label>
	<input type="text" class="form-control" id="trigger-show_title" placeholder="Show Title" value="<%= show_title %>">
</div>


<!-- Trigger by Code Attributes -->

<div class="form-group">
	<label for="trigger-code">QR Code</label>
	<input type="text" class="form-control" id="trigger-code" placeholder="QR Code" value="<%= code %>">
</div>



<!-- requirements here -->

<!-- create vs update -->
<div class="form-group">
	<button type="button" class="btn btn-primary save">Add to Scene</button>
</div>
