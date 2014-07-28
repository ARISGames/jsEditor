<form class="form" role="form" onsubmit="return false;">
	<!-- Item attributes -->

	<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
		<span class="object-id text-muted"><%= is_new ? "" : item_id %></span>
	</h4>

	<div class="form-group">
		<label for="item-name">Name</label>
		<input type="text" autofocus class="form-control" id="item-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="item-description">Description</label>
		<input type="text" class="form-control" id="item-description" placeholder="Description" value="<%= description %>">
	</div>

	<div class="form-group">
		<label for="item-weight">Weight</label>
		<input type="number" class="form-control" id="item-weight" placeholder="Weight" value="<%= weight %>">
	</div>

	<div class="form-group">
		<label for="item-max_qty_in_inventory">Max Quantity in Inventory</label>
		<input type="number" class="form-control" id="item-max_qty_in_inventory" placeholder="Max Quantity" value="<%= max_qty_in_inventory %>">
	</div>

	<div class="checkbox">
		<label>
			<input type="checkbox" id="item-droppable" <%= is_checked(droppable) %>>
			Droppable
		</label>
	</div>

	<div class="checkbox">
		<label>
			<input type="checkbox" id="item-destroyable" <%= is_checked(destroyable) %>>
			Destroyable
		</label>
	</div>

	<div class="form-group">
		<label for="item-description">Icon</label>
		<img src=<%= icon_thumbnail_url %>>
		<button type="button" class="btn btn-info change-icon">
			Select Icon
		</button>
	</div>

	<div class="form-group" id="icon-chooser-container">
	</div>

	<div class="form-group">
		<label for="item-type">Type</label>

		<div class="btn-group btn-group-sm btn-group-justified item-types">
			<label class="btn btn-info">
				<input type="radio" name="item-type" value="NORMAL" <%= radio_selected(type === "NORMAL") %>>
				Normal
			</label>
			<label class="btn btn-info">
				<input type="radio" name="item-type" value="URL"    <%= radio_selected(type === "URL") %>>
				Web URL
			</label>
			<label class="btn btn-info">
				<input type="radio" name="item-type" value="ATTRIB" <%= radio_selected(type === "ATTRIB") %>>
				Attribute
			</label>
		</div>
	</div>

	<div class="trigger-tab URL-fields">
		<div class="form-group">
			<label for="item-url">URL</label>
			<input type="text" class="form-control" id="item-url" placeholder="URL" value="<%= url %>">
		</div>
	</div>


	<div class="trigger-tab URL-fields ATTRIB-fields">
		<div class="form-group">
			<label for="item-description">Media</label>
			<img src=<%= media_thumbnail_url %>>
			<button type="button" class="btn btn-info change-media">
				Select Media
			</button>
		</div>
	</div>

	<div class="form-group" id="media-chooser-container">
	</div>

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>
		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
