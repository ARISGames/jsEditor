<form class="form" role="form" onsubmit="return false;">
	<!-- Item attributes -->

	<div class="form-group">
		<label for="item-name">Name</label>
		<input type="text" autofocus class="form-control" id="item-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="item-description">Description</label>
		<input type="text" class="form-control" id="item-description" placeholder="Description" value="<%= description %>">
	</div>

	<div class="form-group">
		<label for="item-description">Icon</label>
		<img src=<%= icon_thumbnail_url %>>
		<button type="button" class="btn btn-info change-icon">
			Select Icon
		</button>
	</div>

	<div class="form-group" id="icon-chooser-container">
	</div>

	<div class="form-group">
		<label for="item-description">Media</label>
		<img src=<%= media_thumbnail_url %>>
		<button type="button" class="btn btn-info change-icon">
			Select Media
		</button>
	</div>

	<div class="form-group" id="media-chooser-container">
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
