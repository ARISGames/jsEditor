<form class="form tag-editor object-editor" role="form" onsubmit="return false;">

	<!-- Tag attributes -->
	<div class="row">
		<div class="col-sm-8 padded">
			<div class="form-group">
				<label for="tag">Name</label>
				<input type="text" autofocus class="form-control" id="tag" placeholder="Name" value="<%= tag %>">
			</div>

			<div class="checkbox">
				<input type="checkbox" id="visible" <%= is_checked(visible) %>>
				<label for="visible">
					Visible to Player
				</label>
			</div>
		</div>

		<div class="col-sm-4 padded">
			<div class="form-group">
				<div class="thumbnail change-media">
					<img src=<%= media_thumbnail_url %>>
					<div class="caption">
						<button type="button" class="btn btn-link btn-info btn-block change-media">
							<span class="glyphicon glyphicon-facetime-video"></span>
							Media
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>

		<% if(!is_new) { %>
			<button type="button" class="btn btn-danger delete">
				Delete
			</button>
		<% } %>

		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
