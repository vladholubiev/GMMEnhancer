(function () {
    if (window.hasRunfloors) return;
    window.hasRunfloors = true;
    $(document).ready(function () {
        var count = 0,
            isIns = false,
            a = false,
            gotLevels = [],
            gotHeight = [],
            resultHeight, template, change, changeText = chrome.i18n.getMessage("fl_change");

        function expand() {
            setTimeout(function () {
                $('.block.read.hide-for-lightweight-ui').eq(0).click();
            }, 300);
            $('.block.read.hide-for-lightweight-ui').eq(0).click();
        }

        function insert(n) {
            var openBlock = $('.block.read.hide-for-lightweight-ui');
            var editingBlock = $('.block.edit input.jfk-textinput');
            openBlock.eq(0).click();
            if (editingBlock.length === 1) {
                count = 0;
            }
            editingBlock.eq(count).val(n);
            openBlock.eq(0).click();
            $('#gw-saveedit').click();
            $('#level_wrapper').remove();
        }

        function lwInsert() {
            console.log('insert fired');
            $('#gw-panelinfo-edit').after('<div id="level_wrapper"></div>');
            $(document).ready(function () {
                $.each(levels.reverse(), function (i, val) {
                    $('#level_wrapper').append(template[0] + val + template[1] + val + template[2]);
                });
                isIns = true;
                $('#level_wrapper').append(change);
            });
            setMargin();
            $(document).ready(function () {
                $('#change').click(function () {
                    setInf();
                });
            });
        }

        function setMargin() {
            $(document).ready(function () {
                var marginRight = $('#spsizer').width() / $('.level').length / 2;
                marginRight = marginRight.toFixed() - 15;
                $('.level').attr('style', 'margin-right:' + marginRight + 'px !important');
            });
        }

        function setInf() {
            resultHeight = '';
            gotLevels = prompt(chrome.i18n.getMessage("fl_gotLevels")).match(/\d+/g);
            var gotHeightSrc;
            if (gotLevels !== undefined) {
                for (var key in gotLevels) {
                    gotHeight[key] = gotLevels[key] * 3;
                    resultHeight += gotLevels[key] + ' поверх - ' + gotHeight[key] + ' м, ';
                }
                resultHeight = resultHeight.replace('undefined', '');
                gotHeightSrc = prompt(chrome.i18n.getMessage("fl_gotHeightSrc"), resultHeight);
                if (gotHeightSrc !== undefined) {
                    gotHeightSrc = gotHeightSrc.match(/\d+/g);
                    for (var i = 1, a = 0; a < gotLevels.length; i += 2, a++) {
                        if (gotHeight[a] !== undefined) {
                            gotHeight[a] = parseInt(gotHeightSrc[i]);
                        }
                    }
                    localStorage.levels = JSON.stringify(gotLevels);
                    localStorage.height = JSON.stringify(gotHeight);
                }
            }
        }

        function main() {
            count = 1,
                change = '<div id="change" class="level goog-inline-block jfk-button jfk-button-standard jfk-button-collapse-left jfk-button-clear-outline">' + changeText + '</div>',
                template = ['<div id="level', '" class="level goog-inline-block jfk-button jfk-button-standard jfk-button-narrow jfk-button-collapse-left jfk-button-clear-outline">', '</div>'];
            if (localStorage.levels === undefined) {
                levels = ['1', '2', '3', '4', '5', '9', '12'].reverse();
                gotHeight = [3, 6, 9, 12, 15, 27, 35].reverse();
            } else {
                levels = JSON.parse(localStorage.levels).reverse();
                gotHeight = JSON.parse(localStorage.height).reverse();
            }
            if ($('#level_wrapper').length === 0) {
                lwInsert();
            }
            $(document).ready(function () {
                for (var i = 0; i < levels.length; i++) {
                    (function (i) {
                        $('#level' + levels[i]).click(function () {
                            var a = levels[i].toString();
                            var pren = levels.reverse();
                            var n = pren.indexOf(a);
                            insert(gotHeight[n]);
                        });
                    }(i));
                }
            });
            $('#gw-saveedit, button[cad*="type:canceledit"], .kd-cancel-toolbar-link a').click(function () {
                count = 1, isIns = false;
                $('#level_wrapper').remove();
                $('.dbgr, .db').remove();
                a = false;
            });
        }

        $('#kd-add-building').click(function () {
            $(document).ready(function () {
                main();
                expand();
            });
        });
        $(document).on('click', '.block-address-read:eq(0)', function () {
            count = 4;
            expand();
            if ($('.block.edit input.jfk-textinput').length === 4) {
                count = 3;
            }
        });
        var periodic = setInterval(function () {
            if ($('.gw-mini-dashboard-collapsed:visible').length > 0) {
                a = false;
                isIns = false;
            }
            if ($('div[data-field-id="building_height"]').length > 0 && $('.levels').length < 1 && a === false && isIns === false) {
                main();
                expand();
                a = true;
                isIns = true;
                count = 1;
                $('#gw-tab-header').hide();
            }
            if ($('div[cad="src:feature-zoom-lp"]:visible').length > 0) {
                $('#level_wrapper').remove();
                $('#gw-tab-header').show();
            }
        }, 300);
    });
})();