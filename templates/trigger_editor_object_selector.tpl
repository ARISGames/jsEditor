<select class="form-control" id="instance-object_id">
	<option value="0" selected disabled>- No Game Object -</option>

	<!-- Game Items -->
	<optgroup label="Player Attributes">
		<% _.each(items.where({type: "ATTRIB"}), function(item) { %>
			<option value="<%= item.get("item_id") %>" <%= option_selected(game_object_id === item.get("item_id")) %>>
				<%= item.get("name") %>
			</option>
		<% }); %>
	</optgroup>

	<optgroup label="Items">
		<% _.each(items.where({type: "NORMAL"}), function(item) { %>
			<option value="<%= item.get("item_id") %>" <%= option_selected(game_object_id === item.get("item_id")) %>>
				<%= item.get("name") %>
			</option>
		<% }); %>
	</optgroup>

	<optgroup label="Web Items">
		<% _.each(items.where({type: "URL"}), function(item) { %>
			<option value="<%= item.get("item_id") %>" <%= option_selected(game_object_id === item.get("item_id")) %>>
				<%= item.get("name") %>
			</option>
		<% }); %>
	</optgroup>


	<!-- Plaques -->
	<optgroup label="Plaques">
		<% plaques.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object_id === object.id) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>


	<!-- Dialogs -->
	<optgroup label="Conversations">
		<% dialogs.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object_id === object.id) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>

	<!-- Web Pages -->
	<optgroup label="Web Pages">
		<% web_pages.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object_id === object.id) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>

	<!-- Factories -->
	<optgroup label="Factories">
		<% factories.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object_id === object.id) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>

	<!-- Scenes -->
	<optgroup label="Scenes">
		<% scenes.each(function(object) { %>
			<option value="<%= object.id %>" <%= option_selected(game_object_id === object.id) %>>
				<%= object.get("name") %>
			</option>
		<% }); %>
	</optgroup>

</select>

