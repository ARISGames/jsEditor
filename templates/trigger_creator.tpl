<form class="form" role="form" onsubmit="return false;">

<!-- Game Object attributes -->

<div class="form-group">
	<label class="sr-only" for="object-name">Game Object Name</label>
	<input type="text" autofocus class="form-control" id="object-name" placeholder="Enter Name" value="<%= name %>">
</div>

<hr>

<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
</div>
</form>
