<div class="scene-info">
	<h4>Scene <span class="object-id text-muted"><% if(!model.isNew()) { %><%= scene_id %><% } %></span></h4>
	<form class="form-horizontal" role="form">
		<div class="form-group">
			<label for="scene-name" class="col-sm-2 control-label">Name</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="scene-name" placeholder="Name" value="<%= name %>">
			</div>
		</div>

		<div class="form-group">
			<div class="col-sm-10">
				<button type="button" class="btn btn-primary save-scene">Save</button>
				<% if(!model.isNew()) { %>
					<button class="btn btn-danger delete-scene">Delete</button>
				<% } %>
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			</div>
		</div>
	</form>
</div>
