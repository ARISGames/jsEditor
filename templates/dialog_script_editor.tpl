<br />

<h4>Edit Line <span class="object-id text-muted"><%= is_new ? "" : dialog_script_id %></span></h4>

<form class="form" role="form" onsubmit="return false;">
<div class="form-group">
	<button type="button" class="btn btn-block btn-info edit-events">
		<span class="glyphicon glyphicon-user"></span>
		Modify Player
	</button>
</div>

<div class="form-group">
	<label>Speaker</label>
	<select class="form-control character">
		<% characters.each(function(character) { %>
			<option value="<%= character.id %>" <%= option_selected(dialog_character_id === character.id) %>>
				<%= character.get("name") %>
			</option>
		<% }); %>
	</select>
</div>

<div class="form-group">
	<label>Text</label>
	<textarea class="form-control text" rows=3><%= text %></textarea>
</div>

<hr>

<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<button type="button" class="btn btn-default cancel">
		Cancel
	</button>
	<button type="button" class="btn btn-danger delete">
		Delete
	</button>
</div>
</form>
