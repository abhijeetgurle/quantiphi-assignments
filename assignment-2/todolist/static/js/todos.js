// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(){
	
	$(this).toggleClass("completed");

	// get text inside li
	var one_task = $(this).text()
	one_task = one_task.slice(1, one_task.length);

	// send post request to change class in database based on class of li
	if($(this).hasClass("completed")) {

		$.post('update_status', { title: one_task, status: "completed" }, 
	    	function(returnedData){
	        	console.log(returnedData);
			}).fail(function(error){
	      		alert(error);
		});
	}
	else {

		$.post('update_status', { title: one_task, status: "not_completed" }, 
	    	function(returnedData){
	        	console.log(returnedData);
			}).fail(function(error){
	      		alert(error);
		});
	}
});


//Click on X to delete Todo
$("ul").on("click", "span", function(event){

	// get text inside li
	var one_task = $(this).parent().text();
	one_task = one_task.slice(1, one_task.length);

	// Send data to server to delete item in post request
	$.post('delete', { task: one_task }, 
    	function(returnedData){
        	console.log(returnedData);
		}).fail(function(error){
      		alert(error);
	}); 
	
	// Fadeout the li on page
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});

	// Stop the bubling of events so that no additional event listeners fire
	event.stopPropagation();
});


// if Enter key is pressed on input
$("input[type='text']").keypress(function(event){

	// Check that key pressed is Enter or not
	if(event.which === 13){

		//grabbing new todo text from input
		var todoText = $(this).val();
		$(this).val("");

		// Send a post request to add new task in database
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


// Toggle display of input when plus icon is pressed
$("#toggle-form").click(function(){
	
	$("input[type='text']").fadeToggle();
});