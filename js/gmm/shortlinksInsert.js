$(document).ready(function() {
	var html = '', introsNum,
		intros = chrome.i18n.getMessage("eventPage_intros");
	chrome.storage.local.get('shortlinkslist', function(data) {
		$('div[guidedhelpid="sharebox_textarea"]').click();
		$.each(data.shortlinkslist, function(index, val) {
			html += val + '<br>';
		});
		setTimeout(function() {
			$('.df.b-K.b-K-Xb.URaP8.editable').focus();
			intros = intros.split(/_/);
			introsNum = parseInt((Math.random() * intros.length).toFixed());
			$('.df.b-K.b-K-Xb.URaP8.editable').html(intros[introsNum] + html + '#needAccept');
		}, 1000);
	});
});