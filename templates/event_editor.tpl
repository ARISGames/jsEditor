<div class="container-fluid">
  <div class="row">
    <form class="form" role="form">
      <div class="col-xs-4 padded">
        <select class="form-control event-select">
          <option value="0" selected disabled>None</option>
          <optgroup label="Player">
            <option value="GIVE_ITEM_PLAYER" <%= option_selected(event === "GIVE_ITEM_PLAYER" || event === "GIVE_ITEM") %>>Give to Player</option>
            <option value="TAKE_ITEM_PLAYER" <%= option_selected(event === "TAKE_ITEM_PLAYER" || event === "TAKE_ITEM") %>>Take from Player</option>
            <option value="SET_ITEM_PLAYER"  <%= option_selected(event === "SET_ITEM_PLAYER")    %>>Set amount for Player</option>
          </optgroup>
          <optgroup label="World">
            <option value="GIVE_ITEM_GAME"   <%= option_selected(event === "GIVE_ITEM_GAME")   %>>Give to World</option>
            <option value="TAKE_ITEM_GAME"   <%= option_selected(event === "TAKE_ITEM_GAME")   %>>Take from World</option>
            <option value="SET_ITEM_GAME"    <%= option_selected(event === "SET_ITEM_GAME")    %>>Set amount for World</option>
          </optgroup>
          <optgroup label="Group">
            <option value="GIVE_ITEM_GROUP"   <%= option_selected(event === "GIVE_ITEM_GROUP")   %>>Give to Group</option>
            <option value="TAKE_ITEM_GROUP"   <%= option_selected(event === "TAKE_ITEM_GROUP")   %>>Take from Group</option>
            <option value="SET_ITEM_GROUP"    <%= option_selected(event === "SET_ITEM_GROUP")    %>>Set amount for Group</option>
          </optgroup>
          <optgroup label="Other">
            <option value="SET_SCENE"   <%= option_selected(event === "SET_SCENE")   %>>Set Scene</option>
            <option value="SET_GROUP"   <%= option_selected(event === "SET_GROUP")   %>>Set Group</option>
            <option value="RUN_SCRIPT"  <%= option_selected(event === "RUN_SCRIPT")  %>>Run JS</option>
          </optgroup>
        </select>
      </div>
      <div class="col-xs-4 padded">

        <% if(selecting_type == "items") { %>
          <select class="form-control content-select">

            <option value="0" selected disabled>None</option>

            <optgroup label="Player Attributes">
              <% _.each(items.where({type: "ATTRIB"}), function(item) { %>
                <option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
                  <%= item.get("name") %>
                </option>
              <% }); %>
            </optgroup>

            <optgroup label="Items">
              <% _.each(items.where({type: "NORMAL"}), function(item) { %>
                <option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
                  <%= item.get("name") %>
                </option>
              <% }); %>
            </optgroup>

            <optgroup label="Web Items">
              <% _.each(items.where({type: "URL"}), function(item) { %>
                <option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
                  <%= item.get("name") %>
                </option>
              <% }); %>
            </optgroup>

            <optgroup label="Hidden Items">
              <% _.each(items.where({type: "HIDDEN"}), function(item) { %>
                <option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
                  <%= item.get("name") %>
                </option>
              <% }); %>
            </optgroup>

          </select>
        <% } %>

        <% if(selecting_type == "scenes") { %>
          <select class="form-control content-select">

            <option value="0" selected disabled>None</option>

            <% scenes.each(function(scene) { %>
              <option value="<%= scene.get("scene_id") %>" <%= option_selected(content_id === scene.get("scene_id")) %>>
                <%= scene.get("name") %>
              </option>
            <% }); %>

          </select>
        <% } %>


        <% if(selecting_type == "groups") { %>
          <select class="form-control content-select">

            <option value="0" selected disabled>None</option>

            <% groups.each(function(group) { %>
              <option value="<%= group.get("group_id") %>" <%= option_selected(content_id === group.get("group_id")) %>>
                <%= group.get("name") %>
              </option>
            <% }); %>

          </select>
        <% } %>

        <% if(selecting_type == "js") { %>
          <select class="form-control content-select">

            <option value="0" selected disabled>None</option>

            <optgroup label="<Coming Soon>">
            </optgroup>

          </select>
        <% } %>

      </div>

      <div class="col-xs-2 padded">
        <% if(selecting_type == "items") { %>
          <input type="number" class="form-control quantity" value="<%= qty %>" min="0">
        <% } %>
      </div>

      <div class="col-xs-2 padded">
        <button type="button" class="btn btn-link delete">Remove</button>
      </div>
    </form>
  </div>
</div>

