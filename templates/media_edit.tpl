<form role="form">

	<div class="form-group">
		<label for="media-name">Name</label>
		<input type="text" autofocus class="form-control" id="media-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="uploader">File</label>
		<input type="file" id="uploader" name="uploader">
		<p class="help-block">Select an image to upload.</p>
	</div>

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
			<img class="upload-preview" src="<%= url %>">
		</div>
	</div>

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">Save</button>
	</div>
</form>
