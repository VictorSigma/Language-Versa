$(function() {

	
	var excluded_sites = {};
	
	if (localStorage["excluded_sites"] != undefined)
		excluded_sites = JSON.parse(localStorage["excluded_sites"]);
		
	for (var index in excluded_sites) {
		$("section#exclude ul").append('<li> <input type="text" value = "'+excluded_sites[index]+'" ><a class = "remove-list-item" href = "#" >x</a> </li> ');
	}
	
	$( "section#exclude .add" ).click(function(){
		$("section#exclude ul").append('<li> <input type="text" ><a class = "remove-list-item" href = "#" >x</a> </li> ');
	});
	
	$("section#exclude").on("click", ".remove-list-item" ,function(event){
		$(this).parent().remove();
		
		var temp = {};
		
		$("section#exclude ul li").each(function(index){
			temp[index] = $(this).find('input').val();
		});
		
		excluded_sites = temp;
		localStorage["excluded_sites"] = JSON.stringify(excluded_sites);
		return false;
	});
	
	$("section#exclude").on("propertychange keyup input", "input" ,function(event){
	
		excluded_sites[$(this).parent().index()] = this.value;
		localStorage["excluded_sites"] = JSON.stringify(excluded_sites);
		
		return false;
	});
	
	/////////
	
	var dictionary = {};
	
	if (localStorage["dictionary"] != undefined)
		dictionary = JSON.parse(localStorage["dictionary"]);
		
	for (var term in dictionary) {
		$("section#words ul").append('<li> <input class = "term" type="text" value = "'+term+'" > = <input value = "'+dictionary[term]+'" class = "definition" type="text" ><a class = "remove-list-item" href = "#" >x</a> </li> ');
	}
	
	$( "section#words #sortable" ).sortable({
		update: function(event, ui) { 
		
			dictionary = {};
		
			$("section#words li").each(function(){
				dictionary[$(this).find(".term").val()] = $(this).find(".definition").val();
			});

			localStorage["dictionary"] = JSON.stringify(dictionary);		
		}
	});
	
	$( "section#words #sortable" ).disableSelection();
	
	$( "section#words .add" ).click(function(){
		$("section#words ul").append('<li> <input class = "term" type="text" > = <input class = "definition" type="text" ><a class = "remove-list-item" href = "#" >x</a> </li> ');
	});
	
	
	$("section#words").on("propertychange keyup input", "input" ,updateWordList);
	
	$("section#words").on("click", ".remove-list-item" ,function(event){
		$(this).parent().remove();
		updateWordList();
		return false;
	});
	
	function updateWordList(){
		dictionary = {};
	
		$("section#words li").each(function(){
			if ($(this).find(".term").val() != '' )
				dictionary[$(this).find(".term").val()] = $(this).find(".definition").val();
		});

		localStorage["dictionary"] = JSON.stringify(dictionary);
	}

});


