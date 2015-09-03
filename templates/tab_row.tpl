<div class="media" model-id="<%= model_id %>">
	<div class="media-body">
		<h4 class="media-heading">
			<%= tab_name %>
		</h4>
		<% if(display_type) { %>
			<div class="description">
				<%= tab_type %>
			</div>
		<% } %>
	</div>
</div>
<div class="tab-drag-handle">&equiv;</div>
