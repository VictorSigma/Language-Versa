

$(function() {
	var bck = chrome.extension.getBackgroundPage();
	
	//set saved values
	$('input[type="checkbox"]').attr('checked', bck.options.enabled);
	$('.word_count').text(bck.options.words_shown-1);
	$('.page_views').text(bck.options.max_word_exposure - bck.options.word_exposure);

	if (bck.options.blocked)
		$('.exclude').show();
	
	chrome.tabs.getSelected(null, function(tab) {
	    $('.exclude_url').val(tab.url);
	});


	//events 
	$('input[type="checkbox"]').change(function(){
		bck.options.enabled = this.checked;
		bck.save();
		chrome.tabs.reload();
	});

	$('.options').click(function(){chrome.tabs.create({url: 'options.html'});});

	$('button.add').click(function(){
		bck.options.excluded_sites.push($(".exclude_url").val());
		bck.save();
	});




});


