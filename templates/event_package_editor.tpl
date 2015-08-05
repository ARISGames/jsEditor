<form class="object-editor form" role="form" onsubmit="return false;">
   
  <h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
    <span class="object-id text-muted"><%= is_new ? "" : event_package_id %></span>
  </h4>

  <div class="form-group">
    <label for="event-package-name">Name</label>
    <input type="text" autofocus class="form-control" id="event-package-name" placeholder="Name" value="<%= name %>">
  </div>

  <div class="container-fluid">
    <div class="row event-package-table-header">
      <div class="col-xs-4 ">
        <label>Action</label>
      </div>
      <div class="col-xs-4">
        <label>What</label>
      </div>
      <div class="col-xs-4">
        <label>Quantity</label>
      </div>
    </div>
  </div>

  <ul class="list-group events">
    <a class="list-group-item list-group-item-info foot new-event">
      Add Row
    </a>
  </ul>

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

</form>

