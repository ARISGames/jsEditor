<div class="panel-heading">
	<div class="scene-title name">
		<% if(is_intro_scene) { %><span class="intro_icon glyphicon glyphicon-play"></span><% } %>
		<%= name || "Scene " + scene_id %>
	</div>

	<a class="new-trigger">
		<span class="glyphicon glyphicon-plus-sign"></span>
	</a>
</div>

<div class="panel-body clearfix">
	<ul class="list-inline scene-triggers clearfix">
	</ul>
</div>

