<form class="form" role="form" onsubmit="return false;">
	<!-- Quest attributes -->

	<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
		<span class="object-id text-muted"><%= is_new ? "" : quest_id %></span>
	</h4>

	<div class="form-group">
		<label for="quest-name">Name</label>
		<input type="text" autofocus class="form-control" id="quest-name" placeholder="Name" value="<%= name %>">
	</div>
<!--
	<div class="form-group">
		<label for="quest-icon">Icon</label>
		<img src=<%= icon_thumbnail_url %>>
		<button type="button" class="btn btn-info change-icon">
			Select Icon
		</button>
	</div>

	<div class="form-group" id="icon-chooser-container">
	</div>

	<div class="form-group">
		<button type="button" class="btn btn-info edit-events">
			Change Player Inventory When Viewed
		</button>
	</div> -->

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>
		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
