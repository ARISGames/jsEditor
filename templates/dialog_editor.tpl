<form class="form">
	<!-- Dialog attributes -->

	<div class="form-group">
		<label for="dialog-name">Name</label>
		<input type="text" autofocus class="form-control" id="dialog-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="dialog-description">Description</label>
		<input type="text" class="form-control" id="dialog-description" placeholder="Description" value="<%= description %>">
	</div>

	<div class="form-group">
		<label for="dialog-description">Icon</label>
		<input type="text" class="form-control" id="dialog-icon" placeholder="Icon ID" value="<%= icon_media_id %>">
	</div>

	<div class="form-group">
		<label for="dialog-description">Media</label>
		<input type="text" class="form-control" id="dialog-media" placeholder="Media ID" value="<%= media_id %>">
	</div>

	<div class="form-group">
		<button type="button" class="btn btn-info btn-block edit-script" disabled>
			<span class="glyphicon glyphicon-file"></span>
			Script Editor
		</button>
	</div>

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>
		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
