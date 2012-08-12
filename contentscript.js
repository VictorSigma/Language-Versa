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
        excludes = 'html,head,style,title,link,script,object,iframe';
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
						this.innerHTML = wrap.innerHTML;
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



//sort strings by longest first...
function compareStringLengths ( a, b ) {
  if ( a.length < b.length )
    return 1;
  if ( a.length > b.length )
    return -1;
	
  return 0; 
}

//////////////////////////////////

console.log("versa running");

chrome.extension.sendRequest({method: "getSettings"}, function(settings) {

	for (var i = 0; i < settings.excluded_sites.length; i++) {
		
		//console.log(settings.excluded_sites[i]);
		
		var escaped = settings.excluded_sites[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		
		var re = new RegExp( settings.excluded_sites[i], "i");
		
		
		if (window.location.href.search(re) > -1){
			console.log("This site is excluded!");
			return;
		}
		
	}
	
	var dictionary = settings.dictionary;
	var words = settings.words;
	
	console.log(dictionary);
	console.log(words);

	
	
	words.sort ( compareStringLengths );


	var style = 'style = "background-color:#CFF6FF;border-radius: 4px;';

	findAndReplace('\\b(' + words.join('|') ')\\b', function(term){
		return '<span ' + style + ' data = "' + term + '" >' + dictionary[term] + "</span>";
	});
	
	

});


