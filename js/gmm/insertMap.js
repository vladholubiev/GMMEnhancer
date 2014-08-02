var elToPrep = $('#mapv3').find('.gm-style:eq(0)'),
    width = elToPrep.width(),
    height = $('#spsizer').height() + 40,
    lang = window.navigator.userLanguage || window.navigator.language,
    myMap, lat, lon, zoomgot;

jQuery.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

function closeButtonInsert() {
    closeButtonInsert.listener = function () {
        $('#closeMapButton').click(function () {
            elToPrep.find('div[id*=ap]').remove();
            $('#closeMapButton').remove();
            showOddElements();
        });
    };

    bindSpacebar();
    elToPrep.children().eq(0).addClass('mainLayer');

    if ($('img[src*="tiny_marker-k.png"]:visible').length < 1) {
        $('#closeMapButton').remove();
        $('#gw-tab-header').after('<div id="closeMapButton"><span>X</span></div>');
        $('#closeMapButton').attr('style', 'position:absolute; z-index: 9999; top: 0px; left: 200px;');
        hideOddElements();
        closeButtonInsert.listener();
    } else if ($('#closeMapButton:visible').length < 1) {
        $('#gw-stream-select-button').after('<div id="closeMapButton"><span>X</span></div>');
        hideOddElements();
        closeButtonInsert.listener();
    }
}

function bindSpacebar() {
    $(document).keypress(function (event) {
        if (event.which == 32) {
            event.preventDefault();
            $('.insertedMap').toggle();
            $('.mainLayer').visibilityToggle();
        }
    });
}

function getLatLon(callback) {
    chrome.storage.local.get(null, function (data) {
        lat = data.coords.match(/\d+.\d+/g)[0];
        lon = data.coords.match(/\d+.\d+/g)[1];
        zoomgot = data.z;
        callback.call();
    });
}

function hideOddElements() {
    elToPrep.find('.gmnoprint[controlwidth]').hide();
    $('div[cad="src:dragzoom"]').hide();
    elToPrep.children().first().css({visibility: 'hidden'});
}

function showOddElements() {
    elToPrep.find('.gmnoprint[controlwidth]').show();
    $('div[cad="src:dragzoom"]').show();
    elToPrep.children().first().css({visibility: 'visible'});
}

function insertMap() {
}
insertMap.WM = function () {
    closeButtonInsert();
    if ($('#WMMmap').length < 1) {
        getLatLon();
        elToPrep.prepend('<div id="WMMmap" class="insertedMap"><iframe src="http://wikimapia.org/#lat=' + lat + '&lon=' + lon + '&z=' + zoomgot + '&l=&ifr=1&m=w" width="' + width + '" height="' + height + '" frameborder="0"></iframe></div>');
    }
};

insertMap.OSM = function () {
    closeButtonInsert();
    getLatLon();
    elToPrep.prepend('<div id="OSMmap" class="insertedMap"></div>');
    $('#OSMmap').attr('style', 'position: absolute; width: ' + width + 'px; height: 100%; z-index: 100;');

    var map = new OpenLayers.Map("OSMmap");
    var mapnik = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");
    var toProjection = new OpenLayers.Projection("EPSG:900913");
    var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);

    map.addLayer(mapnik);
    map.setCenter(position, zoomgot);
};

insertMap.VC = function () {
    closeButtonInsert();
    if ($('#VCMap').length < 1) {
        getLatLon();
        elToPrep.prepend('<div id="VCMap" class="insertedMap"><iframe src="http://maps.visicom.ua/c/' + lon + ',' + lat + ',' + zoomgot + '?lang=' + lang + '" width="' + width + '" height="' + height + '" frameborder="0"></iframe></div>');
    }
};

insertMap.YM = function () {
    closeButtonInsert();
    getLatLon();
    elToPrep.prepend('<div id="ymapsbox" class="insertedMap"></div>');
    $('#ymapsbox').attr('style', 'position: absolute; width: ' + width + 'px; height: 100%; z-index: 100;');
    ymaps.ready(init);

    function init() {
        if (zoomgot === 20) zoomgot--;
        myMap = new ymaps.Map('ymapsbox', {
            center: [lat, lon],
            zoom: zoomgot
        });
        myMap.controls.add('typeSelector').add('smallZoomControl');
    }
};

insertMap.BM = function () {
    closeButtonInsert();
    getLatLon();

    elToPrep.prepend('<div id="bingmaps" class="insertedMap"></div>');
    $('#bingmaps').attr('style', 'position: absolute; width: 512px; height: 100%; z-index: 100;');
    if ($('#NMMap').length < 1) {
        elToPrep.prepend('<div id="bingmaps"><iframe src="http://www.bing.com/maps/embed/viewer.aspx?v=3&cp=' + lat + '~' + lon + '&lvl=' + zoomgot + '&sty=h&typ=d&pp=&ps=&dir=0&mkt=en-us&src=SHELL&form=BMEMJS&w=' + width + '&h=' + height + '" width="' + width + '" height="' + height + '" frameborder="0"></iframe></div>');
    }
};
insertMap.MM = function () {
    closeButtonInsert();
    getLatLon();
    elToPrep.prepend('<div id="metamaps" class="insertedMap"></div>');
    $('#metamaps').attr('style', 'position: absolute; width: 512px; height: 100%; z-index: 100;');
    var map = null;

    function init() {
        map = new MetaMapsOL.Map('map', {
            controls: [
                new MetaMapsOL.Control.LayerSwitcher(),
                new MetaMapsOL.Control.PanZoomBar()
            ]
        });
    }
};