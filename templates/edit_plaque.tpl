<h3>Editing <small><%= title %></small></h3>

<form class="form-horizontal" role="form">

	<div class="form-group">
		<label class="col-sm-2 control-label" for="title">Title</label>
		<div   class="col-sm-10">
			<input id="title" type="text" class="form-control" value="<%= title %>">
		</div>
	</div>

	<div class="form-group">
		<label class="col-sm-2 control-label" for="text">Text</label>
		<div   class="col-sm-10">
			<input id="text" type="text" class="form-control" value="<%= text %>">
		</div>
	</div>

	<button id="save" class="btn btn-primary">Save</button>

</form>
