console.log("BACKGROUND READY");

var options = {};

//intialize default values
options.enabled = true;
options.dictionary = {};
options.words = [];
options.excluded_sites = ["google.com/search"];
options.word_exposure = 0;
options.max_word_exposure = 24;
options.words_shown = 1;
options.css = 'background-color:#CFF6FF;border-radius: 4px;';

if (localStorage["options"] != undefined)
	options = JSON.parse(localStorage["options"]);
	
function save(){
	localStorage["options"] = JSON.stringify(options);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {	
	if (request.method == "get_options"){ 
		sendResponse(options);
	}else if (request.method == "word_exposure"){
	
		options.word_exposure += 1;
		
		
		if (options.word_exposure >= options.max_word_exposure){
			options.word_exposure = 0;
			options.words_shown += 1;
		}
		
		save();
		sendResponse({});
	}else if(request.method == "nuke_word_exposure"){
		options.word_exposure = 0;
		save();
		sendResponse({});
	}else if(request.method == "blocked"){
		chrome.browserAction.setIcon({path:'imgs/blocked.png'});
		console.log("HDSFSDFS");
		sendResponse({});
	}else if(request.method == "unblocked"){
		chrome.browserAction.setIcon({path:'imgs/icon.png'});
		sendResponse({});
	}
	else sendResponse({}); // snub them.
	
	chrome.browserAction.setBadgeText({text: "" + options.word_exposure});
});


/*
chrome sync?
style popup

blocked icon for sites that are blocked from language
chinese defaults
paywall
remove all console logs
change description in manifest
*/

