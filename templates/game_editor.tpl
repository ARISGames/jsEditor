<style>
.gmnoprint img
{
max-width:none;
}
</style>
<div class="shrink-center well well-lg game-settings" style="max-width:100%;">
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

      <div class="checkbox">
        <input type="checkbox" id="game-ipad_two_x" <%= is_checked(ipad_two_x) %>>
        <label for="game-ipad_two_x">
          Scale 2x on iPad
        </label>
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

  <div class="form-group">


    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>Game Type</h4>
      </div>
      <div class="panel-body">

        <div class="form-group">
          <label for="type">Category</label>
          <select class="form-control" id="game-type">
            <option value="LOCATION" <%= option_selected(type === "LOCATION") %>>To be played around a specific location</option>
            <option value="ANYWHERE" <%= option_selected(type === "ANYWHERE") %>>Can be played anywhere</option>
            <option value="QR"       <%= option_selected(type === "QR")       %>>Intended for play with QR Codes</option>
          </select>
        </div>

        <div class="form-group">
          <label for="">Location (Used to determine "Nearby Games")</label>
          <div class="game-map-canvas" style="height:150px; width:100%"></div>
        </div>
      </div>
    </div>



    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>Network</h4>
      </div>
      <div class="panel-body">

        <div class="btn-group btn-group-sm btn-group-justified network_levels">
          <!--
          <label class="btn btn-info  <%= tab_selected(network_level === "LOCAL") %>">
            <input type="radio" class="network_level item-type" name="network_level" value="LOCAL" <%= radio_selected(network_level === "LOCAL") %>>
            <span class="glyphicon glyphicon-stats"></span>
            &nbsp;No Internet
          </label>
          -->
          <label class="btn btn-info <%= tab_selected(network_level === "REMOTE_WRITE") %>">
            <input type="radio" class="network_level item-type" name="network_level" value="REMOTE_WRITE" <%= radio_selected(network_level === "REMOTE_WRITE") %>>
            <span class="glyphicon glyphicon-stats"></span>
            &nbsp;Local Evaulation
          </label>
          <!--
          <label class="btn btn-info <%= tab_selected(network_level === "HYBRID") %>">
            <input type="radio" class="network_level item-type" name="network_level" value="HYBRID"    <%= radio_selected(network_level === "HYBRID") %>>
            <span class="glyphicon glyphicon-stats"></span>
            &nbsp;Smart Cloud &trade; Technology
          </label>
          -->
          <label class="btn btn-info <%= tab_selected(network_level === "REMOTE") %>">
            <input type="radio" class="network_level item-type" name="network_level" value="REMOTE" <%= radio_selected(network_level === "REMOTE") %>>
            <span class="glyphicon glyphicon-stats"></span>
            &nbsp;Server Dependent
          </label>
        </div>


        <!-- Info Boxes -->

        <!--
        <div id="LOCAL-fields" class="network-game-tab" <%= tab_visible(network_level === "LOCAL") %>>
          <div class="alert alert-info">
            <span class="glyphicon glyphicon-info-sign"></span>
            <b>No Internet</b> - Once you are in the game, ARIS will make no attempt to contact the ARIS server. Any progress made by players will <b>not</b> be saved across devices/playthroughs.<br />
            <br />
            <b>Recommended for</b> games with static, unchanging content; especially in low-internet locations.<br />
            <b>Not Recommended for</b> multiplayer games that rely on changing global content (such as notes, factories, world items, etc...)
            <b>WARNING</b> - Do not use notebook in this mode.<br />
          </div>
        </div>
        -->

        <div id="REMOTE_WRITE-fields" class="network-game-tab" <%= tab_visible(network_level === "REMOTE_WRITE") %>>
          <div class="alert alert-info">
            <span class="glyphicon glyphicon-info-sign"></span>
            <b>Local Evaluation</b> - Once you are in the game, ARIS will make few attempts to contact the ARIS server. This will result in faster event/requirement computation, but limits networked functionality.<br />
            <br />
            <b>Recommended for</b> games with static, unchanging content.<br />
            <b>Not Recommended for</b> games that rely on changing global content (such as notes, factories, world items, etc...)
          </div>
        </div>

        <!--
        <div id="HYBRID-fields" class="network-game-tab" <%= tab_visible(network_level === "HYBRID") %>>
          <div class="alert alert-info">
            <span class="glyphicon glyphicon-info-sign"></span>
            <b>Smart Cloud &trade; Technology</b> - ARIS will maintain close contact with the ARIS server, but any downtime or sluggishness in connection speed will be mitigated using Smart Cloud &trade; prediction technology.<br />
            <br />
            <b>Recommended for</b> most games.<br />
            <b>Not Recommended for</b> multiplayer games that <b>fundamentally</b> rely on <b>realtime</b> changing content (especially "race to grab this item" style games).
            <b>WARNING</b> - Do not use notebook in this mode.<br />
          </div>
        </div>
        -->

        <div id="REMOTE-fields" class="network-game-tab" <%= tab_visible(network_level === "REMOTE") %>>
          <div class="alert alert-info">
            <span class="glyphicon glyphicon-info-sign"></span>
            <b>Server Dependent</b> - ARIS will not function without a constant connection to the internet. It will rely on the server to validate every action as it is taken.<br />
            <br />
            <b>Recommended for</b> multiplayer games that rely on realtime changing content (especially "race to grab this item" style games), or global state (group/game items, notebook, etc...).<br />
          </div>
        </div>


        <div class="checkbox">
          <input type="checkbox" id="game-preload_media" <%= is_checked(preload_media) %>>
          <label for="game-preload_media">
            Preload Media
          </label>
        </div>

      </div>
    </div>

  </div>


  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Login Codes</h4>
    </div>
    <div class="panel-body">

      <div class="form-group">

        <div id="login-codes">
          <div class="form-group row">
            <div class="col-xs-12 col-md-4 padded">
              <div class="qr_image"></div>
              <p class="qr_instructions">Log in to the game</p>
            </div>
            <div class="col-xs-12 col-md-4 padded locked_codes">
              <div class="qr_image_locked"></div>
              <p class="qr_instructions">Log in to the game, can't log out</p>
            </div>
            <div class="col-xs-12 col-md-4 padded locked_codes">
              <div class="log_out_qr_image"></div>
              <p class="qr_instructions">Scan this code to log out</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div id="advanced-settings">
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
          <label for="map_focus">Focus</label>

          <select class="form-control" id="game-map_focus">
            <option value="PLAYER"        <%= option_selected(map_focus === "PLAYER")        %>>Player</option>
            <option value="LOCATION"      <%= option_selected(map_focus === "LOCATION")      %>>Location</option>
            <option value="FIT_LOCATIONS" <%= option_selected(map_focus === "FIT_LOCATIONS") %>>Fit All Available Locations</option>
          </select>
        </div>

        <div class="form-group tab-map-container" <%= tab_visible(map_focus === "LOCATION") %>>
          <label for="">Map Location</label>
          <div class="tab-map-canvas" style="height:150px; width:100%"></div>
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
    <br>
    <label for="">Visibility To ARIS Client</label>
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

  </div>

  <div class="form-group">
    <button type="submit" class="btn btn-primary save">
      Save
    </button>
    <button type="button" class="btn btn-default cancel" data-dismiss="modal">
      Cancel
    </button>
    <div class="pull-right">
      <button type="button" class="btn btn-info export">
        Export
      </button>
      <button type="button" class="btn btn-warning duplicate">
        Duplicate
      </button>
      <button type="button" class="btn btn-danger delete">
        Delete
      </button>
    </div>
  </div>
  </form>
</div>

