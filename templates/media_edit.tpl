<form role="form">

	<div class="form-group">
		<label for="dialog-name">Name</label>
		<input type="text" autofocus class="form-control" id="dialog-name" placeholder="Name" value="<%= display_name %>">
	</div>

	<div class="form-group">
		<label for="uploader">File</label>
		<input type="file" id="uploader" name="uploader">
		<p class="help-block">Select an image to upload.</p>
	</div>

	<div class="form-group">
		<img class="upload-preview" src="<%= url %>">
	</div>


	<div class="form-group">
		<button type="submit" class="btn btn-primary save">Save</button>
	</div>
</form>
