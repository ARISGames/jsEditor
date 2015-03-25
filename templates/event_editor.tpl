<div class="container-fluid">
	<div class="row">
		<form class="form" role="form">
			<div class="col-xs-4 padded">
				<select class="form-control event-select">
					<option value="GIVE_ITEM" <%= option_selected(event === "GIVE_ITEM") %>>Give</option>
					<option value="TAKE_ITEM" <%= option_selected(event === "TAKE_ITEM") %>>Take</option>
				</select>
			</div>
			<div class="col-xs-4 padded">
				<select class="form-control content-select">
					<option value="0" selected disabled>None</option>
					<!-- game items -->

					<optgroup label="Player Attributes">
						<% _.each(items.where({type: "ATTRIB"}), function(item) { %>
							<option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
								<%= item.get("name") %>
							</option>
						<% }); %>
					</optgroup>

					<optgroup label="Items">
						<% _.each(items.where({type: "NORMAL"}), function(item) { %>
							<option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
								<%= item.get("name") %>
							</option>
						<% }); %>
					</optgroup>

					<optgroup label="Web Items">
						<% _.each(items.where({type: "URL"}), function(item) { %>
							<option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
								<%= item.get("name") %>
							</option>
						<% }); %>
					</optgroup>
				</select>
			</div>
			<div class="col-xs-2 padded">
				<input type="number" class="form-control quantity" value="<%= qty %>" min="0">
			</div>
			<div class="col-xs-2 padded">
				<button type="button" class="btn btn-link delete">Remove</button>
			</div>
		</form>
	</div>
</div>
