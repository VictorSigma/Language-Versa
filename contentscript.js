console.log("CONTENT SCRIPT READY");

//Made with the help of...
//http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/
function findAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        // Throw error here if you want...
        return;
    }
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'g') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,head,style,title,link,script,object,iframe,input';
		
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(regex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
				
					//onclick function for each element
					wrap.firstChild.onclick = function(){
						this.innerHTML =  this.getAttribute("data-term");
						chrome.extension.sendRequest({method: "nuke_word_exposure"}, function() {});
						return false;
					}
				
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}



//////////////////////////////////

console.log("Language-Versa running");

chrome.extension.sendRequest({method: "get_options"}, function(options) {
	
	console.log(options);
	
	if (options.enabled){

		for (var i = 0; i < options.excluded_sites.length; i++) {
			var escaped = options.excluded_sites[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			var re = new RegExp( options.excluded_sites[i], "i");
			
			if (window.location.href.search(re) > -1){
				console.log("This site is excluded from Language-Versa!");
				
				chrome.extension.sendRequest({method: "blocked"}, function(options) {});
				return;
			}else{
				chrome.extension.sendRequest({method: "unblocked"}, function(options) {});
			}
		}
		
		
		if (options.words != undefined && options.words.length > 0){
			
			var word_list = options.words.slice(0, options.words_shown);
			
			word_list.sort (function ( a, b ) {
			  if ( a.length < b.length )
				return 1;
			  if ( a.length > b.length )
				return -1;
				
			  return 0; 
			});

			var word_exposure = false;
			var style = 'style = "'+options.css+'"';

			findAndReplace('\\b(' + word_list.join('|') + ')\\b', function(term){
				word_exposure = true;
				return '<span ' + style + ' data-term = "' + term + '" >' + options.dictionary[term] + "</span>";
			});
			
			if (word_exposure){
				chrome.extension.sendRequest({method: "word_exposure"}, function(options) {});
			}
		}
	}


});

console.log("Language-Versa done.");

