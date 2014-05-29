<h4>Dialog <span class="object-id text-muted"><%= is_new ? "" : dialog_id %></span></h4>

<!-- Dialog attributes -->

<div class="form-group">
	<label for="dialog-name">Dialog Name</label>
	<input type="text" class="form-control" id="dialog-name" placeholder="Name" value="<%= name %>">
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
	<label for="dialog-description">Opening Script</label>
	<input type="text" class="form-control" id="dialog-opening-script" placeholder="Opening Script ID" value="<%= opening_script_id %>">
</div>

<div class="form-group">
	<label for="dialog-description">Closing Script</label>
	<input type="text" class="form-control" id="dialog-closing-script" placeholder="Closing Script ID" value="<%= closing_script_id %>">
</div>

<!-- create vs update -->

<div class="form-group">
	<button type="button" class="btn btn-primary save">
		Update Dialog
	</button>
	<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
</div>
