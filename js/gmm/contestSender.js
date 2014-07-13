$('#gw-saveedit').click(function() {
	var isRoadSpeed_add = false,
		isRoadSpeed_modified = false;
	if ($('div[data-field-id="avg_speed"]:visible').length > 0) {
        var roadEl = $('div[data-field-id="avg_speed"]:visible div div div div input');
		isRoadSpeed_add = roadEl.hasClass('gw-field-hint-add');
		isRoadSpeed_modified = roadEl.hasClass('gw-field-hint-modified');
	}
	var string = '<div id="editSender" style="display:none">' +
        '<iframe name="hidden_iframe" id="hidden_iframe" style="display:none;"></iframe>' +
        '<form method="post" action="https://script.google.com/macros/s/AKfycbxHwBF-ZSwYXZ7Lwys_nRBeuA_kdJ4DFQzUHSCtk9As_kdBTtyg/exec" name="sendContest" id="send" target="hidden_iframe"> Name: ' +
        '<input type="text" name="Позначка часу" id="name">' +
        '<input name="Назва правки" id="comment"></input>' +
        '<input name="Посилання на профіль" id="numbers" type="text">' +
        '<input name="Статус" type="text">' +
        '<input name="Категорія" type="text">' +
        '<input name="Посилання на правку" type="text">' +
        '<input name="Чи змінювалася швидкість дороги?" type="text">' +
        '<input type="text" name="Координати" id="coordinats">' +
        '<input type="text" name="Версія додатку" id="version">' +
        '<input name="Нік користувача" type="text">' +
        '<input type="button" value="Submit" class="submit" onclick="document.getElementById("send").submit()">' +
        '</form></div>';
	$('body').append(string);
	$(document).ready(function() {
		var clear = setInterval(function() {
            var today;
            if ($('.title.pointer_cursor:visible').length > 1 && !edit) {
                today = moment().format("DD/MM/YYYY");
                var tempDate = moment().utc().hours() + 3 + ':' + moment().utc().minutes() + ' ' + today;
                var edit = {
                    link: 'www.google.com.ua' + $('.title.pointer_cursor').first().attr('href'),
                    author: {
                        link: 'http://google.com.ua/mapmaker?gw=66&ptab=0&uid=' + $('a[href*="edit-nickname"]').attr('href').match(/uid=\d+/g)[0].replace('uid=', '') + '&start=0&sort='
                    },
                    date: tempDate
                };
                $.get(edit.author.link, function (data) {
                    edit.author.name = $(data).find('.profile-name').text();
                    edit.category = $(data).find('.gw-ftcard-category').first().text();
                    edit.status = $(data).find('span[class*="stat"]').first().text();
                    edit.name = $(data).find('#sxtitle').first().text();
                }).done(function () {
                    $('input[name="Позначка часу"]').val(edit.date);
                    $('input[name="Назва правки"]').val(edit.name);
                    $('input[name="Нік користувача"]').val(edit.author.name);
                    $('input[name="Посилання на профіль"]').val(edit.author.link);
                    $('input[name="Посилання на правку"]').val(edit.link);
                    $('input[name="Категорія"]').val(edit.category);
                    var ll = JSON.parse(localStorage['gw-application-params']).ll;
                    $('input[name="Координати"]').val(ll);
                    //App version
                    var thisVersion = 'v. ' + chrome.runtime.getManifest().version;
                    $('input[name="Версія додатку"]').val(thisVersion);
                    console.log(edit.date, edit.name, edit.author.name, edit.author.link, edit.link, edit.category, ll, thisVersion);
                    //Whether road speed changed
                    if (edit.category === 'Маршрут' || edit.category === 'Дорога') {
                        //Send if at least of
                        if (isRoadSpeed_add) {
                            $('input[name="Чи змінювалася швидкість дороги?"]').val(isRoadSpeed_add);
                        } else if (isRoadSpeed_modified) {
                            $('input[name="Чи змінювалася швидкість дороги?"]').val(isRoadSpeed_modified);
                        }
                    }
                    //Don't send empty edits
                    if (edit.status.indexOf('усто') > -1) {
                        window.clearInterval(clear);
                    } else {
                        $('input[name="Статус"]').val(edit.status);
                        document.getElementById("send").submit();
                        window.clearInterval(clear);
                    }
                });
            }
		}, 300);
	});
});