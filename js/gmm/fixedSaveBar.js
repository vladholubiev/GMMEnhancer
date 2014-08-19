/**
 * @date 19-08-14
 * This script fixes the position of the bar with save button while looking through the duplicates
 */

$(document).ready(function() {
    if ($('.gw-dups-summary').length > 0) {
        var paddingRightWidth = 15;
        var divToFix = $('.gw-feature-summary-table').next("div");
        var divWidth = $('#spsizer').width() - paddingRightWidth;
        divToFix.css({
            'position': 'fixed',
            'bottom': '0px',
            'left': '0px',
            'width': divWidth + 'px',
            'padding-right': paddingRightWidth + 'px',
            'background': 'rgb(245, 245, 245)'
        });
        divToFix.children().css('margin', '0');
    }
});