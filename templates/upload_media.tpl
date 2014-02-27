<h3><%= model.isNew() ? "Create" : "Editing" %> <small><%= model.to_s() %></small></h3>

<form class="form-horizontal" role="form" id="file_form">

	<div class="form-group">
		<label class="col-sm-2 control-label" for="file_data"><%= t['file_data'] || _.str.humanize('file_data') %></label>
		<div   class="col-sm-10">
			<input id="file_data" type="file" name="file">
		</div>
	</div>

	<div class="form-group">
		<label class="col-sm-2 control-label" for="file_name"><%= t['file_name'] || _.str.humanize('file_name') %></label>
		<div   class="col-sm-10">
			<input id="file_name" type="text" class="form-control" name="path">
		</div>
	</div>

	<button id="save" class="btn btn-primary">Save</button>
	<% if(!model.isNew()) { %>
		<button id="delete", class="btn btn-danger">Delete</button>
	<% } %>

</form>
