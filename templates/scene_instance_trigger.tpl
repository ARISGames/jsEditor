<div class="trigger-icon show">
	<span class="glyphicon glyphicon-<%= object_icon %>"></span>
	<span class="glyphicon glyphicon-<%= type_icon   %> <%= type_color %> <%= scene_id ? 'link-to-scene' : '' %>"
    data-link-scene-id="<%= scene_id || 0 %>"></span>
</div>
<p class="trigger-label show"><%= object_name %></p>

