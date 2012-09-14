console.log("BACKGROUND READY");

var options = {};

//intialize default values
options.enabled = true;
options.dictionary = {};
options.words = [];
options.excluded_sites = ["google.com/search"];
options.word_exposure = 0;
options.words_shown = 1;

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
		
		
		if (options.word_exposure >= 10){
			options.word_exposure = 0;
			options.words_shown += 1;
		}
		
		save();
		sendResponse({});
	}else if(request.method == "nuke_word_exposure"){
		options.word_exposure = 0;
		save();
		sendResponse({});
	}
	else sendResponse({}); // snub them.
	
	chrome.browserAction.setBadgeText({text: "" + options.word_exposure});
});


/*

slowly adding word functionality
stats (you are learning x words) and icons
backup
chrome sync?
chinese defaults
paywall
style popup
*/





//