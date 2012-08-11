chrome.extension.onRequest.addListener(     //listen to requests
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello"){
      sendResponse({farewell: "goodbye"});  //send response
		chrome.browserAction.setBadgeText({text: "200"});
	 }
  });