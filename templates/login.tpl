<div class="shrink-center">
	<div class="jumbotron text-center">
		<p><%= t.greeting %></p>
	</div>

	<div class="alert alert-warning alert-dismissable" style="display:none">
		<button type="button" class="close" aria-hidden="true">&times;</button>
		<div class="alert-text"></div>
	</div>

	<form class="form-inline" role="form">
		<div class="form-group">
			<label class="sr-only" for="username">Username</label>
			<input id="username" type="text" class="form-control" placeholder="Username"></input>
		</div>

		<div class="form-group">
			<label class="sr-only" for="password">Password</label>
			<input id="password" type="password" class="form-control" placeholder="Password"></input>
		</div>

		<button id="login" class="btn btn-primary">
			<%= t.login_button %>
		</button>
	</form>
</div>


