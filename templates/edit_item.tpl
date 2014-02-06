<h3>Editing <small><%= name %></small></h3>

<form class="form-horizontal" role="form">

	<div class="form-group">
		<label class="col-sm-2 control-label" for="name">Name</label>
		<div   class="col-sm-10">
			<input id="name" type="text" class="form-control" value="<%= name %>">
		</div>
	</div>

	<div class="form-group">
		<label class="col-sm-2 control-label" for="description">Description</label>
		<div   class="col-sm-10">
			<input id="description" type="description" class="form-control" value="<%= description %>">
		</div>
	</div>

	<button id="save" class="btn btn-primary">Save</button>

</form>
