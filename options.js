console.log("OPTIONS READY");

var bck = chrome.extension.getBackgroundPage();

$(function() {

	function markup_exclude_li(value){
		return '<li> <input type="text" value = "'+value+'" ><a data-icon = "x" class = "remove-list-item icon" href = "#" ></a> </li>';
	}
	
	function markup_words_li(term, definition){
		return '<li class = "icon" data-icon = "\\" > <input  class = "term" type="text" value = "'+term+'" > <span class="transform">&gt;</span> <input value = "'+definition+'" class = "definition" type="text" ><a data-icon = "x" class = "icon remove-list-item" href = "#" ></a> </li> ';
	}

	//Add exclude list markup
	if (bck.options.excluded_sites != undefined)
		for (var i = 0; i< bck.options.excluded_sites.length; i++) {
			$('section#exclude ul').append(markup_exclude_li(bck.options.excluded_sites[i]));
		}
	
	//Add word list
	$("section#words ul").append('<li data-icon = ")" class = "unsortable icon unmoveable" ><span>Active Words</span></li>');
	
	if (bck.options.dictionary != undefined)
		for (var term in bck.options.dictionary) {
			$("section#words ul").append(markup_words_li(term, bck.options.dictionary[term]));
		}
	
	$("section#words ul").append('<li data-icon = "B" class = "unsortable  icon " ><span>Word Que</span></li>');
	
	//events
	
	$( "section#exclude .add" ).click(function(){ $("section#exclude ul").append(markup_exclude_li(''));});
	
	function update(){
		
	
		bck.options.excluded_sites = [];
		$("section#exclude li").each(function(){
			bck.options.excluded_sites.push($(this).find("input").val());
		});
		
		bck.options.dictionary = {};
		bck.options.words = [];
	
		$("section#words li").each(function(){
			if ($(this).find(".term").val() != ''  && $(this).find(".term").val() != undefined){
				bck.options.dictionary[$(this).find(".term").val()] = $(this).find(".definition").val();
				bck.options.words.push($(this).find(".term").val());
			}
		});

		bck.save();
		
		return false;
	}
	
	$("section#exclude").on("click", ".remove-list-item" ,function(event){
		$(this).parent().remove();
		update();
		return false;
	});
	
	$("section#exclude").on("propertychange keyup input", "input" ,update);
	
	/////////
	
	$( "section#words #sortable" ).sortable({
		items: "li:not(.unmoveable)",

		update: function(event, ui) { update(); }
	});
	
	$( "section#words #sortable" ).disableSelection();
	
	$( "section#words .add" ).click(function(){
		$("section#words ul").append(markup_words_li('', ''));
	});
	

	$("section#words").on("propertychange keyup input", "input" ,update);
	
	$("section#words").on("click", ".remove-list-item" ,function(event){
		$(this).parent().remove();
		update();
		return false;
	});
	
	

});


