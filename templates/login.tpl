<div class="shrink-center">
	<div class="jumbotron text-center">
		<p style="font-size: 200%"><%= gettext("Welcome to Aris") %></p>
	</div>

	<div class="alert alert-warning alert-dismissable" style="display:none">
		<button type="button" class="close" aria-hidden="true">&times;</button>
		<div class="alert-text"></div>
	</div>

	<form class="form-inline" role="form">
		<div class="form-group">
			<label class="sr-only" for="username"><%= gettext("Username") %></label>
			<input id="username" type="text" class="form-control" placeholder="<%= gettext("Username") %>"></input>
		</div>

		<div class="form-group">
			<label class="sr-only" for="password"><%= gettext("Password") %></label>
			<input id="password" type="password" class="form-control" placeholder="<%= gettext("Password") %>"></input>
		</div>

		<button id="login" class="btn btn-primary">
			<%= gettext("Login") %>
		</button>
	</form>
</div>


