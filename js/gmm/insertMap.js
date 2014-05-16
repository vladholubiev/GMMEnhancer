var width = $('#spsizer').width(),
	height = $('#spsizer').height() + 40,
	lang = window.navigator.userLanguage || window.navigator.language,
	myMap, lat, lon, zoomgot;

function closeButtonInsert() {
	closeButtonInsert.listener = function() {
		$('#closeMapButton').click(function() {
			$('#lp-panel-headers').find('div[id*=ap]').remove();
			$('#closeMapButton').remove();
		});
	}
	if ($('img[src*="tiny_marker-k.png"]:visible').length < 1) {
		$('#closeMapButton').remove();
		$('#gw-tab-header').after('<div id="closeMapButton"><span>X</span></div>');
		$('#closeMapButton').attr('style', 'position:absolute; z-index: 9999; top: 0px; left: 200px;');
		closeButtonInsert.listener();
	} else if ($('#closeMapButton:visible').length < 1) {
		$('#gw-stream-select-button').after('<div id="closeMapButton"><span>X</span></div>');
		closeButtonInsert.listener();
	}
}

function getLatLon(callback) {
	chrome.storage.local.get(null, function(data) {
		lat = data.coords.match(/\d+.\d+/g)[0];
		lon = data.coords.match(/\d+.\d+/g)[1];
		zoomgot = data.z;
		callback.call();
	});
}

function insertMap() {};
insertMap.WM = function() {
	closeButtonInsert();
	if ($('#WMMmap').length < 1) {
		$('#lp-panel-headers').prepend('<div id="WMMmap"><iframe src="http://wikimapia.org/#lat=' + lat + '&lon=' + lon + '&z=' + zoomgot + '&l=&ifr=1&m=w" width="' + width + '" height="' + height + '" frameborder="0"></iframe></div>');
	}
}

insertMap.OSM = function() {
	$('#lp-panel-headers').prepend('<div id="OSMmap"></div>');
	$('#OSMmap').attr('style', 'position: absolute; width: 512px; height: 100%; z-index: 100;');
	closeButtonInsert();

	var map = new OpenLayers.Map("OSMmap");
	var mapnik = new OpenLayers.Layer.OSM();
	var fromProjection = new OpenLayers.Projection("EPSG:4326");
	var toProjection = new OpenLayers.Projection("EPSG:900913");
	var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);

	map.addLayer(mapnik);
	map.setCenter(position, zoomgot);
}

insertMap.VC = function() {
	closeButtonInsert();
	if ($('#VCMap').length < 1) {
		$('#lp-panel-headers').prepend('<div id="VCMap"><iframe src="http://maps.visicom.ua/c/' + lon + ',' + lat + ',' + zoomgot + '?lang=' + lang + '" width="' + width + '" height="' + height + '" frameborder="0"></iframe></div>');
	}
}

insertMap.YM = function() {
	closeButtonInsert();
	$('#lp-panel-headers').prepend('<div id="ymapsbox"></div>');
	$('#ymapsbox').attr('style', 'position: absolute; width: 512px; height: 100%; z-index: 100;');
	ymaps.ready(init);

	function init() {
		if (zoomgot === 20) zoomgot--;
		myMap = new ymaps.Map('ymapsbox', {
			center: [lat, lon],
			zoom: zoomgot
		});
		myMap.controls.add('typeSelector').add('smallZoomControl');
	}
}

insertMap.BM = function() {
	closeButtonInsert();

	$('#lp-panel-headers').prepend('<div id="bingmaps"></div>');
	$('#bingmaps').attr('style', 'position: absolute; width: 512px; height: 100%; z-index: 100;');
	if ($('#NMMap').length < 1) {
		$('#lp-panel-headers').prepend('<div id="bingmaps"><iframe src="http://www.bing.com/maps/embed/viewer.aspx?v=3&cp=' + lat + '~' + lon + '&lvl=' + zoomgot + '&sty=h&typ=d&pp=&ps=&dir=0&mkt=en-us&src=SHELL&form=BMEMJS&w=' + width + '&h=' + height + '" width="' + width + '" height="' + height + '" frameborder="0"></iframe></div>');
	}
}
insertMap.MM = function() {
	closeButtonInsert();
	$('#lp-panel-headers').prepend('<div id="metamaps"></div>');
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
}