<form class="form tab-editor object-editor" role="form" onsubmit="return false;">

	<div class="row">
		<!-- Tab attributes -->
		<div class="col-sm-8 padded">
			<div class="form-group">
				<button type="button" class="btn btn-block btn-warning edit-requirements">
					<span class="glyphicon glyphicon-lock"></span>
					Locks
				</button>
			</div>

			<div class="form-group">
				<label for="type">Destination</label>

				<select class="form-control" id="type">
					<option value="0" selected disabled>- Select One -</option>

					<% _.each(tab_types, function(tab_name, tab_value) { %>
						<option value="<%= tab_value %>" <%= option_selected(type === tab_value) %>><%= tab_name %></option>
					<% }); %>
				</select>
			</div>

			<% if(tab_options_visible) { %>
				<div class="form-group">
					<select class="form-control" id="content">
						<option value="0" selected disabled>- Select One -</option>

						<% _.each(tab_content_options, function(option) { %>
							<option value="<%= option.value %>" <%= option_selected(content_id === option.value) %>><%= option.name %></option>
						<% }); %>
					</select>
				</div>
			<% } %>


			<div class="form-group">
				<label for="name">Title</label>
				<input type="text" autofocus class="form-control" id="name" placeholder="<%= parent_name %>" value="<%= name %>">
			</div>


			<!-- Client Layout -->
			<% if(is_quest_tab) { %>
				<div class="form-group" id="quest-layout">
					<label for="quests">Quest Layout</label>
					<div class="radio-images">
						<input type="radio" name="quest-tab-layout" class="quest-tab-layout" id="quest-layout-grid" value="grid" <%= radio_selected(info !== "") %>>
						<label for="quest-layout-grid">
							<%= phone_grid_svg %>
						</label>
						<input type="radio" name="quest-tab-layout" class="quest-tab-layout" id="quest-layout-list" value="" <%= radio_selected(info === "") %>>
						<label for="quest-layout-list">
							<%= phone_list_svg %>
						</label>
					</div>
				</div>
			<% } %>
		</div> <!-- /attributes -->


		<!-- Appearance -->
		<div class="col-sm-4 padded">
			<div class="form-group">
				<div class="thumbnail small change-icon">
					<img src=<%= icon_thumbnail_url %>>
					<div class="caption">
						<button type="button" class="btn btn-link btn-info btn-block change-icon">
							<span class="glyphicon glyphicon-picture"></span>
							Icon
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!--
	<div class="form-group">
		<label for="info">Info</label>
		<input type="text" class="form-control" id="info" placeholder="Info" value="<%= info %>">
	</div>
	-->

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>

		<% if(!is_new) { %>
			<button type="button" class="btn btn-danger delete">
				Delete
			</button>
		<% } %>

		<button type="button" class="btn btn-default cancel" data-dismiss="modal">
			Cancel
		</button>
	</div>
</form>
