(function () {
    if (window.bindDeleteKey) return;
    window.bindDeleteKey = true;

    $(document).ready(function () {
        $(document).keydown("keydown", function (e) {
            var intervalID;
            var found = false;
            intervalID = setInterval(function () {
                if (found) return;
                var item = $('.contextmenu .menuitem').eq(0);
                if (item.length == 1) {
                    found = true;
                    if (e.keyCode == 46) {
                        item.click();
                    }
                    clearInterval(intervalID);
                }
            }, 50);
        });
    });
})();