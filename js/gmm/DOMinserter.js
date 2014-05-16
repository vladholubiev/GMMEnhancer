chrome.storage.local.get('onlyContest', function(data) {
	check('onlyContest', data);
});

function check(value, data) {
	if (data[value] == undefined || data[value] == false) {
		run();
	}
	if (data[value] === true) {
		console.log('true, not execute');
	} else return;
}

function run() {
	chrome.storage.local.get('shortlinks', function(data) {
		if (data['shortlinks'] !== undefined) {
			if (data['shortlinks'] === false) {
				//Короткі посилання
				$('#kd-toolbar>#kd-browse-toolbar-button').after('<div id="kd-browse-toolbar-button" class="short pointer_cursor goog-inline-block hasMaxWidth jfk-button jfk-button-standard kd-toolbar-last-button jfk-button-clear-outline" style="max-width: 250px; !important"><div>' + chrome.i18n.getMessage("sl_button_name") + '</div>');
			} else return;
		} else {
			$('#kd-toolbar>#kd-browse-toolbar-button').after('<div id="kd-browse-toolbar-button" class="short pointer_cursor goog-inline-block hasMaxWidth jfk-button jfk-button-standard kd-toolbar-last-button jfk-button-clear-outline" style="max-width: 250px; !important"><div>' + chrome.i18n.getMessage("sl_button_name") + '</div>');
		}
	});
}