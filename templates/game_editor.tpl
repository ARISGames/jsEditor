<div class="shrink-center well well-lg game-settings" style="max-width: 100%;">
  <form class="form" role="form" onsubmit="return false;">
  <h4>
    Edit Game <span class="object-id text-muted"><%= game_id %></span>
  </h4>

  <div class="form-group row">
    <div class="col-xs-12 col-md-8 padded">

      <div class="form-group">
        <label for="game-name">Name</label>
        <input type="text" autofocus class="form-control" id="game-name" placeholder="Name" value="<%= name %>">
      </div>

      <div class="form-group">
        <label for="game-description">Description</label>
        <textarea class="form-control" id="game-description" placeholder="Description" rows=5><%= description %></textarea>
      </div>

      <div class="form-group">
        <label for="game-intro_scene_id">Intro Scene</label>

        <select class="form-control" id="game-intro_scene_id">
          <option value="0" selected disabled>- Select One -</option>

          <% scenes.each(function(scene) { %>
            <option value="<%= scene.id %>" <%= option_selected(intro_scene_id === scene.id) %>><%= scene.get("name") %></option>
          <% }); %>
        </select>
      </div>

      <div class="form-group">
        <label for="game-intro_scene_id">Game Location (Used to determine "Nearby Games")</label>
        <div class="map-canvas" style="height: 150px; width: 100%"></div>
      </div>

      <div class="form-group">
        <br>
        <label for="game-intro_scene_id">Visibility To ARIS Client</label>
        <div class="btn-group btn-group-lg btn-group-justified published-toggle" data-toggle="popover" data-html="true" title="Game Visibility to Players" data-content="If <strong class='text-success'>Published</strong> your game will be listed as playable on the ARIS client to everyone. If <strong class='text-info'>Private</strong> it will appear under the 'mine' tab for all editors of the game.">
          <label class="btn btn-success <%= tab_selected(published === "1") %>">
            <input type="radio" class="game-published" name="game-published" value="1" <%= radio_selected(published === "1") %>>
            <span class="glyphicon glyphicon-saved"></span>
            Published
          </label>
          <label class="btn btn-info <%= tab_selected(published === "0") %>">
            <input type="radio" class="game-published" name="game-published" value="0" <%= radio_selected(published === "0") %>>
            <span class="glyphicon glyphicon-eye-close"></span>
            Private
          </label>
        </div>
      </div>
    </div> <!-- /fields col -->


    <div class="col-xs-12 col-md-4 padded">

      <div class="form-group">
        <label>Appearance</label>

        <div class="thumbnail change-icon">
          <img src=<%= icon_thumbnail_url %>>
          <div class="caption">
            <button type="button" class="btn btn-link btn-info btn-block change-icon">
              <span class="glyphicon glyphicon-picture"></span>
              Icon
            </button>
          </div>
        </div>

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
    </div> <!-- /media col -->
  </div> <!-- /main form -->


  <div class="panel panel-default">
    <div class="panel-heading">
      <h5 class="panel-title collapsed" data-toggle="collapse" data-target="#login-codes">
        <a>
          Login QR Codes
        </a>
      </h5>
    </div>
  </div>


  <div id="login-codes" class="collapse">
    <div class="form-group row">
      <div class="col-xs-12 col-md-4 padded">
        <div class="qr_image"></div>
      </div>

      <div class="col-xs-12 col-md-8 padded">
        <div class="form-group">
          <label for="login-group">Player Group (optional)</label>
          <input type="text" class="form-control" id="login-group" placeholder="Group Name" value="">
        </div>

        <label for="login-group">Access to ARIS</label>
        <div class="checkbox">
          <input type="checkbox" id="login-disable-exit">
          <label for="login-disable-exit">
            Disable ability to leave this game.
          </label>
        </div>
      </div>
    </div>
  </div>


  <!-- Advanced Section -->

  <div class="panel panel-default">
    <div class="panel-heading">
      <h5 class="panel-title collapsed" data-toggle="collapse" data-target="#advanced-settings">
        <a>
          Advanced Settings
        </a>
      </h5>
    </div>
  </div>

  <div id="advanced-settings" class="collapse">
    <div class="form-group">
      <label for="type">Game Category</label>
      <select class="form-control" id="game-type">
        <option value="LOCATION" <%= option_selected(type === "LOCATION") %>>To be played around a specific location</option>
        <option value="ANYWHERE" <%= option_selected(type === "ANYWHERE") %>>Can be played anywhere</option>
        <option value="QR"       <%= option_selected(type === "QR")       %>>Intended for play with QR Codes</option>
      </select>
    </div>

    <div class="form-group">
      <label for="network_level">Network</label>

      <div class="btn-group btn-group-sm btn-group-justified network_levels">
        <label class="btn btn-info  <%= tab_selected(network_level === "LOCAL") %>">
          <input type="radio" class="network_level item-type" name="network_level" value="LOCAL" <%= radio_selected(network_level === "LOCAL") %>>
          <span class="glyphicon glyphicon-stats"></span>
          &nbsp;Local
        </label>
        <label class="btn btn-info <%= tab_selected(network_level === "REMOTE_WRITE") %>">
          <input type="radio" class="network_level item-type" name="network_level" value="REMOTE_WRITE" <%= radio_selected(network_level === "REMOTE_WRITE") %>>
          <span class="glyphicon glyphicon-stats"></span>
          &nbsp;Remote Write
        </label>
        <label class="btn btn-info <%= tab_selected(network_level === "HYBRID") %>">
          <input type="radio" class="network_level item-type" name="network_level" value="HYBRID"    <%= radio_selected(network_level === "HYBRID") %>>
          <span class="glyphicon glyphicon-stats"></span>
          &nbsp;Hybrid
        </label>
        <label class="btn btn-info <%= tab_selected(network_level === "REMOTE") %>">
          <input type="radio" class="network_level item-type" name="network_level" value="REMOTE" <%= radio_selected(network_level === "REMOTE") %>>
          <span class="glyphicon glyphicon-stats"></span>
          &nbsp;Remote
        </label>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>Map</h4>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label for="map_type">Type</label>

          <select class="form-control" id="game-map_type">
            <option value="STREET"    <%= option_selected(map_type === "STREET")    %>>Street</option>
            <option value="SATELLITE" <%= option_selected(map_type === "SATELLITE") %>>Satellite</option>
            <option value="HYBRID"    <%= option_selected(map_type === "HYBRID")    %>>Hybrid</option>
          </select>
        </div>

        <div class="form-group">
          <label for="game-map_latitude">Latitude</label>
          <input type="text" class="form-control" id="game-map_latitude" placeholder="0.0" value="<%= map_latitude %>">
        </div>

        <div class="form-group">
          <label for="game-map_longitude">Longitude</label>
          <input type="text" class="form-control" id="game-map_longitude" placeholder="0.0" value="<%= map_longitude %>">
        </div>

        <div class="form-group">
          <label for="game-map_zoom_level">Zoom</label>
          <input type="text" class="form-control" id="game-map_zoom_level" placeholder="0" value="<%= map_zoom_level %>">
        </div>

        <div class="checkbox">
          <input type="checkbox" id="game-map_show_player" <%= is_checked(map_show_player) %>>
          <label for="game-map_show_player">
            Show Player Location Dot
          </label>
        </div>

        <div class="checkbox">
          <input type="checkbox" id="game-map_show_players" <%= is_checked(map_show_players) %>>
          <label for="game-map_show_players">
            Show Other Players' Locations
          </label>
        </div>

        <div class="checkbox">
          <input type="checkbox" id="game-map_offsite_mode" <%= is_checked(map_offsite_mode) %>>
          <label for="game-map_offsite_mode">
            Offsite Mode (All locations temporarily infinite range)
          </label>
        </div>
        <div class="alert alert-info">
          <span class="glyphicon glyphicon-info-sign"></span>
          When checked, all locations will be accessible from anywhere on the map. Useful for off-site debugging.
        </div>
      </div>
    </div> <!-- /map -->

    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>Notebook</h4>
      </div>
      <div class="panel-body">
        <div class="checkbox">
          <input type="checkbox" id="game-notebook_allow_comments" <%= is_checked(notebook_allow_comments) %>>
          <label for="game-notebook_allow_comments">
            Comments Allowed
          </label>
        </div>

        <div class="checkbox">
          <input type="checkbox" id="game-notebook_allow_likes" <%= is_checked(notebook_allow_likes) %>>
          <label for="game-notebook_allow_likes">
            Likes Allowed
          </label>
        </div>
      </div>
    </div> <!-- /notebook -->


    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>Player Inventory</h4>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label for="game-inventory_weight_cap">Weight Cap (0 = no weight cap)</label>
          <input type="number" min="0" class="form-control" id="game-inventory_weight_cap" placeholder="0" value="<%= inventory_weight_cap %>">
        </div>
        <div class="alert alert-info">
          <span class="glyphicon glyphicon-info-sign"></span>
          Items can be assigned a weight. Setting a cap will prevent players from holding an inventory with sum weight total greater than this cap.
        </div>
      </div>
    </div> <!-- /inventory -->


  </div> <!-- /advanced -->


  <div class="form-group">
    <button type="submit" class="btn btn-primary save">
      Save
    </button>
    <button type="button" class="btn btn-default cancel" data-dismiss="modal">
      Cancel
    </button>
    <div class="pull-right">
      <button type="button" class="btn btn-info duplicate">
        Duplicate
      </button>
      <button type="button" class="btn btn-danger delete">
        Delete
      </button>
    </div>
  </div>
  </form>
</div>

