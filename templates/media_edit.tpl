<form role="form">
	<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
		<span class="object-id text-muted"><%= media_id %></span>
	</h4>

	<div class="form-group">
		<label for="media-name">Name</label>
		<input type="text" autofocus class="form-control" id="media-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label>Preview</label>
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
			<img class="upload-preview" src="<%= url %>">
		</div>
	</div>

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>

		<button type="button" class="btn btn-danger delete">
			Delete
		</button>

		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>

</form>
