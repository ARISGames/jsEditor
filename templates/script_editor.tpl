<div style="text-align: center; display: inline-block;">
	<div class="panel panel-default" style="padding: 0.25em; display: inline-block; width: 250px; margin-bottom: 20px;">
		<div class="thumbnail change-active-icon">
			<img src="<%= character.get("media").get("thumb_url") %>">
			<div class="caption">
				<%= character.get("name") %>
			</div>
		</div>

		<div class="form-group">
			<textarea class="form-control" rows=3><%= text %></textarea>
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
