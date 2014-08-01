$(document).ready(function () {
    $('#div-mini-dashboard').css({
        display: 'block',
        position: 'fixed',
        bottom: '0',
        background: '#fff',
        padding: '9px 9px 9px 44px',
        width: ($('#panel').width() - 44 - 9) + 'px'
    });
    $('#lp-control-panel').remove();
    $('#div-mini-dashboard').show();
    $('#spsizer').css({height: '100%'});
});