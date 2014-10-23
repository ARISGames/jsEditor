<div class="thumbnail tiny pull-left">
	<img src=<%= media_url %>>
</div>
<div class="note-details">
	<h4 class="list-group-item-heading edit clear">
		<%= name || "(unnamed)" %>
		<small class="pull-right">
			<%= user_name %>
		</small>
	</h4>
	<p class="list-group-item-text edit"><%= description %></p>
	<% if(tag_name) { %>
		<p class="list-group-item-text pull-right">
			<span class="glyphicon glyphicon-tags"></span>
			&nbsp;
			<%= tag_name %>
		</p>
	<% } %>
</div>
