<form role="form">

	<div class="alert alert-warning alert-dismissable" style="display:none">
		<button type="button" class="close" aria-hidden="true">&times;</button>
		<div class="alert-text"></div>
	</div>

	<div class="form-group">
		<label for="uploader">File</label>
		<input type="file" id="uploader" name="uploader">
		<p class="help-block">Select an AR Target Database to upload.</p>
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
