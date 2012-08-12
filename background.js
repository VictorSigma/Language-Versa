chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSettings"){
		settings = {};
		
		//excluded sites 
		var json = JSON.parse(localStorage["excluded_sites"]);
		var excluded_sites = [];
		for (var key in json) {
			if (json.hasOwnProperty(key)) {
				excluded_sites.push(json[key]);
			}
		}
		settings["excluded_sites"] = excluded_sites;
		
		//created dictionary and word list
		json = JSON.parse(localStorage["dictionary"]);
		var words = [];
		for (var key in json) {
			if (json.hasOwnProperty(key)) {
				words.push(key);
			}
		}
		settings["words"] = words;
		settings["dictionary"] = json;
		
		sendResponse(settings);
    }else
		sendResponse({}); // snub them.
});







//chrome.browserAction.setBadgeText({text: "200"});