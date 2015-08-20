<form class="form object-editor" role="form" onsubmit="return false;">

  <h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
    <span class="object-id text-muted"><%= is_new ? "" : item_id %></span>
  </h4>

  <div class="form-group">
    <label for="item-name">Name</label>
    <input type="text" autofocus class="form-control" id="item-name" placeholder="Name" value="<%= name %>">
  </div>

  <div class="form-group">
    <label for="item-description">Description</label>
    <textarea class="form-control" id="item-description" placeholder="Description" rows=2><%= description %></textarea>
  </div>

  <div class="form-group row">
    <div class="col-xs-6 padded">
        <label for="item-weight">Weight</label>
        <input type="number" class="form-control" id="item-weight" placeholder="Weight" value="<%= weight %>">
    </div>

    <div class="col-xs-6 padded">
        <label for="item-max_qty_in_inventory">Max Quantity in Inventory</label>
        <input type="number" class="form-control" id="item-max_qty_in_inventory" placeholder="Max Quantity" value="<%= max_qty_in_inventory %>">
    </div>
  </div>

  <div class="checkbox">
    <input type="checkbox" id="item-delta_notification" <%= is_checked(delta_notification) %>>
    <label for="item-delta_notification">
      Notify on Change
    </label>
  </div>

  <div class="checkbox">
    <input type="checkbox" id="item-droppable" <%= is_checked(droppable) %>>
    <label for="item-droppable">
      Droppable
    </label>
  </div>

  <div class="checkbox">
    <input type="checkbox" id="item-destroyable" <%= is_checked(destroyable) %>>
    <label for="item-destroyable">
      Destroyable
    </label>
  </div>

  <div class="form-group">
    <label for="item-type">Type</label>

    <div class="btn-group btn-group-sm btn-group-justified item-types">
      <label class="btn btn-info  <%= tab_selected(type === "NORMAL") %>">
        <input type="radio" class="item-type" name="item-type" value="NORMAL" <%= radio_selected(type === "NORMAL") %>>
        <span class="glyphicon glyphicon-stop"></span>
        &nbsp;Normal
      </label>
      <label class="btn btn-info <%= tab_selected(type === "ATTRIB") %>">
        <input type="radio" class="item-type" name="item-type" value="ATTRIB" <%= radio_selected(type === "ATTRIB") %>>
        <span class="glyphicon glyphicon-stats"></span>
        &nbsp;Attribute
      </label>
      <label class="btn btn-info <%= tab_selected(type === "URL") %>">
        <input type="radio" class="item-type" name="item-type" value="URL"    <%= radio_selected(type === "URL") %>>
        <span class="glyphicon glyphicon-globe"></span>
        &nbsp;Web Item
      </label>
      <label class="btn btn-info <%= tab_selected(type === "HIDDEN") %>">
        <input type="radio" class="item-type" name="item-type" value="HIDDEN" <%= radio_selected(type === "HIDDEN") %>>
        <span class="glyphicon glyphicon-eye-close"></span>
        &nbsp;Hidden
      </label>
    </div>
  </div>

  <div class="form-group">
    <label for="item-tag">Tag</label>
    <select class="form-control" id="item-tag">
        <option value="0" <%= option_selected(tag_id === 0) %>>none</option>
      <% tags.each(function(tag) { %>
        <option value="<%= tag.id %>" <%= option_selected(tag.id === tag_id) %>><%= tag.get("tag") %></option>
      <% }) %>
    </select>
  </div>

  <div class="row">
    <div class="col-xs-6 padded type-tab NORMAL-fields ATTRIB-fields URL-fields" <%= tab_visible(type === "ATTRIB" || type === "NORMAL" || type === "URL") %>>
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

    <div class="col-xs-6 padded">
      <div class="type-tab NORMAL-fields ATTRIB-fields" <%= tab_visible(type === "ATTRIB" || type === "NORMAL") %>>
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
      <div class="type-tab URL-fields" <%= tab_visible(type === "URL") %>>
        <label for="item-url">URL</label>
        <input type="text" class="form-control" id="item-url" placeholder="URL" value="<%= url %>">
      </div>
    </div>

  </div>

  <div class="row">
    <div class="col-xs-12 padded">
      <label class="inference_label hidden">Given/Taken By</label>
      <div class="events"></div>
    </div>
  </div>

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

