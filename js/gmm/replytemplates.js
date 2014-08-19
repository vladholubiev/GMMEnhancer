(function () {
    if (window.hasRunreply) return;
    window.hasRunreply = true;
    var templates, code, count = 0; //number of templates = number of clicks
    templates = {
        0: {
            name: '',
            descr: '',
            icon: '',
            code: ''
        }
    };
    code = {
        //b - button, a - add, n - new
        ban: {
            name: chrome.i18n.getMessage("rz_ban_name"),
            descr: chrome.i18n.getMessage("rz_ban_descr"),
            src: {
                0: '<div id="kd-edit-directions" class="addNew t_list goog-menuitem"><div class="goog-menuitem-content">' +
                    '<div class="kd-toolbar-menuitem-img"><img src="http://www.google.com.ua/mapmaker/mapfiles/' +
                    'transparent.png"></div><div class="goog-inline-block"><div class="kd-toolbar-menuitem-title">',
                1: '</div><div class="kd-toolbar-menuitem-desc">',
                2: '</div></div></div></div>'
            },
            code: ''
        },
        bMain: {
            code: '<div id="kd-edit-toolbar-menubutton" class="t_butt hasMaxWidth goog-inline-block goog-flat-menu-' +
                'button"><div class="goog-inline-block goog-flat-menu-button-caption"><div guidedhelpid="iph-toolbar-' +
                'edit">' + chrome.i18n.getMessage("rz_bMain_name") + '</div></div><div class="goog-inline-block goog-' +
                'flat-menu-button-dropdown">&nbsp;</div></div>'
        },
        sett: {
            backup: {
                name: chrome.i18n.getMessage("rz_sett_backup_name"),
                descr: chrome.i18n.getMessage("rz_sett_backup_descr"),
                src: {
                    0: '<div class="gw-pref-section"><div class="gw-pref-title">',
                    1: ' </div><div class="gw-pref-tip">',
                    2: '</div><div class="gw-pref-content"><input type="text" id="backup" class="jfk-textinput"' +
                        ' size="80"></div></div>'
                },
                code: ''
            }
        }
    };

    function makeCode(n) {
        //Menu template
        if (typeof n == 'number') {
            var temp = {
                0: '<div id="kd-edit-directions" style="margin-top:-4px;" class="t_list goog-menuitem">' +
                    '<div class="goog-menuitem-content"><div class="kd-toolbar-menuitem-img"' +
                    ' style="background-size:32px 32px;background: no-repeat url(',
                1: ');"><img src="http://www.google.com.ua/mapmaker/mapfiles/transparent.png">' +
                    '</div><div class="text-head goog-inline-block"><div class="icon kd-toolbar-menuitem-title">',
                2: '</div><div class="descr kd-toolbar-menuitem-desc">',
                3: '</div></div><div class="copypaste"><img src="http://testapi.eu5.org/gmm/img/' +
                    'Arrowhead-Right-32.png" title="Вставити і надіслати"><img src="http://testapi.eu5.org/' +
                    'gmm/img/Recycle-Bin-32.png" title="' + chrome.i18n.getMessage("rz_code_src_delete") +
                    '" class="delete"></div></div></div>'
            };
            console.log(temp);
            templates[n].code = temp[0] + templates[n].icon + temp[1] + templates[n].name
                + temp[2] + templates[n].descr + temp[3];

            return templates[n].code;
        }
        //Add new template button
        return {
            ban: function (a) {
                code[a].code = code[a].src[0] + code[a].name + code[a].src[1] + code[a].descr + code[a].src[2];
                return code[a].code;
            },
            banB: function (a) {
                code[a].code = code['ban'].src[0] + code[a].name + code['ban'].src[1] + code[a].descr + code['ban'].src[2];
                return code[a].code;
            }
        };
    }

    function appendItem(item) {
        $('.addNew').before(item);
        mouseEvents();
        listEvents();
    }

    function insert(n, callback) {
        var reviewerComment = $('#reviewerComment_0');
        var userCommentsText = $('#userCommentsText_0');
        var toolbar_menuItem_desc = $('.t_list .kd-toolbar-menuitem-desc');

        reviewerComment.addClass('active');
        reviewerComment.text(toolbar_menuItem_desc.eq(n).text());
        reviewerComment.attr('style', 'height: 120px;');
        userCommentsText.text(toolbar_menuItem_desc.eq(n).text());
        userCommentsText.attr('style', 'height: 120px;');

        if (arguments[1]) {
            callback.call();
        }
    }

    function mouseEvents() {
        var objects = $('.t_butt, .t_list');
        var buttons = $('.t_butt');
        var lists = $('.t_list');

        objects.mouseenter(function () {
            lists.show();
            //Button press visualisation
            buttons.addClass('goog-flat-menu-button-open');
            if ($(window).width() < 1300) $('#kd-toolbar').attr('style', 'margin: 0px 0px 0px -57px;');
        });
        objects.mouseleave(function () {
            lists.hide();
            buttons.removeClass('goog-flat-menu-button-open');
            if ($(window).width() < 1300) $('#kd-toolbar').attr('style', 'margin: 0px;');
        });
    }

    function listEvents() {
        for (var i = 0; i < 20; i++) {
            (function (i) {
                $('.t_list').eq(i).click(function () {
                    insert(i, '');
                });
                $('img[src*="Arrowhead-Right-32.png"]').eq(i).click(function () {
                    insert(i, function () {
                        $('#nextModeration_0').find('.img').click()
                    });
                });
                $('img.delete').eq(i).click(function () {
                    $(this).parent().parent().parent().remove();
                    var a = JSON.parse(localStorage.t);
                    delete a[i];
                    localStorage.t = JSON.stringify(a);
                });
            }(i));
        }
    }

    function getLocal() {
        if (chrome.storage.local.get('replies', function (replies) {
        })) {
            chrome.storage.local.get('replies', function (replies) {
                templates = replies;
            });
        } else {
            if (localStorage['t']) {
                templates = JSON.parse(localStorage['t']);
                tlength = Object.keys(templates).length; //templates length
                count += tlength;
                for (var i = 0; i < tlength; i++) {
                    appendItem(makeCode(i));
                }
                listEvents();
                syncReplies();
            }
        }

    }

    function syncReplies() {
        if (localStorage['t']) {
            var replies = JSON.parse(localStorage['t']);
            replies = {
                replies: replies
            };
        }
    }

    if ($('.t_butt').length < 1) {
        var code = code.bMain.code + makeCode('ban').ban('ban');
        $('#kd-toolbar').find('#kd-browse-toolbar-button').after(code);
        //Delete odd inserted elements
        $('.t_butt').first().remove();
        $('.addNew').first().remove();
    }

    getLocal();
    mouseEvents();

    $('.addNew').click(function () {
        templates[count] = {};
        templates[count]['name'] = prompt(chrome.i18n.getMessage("rz_addNew_click_prompt"));
        if (templates[count]['name'] != null) {
            templates[count]['descr'] = prompt(chrome.i18n.getMessage("rz_addNew_click_prompt_if"));
            if (templates[count]['descr'] != null) {
                templates[count]['icon'] = prompt(chrome.i18n.getMessage("rz_addNew_click_prompt_if_if"),
                    'http://testapi.eu5.org/gmm/img/Add-New-32.png');
                if (templates[count]['icon'] != null) {
                    localStorage.setItem('t', JSON.stringify(templates));
                    syncReplies();
                    appendItem(makeCode(count));
                    count++;
                }
            }
        }
    });
})();