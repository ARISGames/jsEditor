<form class="form object-editor" role="form" onsubmit="return false;">
	<!-- Conversation attributes -->

	<div class="form-group">
		<label for="dialog-name">Name</label>
		<input type="text" autofocus class="form-control" id="dialog-name" placeholder="Name" value="<%= name %>">
	</div>

	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<button type="button" class="btn btn-default" data-dismiss="modal">
		Cancel
	</button>
</form>
