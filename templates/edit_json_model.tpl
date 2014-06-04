<h3><%= model.isNew() ? "Create" : "Editing" %> <small><%= model.to_s() %></small></h3>

<form class="form-horizontal" role="form">

	<% _.each(model.editable_attributes(), function(attribute) { %>

		<div class="form-group">
			<label class="col-sm-2 control-label" for="<%= attribute %>"><%= t[attribute] || _.str.humanize(attribute) %></label>
			<div   class="col-sm-10">
				<input id="<%= attribute %>" type="text" class="form-control" value="<%= model.get(attribute) %>">
			</div>
		</div>

	<% }) %>

	<button id="save" class="btn btn-primary">Save</button>
	<% if(!model.isNew()) { %>
		<button id="delete", class="btn btn-danger">Delete</button>
	<% } %>

</form>
