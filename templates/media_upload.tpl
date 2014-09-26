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
				Audio Format Unsupported in this Browser.
			</audio>
		</div>

		<div class="video-preview media-previewer" style="display: none;">
			<video controls class="upload-preview">
				Video Format Unsupported in this Browser
			</video>
		</div>

		<div class="image-preview media-previewer" style="display: none;">
			<img class="upload-preview">
		</div>
	</div>


	<div class="form-group">
		<button type="submit" class="btn btn-primary save">Save</button>
	</div>
</form>
