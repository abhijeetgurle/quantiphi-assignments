// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");

	
});

//Click on X to delete Todo
$("ul").on("click", "span", function(event){

	var one_task = $(this).parent().text();
	one_task = one_task.slice(1, one_task.length);

	$.post('delete', { task: one_task }, 
    	function(returnedData){
        	console.log(returnedData);
		}).fail(function(error){
      		alert(error);
	}); 
	
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});

	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text from input
		var todoText = $(this).val();
		$(this).val("");

		$.post('add', { title: todoText, status: "not_completed" }, 
	    	function(returnedData){
	        	console.log(returnedData);
			}).fail(function(error){
	      		alert(error);
		});

		//create a new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

$("#toggle-form").click(function(){
	$("input[type='text']").fadeToggle();
});