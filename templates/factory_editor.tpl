<form class="form object-editor" role="form" onsubmit="return false;">
	<!-- Factory attributes -->

	<div class="row">
		<div class="col-xs-6 padded">
			<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
				<span class="object-id text-muted"><%= is_new ? "" : factory_id %></span>
			</h4>
			<div class="form-group">
				<label for="factory-name">Name</label>
				<input type="text" autofocus class="form-control" id="factory-name" placeholder="Name" value="<%= name %>">
			</div>

			<div class="form-group">
				<label for="factory-description">Description</label>
				<input type="text" class="form-control" id="factory-description" placeholder="Description" value="<%= description %>">
			</div>

			<div class="form-group">
				<button type="submit" class="btn btn-primary save">
					Save
				</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Cancel
				</button>
			</div>
		</div>

		<div class="col-xs-6 padded">
			<div class="panel panel-info">
				<div class="panel-heading">
					Location Trigger to Create
				</div>
				<div class="panel-body">

					<div class="form-group">
						<button type="button" class="btn btn-warning btn-block edit-requirements">
							<span class="glyphicon glyphicon-lock"></span>
							Locks
						</button>
					</div>

					<div class="form-group">
						<label for="trigger-title">Map Title</label>
						<input type="text" class="form-control" id="trigger-title" placeholder="Title" value="<%= trigger_title %>">
					</div>

					<div class="checkbox">
						<label>
							<input type="checkbox" id="trigger-show_title" <%= is_checked(trigger_show_title) %>>
							Show Title
						</label>
					</div>


					<div class="form-group">
						<label for="trigger-distance">Distance</label>
						<input type="text" class="form-control" id="trigger-distance" placeholder="Distance" value="<%= trigger_distance %>">
					</div>

					<div class="thumbnail change-icon">
						<img src=<%= icon_thumbnail_url %>>
						<div class="caption">
							<button type="button" class="btn btn-link btn-info btn-block change-icon">
								<span class="glyphicon glyphicon-picture"></span>
								Icon
							</button>
						</div>
					</div>

					<div class="checkbox">
						<label>
							<input type="checkbox" id="trigger-wiggle" <%= is_checked(trigger_wiggle) %>>
							Animate Icon on Map
						</label>
					</div>

					<div class="form-group">
						<label>
							When in range, trigger:
						</label>
						<div class="btn-group btn-group-sm btn-group-justified trigger-trigger_on_enter">
							<label class="btn btn-info">
								<input type="radio" name="trigger-trigger_on_enter" value="1" <%= radio_selected(trigger_on_enter === "1") %>>
								<span class="glyphicon glyphicon-flash"></span>
								Immediately
							</label>
							<label class="btn btn-info">
								<input type="radio" name="trigger-trigger_on_enter" value="0" <%= radio_selected(trigger_on_enter === "0") %>>
								<span class="glyphicon glyphicon-hand-up"></span>
								By Touch
							</label>
						</div>
					</div>

					<div id="1-fields" class="enter-trigger-tab">
						<div class="checkbox">
							<label>
								<input type="checkbox" id="trigger-hidden" <%= is_checked(trigger_hidden) %>>
								Hidden from Map on Client
							</label>
						</div>
					</div>

				</div> <!-- panel body -->
			</div> <!-- panel -->
		</div>
	</div>
</form>
