<p>
	<%= text %>
</p>

<hr>

<form onsubmit="return false">
	<% if(confirm_button) { %>
		<button type="submit" autofocus class="btn btn-primary confirm" style="width: 20%"><%= confirm_text || "OK" %></button>
	<% } %>

	<% if(danger_button) { %>
		<button type="button" class="btn btn-danger danger" style="width: 20%"><%= danger_text || "Delete" %></button>
	<% } %>

	<% if(cancel_button) { %>
		<button type="button" class="btn btn-default cancel" style="width: 20%"> <%= cancel_text || "Cancel" %></button>
	<% } %>
</form>
