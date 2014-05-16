$("#map").bind("contextmenu", function(e){
	var intervalID;
	var found = false;
	intervalID = setInterval(function(){
		if(found) return;
		var item = $(".menuitem[cad='src:gw-contextmenu-findfeature']").parent().children().first();
		if(item.length == 1){
			found = true;
				$(document).bind("keydown", bindHotkey);
				clearInterval(intervalID);
			}
	}, 50);
});
function bindHotkey(e){
	if(e.keyCode == 46){
		$(".menuitem[cad='src:gw-contextmenu-findfeature']").parent().children().first().click();
	}
	$(document).unbind("keydown", bindHotkey);
}