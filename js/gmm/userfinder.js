var string = '<div id="userSender" style="display:none"><iframe name="hidden_iframe2" id="hidden_iframe2" style="display:none;"></iframe><form method="post" action="https://script.google.com/macros/s/AKfycbyqtMWFZNqqWXl2Gk9zsIVhoeGAhSm-50hknIdPq_sYsIm4-_A/exec" name="sendUser" id="sendUsers" target="hidden_iframe2"><input name="Name" id="comment" type="text"></input><input name="Link" type="text"><input type="button" id="sendUserLink" value="Submit" class="submit" onclick="document.getElementById("sendUsers").submit()"></form></div>',
	fired = false;


function send(username, profilelink) {
	if ($('#userSender').length < 1) { //Якщо ще немає форми для відправки
		fired = true;
		$('body').append(string); //Вставити її

		$('input[name="Name"]').val(username);
		$('input[name="Link"]').val(profilelink);

		document.getElementById("sendUsers").submit();
		console.log(username, profilelink, fired);
		//$('#userSender').remove();
	}
}

$(document).on('mouseenter', '#gw-review-block', function() {
	var user = $('#spsizer').find('a[cad="src:user-prof"]');
	var username = user.text();
	var profilelink = 'http://google.com' + user.attr('href');

	//if (fired !== true) {
	send(username, profilelink);
	//}
});
//if(localStorage.usernames===undefined){var arr=[];arr.push(username);localStorage.usernames=JSON.stringify(arr);}else if(localStorage.usernames.indexOf(username)<0){var arr=JSON.parse(localStorage.usernames);arr.push(username);localStorage.usernames=JSON.stringify(arr);}if(localStorage.profilelink===undefined){var arr=[];arr.push(profilelink);localStorage.usernames=JSON.stringify(arr);}else if(localStorage.profilelink.indexOf(profilelink)<0){var arr=JSON.parse(localStorage.profilelink);arr.push(profilelink);localStorage.profilelink=JSON.stringify(arr);}