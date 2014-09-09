<br />

<h4>Edit Line <span class="object-id text-muted"><%= is_new ? "" : dialog_script_id %></span></h4>

<form class="form" role="form" onsubmit="return false;">
<div class="form-group">
	<button type="button" class="btn btn-block btn-info edit-events">
		<span class="glyphicon glyphicon-user"></span>
		Modify Player
	</button>
</div>

<div class="form-group">
	<label>Text</label>
	<textarea class="form-control text" rows=3><%= text %></textarea>
</div>

<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<button type="button" class="btn btn-default cancel">
		Cancel
	</button>
	<button type="button" class="btn btn-danger delete-this">
		Delete This
	</button>
	<button type="button" class="btn btn-danger delete-all">
		Delete All
	</button>
</div>
</form>
