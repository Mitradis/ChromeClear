chrome.browserAction.onClicked.addListener(function(tab) {
	var url = "chrome://history";
	chrome.tabs.getAllInWindow(undefined, function(tabs) {
		for (var i = 0, tab; tab = tabs[i]; i++) {
			if (tab.url && tab.url === url) {
				chrome.tabs.update(tab.id, {selected: true});
				return;
			}
		}
		chrome.tabs.create({url: url});
	});
});