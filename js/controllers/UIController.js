export const DOMstrings = {
	inputType: '.add__type',
	inputDescription: '.add__description',
	inputValue: '.add__value',
	inputBtn: '.add__btn',
	incomeContainer: '.income__list',
	expensesContainer: '.expenses__list',
	budgetLabel: '.budget__value',
	incomeLabel: '.budget__income--value',
	expensesLabel: '.budget__expenses--value',
	percentageLabel: '.budget__expenses--percentage',
	container: '.container',
	expensesPercLabel: '.item__percentage',
	dateLabel: '.budget__title--month',
};

const formatNumber = (num, type) => {
	let res;

	num = Math.abs(num);
	num = num.toFixed(2);

	const numSplit = num.split('.');

	let int = numSplit[0];

	if (int.length > 3) {
		int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
	}

	const dec = numSplit[1];

	if (type === 'exp') {
		res = `- ${int}. ${dec}`;
	} else {
		res = `+ ${int}. ${dec}`;
	}
	return res;
};

const nodeListForEach = (list, callback) => {
	for (let i = 0; i < list.length; i++) {
		callback(list[i], i);
	}
};

export const getInput = () => {
	return {
		type: document.querySelector(DOMstrings.inputType).value,
		description: document.querySelector(DOMstrings.inputDescription).value,
		value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
	};
};

export const addListItem = (obj, type) => {
	let html, element;

	if (type === 'inc') {
		element = DOMstrings.incomeContainer;

		html = `<div class="item clearfix" id="inc-${
			obj.id
		}"> <div class="item__description">${
			obj.description
		}</div><div class="right clearfix"><div class="item__value">${formatNumber(
			obj.value,
			type
		)}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
	} else if (type === 'exp') {
		element = DOMstrings.expensesContainer;

		html = `<div class="item clearfix" id="exp-${
			obj.id
		}"><div class="item__description">${
			obj.description
		}</div><div class="right clearfix"><div class="item__value">${formatNumber(
			obj.value,
			type
		)}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
	}

	document.querySelector(element).insertAdjacentHTML('beforeend', html);
};

export const deleteListItem = (selectorID) => {
	const el = document.getElementById(selectorID);
	el.parentNode.removeChild(el);
};

export const clearFields = () => {
	const fields = document.querySelectorAll(
		DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
	);

	// trick to convert a list to an array
	const fieldsArr = Array.prototype.slice.call(fields);

	fieldsArr.forEach(function (current, index, array) {
		current.value = '';
	});

	fieldsArr[0].focus();
};

export const displayBudget = (obj) => {
	let type;

	obj.budget > 0 ? (type = 'inc') : (type = 'exp');

	document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
		obj.budget,
		type
	);
	document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
		obj.totalInc,
		'inc'
	);
	document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(
		obj.totalExp,
		'exp'
	);

	if (obj.percentage > 0) {
		document.querySelector(DOMstrings.percentageLabel).textContent =
			obj.percentage + '%';
	} else {
		document.querySelector(DOMstrings.percentageLabel).textContent = '---';
	}
};

export const displayPercentages = (percentages) => {
	const fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

	nodeListForEach(fields, (current, index) => {
		if (percentages[index] > 0) {
			current.textContent = percentages[index] + '%';
		} else {
			current.textContent = '---';
		}
	});
};

export const displayMonth = () => {
	const now = new Date();

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const month = now.getMonth();

	const year = now.getFullYear();
	document.querySelector(DOMstrings.dateLabel).textContent =
		months[month] + ' ' + year;
};

export const changedType = () => {
	const fields = document.querySelectorAll(
		`${DOMstrings.inputType},${DOMstrings.inputDescription},${DOMstrings.inputValue}`
	);

	nodeListForEach(fields, (cur) => {
		cur.classList.toggle('red-focus');
	});

	document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
};
