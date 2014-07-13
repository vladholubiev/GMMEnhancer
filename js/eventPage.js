var isPageSafe, pageurl, edits;

chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install") {
		console.log("This is a first install!");
	} else if (details.reason == "update") {
		var thisVersion = chrome.runtime.getManifest().version;
		console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
		//Enable sending stats by default
		chrome.storage.local.set({
			contestSender: true
		});
	}
});

function checkSafeness() {
	if (localStorage['pageurl'].indexOf('https') > -1) {
		isPageSafe = 'safe';
	} else isPageSafe = 'notSafe';
	return isPageSafe;
}
//MapLoader
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		runMapLoader(request.greeting);
		if (request.isSafe == "isSafe") {
			sendResponse({
				text: checkSafeness()
			});
		}
		if (request.type == 'edits') {
			edits = request.edits
		}
	});

function runMapLoader(which) {
	if (which === 'YM') {
		chrome.tabs.executeScript({
			file: 'js/scriptTagContext.js'
		}, function() {
			chrome.tabs.executeScript({
				file: 'js/ymaps.js'
			}, function() {
				chrome.tabs.executeScript({
					file: 'js/gmm/insertMap.js'
				}, function() {
					chrome.tabs.executeScript({
						code: 'getLatLon(insertMap.' + which + ');'
					});
				});
			});
		});
	} else if (which === 'MM') {
		chrome.tabs.executeScript({
			file: 'js/scriptTagContext.js'
		}, function() {
			chrome.tabs.executeScript({
				file: 'js/metamaps.js'
			}, function() {
				chrome.tabs.executeScript({
					file: 'js/gmm/insertMap.js'
				}, function() {
					chrome.tabs.executeScript({
						code: 'getLatLon(insertMap.' + which + ');'
					});
				});
			});
		});
	} else {
		chrome.tabs.executeScript({
			file: 'js/gmm/insertMap.js'
		}, function() {
			chrome.tabs.executeScript({
				code: 'getLatLon(insertMap.' + which + ');'
			});
		});
	}
} //MapLoader

//value - variable id, data is needed to access variable
function check(value, data) {
	//General handler
	if (value !== 'contestSender') {
		//if value exists
		if (data[value] !== undefined) {
			if (data[value] === false) { //and is false
				//user wants to execute script
				chrome.tabs.executeScript({
					file: 'js/gmm/' + value + '.js'
				});
			} else return;
		} else { //if values not exists, user hasn't made any choise, so execute script by default
			chrome.tabs.executeScript({
				file: 'js/gmm/' + value + '.js'
			});
		}
	} else {
		if (data[value] !== undefined) {
			if (data[value] === true) { //and is true
				//so user wants to execute script
				chrome.tabs.executeScript({
					file: 'js/gmm/' + value + '.js'
				});
			} else return;
		} else { //if values not exists, user hasn't made any choise, so execute script by default
			chrome.tabs.executeScript({
				file: 'js/gmm/' + value + '.js'
			});
		}
	}
}


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	chrome.storage.local.get('onlyContest', function(data) {
		if (data['onlyContest'] === false || data['onlyContest'] === undefined) {
			if (changeInfo.status == "complete") {
				chrome.tabs.get(tabId, function(tab) {
					pageurl = tab.url;
					if (pageurl.indexOf('mapmaker') > -1 && pageurl.indexOf('plus.google') < 0) {
						localStorage.pageurl = pageurl;
						chrome.tabs.executeScript({
							file: 'js/jquery-latest.js'
						}, function() {
							//TODO: Rewrite using only one request to storage
							chrome.storage.local.get('contestSender', function(data) {
								check('contestSender', data);
							});
							chrome.storage.local.get('floors', function(data) {
								check('floors', data);
							});
							chrome.storage.local.get('helpmenu', function(data) {
								check('helpmenu', data);
							});
							chrome.tabs.executeScript({
								file: 'js/gmm/userfinder.js'
							});
							chrome.storage.local.get(null, function(data) {
								console.log(data);
							});
							chrome.storage.local.get('noduildingdups', function(data) {
								check('noduildingdups', data);
							});
							chrome.storage.local.get('shortlinks', function(data) {
								check('shortlinks', data);
							});
							chrome.storage.local.get('replytemplates', function(data) {
								check('replytemplates', data);
							});
							chrome.tabs.executeScript({
								file: "js/gmm/messagebox.js"
							});
							chrome.tabs.executeScript({
								file: "js/gmm/statBar.js"
							});
							chrome.tabs.executeScript({
								file: "js/gmm/ui hide.js"
							});
							//Don't mark nearby objects with red
							chrome.tabs.executeScript({
								code: "$(document).ready(function() {if ($('#level_wrapper').length > 0)" +
                                    "{setTimeout(function() {$('.jfk-checkbox-checkmark').eq(0).click()}, 300);}});"
							});
							//Marks a message that edit has to be reviewed by an Indian guy
							chrome.tabs.executeScript({
								file: 'js/gmm/indusColor.js'
							});
						});
					}
					//Sending links to community
					if (url.indexOf('?pastelinks=true') > -1) {
						chrome.tabs.executeScript({
							file: 'js/jquery-latest.js'
						}, function() {
							chrome.tabs.executeScript({
								file: 'js/gmm/shortlinksInsert.js'
							})
						});
					}
				});
			}
			if (changeInfo.status == "loading") {
				chrome.tabs.insertCSS({
					file: 'css/someCSS.css'
				});
				//Remove Shift message
				chrome.storage.local.get('noShift', function(data) {
					if (data['noShift'] === true) {
						chrome.tabs.insertCSS({
							file: 'css/noShift.css'
						});
					}
				});
			}
		} else if (changeInfo.status == "complete") {
			chrome.tabs.get(tabId, function(tab) {
				console.log('only contest mode');
				if (tab.url.indexOf('mapmaker') > -1 && tab.url.indexOf('plus.google') < 0) {
					chrome.tabs.executeScript({
						file: 'js/jquery-latest.js'
					}, function() {
						chrome.storage.local.get('contestSender', function(data) {
							check('contestSender', data);
						});
						chrome.tabs.executeScript({
							file: 'js/gmm/userfinder.js'
						});
					}); //end of chrome.tabs.executeScript
				} //end of if tab.url
			}); //end of chrome.tabs.get
		}
	}); //end of chrome.storage.local.get
}); //end of tabs.onUpdated