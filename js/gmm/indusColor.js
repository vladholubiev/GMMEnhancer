$(document).ready(function() {
    var messageForIndus = $("a[href*='static.py?page=guide.cs&guide=30028&topic=30031&answer=157282']:visible").length > 0;
	if (messageForIndus) {
		setInterval(function() {
			$("#display-message-bar").attr('style',  'background: #fc0 !important;');
		}, 300);
        setTimeout(function() {
            $("#display-message-bar").remove();
        }, 3000);
	}
});