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
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}

console.log("running");

//sort strings by longest first...
function compareStringLengths ( a, b ) {
  if ( a.length < b.length )
    return 1;
  if ( a.length > b.length )
    return -1;
  return 0; // a and b are the same length
}

var words = [ 'I', 'you', "know", "I'm"];
words.sort ( compareStringLengths );

findAndReplace('\\b(' + words.join('|') + ')\\b', function(term){
	return '<a href="javascript:void(0)" onclick="tester">'+term+"</a>";
});

function tester(){
chrome.extension.sendRequest({greeting: "hello"}, function(response) { //request
  console.log(response.farewell);           //receive response
});
}