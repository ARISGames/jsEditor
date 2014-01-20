<div class="jumbotron">
	<p><%= t.greeting %></p>
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


