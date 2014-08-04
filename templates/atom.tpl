<div class="object-editor container-fluid">
	<form class="form" role="form">
		<div class="row form-group">

			<!-- Boolean Operator -->

			<div class="col-xs-4 padded-small">
				<select class="form-control boolean-operator">
					<option value="1" <%= option_selected(bool_operator === "1") %>>Has</option>
					<option value="0" <%= option_selected(bool_operator === "0") %>>Hasn't</option>
				</select>
			</div>

			<!-- Requirement Type -->

			<div class="col-xs-8 padded-small">
				<select class="form-control requirement">
					<option value="PLAYER_HAS_ITEM" <%= option_selected(requirement === "PLAYER_HAS_ITEM") %>>At least # of Item/Attribute</option>
					<option value="PLAYER_HAS_TAGGED_ITEM" <%= option_selected(requirement === "PLAYER_HAS_TAGGED_ITEM") %>>At least # of Items/Attributes with Tag</option>
					<option value="PLAYER_VIEWED_ITEM" <%= option_selected(requirement === "PLAYER_VIEWED_ITEM") %>>Viewed Item/Attribute</option>
					<option value="PLAYER_VIEWED_PLAQUE" <%= option_selected(requirement === "PLAYER_VIEWED_PLAQUE") %>>Viewed Plaque</option>
					<option value="PLAYER_VIEWED_DIALOG" <%= option_selected(requirement === "PLAYER_VIEWED_DIALOG") %>>Viewed Dialog</option>
					<option value="PLAYER_VIEWED_WEB_PAGE" <%= option_selected(requirement === "PLAYER_VIEWED_WEB_PAGE") %>>Viewed Web Page</option>
					<option value="PLAYER_HAS_UPLOADED_MEDIA_ITEM" <%= option_selected(requirement === "PLAYER_HAS_UPLOADED_MEDIA_ITEM") %>>Created at least # Notes with Media near</option>
					<option value="PLAYER_HAS_UPLOADED_MEDIA_ITEM_IMAGE" <%= option_selected(requirement === "PLAYER_HAS_UPLOADED_MEDIA_ITEM_IMAGE") %>>Created at least # Notes with Image near</option>
					<option value="PLAYER_HAS_UPLOADED_MEDIA_ITEM_AUDIO" <%= option_selected(requirement === "PLAYER_HAS_UPLOADED_MEDIA_ITEM_AUDIO") %>>Created at least # Notes with Audio near</option>
					<option value="PLAYER_HAS_UPLOADED_MEDIA_ITEM_VIDEO" <%= option_selected(requirement === "PLAYER_HAS_UPLOADED_MEDIA_ITEM_VIDEO") %>>Created at least # Notes with Video near</option>
					<option value="PLAYER_HAS_COMPLETED_QUEST" <%= option_selected(requirement === "PLAYER_HAS_COMPLETED_QUEST") %>>Completed Quest</option>
					<option value="PLAYER_HAS_RECEIVED_ICOMING_WEB_HOOK" <%= option_selected(requirement === "PLAYER_HAS_RECEIVED_ICOMING_WEB_HOOK") %>>Received Incoming Web Hook</option>
					<option value="PLAYER_HAS_NOTE" <%= option_selected(requirement === "PLAYER_HAS_NOTE") %>>Created a Note</option>
					<option value="PLAYER_HAS_NOTE_WITH_TAG" <%= option_selected(requirement === "PLAYER_HAS_NOTE_WITH_TAG") %>>Created at least # Notes with Tag</option>
					<option value="PLAYER_HAS_NOTE_WITH_LIKES" <%= option_selected(requirement === "PLAYER_HAS_NOTE_WITH_LIKES") %>>Created a Note with # Likes</option>
					<option value="PLAYER_HAS_NOTE_WITH_COMMENTS" <%= option_selected(requirement === "PLAYER_HAS_NOTE_WITH_COMMENTS") %>>Created Note with # Comments</option>
					<option value="PLAYER_HAS_GIVEN_NOTE_COMMENTS" <%= option_selected(requirement === "PLAYER_HAS_GIVEN_NOTE_COMMENTS") %>>Given # Comments on Notes</option>
				</select>
			</div>
		</div>


		<div class="row form-group">

			<div class="col-xs-2 padded-small">
				<% if(quantity_visible) { %>
					<input type="number" class="form-control quantity" value="<%= qty %>" min="0">
				<% } %>
			</div>

			<!-- Content Lists -->

			<% if(content_visible) { %>
				<div class="col-xs-8 padded-small">
					<select class="form-control content">
						<option value="0" selected disabled>None</option>

						<!-- Game Items -->
						<% if(content_items) { %>
							<optgroup label="Player Attributes">
								<% _.each(items.where({type: "ATTRIB"}), function(item) { %>
									<option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
										<%= item.get("name") %>
									</option>
								<% }); %>
							</optgroup>

							<optgroup label="Items">
								<% _.each(items.where({type: "NORMAL"}), function(item) { %>
									<option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
										<%= item.get("name") %>
									</option>
								<% }); %>
							</optgroup>

							<optgroup label="Web URLs">
								<% _.each(items.where({type: "URL"}), function(item) { %>
									<option value="<%= item.get("item_id") %>" <%= option_selected(content_id === item.get("item_id")) %>>
										<%= item.get("name") %>
									</option>
								<% }); %>
							</optgroup>
						<% } /* End Items */ %>


						<!-- Item Tags -->
						<% if(content_tags) { %>
							<% _.each(tags), function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(content_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% } %>
						<% } %>


						<!-- Plaques -->
						<% if(content_plaques) { %>
							<% _.each(plaques), function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(content_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% } %>
						<% } %>


						<!-- Dialogs -->
						<% if(content_dialogs) { %>
							<% _.each(dialogs), function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(content_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% } %>
						<% } %>


						<!-- Web Pages -->
						<% if(content_web_pages) { %>
							<% _.each(web_pages), function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(content_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% } %>
						<% } %>


						<!-- Quests -->
						<% if(content_quests) { %>
							<% _.each(quests), function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(content_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% } %>
						<% } %>


						<!-- Web Hooks -->
						<% if(content_web_hooks) { %>
							<% _.each(web_hooks), function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(content_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% } %>
						<% } %>


						<!-- Notes -->
						<% if(content_notes) { %>
							<% _.each(notes), function(object) { %>
								<option value="<%= object.id %>" <%= option_selected(content_id === object.id) %>>
									<%= object.get("name") %>
								</option>
							<% } %>
						<% } %>

					</select>
				</div>
			<% } /* End Content visible */ %>

			<!-- Values for requirement type -->

			<% if(location_visible) { %>
				<div class="col-xs-2 padded-small">
					<input type="number" class="form-control distance" value="<%= distance %>" min="0">
				</div>

				<div class="col-xs-3 padded-small">
					<input type="number" class="form-control latitude" value="<%= latitude %>" min="0">
				</div>

				<div class="col-xs-3 padded-small">
					<input type="number" class="form-control longitude" value="<%= longitude %>" min="0">
				</div>
			<% } %>

			<% if(!location_visible && !content_visible) { %>
				<div class="col-xs-8 padded-small">
				</div>
			<% } %>

			<div class="col-xs-2 padded-small">
				<button type="button" class="btn btn-link delete-atom">Remove</button>
			</div>
		</div>
	</form>
</div>
