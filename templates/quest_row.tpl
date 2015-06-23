<div class="media">
	<div class="media-left">
		<img class="media-object tiny" src=<%= active_icon_thumbnail_url %>>
	</div>
	<div class="media-body">
		<h4 class="media-heading">
			<%= name || "(unnamed)" %>
		</h4>
		<div class="description">
			<%= sanitize_html(description || active_description) %>
		</div>
	</div>
</div>
<div class="tab-drag-handle">&equiv;</div>
