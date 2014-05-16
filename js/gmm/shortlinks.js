chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.safe == "safe") {
			alert('got');
			$('#insertVC, #insertWM').addClass('notsafeDisabled');
			$('#insertVC, #insertWM').unbind('click');
		}
	}
);
(function() {
	//Щоб два рази не завантажувалося
	if (window.hasRunshort) return;
	window.hasRunshort = true;

	var notApprovedLength,
		shortURL = [],
		longURL = [],
		output = '',
		c = 0,
		shortlinkslist = {
			shortlinkslist: []
		};

	function main() {
		output = '';
		notApprovedLength = $("img[src='/mapmaker/mapfiles/tiny_marker_orange-k.png']:visible").length;
		for (var i = 0; i < notApprovedLength; i++) {
			longURL[i] = $("div.header>a.pointer_cursor").eq(i)[0].href;
		}
		$.each(longURL, function(k, url) {
			$.ajax({
				url: 'https://www.googleapis.com/urlshortener/v1/url?shortUrl=http://goo.gl/fbsS&key=AIzaSyANFw1rVq_vnIzT4vVOwIw3fF1qHXV7Mjw',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				data: '{ longUrl: "' + url + '"}',
				dataType: 'json',
				success: function(response) {
					shortURL[k] = response.id;
					output += shortURL[k] + '\n';
					$('textarea#shortList').text(output);
					shortlinkslist.shortlinkslist[k] = shortURL[k];
					chrome.storage.local.set(shortlinkslist);
					//Якщо останній елемент вже
					if (k === longURL.length - 1) {
						//Вставити кнопку для авт. публ. в спільноту
						$('#shortList').parent().parent().parent().next().after('<div id="kd-browse-toolbar-button" class="pastelinks pointer_cursor goog-inline-block hasMaxWidth jfk-button jfk-button-standard kd-toolbar-last-button jfk-button-clear-outline" style="max-width: 250px; margin: 0px 0px 5px 85px;"><div>' + chrome.i18n.getMessage("sl_button_pastelinks") + '</div>');
						//Стилізація кнопки
						$('div[class="action"]').first().remove();
						$('div.action.edit').first().attr('style', 'margin-bottom: -10px;');
						$('.pastelinks').click(function(event) {
							window.open('http://goo.gl/qeymrQ', '_blank');
						});
					}
				}
			});
		});
	}
	$('#kd-browse-toolbar-button[style*="max-width: 250px;"]').click(function() {
		//Якщо вже є два блока з посиланнями то видалити останній
		if ($('textarea#shortList').length > 0) {
			$('#panel_7_1').remove();
		}
		$('div.item').eq(0).before('<div class="item" id="panel_7_1"><div class="result gw-feature-summary"><div class="icon"><img src="/mapmaker/mapfiles/note-icon-k.png"></div><div class="header"><a class="title">' + chrome.i18n.getMessage("sl_block_name") + '</a></div><div class="stream"><div style="display:"><div class="action edit"><div><span class="hc" uid="211700403834496622904"><textarea id="shortList" cols="65" rows="15" readonly="" autofocus="" onclick="this.focus();this.select()">asda</textarea></span><div class="content-end"></div></div></div><div class="action"></div></div></div></div></div>');
		main();
	});
})();