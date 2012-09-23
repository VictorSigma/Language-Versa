var options = {"enabled":true,"dictionary":{"have":"?","I":"?","not":"?","he":"?","she":"?","you":"?","from":"?","we":"??","say":"?","me":"?","all":"?","what":"??","if":"??","who":"?","which":"?","go":"?","time":"??","know":"??","person":"?","people":"?","and":"?","thing":"??","year":"?","good":"?","some":"??","now":"??","look":"?","come":"?","think":"?","also":"?","two":"?","work":"??","new":"?","want":"?","because":"??","day":"?","most":"?","ask":"?","problem":"??","woman":"?","find":"?","small":"?","large":"?","tell":"??","company":"??","old":"?","give":"?","should":"?","home":"?"},"words":["have","I","not","he","she","you","from","we","say","me","all","what","if","who","which","go","time","know","person","people","and","thing","year","good","some","now","look","come","think","also","two","work","new","want","because","day","most","ask","problem","woman","find","small","large","tell","company","old","give","should","home"],"excluded_sites":["google.com/search"],"word_exposure":14,"words_shown":2,"max_word_exposure":30,"css":"background-color:#CFF6FF;border-radius: 4px;","blocked":false};

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
			
			if (options.words_shown > options.words.length + 1)
				options.words_shown = options.words.length + 1;
		}
		
		save();
		sendResponse({});
	}else if(request.method == "nuke_word_exposure"){
		options.word_exposure = 0;
		save();
		sendResponse({});
	}else if(request.method == "blocked"){
		chrome.browserAction.setIcon({path:'imgs/blocked.png'});
		options.blocked = true;
		sendResponse({});
	}else if(request.method == "unblocked"){
		chrome.browserAction.setIcon({path:'imgs/icon.png'});
		options.blocked = false;
		sendResponse({});
	}
	else sendResponse({}); // snub them.
	
	chrome.browserAction.setBadgeText({text: "" + (options.words_shown - 1)});
});


/*
chrome sync?
style popup

chinese defaults
paywall
remove all console logs
change description in manifest
*/

