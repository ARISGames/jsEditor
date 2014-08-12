<div style="text-align: center; display: inline-block;">
	<div style="display: inline-block; width: 300px; padding-bottom: 20px;">
		<div class="thumbnail change-active-icon">
			<img src="<%= character.get("media").get("thumb_url") %>">
			<div class="caption">
				<%= character.get("name") %>
			</div>
		</div>

		<div>
			<textarea style="width: 100%"><%= text %></textarea>
		</div>

		<button type="button" class="btn btn-block btn-info">
			<span class="glyphicon glyphicon-user"></span>
			Modify Player
		</button>
	</div> <!-- script form -->

	<br/>

	<div class="display: inline-block; script_options clearfix">
	</div>
</div>
