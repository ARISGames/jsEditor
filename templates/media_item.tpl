<td>
	<% if(type === 'Icon' || type === 'Image') { %>
		<img src="<%= thumb_url %>">
	<% } %>
</td>
<td>
	<a href="<%= url %>"><%= file_name %></a>
</td>
<td>
	<%= type %>
</td>
<td class="nowrap">
<!--
		<button class="edit btn btn-xs btn-default">
			<span class="glyphicon glyphicon-pencil"></span> Edit
		</button>
		-->
</td>
