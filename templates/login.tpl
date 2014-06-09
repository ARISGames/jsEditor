<div class="well well-lg shrink-center">
	<div class="jumbotron text-center" style="background: none">
		<p style="font-size: 250%"><%= gettext("Welcome to Aris") %></p>
	</div>

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

		<button id="login" class="btn btn-primary" style="width: 33%;">
			<%= gettext("Login") %>
		</button>

		<div class="btn-group pull-right">
		  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
			<span class="current_language"><%= current_language.name %></span> <span class="caret"></span>
		  </button>
		  <ul class="dropdown-menu" role="menu">
		  	<% _.each(available_languages, function(language) { %>
				<li><a class="change-language" data-language="<%= language.code %>"><%= language.name %></a></li>
			<% }); %>
		  </ul>
		</div>
	</form>
</div>


