<div class="media">

	<div class="media-left">
		<img class="media-object tiny" src=<%= icon_thumb_url %>>
	</div>
	<div class="media-body">
		<h4 class="media-heading">
			<%= name || "Game "+game_id %>
		</h4>
		<div class="description">
			<%= _.str.prune(description, 100) %>
		</div>
	</div>
	<div class="media-right" style="vertical-align: middle;">
		<% if(migration_count > 0) { %>
			<span class="migration-badge <%= my_migration_count > 0 ? "bg-success" : "bg-primary" %>"><%= migration_count %></span>
		<% } %>
	</div>
</div>

