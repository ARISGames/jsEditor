<h3>Editing <small><%= name %></small></h3>

<form class="form-horizontal" role="form">

	<div class="form-group">
		<!-- TODO form label i18n -->
		<!-- TODO populate from view instead of template insertion -->
		<label class="col-sm-2 control-label" for="name">Name</label>
		<div   class="col-sm-10">
			<input id="name" type="text" class="form-control" value="<%=  name %>">
		</div>
	</div>

	<button id="save" class="btn btn-primary">Save</button>

</form>
