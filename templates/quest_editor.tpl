<form class="form quest-editor" role="form" onsubmit="return false;">
  <!-- Quest attributes -->

  <h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
    <span class="object-id text-muted"><%= is_new ? "" : quest_id %></span>
  </h4>

  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" autofocus class="form-control" id="name" placeholder="Name" value="<%= name %>">
  </div>

  <% if (quest_type === 'QUEST') { %>

  <div class="form-group row">
    <div class="padded">
      <label for="select-category">Parent Quest</label>

      <select class="form-control" id="select-category">
        <option value="0">None</option>
        <% quests.each(function(object) { %>
          <% if (['CATEGORY', 'COMPOUND'].indexOf(object.get("quest_type")) !== -1) { %>
            <option value="<%= object.id %>" <%= option_selected(parent_quest_id === object.id) %>>
              <%= object.get("name") %>
            </option>
          <% } %>
        <% }) %>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="description">Description</label>
  </div>

  <!-- Active Section -->
  <div class="panel panel-info">
    <div class="panel-heading">
      Visible
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-xs-6 padded">
          <div class="thumbnail change-active-icon">
            <img src=<%= active_icon_thumbnail_url %>>
            <div class="caption">
              <button type="button" class="btn btn-link btn-info btn-block change-active-icon">
                <span class="glyphicon glyphicon-picture"></span>
                Icon
              </button>
            </div>
          </div>
        </div>

        <div class="col-xs-6 padded">
          <div class="thumbnail change-active-media">
            <img src=<%= active_media_thumbnail_url %>>
            <div class="caption">
              <button type="button" class="btn btn-link btn-info btn-block change-active-media">
                <span class="glyphicon glyphicon-facetime-video"></span>
                Media
              </button>
            </div>
          </div>
        </div>
      </div>


      <div class="form-group row">
        <div class="col-xs-6 padded">
          <button type="button" class="btn btn-block btn-warning edit-active-requirements">
            <span class="glyphicon glyphicon-lock"></span>
            Locks
          </button>
        </div>

        <div class="col-xs-6 padded">
          <button type="button" class="btn btn-block btn-info edit-active-events">
            <span class="glyphicon glyphicon-user"></span>
            Edit Events
          </button>
        </div>
      </div> <!-- Buttons -->

      <div class="form-group">
        <label for="active-description">Description</label>
        <textarea id="active-description" placeholder="Description" class="form-control" rows="2"><%= active_description %></textarea>
      </div>

      <div class="form-group row">
        <div class="col-xs-6 padded">
          <label for="active-notification-type">Notification Type</label>

          <select class="form-control" id="active-notification-type">
            <option value="NONE"        <%= option_selected(active_notification_type === "NONE")        %>>None</option>
            <option value="FULL_SCREEN" <%= option_selected(active_notification_type === "FULL_SCREEN") %>>Alert Box</option>
            <option value="DROP_DOWN"   <%= option_selected(active_notification_type === "DROP_DOWN")   %>>Top Banner</option>
          </select>
        </div>

        <div class="col-xs-6 padded active-function-box">
          <label for="active-function">Continue Button Function</label>

          <select class="form-control" id="active-function">
            <% _.each(function_types, function(name, value) { %>
              <option value="<%= value %>" <%= option_selected(active_function === value) %>><%= name %></option>
            <% }) %>
          </select>
        </div>
      </div>


    </div> <!-- Body -->
  </div> <!-- End Panel -->

  <!-- Complete Section -->
  <div class="panel panel-success">
    <div class="panel-heading">
      Complete
    </div>
    <div class="panel-body">

      <div class="row">
        <div class="col-xs-6 padded">
          <div class="thumbnail change-complete-icon">
            <img src=<%= complete_icon_thumbnail_url %>>
            <div class="caption">
              <button type="button" class="btn btn-link btn-info btn-block change-complete-icon">
                <span class="glyphicon glyphicon-picture"></span>
                Icon
              </button>
            </div>
          </div>
        </div>

        <div class="col-xs-6 padded">
          <div class="thumbnail change-complete-media">
            <img src=<%= complete_media_thumbnail_url %>>
            <div class="caption">
              <button type="button" class="btn btn-link btn-info btn-block change-complete-media">
                <span class="glyphicon glyphicon-facetime-video"></span>
                Media
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-xs-6 padded">
          <button type="button" class="btn btn-block btn-warning edit-complete-requirements">
            <span class="glyphicon glyphicon-lock"></span>
            Locks
          </button>
        </div>

        <div class="col-xs-6 padded">
          <button type="button" class="btn btn-block btn-info edit-complete-events">
            <span class="glyphicon glyphicon-user"></span>
            Edit Events
          </button>
        </div>
      </div> <!-- Buttons -->

      <div class="form-group">
        <label for="complete-description">Description</label>
        <textarea id="complete-description" placeholder="Description" class="form-control" rows="2"><%= complete_description %></textarea>
      </div>

      <div class="form-group row">
        <div class="col-xs-6 padded">
          <label for="complete-notification-type">Notification Type</label>

          <select class="form-control" id="complete-notification-type">
            <option value="NONE"        <%= option_selected(complete_notification_type === "NONE")        %>>None</option>
            <option value="FULL_SCREEN" <%= option_selected(complete_notification_type === "FULL_SCREEN") %>>Alert Box</option>
            <option value="DROP_DOWN"   <%= option_selected(complete_notification_type === "DROP_DOWN")   %>>Top Banner</option>
          </select>
        </div>

        <div class="col-xs-6 padded complete-function-box">
          <label for="complete-function">Continue Button Function</label>

          <select class="form-control" id="complete-function">
            <% _.each(function_types, function(name, value) { %>
              <option value="<%= value %>" <%= option_selected(complete_function === value) %>><%= name %></option>
            <% }) %>
          </select>
        </div>
      </div>

    </div> <!-- Body -->
  </div> <!-- End Panel -->

  <div class="form-group">
    <label for="prompt">Current Quest Prompt</label>
    <input type="text" class="form-control" id="prompt" placeholder="Prompt" value="<%= prompt %>">
  </div>

  <% } else if (quest_type === 'COMPOUND') { %>

  <div class="form-group row">
    <div class="padded">
      <label for="select-category">Quest Category</label>

      <select class="form-control" id="select-category">
        <option value="0">None</option>
        <% quests.each(function(object) { %>
          <% if (object.get("quest_type") === 'CATEGORY') { %>
            <option value="<%= object.id %>" <%= option_selected(parent_quest_id === object.id) %>>
              <%= object.get("name") %>
            </option>
          <% } %>
        <% }) %>
      </select>
    </div>
  </div>

  <% } %>

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

