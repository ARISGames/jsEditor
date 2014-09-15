<div class="well well-lg shrink-center">
	<h4>Forgot Password</h4>

	<div class="alert alert-warning alert-dismissable" style="display:none">
		<button type="button" class="close" aria-hidden="true">&times;</button>
		<div class="alert-text"></div>
	</div>

	<form class="form" role="form" onsubmit="return false;">
		<div class="form-group">
			<label class="sr-only" for="username"><%= gettext("Username") %></label>
			<input id="username" type="text" autofocus class="form-control" placeholder="<%= gettext("Username") %>"></input>
		</div>

		<div class="form-group" style="text-align: center">
			- or -
		</div>

		<div class="form-group">
			<label class="sr-only" for="email"><%= gettext("E-mail") %></label>
			<input id="email" type="email" class="form-control" placeholder="<%= gettext("E-mail") %>"></input>
		</div>


		<button id="send" type="button" class="btn btn-primary" style="width: 45%;">
			<%= gettext("Send Reset Link") %>
		</button>

		<button id="cancel" type="button" class="btn btn-default pull-right" style="width: 45%;">
			<%= gettext("Cancel") %>
		</button>
	</form>
</div>
