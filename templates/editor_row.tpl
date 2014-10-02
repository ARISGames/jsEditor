<h4 class="list-group-item-heading <%= current_user ? "text-success" : "" %>">
	<%= user_name %>
	<div class="pull-right remove"><span class="text-danger glyphicon glyphicon-minus-sign"></span></div>
</h4>
<p class="list-group-item-text"><%= display_name %></p>
