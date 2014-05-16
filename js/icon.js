function setIcon (tabId, changeInfo, tab) {
	if (tab.url.indexOf('mapmaker') > -1 && tab.url.indexOf('plus.google') < 0) {
		chrome.pageAction.show(tabId);
	}
}
chrome.tabs.onUpdated.addListener(setIcon);