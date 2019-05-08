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
	id = parseInt(starID, 10);
	
	for(var i=1; i<=id; i+=1) {
		element = document.getElementById(i.toString());
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
	stars = document.querySelectorAll(DOMstrings.fa_star);

	stars.forEach(function (star) {
		star.addEventListener('click', function() {
			showRating(star.id);
		});
	});
}


function processForm() {
	addRatingListener();
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
						<input type="checkbox" name="reason">
						Lorem ipsum dolor sit amet
					</label>

					<label>
						<input type="checkbox" name="reason">
						Lorem ipsum dolor sit amet
					</label>

					<label>
						<input type="checkbox" name="reason">
						Lorem ipsum dolor sit amet
					</label>

					<label>
						<input type="checkbox" name="reason">
						Lorem ipsum dolor sit amet
					</label>
				</div>
			</div>
			

			<div class="more-reasons-for-selection">
				<h2>Any more reasons?</h2>
				<textarea placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." rows="6">
				</textarea>
			</div>

			<div class="suggestions">
				<h2>Suggestions</h2>
				<textarea rows="6">
					
				</textarea>
			</div>`;

	document.querySelector(DOMstrings.invisible_content).innerHTML = '';
	document.querySelector(DOMstrings.choose_mascot).style.marginTop = '10px';

	makeAllBlur();
	document.getElementById(typeID).style.opacity = '1';
	document.querySelector(DOMstrings.invisible_content).insertAdjacentHTML('beforeend', html);
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