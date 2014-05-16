function setLocation() {
	var coordsString = JSON.parse(localStorage['gw-application-params']).ll;
	var zoom = JSON.parse(localStorage['gw-application-params']).z;
	var ll = {
		coords: coordsString,
		z: zoom
	};
	chrome.storage.local.set(ll);
}
$(document).ready(function () {
	setLocation();
});
$('#main_map').click(function() {
	setLocation();
});