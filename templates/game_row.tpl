<div class="thumbnail tiny pull-right">
	<img src=<%= icon_thumb_url %>>
</div>
<div>
	<h4 class="list-group-item-heading view">
		<%= name || "Game "+game_id %>
	</h4>
	<p class="list-group-item-text view">
		<%= _.str.prune(description, 100) %>
	</p>
</div>
