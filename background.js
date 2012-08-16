console.log("BACKGROUND READY");

var options = {};

//intialize default values
options.dictionary = {};
options.words = [];
options.excluded_sites = ["google.com/search"];

if (localStorage["options"] != undefined)
	options = JSON.parse(localStorage["options"]);

function save(){
	localStorage["options"] = JSON.stringify(options);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {	
	if (request.method == "getOptions") sendResponse(options);
	else sendResponse({}); // snub them.
});







//chrome.browserAction.setBadgeText({text: "200"});