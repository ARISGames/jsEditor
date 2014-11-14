<form class="form object-editor" role="form" onsubmit="return false;">
	<!-- Conversation attributes -->

	<div class="row">
		<div class="col-sm-12 padded">
			<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
				<span class="object-id text-muted"><%= is_new ? "" : dialog_id %></span>
			</h4>

			<div class="form-group">
				<label for="dialog-name">Name</label>
				<input type="text" autofocus class="form-control" id="dialog-name" placeholder="Name" value="<%= name %>">
			</div>


		</div>

		<div class="col-sm-12 padded">
			<div class="form-group">
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

			<div class="form-group">
				<button type="button" class="btn btn-info btn-block edit-script">
					<span class="glyphicon glyphicon-file"></span>
					Script Editor
				</button>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-xs-12 padded">
			<button type="submit" class="btn btn-primary save">
				Save
			</button>

			<% if(!is_new) { %>
				<button type="button" class="btn btn-danger delete">
					Delete
				</button>
			<% } %>

			<button type="button" class="btn btn-default cancel" data-dismiss="modal">
				Cancel
			</button>
		</div>
	</div>

</form>
