<form class="form note-editor object-editor" role="form" onsubmit="return false;">
	<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
		<span class="object-id text-muted"><%= note_id %></span>
	</h4>

	<!-- Note attributes -->

	<blockquote>
		<p>
			<%= description %>
		</p>
		<footer>
			<%= user_name %>
		</footer>
	</blockquote>

	<% if(tag_name) { %>
		<p class="pull-right">
			<span class="glyphicon glyphicon-tags"></span>
			&nbsp;
			<%= tag_name %>
		</p>
	<% } %>


	<% if(has_media) { %>
		<div class="form-group">
			<div class="audio-preview media-previewer" style="display: none;">
				<audio controls class="upload-preview">
					<source src="<%= url %>"/>
					Audio Format Unsupported in this Browser. Link to file: <a target="_blank" href="<%= url %>"><%= url %></a>
				</audio>
			</div>

			<div class="video-preview media-previewer" style="display: none;">
				<video controls class="upload-preview">
					<source src="<%= url %>"/>
					Video Format Unsupported in this Browser. Link to file: <a target="_blank" href="<%= url %>"><%= url %></a>
				</video>
			</div>

			<div class="image-preview media-previewer" style="display: none;">
				<img class="upload-preview img-thumbnail" src="<%= url %>">
			</div>
		</div>
	<% } %>

	<h5 class="comments-header" style="display:none;">Comments</h5>
	<div class="list-group note_comments">
	</div>

	<div class="form-group">
		<% if(!is_new) { %>
			<button type="button" class="btn btn-danger delete">
				Delete
			</button>
		<% } %>

		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
