var nameInput,
    clickCount = 0;

if (localStorage.declaredAddNameHandler == 0 || localStorage.declaredAddNameHandler == undefined) {
    $(document).on('click', '.cols5.cell.action-add-name a:eq(0)', function () {
        clickCount++;
        setTimeout(function () {
            nameInput = $('input.gw-content-elem.gw-textinput-input.jfk-textinput[jstcache="0"]');
            if (clickCount < 3 && clickCount > 0) {
                var element = nameInput.eq(clickCount);
                var rawName = getRawName();
                if (clickCount === 1) {
                    translate(rawName, "uk-ru", element);
                } else if (clickCount == 2) {
                    translate(rawName, "uk-en", element);
                }
            }
        }, 200);
    });
    localStorage.declaredAddNameHandler = "1";
}

$(document).ready(function () {
    clickCount = 0;
});

$(window).bind('beforeunload', function () {
    localStorage.declaredAddNameHandler = "0";
});

function getRawName() {
    return $('#gw-edit-info').find('table b a').text();
}

function translate(text, lang, element) {
    var baseUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate?' +
            'key=trnsl.1.1.20140110T002652Z.3b25733dacb9b0fe.0a314ded72400e00094dc5078518caf6d53fe45d' +
            '&text=' + text +
            '&lang=' + lang +
            '&format=plain',
        translated;

    $.getJSON(baseUrl).done(function (data) {
        translated = data.text[0];
        if (lang.indexOf('en') > -1) translated.split('№').join('#');
        element.val(translated);
    });
}
