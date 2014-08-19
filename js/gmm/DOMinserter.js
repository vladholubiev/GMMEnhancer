chrome.storage.local.get('onlyContest', function (data) {
    check('onlyContest', data);
});

function check(value, data) {
    if (data[value] == undefined || data[value] == false) {
        run();
    }
    if (data[value] === true) {
        console.log('true, not execute');
    }
}

function run() {
    var buttonsToolbar = $('#kd-toolbar').find('#kd-browse-toolbar-button');
    var buttonHtml = '<div id="kd-browse-toolbar-button" class="short pointer_cursor goog-inline-block hasMaxWidth ' +
        'jfk-button jfk-button-standard kd-toolbar-last-button jfk-button-clear-outline" ' +
        'style="max-width: 250px; !important"><div>';
    var buttonName = chrome.i18n.getMessage("sl_button_name");

    chrome.storage.local.get('shortlinks', function (data) {
        if (data['shortlinks'] !== undefined) {
            if (data['shortlinks'] === false) {
                buttonsToolbar.after(buttonHtml + buttonName + '</div>');
            } else return;
        } else {
            buttonsToolbar.after(buttonHtml + buttonName + '</div>');
        }
    });
}