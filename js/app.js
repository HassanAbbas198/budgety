import {
	addItem,
	calculateBudget,
	calculatePercentages,
	deleteItem,
	getBudget,
	getPercentages,
} from './controllers/budgetController.js';

import {
	DOMstrings,
	addListItem,
	changedType,
	clearFields,
	deleteListItem,
	displayBudget,
	displayMonth,
	displayPercentages,
	getInput,
} from './controllers/UIController.js';

const setupEventListeners = () => {
	const DOM = DOMstrings;

	document.querySelector(DOM.inputBtn).addEventListener('click', () => {
		ctrlAddItem();
	});

	document.addEventListener('keypress', (event) => {
		if (event.keyCode === 13 || event.which === 13) {
			ctrlAddItem();
		}
	});

	document.querySelector(DOM.container).addEventListener('click', (event) => {
		ctrlDeleteItem(event);
	});

	document.querySelector(DOM.inputType).addEventListener('change', () => {
		changedType();
	});
};

const updateBudget = () => {
	calculateBudget();
	const budget = getBudget();
	displayBudget(budget);
};

const updatePercentages = () => {
	calculatePercentages();
	const percentages = getPercentages();
	displayPercentages(percentages);
};

const ctrlAddItem = () => {
	const input = getInput();

	if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
		const newItem = addItem(input.type, input.description, input.value);
		addListItem(newItem, input.type);
		clearFields();
		updateBudget();
		updatePercentages();
	}
};

const ctrlDeleteItem = (event) => {
	const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

	if (itemID) {
		const splitID = itemID.split('-');
		const type = splitID[0];
		const ID = parseInt(splitID[1]);

		deleteItem(type, ID);
		deleteListItem(itemID);
		updateBudget();
		updatePercentages();
	}
};

displayMonth();
displayBudget({
	budget: 0,
	totalInc: 0,
	totalExp: 0,
	percentage: -1,
});
setupEventListeners();
