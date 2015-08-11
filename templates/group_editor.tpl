<form class="form group-editor object-editor" role="form" onsubmit="return false;">

  <div class="row">
    <div class="col-sm-8 padded">

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" autofocus class="form-control" id="name" placeholder="<%= parent_name %>" value="<%= name %>">
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

    <button type="button" class="btn btn-default cancel" data-dismiss="modal">
      Cancel
    </button>
  </div>
</form>

