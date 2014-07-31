<form class="form" role="form" onsubmit="return false;">
	<!-- Conversation attributes -->

	<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
		<span class="object-id text-muted"><%= is_new ? "" : dialog_id %></span>
	</h4>

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
		<img src=<%= thumbnail_url %>>
		<button type="button" class="btn btn-info change-icon">
			Select Icon
		</button>
	</div>

	<div class="form-group" id="icon-chooser-container">
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
