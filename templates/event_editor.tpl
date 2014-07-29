<div class="container-fluid">
	<div class="row">
		<form class="form" role="form">
			<div class="col-xs-4 padded">
				<select class="form-control event-select">
					<option value="GIVE_ITEM" <%= option_selected(event === "GIVE_ITEM") %>>Give Item</option>
					<option value="TAKE_ITEM" <%= option_selected(event === "TAKE_ITEM") %>>Take Item</option>
				</select>
			</div>
			<div class="col-xs-4 padded">
				<select class="form-control content-select">
					<option value="0" selected disabled>None</option>
					<!-- game items -->
					<% _.each(items.models, function(item) { %>
						<option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
							<%= item.get("name") %>
						</option>
					<% }); %>
				</select>
			</div>
			<div class="col-xs-2 padded">
				<input type="number" class="form-control quantity" value="<%= qty %>" min="0">
			</div>
			<div class="col-xs-2 padded">
				<button type="button" class="btn btn-link delete">remove</button>
			</div>
		</form>
	</div>
</div>
