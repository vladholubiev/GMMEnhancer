chrome.extension.sendMessage({
	isSafe: "isSafe"
}, function(reponse) {
	//This is where the stuff you want from the background page will be
	if (reponse.text == "safe") {
		$('#insertVC, #insertWM').addClass('notsafeDisabled');
		$('#insertVC, #insertWM').unbind('click');
		//Show warning tooltip in case of external maps unavailability
		$('#insertVC, #insertWM').mouseenter(function() {
			$('td[colspan="2"]:last').append('<p></p>');
			$('td[colspan="2"] p').html(chrome.i18n.getMessage('popup_inserted_unavailable'));
		});
	}
});
//Same width for all buttons
function setmaxwidth(element) {
	var widths = [];
	for (var i = 0; i < $(element).length; i++) {
		widths[i] = $(element).eq(i).width();
	}
	var maxwidth = Math.max.apply(Math, widths);
	$(element).width(maxwidth);
}

$(document).ready(function() {
    var aDiv = $('a div');
    var popupDescr = $('td[colspan="2"] span');
	$(popupDescr).eq(0).text(chrome.i18n.getMessage('popup_descr0'));
	$(popupDescr).eq(1).text(chrome.i18n.getMessage('popup_descr1'));
	$('#settings').find(aDiv).text(chrome.i18n.getMessage('popup_settings'));
	$('#discover').find(aDiv).text(chrome.i18n.getMessage('popup_discover'));
	$('#openinmaps').find(aDiv).text(chrome.i18n.getMessage('popup_openinmaps'));
	$('#openinmapsYandex').find(aDiv).text(chrome.i18n.getMessage('popup_openinmapsYandex'));
	$('#openinmapsMeta').find(aDiv).text(chrome.i18n.getMessage('popup_openinmapsMeta'));
	$('#insertOSM').find(aDiv).text(chrome.i18n.getMessage('popup_insertOSM'));
	$('#insertWM').find(aDiv).text(chrome.i18n.getMessage('popup_insertWM'));
	$('#insertYM').find(aDiv).text(chrome.i18n.getMessage('popup_insertYM'));
	$('#insertVC').find(aDiv).text(chrome.i18n.getMessage('popup_insertVC'));
	$('#insertBM').find(aDiv).text(chrome.i18n.getMessage('popup_insertBM'));
	$('#report').find(aDiv).text(chrome.i18n.getMessage('popup_report'));

	setmaxwidth('.googleButton');
	//Displaying tips
	$('#openinmaps, #openinmapsYandex').mouseenter(function(event) {
		//Delete https warning
		$('td[colspan="2"] p').remove();
		$('td[colspan="2"] span').eq(0).attr('style', 'visibility: visible;');
	});
	$('#openinmaps, #openinmapsYandex').mouseleave(function(event) {
		$('td[colspan="2"] span').eq(0).attr('style', 'visibility: hidden;')
	});
	$('#insertOSM, #insertWM, #insertYM, #insertVC').mouseenter(function(event) {
		$('td[colspan="2"] p').remove();
		$('td[colspan="2"] span').eq(1).attr('style', 'visibility: visible;');
	});
	$('#insertOSM, #insertWM, #insertYM, #insertVC').mouseleave(function(event) {
		$('td[colspan="2"] span').eq(1).attr('style', 'visibility: hidden;')
	});

	//Adding links to buttons
	var id = chrome.i18n.getMessage("@@extension_id"),
		link = 'chrome-extension://' + id + '/options.html',
		lat, lon, zoom, gzoom;
	$('#settings').find('a').attr('href', link);
	$('#settings').find('a').attr('target', '_blank');
	setInterval(function() {
		chrome.storage.local.get(null, function(data) {
			lat = data.coords.match(/\d+.\d+/g)[0];
			lon = data.coords.match(/\d+.\d+/g)[1];
			zoom = data.z;
			gzoom = Math.pow(2, (20 - zoom)) * 137; //Zoom value for google maps
			$('#openinmaps a').attr('href',
                    'https://www.google.com/maps/preview#!data=!1m4!1m3!1d' + gzoom + '!2d' + lon + '!3d' + lat);
			$('#openinmapsYandex a').attr('href',
                    'http://maps.yandex.ua/?text=' + data.coords + '&z=' + zoom);
			$('#openinmapsMeta a').attr('href',
                    'http://map.meta.ua/#zoom=' + zoom + '&lat=' + lat + '&lon=' + lon);
		});
	}, 100);
	$('#openinmaps, #openinmapsYandex, #openinmapsMeta').click(function() {
		window.open($(this).children().attr('href'), '_blank');
	});
	if (window.navigator.language.indexOf('en') > -1) {
		$('#discover').find('a').attr('href', 'https://chrome.google.com/webstore/detail/' +
            'gmm-enhancer/apmfackigpphgbbanjkjcafbiciialnm?hl=en');
	}

	//Inserting external maps on the page
	$('#insertOSM').click(function() {
		chrome.tabs.insertCSS({
			file: 'js/gmm/osm/style.css'
		}, function() {});
		chrome.tabs.executeScript({
			file: 'js/gmm/osm/OpenLayers.js'
		}, function() {});
		chrome.runtime.sendMessage({
			greeting: "OSM"
		});
	});
	$('#insertWM').click(function() {
		chrome.runtime.sendMessage({
			greeting: "WM"
		});
	});
	$('#insertYM').click(function() {
		chrome.runtime.sendMessage({
			greeting: "YM"
		});
	});
	$('#insertVC').click(function() {
		chrome.runtime.sendMessage({
			greeting: "VC"
		});
	});
	$('#insertBM').click(function() {
		chrome.runtime.sendMessage({
			greeting: "BM"
		});
	});
});