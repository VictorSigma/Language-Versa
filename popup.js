

$(function() {
	var bck = chrome.extension.getBackgroundPage();
	
	//set saved values
	$('input[type="checkbox"]').attr('checked', bck.options.enabled);

	$('input[type="checkbox"]').change(function(){

		bck.options.enabled = this.checked;
		bck.save();
		chrome.tabs.reload();
		
	});
});