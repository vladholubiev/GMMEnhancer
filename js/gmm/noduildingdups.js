var b = false;
setInterval(function() {
	if ($('div[data-field-id="building_height"]').is(':visible')) {
		b = true;
	}
	if ($('div.gw-dups-summary').is(':visible') && b === true) {
		$('#dbutton').click();
		b = false;
	}
}, 300);