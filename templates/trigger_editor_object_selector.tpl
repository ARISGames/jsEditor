<select class="form-control" id="instance-object_id">
	<option value="0" selected disabled>- No Game Object -</option>

	<!-- Game Items -->
	<% if(!attribute_items.isEmpty()) { %>
	<optgroup label="Player Attributes">
		<% attribute_items.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object === object) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>
	<% } %>

	<% if(!items.isEmpty()) { %>
	<optgroup label="Items">
		<% items.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object === object) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>
	<% } %>

	<% if(!web_items.isEmpty()) { %>
	<optgroup label="Web Items">
		<% web_items.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object === object) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>
	<% } %>


	<!-- Plaques -->
	<% if(!plaques.isEmpty()) { %>
	<optgroup label="Plaques">
		<% plaques.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object === object) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>
	<% } %>


	<!-- Dialogs -->
	<% if(!dialogs.isEmpty()) { %>
	<optgroup label="Conversations">
		<% dialogs.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object === object) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>
	<% } %>

	<!-- Web Pages -->
	<% if(!web_pages.isEmpty()) { %>
	<optgroup label="Web Pages">
		<% web_pages.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object === object) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>
	<% } %>

	<!-- Factories -->
	<% if(!factories.isEmpty()) { %>
	<optgroup label="Factories">
		<% factories.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object === object) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>
	<% } %>

	<!-- Scenes -->
	<% if(!scenes.isEmpty()) { %>
	<optgroup label="Scenes">
		<% scenes.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object === object) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>
	<% } %>

</select>

