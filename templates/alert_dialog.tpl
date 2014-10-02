<p>
	<%= text %>
</p>

<hr>

<form onsubmit="return false">
	<% if(confirm_button) { %>
		<button type="submit" autofocus class="btn btn-primary confirm"><%= confirm_text || "OK" %></button>
	<% } %>

	<% if(danger_button) { %>
		<button type="button" class="btn btn-danger danger"><%= danger_text || "Delete" %></button>
	<% } %>

	<% if(cancel_button) { %>
		<button type="button" class="btn btn-default cancel"> <%= cancel_text || "Cancel" %></button>
	<% } %>
</form>
