<div class="thumbnail tiny pull-right">
	<img src=<%= media_url %>>
</div>
<div class="note-details">
	<blockquote>
		<p>
			<%= _.str.prune(description, 50) %>
		</p>
		<footer>
			<%= user_name %>
		</footer>
	</blockquote>

	<% if(tag_name) { %>
		<p class="pull-right">
			<span class="glyphicon glyphicon-tags"></span>
			&nbsp;
			<%= tag_name %>
		</p>
	<% } %>
</div>
