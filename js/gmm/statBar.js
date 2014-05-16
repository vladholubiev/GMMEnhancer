var userLink = $('a[href*="edit-nickname"]').attr('href').replace('#edit-nickname', '');

$.get(userLink, function(data) {
	var draftStat = $(data).find('.time_period_large').text().match(/\d+/g);
	var days = draftStat[0];
	var edits = draftStat[1];
	/* Це відсилає повідомлення eventPage який буде малювати іконку в адресному рядку
	chrome.runtime.sendMessage({
		type: 'edits',
		edits: edits
	});
	*/
	var reviews = draftStat[3];
	var editsPerDay = (edits / days).toPrecision(2);

	if ($('.edits:visible').length < 1) {
		$('#gbqfbw').after('<span title class="stats reviews">' + reviews + '</span>');
		$('#gbqfbw').after('<span title class="stats days">' + days + '</span>');
		$('#gbqfbw').after('<span title class="stats edits">' + edits + '</span>');
	} else {
		$('.edits').text(edits);
		$('.days').text(days);
		$('.reviews').text(reviews);
	}
	$('.stats.edits').attr('title', editsPerDay + ' ' + chrome.i18n.getMessage('statBar_editsPerDay'));
	$('.stats.days').attr('title', chrome.i18n.getMessage('statBar_days'));
	$('.stats.reviews').attr('title', chrome.i18n.getMessage('statBar_reviews'));

	$(document).ready(function() {
		if ($('.letter').length < 1) {
			$('.stats.reviews').after('<span class="letter">' + chrome.i18n.getMessage('statBar_reviewsLetter') + '</span>');
			$('.stats.days').after('<span class="letter">' + chrome.i18n.getMessage('statBar_dayLetter') + '</span>');
			$('.stats.edits').after('<span class="letter">' + chrome.i18n.getMessage('statBar_editsLetter') + '</span>');
		}
	});
});