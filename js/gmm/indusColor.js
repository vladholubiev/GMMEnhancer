$(document).ready(function() {
	if ($("a[href*='static.py?page=guide.cs&guide=30028&topic=30031&answer=157282']:visible").length > 0) {
		setInterval(function() {
			$("#display-message-bar").attr('style',  'background: #fc0 !important;');
		}, 300);
	}
});