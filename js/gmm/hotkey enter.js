$(document).bind("keydown", bindHotkey);
function bindHotkey(e){
	if(e.keyCode === 13){
		$(".kd-button-submit:visible").last().click();
	}
}