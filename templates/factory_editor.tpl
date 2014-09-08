<form class="form object-editor" role="form" onsubmit="return false;">
	<!-- Factory attributes -->

	<div class="row">
		<div class="col-xs-6 padded">
			<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
				<span class="object-id text-muted"><%= is_new ? "" : factory_id %></span>
			</h4>
			<div class="form-group">
				<label for="factory-name">Name</label>
				<input type="text" autofocus class="form-control" id="factory-name" placeholder="Name" value="<%= name %>">
			</div>

			<div class="form-group">
				<label for="factory-description">Description</label>
				<input type="text" class="form-control" id="factory-description" placeholder="Description" value="<%= description %>">
			</div>

			<div class="form-group">
				<button type="submit" class="btn btn-primary save">
					Save
				</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Cancel
				</button>
			</div>
		</div>

		<div class="col-xs-6 padded">
			<div class="thumbnail change-icon">
				<img src=<%= icon_thumbnail_url %>>
				<div class="caption">
					<button type="button" class="btn btn-link btn-info btn-block change-icon">
						<span class="glyphicon glyphicon-picture"></span>
						Icon
					</button>
				</div>
			</div>
		</div>
	</div>
</form>
