<form role="form">

	<div class="alert alert-warning alert-dismissable" style="display:none">
		<button type="button" class="close" aria-hidden="true">&times;</button>
		<div class="alert-text"></div>
	</div>

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
		<div class="progress" style="opacity: 0">
			<div class="progress-bar bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%; text-align: left;">
				&nbsp;<span class="bar-text">0%</span>
			</div>
		</div>

		<button type="submit" class="btn btn-primary save">
			Save
		</button>

		<button type="button" class="btn btn-default" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
