<div class="well well-lg shrink-center">
	<h4><%= gettext("Link Legacy Account") %></h4>

	<div class="alert alert-warning alert-dismissable" style="display:none">
		<button type="button" class="close" aria-hidden="true">&times;</button>
		<div class="alert-text"></div>
	</div>

	<form class="form" role="form" onsubmit="return false;">
		<div class="form-group">
			<label class="sr-only" for="username"><%= gettext("Username") %></label>
			<input id="username" type="text" autofocus class="form-control" placeholder="<%= gettext("Username") %>"></input>
		</div>

		<div class="form-group">
			<label class="sr-only" for="password"><%= gettext("Password") %></label>
			<input id="password" type="password" class="form-control" placeholder="<%= gettext("Password") %>"></input>
		</div>


		<button id="link" type="submit" class="btn btn-primary btn-block">
			<%= gettext("Link Account") %>
		</button>
	</form>
</div>
