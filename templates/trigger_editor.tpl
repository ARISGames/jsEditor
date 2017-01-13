<% if(!in_modal) { %>
  <h4>Trigger <span class="object-id text-muted"><%= is_new ? "" : trigger_id %></span></h4>
<% } %>

<form class="form" role="form" onsubmit="return false;">

<!-- Edit Object -->

<div class="form-group" id="trigger_object_selector">
</div>

<!-- Locks -->

<div class="form-group">
  <button type="button" class="btn btn-warning btn-block edit-requirements">
    <span class="glyphicon glyphicon-lock"></span>
    Locks
  </button>
</div>

<!-- Trigger Attributes -->

<div class="btn-group btn-group-sm btn-group-justified trigger-types">
  <label class="btn btn-info <%= tab_selected(type === "LOCATION") %>">
    <input type="radio" class="trigger-type" name="trigger-type" value="LOCATION"  <%= radio_selected(type === "LOCATION") %>>
    <span class="glyphicon glyphicon-map-marker"></span>
    MAP
  </label>
  <label class="btn btn-info <%= tab_selected(type === "QR") %>">
    <input type="radio" class="trigger-type" name="trigger-type" value="QR"        <%= radio_selected(type === "QR") %>>
    <span class="glyphicon glyphicon-qrcode"></span>
    QR
  </label>
  <label class="btn btn-info  <%= tab_selected(type === "IMMEDIATE") %>">
    <input type="radio" class="trigger-type" name="trigger-type" value="IMMEDIATE" <%= radio_selected(type === "IMMEDIATE") %>>
    <span class="glyphicon glyphicon-link"></span>
    Locks
  </label>
</div>
<div class="btn-group btn-group-sm btn-group-justified trigger-types">
  <label class="btn btn-info  <%= tab_selected(type === "TIMER") %>">
    <input type="radio" class="trigger-type" name="trigger-type" value="TIMER" <%= radio_selected(type === "TIMER") %>>
    <span class="glyphicon glyphicon-time"></span>
    Timer
  </label>
  <label class="btn btn-info  <%= tab_selected(type === "AR") %>">
    <input type="radio" class="trigger-type" name="trigger-type" value="AR" <%= radio_selected(type === "AR") %>>
    <span class="glyphicon glyphicon-qrcode"></span>
    AR
  </label>
  <label class="btn btn-info  <%= tab_selected(type === "BEACON") %>">
    <input type="radio" class="trigger-type" name="trigger-type" value="BEACON" <%= radio_selected(type === "BEACON") %>>
    <span class="glyphicon glyphicon-signal"></span>
    Beacon
  </label>
</div>

<br>

<!-- Trigger by Location Attributes -->

<div id="LOCATION-fields" class="type-trigger-tab" <%= tab_visible(type === "LOCATION") %>>

  <div class="map-canvas" style="height: 150px; width: 100%"></div>

  <div class="checkbox">
    <input type="checkbox" id="trigger-infinite" <%= is_checked(infinite_distance) %>>
    <label for="trigger-infinite">
      Available Anywhere
    </label>
  </div>

  <div class="form-group">
    <label>
      When in range, trigger:
    </label>
    <div class="btn-group btn-group-sm btn-group-justified trigger-trigger_on_enter">
      <label class="btn btn-info <%= tab_selected(trigger_on_enter === "1") %>">
        <input type="radio" class="trigger-enter" name="trigger-trigger_on_enter" value="1" <%= radio_selected(trigger_on_enter === "1") %>>
        <span class="glyphicon glyphicon-flash"></span>
        Immediately
      </label>
      <label class="btn btn-info <%= tab_selected(trigger_on_enter === "0") %>">
        <input type="radio" class="trigger-enter" name="trigger-trigger_on_enter" value="0" <%= radio_selected(trigger_on_enter === "0") %>>
        <span class="glyphicon glyphicon-hand-up"></span>
        By Touch
      </label>
    </div>
  </div>

  <div id="1-fields" class="enter-trigger-tab" <%= tab_visible(trigger_on_enter === "1") %>>
    <div class="checkbox">
      <input type="checkbox" id="trigger-hidden" <%= is_checked(hidden) %>>
      <label for="trigger-hidden">
        Hidden from Map on Client
      </label>
    </div>
  </div>

  <hr>


  <!-- Icon Selector -->
  <div class="form-group">
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

  <div class="checkbox">
    <input type="checkbox" id="trigger-wiggle" <%= is_checked(wiggle) %>>
    <label for="trigger-wiggle">
      Animate Icon on Map
    </label>
  </div>

  <div class="checkbox">
    <input type="checkbox" id="trigger-show_title" <%= is_checked(show_title) %>>
    <label for="trigger-show_title">
      Show Map Title
    </label>
  </div>

  <div class="form-group title-container"  <%= tab_visible(show_title === "1") %>>
    <input type="text" class="form-control" id="trigger-title" placeholder="<%= name %>" value="<%= title %>">
  </div>

</div>


<!-- Trigger by Code Attributes -->

<div id="QR-fields" class="type-trigger-tab" <%= tab_visible(type === "QR") %>>
  <div class="form-group">
    <label for="trigger-code">QR Code</label>
    <input type="text" class="form-control" id="trigger-code" placeholder="QR Code" value="<%= qr_code %>">
    <div class="qr_image"></div>
  </div>
</div>


<!-- Trigger Immediate Attributes -->

<div id="IMMEDIATE-fields" class="type-trigger-tab" <%= tab_visible(type === "IMMEDIATE") %>>
  <div class="alert alert-info">
    <span class="glyphicon glyphicon-info-sign"></span>
    Will be triggered as soon as all locks are satisfied.
  </div>
</div>

<!-- Trigger Timer Attributes -->

<div id="TIMER-fields" class="type-trigger-tab" <%= tab_visible(type === "TIMER") %>>
  <div class="alert alert-info">
    <span class="glyphicon glyphicon-info-sign"></span>
    Will be triggered at a regular interval so long as all locks are satisfied.
  </div>
  <div class="form-group">
    <label for="trigger-seconds">Seconds between triggers</label>
    <input type="number" class="form-control" id="trigger-seconds" placeholder="10" min="0" value="<%= seconds %>">
  </div>
</div>

<!-- Trigger AR Target Attributes -->

<div id="AR-fields" class="type-trigger-tab" <%= tab_visible(type === "AR") %>>
  <div class="alert alert-info">
    <span class="glyphicon glyphicon-info-sign"></span>
    Will be triggered when clicked in AR viewer
  </div>
  <div class="form-group">
    <label for="trigger-ar_target_id">Which AR Target</label>

    <div class="form-group" id="trigger_ar_target_selector">
    </div>

  </div>
</div>

<!-- Trigger Beacon Attributes -->

<div id="BEACON-fields" class="type-trigger-tab" <%= tab_visible(type === "BEACON") %>>
  <div class="form-group">
    <label for="trigger-beacon_uuid">Beacon UUID</label>
    <input type="text" class="form-control" id="trigger-beacon_uuid" placeholder="UUID" min="0" value="<%= beacon_uuid %>">
  </div>
  <div class="form-group">
    <label for="trigger-beacon_major">Major value</label>
    <input type="number" class="form-control" id="trigger-beacon_major" placeholder="0" min="0" value="<%= beacon_major %>">
  </div>
  <div class="form-group">
    <label for="trigger-beacon_minor">Minor value</label>
    <input type="number" class="form-control" id="trigger-beacon_minor" placeholder="0" min="0" value="<%= beacon_minor %>">
  </div>

  <div class="form-group">
    <label>
      Distance
    </label>
    <div class="btn-group btn-group-sm btn-group-justified beacon-distance-group">
      <label class="btn btn-info <%= tab_selected(distance === '1') %>">
        <input type="radio" class="beacon-distance" name="beacon-distance" value="1" <%= radio_selected(distance === "1") %>>
        Immediate
      </label>
      <label class="btn btn-info <%= tab_selected(distance === '2') %>">
        <input type="radio" class="beacon-distance" name="beacon-distance" value="2" <%= radio_selected(distance === "2") %>>
        Near
      </label>
      <label class="btn btn-info <%= tab_selected(distance === '3') %>">
        <input type="radio" class="beacon-distance" name="beacon-distance" value="3" <%= radio_selected(distance === "3") %>>
        Far
      </label>
    </div>
  </div>

  <div class="form-group hidden">
    <label>
      When in range, trigger:
    </label>
    <div class="btn-group btn-group-sm btn-group-justified beacon-trigger_on_enter">
      <label class="btn btn-info <%= tab_selected(trigger_on_enter === '1') %>">
        <input type="radio" class="beacon-enter" name="beacon-trigger_on_enter" value="1" <%= radio_selected(trigger_on_enter === "1") %>>
        <span class="glyphicon glyphicon-flash"></span>
        Immediately
      </label>
      <label class="btn btn-info <%= tab_selected(trigger_on_enter === '0') %>">
        <input type="radio" class="beacon-enter" name="beacon-trigger_on_enter" value="0" <%= radio_selected(trigger_on_enter === "0") %>>
        <span class="glyphicon glyphicon-hand-up"></span>
        By Touch
      </label>
    </div>
  </div>
</div>

<!-- Quantity of Instance -->
<div id="instance-quantity-fields" class="<%= quantity_fields_visible ? "" : "hidden" %>">
  <hr>

  <label>Quantity Available</label>
  <div class="checkbox" style="margin-top: 0">
    <input type="checkbox" id="instance-infinite_quantity" <%= is_checked(instance_infinite_quantity) %>>
    <label for="instance-infinite_quantity">
      Unlimited
    </label>
  </div>

  <div class="form-group quantity-container"  <%= tab_visible(instance_infinite_quantity === "0") %>>
    <input type="number" class="form-control" id="instance-quantity" placeholder="Quantity" min="0" value="<%= instance_quantity %>">
  </div>
</div>

<hr>

<div class="form-group">
  <button type="submit" class="btn btn-primary save">
    Save
  </button>
  <button type="button" class="btn btn-danger delete">Delete</button>
  <button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
</div>
</form>

