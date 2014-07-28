<form class="form" role="form" onsubmit="return false;">
	<!-- WebPage attributes -->

	<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
		<span class="object-id text-muted"><%= is_new ? "" : web_page_id %></span>
	</h4>

	<div class="form-group">
		<label for="web_page-name">Name</label>
		<input type="text" autofocus class="form-control" id="web_page-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="web_page-url">URL</label>
		<input type="text" class="form-control" id="web_page-url" placeholder="URL" value="<%= url %>">
	</div>

	<div class="form-group">
		<label for="web_page-description">Icon</label>
		<img src=<%= icon_thumbnail_url %>>
		<button type="button" class="btn btn-info change-icon">
			Select Icon
		</button>
	</div>

	<div class="form-group" id="icon-chooser-container">
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
