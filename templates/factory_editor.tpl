<form class="form object-editor" role="form" onsubmit="return false;">
	<!-- Factory attributes -->

	<div class="row">
		<div class="col-sm-8 col-xs-12 padded">
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


			<!-- Object -->

			<div class="form-group">
				<label for="factory-object_type">Game Object to Produce</label>
			</div>

			<div class="col-sm-6">
				<div class="form-group">
					<select class="form-control content" id="factory-object_type">
						<option value="DIALOG"   <%= option_selected(object_type === "DIALOG")   %>>Conversation</option>
						<option value="PLAQUE"   <%= option_selected(object_type === "PLAQUE")   %>>Plaque</option>
						<option value="ITEM"     <%= option_selected(object_type === "ITEM")     %>>Item</option>
						<option value="WEB_PAGE" <%= option_selected(object_type === "WEB_PAGE") %>>Web Page</option>
					</select>
				</div>
			</div>

			<div class="col-sm-6">
				<div class="form-group">
					<select class="form-control content" id="factory-object_id">
						<option value="0" selected disabled>- Select One -</option>

						<!-- Items -->
						<% if(content_items) { %>
							<% items.each(function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(object_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% }); %>
						<% } %>

						<!-- Plaques -->
						<% if(content_plaques) { %>
							<% plaques.each(function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(object_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% }); %>
						<% } %>


						<!-- Dialogs -->
						<% if(content_dialogs) { %>
							<% dialogs.each(function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(object_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% }); %>
						<% } %>


						<!-- Web Pages -->
						<% if(content_web_pages) { %>
							<% web_pages.each(function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(object_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% }); %>
						<% } %>
					</select>
				</div>
			</div>


			<!-- Limits -->

			<div class="form-group">
				<label>Maximum in game at any time</label>
			</div>

			<div class="col-sm-6">
				<div class="form-group">
					<input type="number" class="form-control" id="factory-max_production" placeholder="Production Limit" min=0 value="<%= max_production %>">
				</div>
			</div>

			<div class="col-sm-6">
				<div class="form-group">
					<select class="form-control content" id="factory-production_bound_type">
						<option value="PER_PLAYER" <%= option_selected(production_bound_type === "PER_PLAYER") %>>Per Player</option>
						<option value="TOTAL"      <%= option_selected(production_bound_type === "TOTAL")      %>>Total</option>
					</select>
				</div>
			</div>


			<!-- Rate/Probability -->

			<div class="form-group">
				<label>Speed and Success</label>
			</div>

			<div class="col-sm-6">
				<div class="form-group">
					<div class="input-group">
						<input type="number" class="form-control" id="factory-production_probability" placeholder="Rate" min=0 max=100 value="<%= Math.round(production_probability * 100) %>">
						<span class="input-group-addon addon-bg-info">%</span>
					</div>
				</div>
			</div>

			<div class="col-sm-6">
				<div class="form-group">
					<div class="input-group">
						<input type="number" class="form-control" id="factory-seconds_per_production" placeholder="Rate" min=0 value="<%= seconds_per_production %>">
						<span class="input-group-addon addon-bg-info">Seconds</span>
					</div>
				</div>
			</div>

			<div class="form-group">
				<label>Location</label>
			</div>

			<div class="col-sm-4">
				<div class="form-group">
					<div class="input-group">
						<input type="number" class="form-control" id="factory-min_production_distance" placeholder="Near Distance" min=0 value="<%= min_production_distance %>">
						<span class="input-group-addon addon-bg-info">Meters</span>
					</div>
				</div>
			</div>
			<div class="col-sm-4">
				<div class="form-group">
					<div class="input-group">
						<input type="number" class="form-control" id="factory-max_production_distance" placeholder="Far Distance" min=0 value="<%= max_production_distance %>">
						<span class="input-group-addon addon-bg-info">Meters</span>
					</div>
				</div>
			</div>
			<div class="col-sm-4">
				<div class="form-group">
					<select class="form-control content" id="factory-location_bound_type">
						<option value="PLAYER"   <%= option_selected(location_bound_type === "PLAYER")   %>>Near Player</option>
						<option value="LOCATION" <%= option_selected(location_bound_type === "LOCATION") %>>Specified Location</option>
					</select>
				</div>
			</div>

			<div id="LOCATION-fields" class="factory-location-bound-tab row padded">
				<br>
				<div class="col-sm-6">
					<div class="form-group">
						<label>Latitude</label>
						<input type="text" class="form-control" id="factory-latitude"  placeholder="Latitude"  value="<%= trigger_latitude %>">
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label>Longitude</label>
						<input type="text" class="form-control" id="factory-longitude" placeholder="Longitude" value="<%= trigger_longitude %>">
					</div>
				</div>
			</div>

			<div class="form-group">
				<label>Objects expire</label>

				<div class="input-group">
					<input type="number" class="form-control" id="factory-produce_expiration_time" placeholder="Expiration Time" min=0 value="<%= produce_expiration_time %>">
					<span class="input-group-addon addon-bg-info">Seconds</span>
				</div>

				<div class="checkbox">
					<label>
						<input type="checkbox" id="factory-produce_expire_on_view" <%= is_checked(produce_expire_on_view) %>>
						Expire when viewed
					</label>
				</div>
			</div>
		</div>

		<div class="col-sm-4 col-xs-12 padded">
			<div class="panel panel-info">
				<div class="panel-heading">
					Trigger placed in Scene
				</div>
				<div class="panel-body">

					<div class="form-group">
						<button type="button" class="btn btn-warning btn-block edit-requirements">
							<span class="glyphicon glyphicon-lock"></span>
							Locks
						</button>
					</div>


					<div class="checkbox">
						<label>
							<input type="checkbox" id="factory-trigger-show_title" <%= is_checked(trigger_show_title) %>>
							Show Map Title
						</label>
					</div>

					<div class="form-group title-container">
						<input type="text" class="form-control" id="factory-trigger-title" placeholder="Title" value="<%= trigger_title %>">
					</div>


					<div class="checkbox">
						<label>
							<input type="checkbox" id="factory-trigger-infinite" <%= is_checked(trigger_infinite_distance) %>>
							Available Anywhere
						</label>
					</div>

					<div class="form-group range-container">
						<label for="factory-trigger-distance">Availability Range</label>
						<div class="input-group">
							<input type="number" class="form-control" id="factory-trigger-distance" placeholder="Range" value="<%= trigger_distance %>">
							<span class="input-group-addon addon-bg-info">Meters</span>
						</div>
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
							<input type="checkbox" id="factory-trigger-wiggle" <%= is_checked(trigger_wiggle) %>>
							Animate Icon on Map
						</label>
					</div>

					<div class="form-group">
						<label>
							When in range, trigger:
						</label>
						<div class="btn-group btn-group-sm btn-group-justified factory-trigger_on_enter">
							<label class="btn btn-info">
								<input type="radio" name="factory-trigger_on_enter" value="1" <%= radio_selected(trigger_on_enter === "1") %>>
								<span class="glyphicon glyphicon-flash"></span>
								Immediately
							</label>
							<label class="btn btn-info">
								<input type="radio" name="factory-trigger_on_enter" value="0" <%= radio_selected(trigger_on_enter === "0") %>>
								<span class="glyphicon glyphicon-hand-up"></span>
								By Touch
							</label>
						</div>
					</div>

					<div id="1-fields" class="enter-factory-trigger-tab">
						<div class="checkbox">
							<label>
								<input type="checkbox" id="factory-trigger-hidden" <%= is_checked(trigger_hidden) %>>
								Hidden from Map on Client
							</label>
						</div>
					</div>

				</div> <!-- panel body -->
			</div> <!-- panel -->
		</div>
	</div> <!-- row -->
	<div class="row">
		<div class="col-xs-12 padded">
			<div class="form-group">
				<button type="submit" class="btn btn-primary save">
					Save
				</button>

				<% if(!is_new) { %>
					<button type="button" class="btn btn-danger delete">
						Delete
					</button>
				<% } %>

				<button type="button" class="btn btn-default" data-dismiss="modal">
					Cancel
				</button>
			</div>
		</div>
	</div>
</form>
