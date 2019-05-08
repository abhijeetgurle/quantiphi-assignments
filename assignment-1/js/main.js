// object containing all classes and ID's needed
var DOMstrings = {
	oyster: '#oyster',
	cat: '#cat',
	whale: '#whale',
	elephant: '#elephant',
	fish: '#fish',
	goose: '#goose',
	invisible_content: '.invisible-content',
	choose_mascot: '.choose-mascot',
	oyster_div: 'oyster-div',
	cat_div: 'cat-div',
	whale_div: 'whale-div',
	elephant_div: 'elephant-div',
	fish_div: 'fish-div',
	goose_div: 'goose-div',
	star_rating: '.star-rating',
	fa_star: '.fa-star',
	department_button: '.department-button',
	reasons_for_selection: '.reasons-for-selection',
	checkbox_1: 'checkbox-1',
	checkbox_2: 'checkbox-2',
	checkbox_3: 'checkbox-3',
	checkbox_4: 'checkbox-4',
	textarea_1: 'textarea-1',
	textarea_2: 'textarea-2',
	star_1: '1',
	dept_button: 'dept-button',
	next_page: 'next-page',
	rating_remark: 'rating-remark'
};


// Function to make all mascot images blur
function makeAllBlur() {

	// Set the opacity of each mascot image to 0.2
	document.getElementById(DOMstrings.oyster_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.cat_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.whale_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.elephant_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.fish_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.goose_div).style.opacity = '0.2';
}


// Function to display star rating
function showRating(starID) {

	// 1. Get the id of star clicked
	var id = parseInt(starID, 10);
	
	// 2. Make all stars less than equal to id checked
	for(var i=1; i<=id; i+=1) {
		var element = document.getElementById(i.toString());
		if(!element.classList.contains('star-checked')) {
			element.classList.add('star-checked');
		}
	}

	// 3. Make all stars greater than id unchecked
	for(var i=id+1; i<=5; i++) {
		var element = document.getElementById(i.toString());
		element.classList.remove('star-checked');
	}

	// 4. Display remarks of selected rating besides star
	var element = document.getElementById(DOMstrings.rating_remark);
	if(id===1) {
		element.innerHTML = 'Lorem ipsum dolor';
	}
	else if(id===2) {
		element.innerHTML = 'Lorem ipsum dolor';
	}
	else if(id===3) {
		element.innerHTML = 'Lorem ipsum dolor';
	}
	else if(id===4) {
		element.innerHTML = 'Lorem ipsum dolor';
	}
	else {
		element.innerHTML = 'Lorem ipsum dolor';
	}
}


// Function to add click listener on stars
function addRatingListener() {

	// 1. Get all the stars using DOM 
	var stars = document.querySelectorAll(DOMstrings.fa_star);

	// 2. add click event listener on each star 
	stars.forEach(function (star) {
		star.addEventListener('click', function() {
			showRating(star.id);
		});
	});
}


// Function to check whether passed string is empty or not
function isEmpty(str) {

	for(var i=0; i<str.length; i++) {
		if(str[i]!==' ') {
			return true;
		}
	}

	return false;
}


// Enable go to next department button
function enableDeptButton() {

	// 1. Get the button using DOM
	var button = document.getElementById(DOMstrings.dept_button);
	// 2. Set the background color of button to blue
	button.style.backgroundColor = 'rgb(29, 153, 119)';
	// 3. set the href attribute of button to index.html
	var link = document.getElementById(DOMstrings.next_page);
	link.href = 'index.html';
}


// Disable go to next department button
function disableDeptButton() {

	// 1. Get the button using DOM
	var button = document.getElementById(DOMstrings.dept_button);
	// 2. Set the background color of button to gray
	button.style.backgroundColor = 'gray';
	// 3. Set the href attribut to #
	var link = document.getElementById(DOMstrings.next_page);
	link.href = '#';
}


// Function to check form is completely filled or not
function checkFormFull(event) {

	// 1. Checked whether 1st star is clicked or not
	var starsComplete = document.getElementById(DOMstrings.star_1).classList.contains('star-checked');
	
	// 2. Get states of all checkboxes
	var checkbox_1 = document.getElementById(DOMstrings.checkbox_1).checked;
	var checkbox_2 = document.getElementById(DOMstrings.checkbox_2).checked;
	var checkbox_3 = document.getElementById(DOMstrings.checkbox_3).checked;
	var checkbox_4 = document.getElementById(DOMstrings.checkbox_4).checked;
	
	// 3. check whether textareas are empty or not
	var textarea_1 = document.getElementById(DOMstrings.textarea_1).value;
	var textarea_2 = document.getElementById(DOMstrings.textarea_2).value;
	var textareaOneFilled = isEmpty(textarea_1);
	var textareaTwoFilled = isEmpty(textarea_2);
	
	// 4. combined all above in one if statement
	if(starsComplete && (checkbox_1 || checkbox_2 || checkbox_3 || checkbox_4) && textareaOneFilled && textareaTwoFilled) {
		// Enable button if everything is filled
		enableDeptButton();
	}
	else {
		// Disable button if everything is not filled
		disableDeptButton();
	}
}


// Function to add event listeners to input fields
function addEventListenersToForm() {

	// 1. add event listeners to stars
	var stars = document.querySelectorAll(DOMstrings.fa_star);
	stars.forEach(function (star) {
		star.addEventListener('click', checkFormFull);
	});

	// 2. add event listeners to checkboxes
	document.querySelector(DOMstrings.reasons_for_selection).addEventListener('click', checkFormFull);
	
	// 3. add event listeners to textareas
	document.getElementById(DOMstrings.textarea_1).addEventListener('keyup', checkFormFull);
	document.getElementById(DOMstrings.textarea_2).addEventListener('keyup', checkFormFull);
}


// Function to process input areas after they are displayed
function processForm() {

	// 1. implement rating system
	addRatingListener();
	// 2. add event listeners to check form is full or not
	addEventListenersToForm();
}


// Funtion to dynamically generate input area
function displayForm(type, typeID) {

	// 1. html to be inserted after mascot image is clicked
	html = `<div class="rating-selection">
				<div class="star-rating">
					<h2>Overall Rating for Facilities <span>(1-lowest, 5-highest)</span></h2>
					<span id="1" class="fa fa-star"></span>
					<span id="2" class="fa fa-star"></span>
					<span id="3" class="fa fa-star"></span>
					<span id="4" class="fa fa-star"></span>
					<span id="5" class="fa fa-star"></span>
					<span id="rating-remark"></span>
				</div>

				<div class="reasons-for-selection">
					<h2>Share your reasons for selecting <span id="choosen-mascot">${type}</span></h2>
					
					<label>
						<input id="checkbox-1" type="checkbox" name="reason">
						Lorem ipsum dolor sit amet
					</label>

					<label>
						<input id="checkbox-2" type="checkbox" name="reason">
						Lorem ipsum dolor sit amet
					</label>

					<label>
						<input id="checkbox-3" type="checkbox" name="reason">
						Lorem ipsum dolor sit amet
					</label>

					<label>
						<input id="checkbox-4" type="checkbox" name="reason">
						Lorem ipsum dolor sit amet
					</label>
				</div>
			</div>
			

			<div class="more-reasons-for-selection">
				<h2>Any more reasons?</h2>
				<textarea id="textarea-1" placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." rows="6"></textarea>
			</div>

			<div class="suggestions">
				<h2>Suggestions</h2>
				<textarea id="textarea-2" rows="6"></textarea>
			</div>`;

	// 2. Clear all the content previously present
	document.querySelector(DOMstrings.invisible_content).innerHTML = '';
	// 3. Move content up to make space to display input boxes
	document.querySelector(DOMstrings.choose_mascot).style.marginTop = '10px';

	// 4. Make every mascot image blur
	makeAllBlur();
	// 5. Make mascot image which is selected non-blur
	document.getElementById(typeID).style.opacity = '1';
	// 6. insert above html before div ends
	document.querySelector(DOMstrings.invisible_content).insertAdjacentHTML('beforeend', html);
	// 7. display go to next department button
	document.querySelector(DOMstrings.department_button).style.display = 'block';
	// 8. Disable previously enabled button
	disableDeptButton();
	// 9. start processing form after displaying it
	processForm();
}


// Function to add event listeners to all mascot images
function addEventListeners() {
	document.querySelector(DOMstrings.oyster).addEventListener('click', function(event) {
		displayForm('World is my Oyster', DOMstrings.oyster_div);
	});

	document.querySelector(DOMstrings.cat).addEventListener('click', function(event) {
		displayForm('Cat\'s Meow', DOMstrings.cat_div);
	});

	document.querySelector(DOMstrings.whale).addEventListener('click', function(event) {
		displayForm('Whale of a time', DOMstrings.whale_div);
	});

	document.querySelector(DOMstrings.elephant).addEventListener('click', function(event) {
		displayForm('Elephant in the room', DOMstrings.elephant_div);
	});

	document.querySelector(DOMstrings.fish).addEventListener('click', function(event) {
		displayForm('Dead Fish', DOMstrings.fish_div);
	});

	document.querySelector(DOMstrings.goose).addEventListener('click', function(event) {
		displayForm('Wild Goose Chase', DOMstrings.goose_div);
	});
}


// call function to add event listeners to mascot images
addEventListeners();