<form class="form" role="form" onsubmit="return false;">
	<!-- Plaque attributes -->

	<div class="form-group">
		<label for="plaque-name">Name</label>
		<input type="text" autofocus class="form-control" id="plaque-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="plaque-description">Description</label>
		<input type="text" class="form-control" id="plaque-description" placeholder="Description" value="<%= description %>">
	</div>

	<div class="form-group">
		<label for="plaque-icon">Icon</label>
		<img src=<%= icon_thumbnail_url %>>
		<button type="button" class="btn btn-info change-icon">
			Select Icon
		</button>
	</div>

	<div class="form-group" id="icon-chooser-container">
	</div>

	<div class="form-group">
		<label for="plaque-media">Media</label>
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
