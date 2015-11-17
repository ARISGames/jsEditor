<form class="form object-editor" role="form" onsubmit="return false;">
	<!-- Character attributes -->


	<div class="row">
		<div class="col-xs-6 padded">
			<h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
				<span class="object-id text-muted"><%= is_new ? "" : dialog_character_id %></span>
			</h4>

			<div class="form-group">
				<label for="character-name">Name in editor</label>
				<input type="text" autofocus <%= player_readonly %> class="form-control" id="character-name" placeholder="Name" value="<%= name %>">
			</div>

			<div class="form-group">
				<label for="character-title">Name in game</label>
				<input type="text" <%= player_readonly %> class="form-control" id="character-title" placeholder="title" value="<%= title %>">
			</div>

			<div class="form-group">
				<button type="submit" <%= player_readonly%> class="btn btn-primary save">
					Save
				</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">
					Cancel
				</button>
			</div>
		</div>


		<div class="col-xs-6 padded">
			<div class="thumbnail change-media">
				<img src=<%= media_thumbnail_url %>>
				<div class="caption">
					<button type="button" class="btn btn-link btn-info btn-block change-media">
						<span class="glyphicon glyphicon-facetime-video"></span>
						Media
					</button>
				</div>
			</div>
		</div>
	</div>

</form>
