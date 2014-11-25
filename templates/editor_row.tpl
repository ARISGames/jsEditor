<h4 class="list-group-item-heading <%= current_user ? "text-success" : "" %>">
	<%= user_name %>
	<% if(!only_user) { %>
		<div class="pull-right remove"><span class="text-danger glyphicon glyphicon-minus-sign"></span></div>
	<% } %>
</h4>
<% if(user_name !== display_name) { %>
	<p class="list-group-item-text"><%= display_name %></p>
<% } %>
