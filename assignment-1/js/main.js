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
	next_page: 'next-page'
};


function makeAllBlur() {
	document.getElementById(DOMstrings.oyster_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.cat_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.whale_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.elephant_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.fish_div).style.opacity = '0.2';
	document.getElementById(DOMstrings.goose_div).style.opacity = '0.2';
}


function showRating(starID) {
	var id = parseInt(starID, 10);
	
	for(var i=1; i<=id; i+=1) {
		var element = document.getElementById(i.toString());
		if(!element.classList.contains('star-checked')) {
			element.classList.add('star-checked');
		}
	}

	for(var i=id+1; i<=5; i++) {
		element = document.getElementById(i.toString());
		element.classList.remove('star-checked');
	}
}


function addRatingListener() {
	var stars = document.querySelectorAll(DOMstrings.fa_star);

	stars.forEach(function (star) {
		star.addEventListener('click', function() {
			showRating(star.id);
		});
	});
}


function isEmpty(str) {
	for(var i=0; i<str.length; i++) {
		if(str[i]!==' ') {
			return true;
		}
	}

	return false;
}


function enableDeptButton() {
	var button = document.getElementById(DOMstrings.dept_button);
	button.style.backgroundColor = 'rgb(29, 153, 119)';

	var link = document.getElementById(DOMstrings.next_page);
	link.href = 'index.html';
}


function disableDeptButton() {
	var button = document.getElementById(DOMstrings.dept_button);
	button.style.backgroundColor = 'gray';

	var link = document.getElementById(DOMstrings.next_page);
	link.href = '#';
}


function checkFormFull(event) {
	var starsComplete = document.getElementById(DOMstrings.star_1).classList.contains('star-checked');
	
	var checkbox_1 = document.getElementById(DOMstrings.checkbox_1).checked;
	var checkbox_2 = document.getElementById(DOMstrings.checkbox_2).checked;
	var checkbox_3 = document.getElementById(DOMstrings.checkbox_3).checked;
	var checkbox_4 = document.getElementById(DOMstrings.checkbox_4).checked;

	var textarea_1 = document.getElementById(DOMstrings.textarea_1).value;
	var textarea_2 = document.getElementById(DOMstrings.textarea_2).value;
	var textareaOneFilled = isEmpty(textarea_1);
	var textareaTwoFilled = isEmpty(textarea_2);
	
	if(starsComplete && (checkbox_1 || checkbox_2 || checkbox_3 || checkbox_4) && textareaOneFilled && textareaTwoFilled) {
		enableDeptButton();
	}
	else {
		disableDeptButton();
	}
}


function addEventListenersToForm() {
	var stars = document.querySelectorAll(DOMstrings.fa_star);

	stars.forEach(function (star) {
		star.addEventListener('click', checkFormFull);
	});

	document.querySelector(DOMstrings.reasons_for_selection).addEventListener('click', checkFormFull);
	document.getElementById(DOMstrings.textarea_1).addEventListener('keyup', checkFormFull);
	document.getElementById(DOMstrings.textarea_2).addEventListener('keyup', checkFormFull);
}


function processForm() {
	addRatingListener();
	addEventListenersToForm();
}


function displayForm(type, typeID) {
	html = `<div class="rating-selection">
				<div class="star-rating">
					<h2>Overall Rating for Facilities <span>(1-lowest, 5-highest)</span></h2>
					<span id="1" class="fa fa-star"></span>
					<span id="2" class="fa fa-star"></span>
					<span id="3" class="fa fa-star"></span>
					<span id="4" class="fa fa-star"></span>
					<span id="5" class="fa fa-star"></span>
				</div>

				<div class="reasons-for-selection">
					<h2>Share your reasons for selecting <span>${type}</span></h2>
					
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

	document.querySelector(DOMstrings.invisible_content).innerHTML = '';
	document.querySelector(DOMstrings.choose_mascot).style.marginTop = '10px';

	makeAllBlur();
	document.getElementById(typeID).style.opacity = '1';
	document.querySelector(DOMstrings.invisible_content).insertAdjacentHTML('beforeend', html);
	document.querySelector(DOMstrings.department_button).style.display = 'block';

	processForm();
}


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


addEventListeners();