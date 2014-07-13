$(document).ready(function() {
	//Zoom panel
	chrome.storage.local.get('deleteZoom', function(data) {
		if (data['deleteZoom'] === true) {
			if ($('.gmnoprint').length > 0) {
				$('.gmnoprint div').remove();
			}
			$('div[guidedhelpid="iph-zoom-control"]').parent().remove();
		}
	});
	//Marks panel
	chrome.storage.local.get('deleteMarks', function(data) {
		if (data['deleteMarks'] === true) {
			$('#gw-layers-outer').parent().remove();
		}
	});
	//Overlays button
	chrome.storage.local.get('deleteOverlays', function(data) {
		if (data['deleteOverlays'] === true) {
			$('#gw-overlay-outer').parent().remove();
		}
	});
	//Satellite picture date and authors block
	chrome.storage.local.get('deleteAddinf', function(data) {
		if (data['deleteAddinf'] === true) {
			$('#copyright-container').parent().remove();
			$('.gw-ip-container-inner').parent().parent().remove();
			$('.gm-style-cc').last().remove();
			$('.gw-ip-container.pancake-add-place-hide.hide-for-lightweight-ui.gw-ip-container-hyb').remove();
		}
	});
});