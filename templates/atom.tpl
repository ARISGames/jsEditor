<div class="object-editor container-fluid">
	<div class="row">
		<form class="form" role="form">

			<!-- Boolean Operator -->

			<div class="col-xs-2 padded-small">
				<select class="form-control boolean-operator">
					<option value="1" <%= option_selected(bool_operator === "1") %>>Has</option>
					<option value="0" <%= option_selected(bool_operator === "0") %>>Hasn't</option>
				</select>
			</div>

			<!-- Requirement Type -->

			<div class="col-xs-6 padded-small">
				<select class="form-control requirement">
					<option value="PLAYER_HAS_ITEM" <%= option_selected(requirement === "PLAYER_HAS_ITEM") %>>At least # of Item</option>
					<option value="PLAYER_HAS_TAGGED_ITEM" <%= option_selected(requirement === "PLAYER_HAS_TAGGED_ITEM") %>>At least # of Items with Tag</option>
					<option value="PLAYER_VIEWED_ITEM" <%= option_selected(requirement === "PLAYER_VIEWED_ITEM") %>>Viewed Item</option>
					<option value="PLAYER_VIEWED_PLAQUE" <%= option_selected(requirement === "PLAYER_VIEWED_PLAQUE") %>>Viewed Plaque</option>
					<option value="PLAYER_VIEWED_DIALOG" <%= option_selected(requirement === "PLAYER_VIEWED_DIALOG") %>>Viewed Dialog</option>
					<option value="PLAYER_VIEWED_WEB_PAGE" <%= option_selected(requirement === "PLAYER_VIEWED_WEB_PAGE") %>>Viewed Web Page</option>
					<option value="PLAYER_HAS_UPLOADED_MEDIA_ITEM" <%= option_selected(requirement === "PLAYER_HAS_UPLOADED_MEDIA_ITEM") %>>Created Note with Media near</option>
					<option value="PLAYER_HAS_UPLOADED_MEDIA_ITEM_IMAGE" <%= option_selected(requirement === "PLAYER_HAS_UPLOADED_MEDIA_ITEM_IMAGE") %>>Created Note with Image near</option>
					<option value="PLAYER_HAS_UPLOADED_MEDIA_ITEM_AUDIO" <%= option_selected(requirement === "PLAYER_HAS_UPLOADED_MEDIA_ITEM_AUDIO") %>>Created Note with Audio near</option>
					<option value="PLAYER_HAS_UPLOADED_MEDIA_ITEM_VIDEO" <%= option_selected(requirement === "PLAYER_HAS_UPLOADED_MEDIA_ITEM_VIDEO") %>>Created Note with Video near</option>
					<option value="PLAYER_HAS_COMPLETED_QUEST" <%= option_selected(requirement === "PLAYER_HAS_COMPLETED_QUEST") %>>Completed Quest</option>
					<option value="PLAYER_HAS_RECEIVED_ICOMING_WEB_HOOK" <%= option_selected(requirement === "PLAYER_HAS_RECEIVED_ICOMING_WEB_HOOK") %>>Received Incoming Web Hook</option>
					<option value="PLAYER_HAS_NOTE" <%= option_selected(requirement === "PLAYER_HAS_NOTE") %>>Created a Note</option>
					<option value="PLAYER_HAS_NOTE_WITH_TAG" <%= option_selected(requirement === "PLAYER_HAS_NOTE_WITH_TAG") %>>Created a Note with Tag</option>
					<option value="PLAYER_HAS_NOTE_WITH_LIKES" <%= option_selected(requirement === "PLAYER_HAS_NOTE_WITH_LIKES") %>>Created a Note with # Likes</option>
					<option value="PLAYER_HAS_NOTE_WITH_COMMENTS" <%= option_selected(requirement === "PLAYER_HAS_NOTE_WITH_COMMENTS") %>>Created Note with # Comments</option>
					<option value="PLAYER_HAS_GIVEN_NOTE_COMMENTS" <%= option_selected(requirement === "PLAYER_HAS_GIVEN_NOTE_COMMENTS") %>>Given # Comments on Notes</option>
				</select>
			</div>


			<!-- Content Lists -->
			<div class="col-xs-2 padded-small">
				<input type="number" class="form-control content" value="<%= content_id %>" min="0">
			</div>

			<div class="col-xs-4 padded-small" style="display: none;">
				<select class="form-control content-select">
					<option value="0" selected disabled>None</option>
					<!-- game items -->

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
				</select>
			</div>

			<!-- Values for requirement type -->

			<div class="col-xs-2 padded-small">
				<input type="number" class="form-control quantity" value="<%= qty %>" min="0">
			</div>

			<div class="col-xs-2 padded-small">
				<input type="number" class="form-control distance" value="<%= distance %>" min="0">
			</div>

			<div class="col-xs-3 padded-small">
				<input type="number" class="form-control latitude" value="<%= latitude %>" min="0">
			</div>

			<div class="col-xs-3 padded-small">
				<input type="number" class="form-control longitude" value="<%= longitude %>" min="0">
			</div>

			<div class="col-xs-2 padded-small">
				<button type="button" class="btn btn-link delete-atom">Remove</button>
			</div>
		</form>
	</div>
</div>
