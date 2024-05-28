let originalData = [];
const TABLE_ID = "list";
const FIND_BUTTON = document.getElementById("findBtn");
const RESET_BUTTON = document.getElementById("resetBtn");
const FILTER_FORM = document.getElementById("filterForm");
const firstSelect = document.getElementById("first");
const secondSelect = document.getElementById("second");
const thirdSelect = document.getElementById("third");
const sortForm = document.getElementById("sort");

const correspond = {
	"Год": ["yearFrom", "yearTo"],
	"Нефтяной регион": "city",
	"Доходность (млн руб)": ["incomeFrom", "incomeTo"],
	"Объем добычи (тысяч тонн)": ["productionFrom", "productionTo"],
	"Затраты на исследования (млн руб)": ["researchFrom", "researchTo"],
	"Затраты на экобез (млн руб)": ["ecologyFrom", "ecologyTo"],
	"Уровень занятости (человек)": ["employmentFrom", "employmentTo"],
	"Инвестиции и финансирование (млн руб)": ["investmentFrom", "investmentTo"],
	"Стоимость 1 акции (руб)": ["priceFrom", "priceTo"],
	"Дивиденды на акцию (%)": ["dividendFrom", "dividendTo"],
	"Общая сумма выплат акционерам (млн руб)": ["payoutFrom", "payoutTo"]
};

const sortingOptions = [
	"Год",
	"Нефтяной регион",
	"Доходность (млн руб)",
	"Объем добычи (тысяч тонн)",
	"Затраты на исследования (млн руб)",
	"Затраты на экобез (млн руб)",
	"Уровень занятости (человек)",
	"Инвестиции и финансирование (млн руб)",
	"Стоимость 1 акции (руб)",
	"Дивиденды на акцию (%)",
	"Общая сумма выплат акционерам (млн руб)"
];

document.addEventListener("DOMContentLoaded", function() {
	let firstElement = data[0];
	originalData = data;
	createTable(data, TABLE_ID);
	setSortSelects(firstElement, sortForm);

	firstSelect.addEventListener("change", () => {
		updateSecondSelect(firstSelect, secondSelect);
		updateThirdSelect(firstSelect, secondSelect, thirdSelect);
	});

	secondSelect.addEventListener("change", () => {
		updateThirdSelect(firstSelect, secondSelect, thirdSelect);
	});
})

document.getElementById("resetsort").addEventListener("click", function() {
	const sortedData = originalData.sort((a, b) => a["Год"] - b["Год"]); 
  	createTable(sortedData, TABLE_ID);

	firstSelect.selectedIndex = 0;
	secondSelect.selectedIndex = 0;
	thirdSelect.selectedIndex = 0;

	updateSecondSelect(firstSelect, secondSelect);
	updateThirdSelect(firstSelect, secondSelect, thirdSelect);
});

document.getElementById("sortbutton").addEventListener("click", function() {
	sortTable(originalData, document.getElementById("sort")); 
});

FIND_BUTTON.addEventListener("click", function() {
	filterTable(data, TABLE_ID, FILTER_FORM);
});

RESET_BUTTON.addEventListener("click", function() {
	originalData = data;
	clearFilter(TABLE_ID, FILTER_FORM);
});

let createTable = (data, idTable) => {
	let table = document.getElementById(idTable);
	if (table) {
		while (table.rows.length > 1) {
			table.deleteRow(1);
		}
	}
	if (table.rows.length === 0) {
		let tr = document.createElement('tr');
		for (let key in data[0]) {
			let th = document.createElement('th');
			th.innerHTML = key;
			tr.appendChild(th);
		}
		table.appendChild(tr);
	}

	data.forEach((item) => {
		let tr = document.createElement('tr');
		for (let key in item) {
			let td = document.createElement('td');
			td.innerHTML = item[key];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	});
}

let dataFilter = (dataForm) => {
	let dictFilter = {};
	for (let j = 0; j < dataForm.elements.length; j++) {
		let item = dataForm.elements[j];
		let valInput = item.value;
		if (item.type == "text") {
			valInput = valInput.toLowerCase();
		}
		if (item.type == "number") {
			if (valInput !== "") {
				valInput = parseFloat(valInput);
			}
			else if (item.id.includes("From")) {
				valInput = -Infinity;
			}
			else if (item.id.includes("To")) {
				valInput = Infinity;
			}
		}
		dictFilter[item.id] = valInput;
	}
	return dictFilter;
};

let filterTable = (data, idTable, dataForm) => {

	let dataF = dataFilter(dataForm);
	let correspondences = {};
	for (let key in correspond) {
		let filterKeys = correspond[key];
		if (Array.isArray(filterKeys)) {
			let fromKey = filterKeys[0];
			let toKey = filterKeys[1];
			if (fromKey in dataF && toKey in dataF) {
				correspondences[key] = {
					from: dataF[fromKey],
					to: dataF[toKey]
				};
			}
		} else {
			if (filterKeys in dataF) {
				correspondences[key] = dataF[filterKeys];
			}
		}
	}

	let tableFilter = data.filter(item => {
		let result = true;

		for (let key in correspondences) {
			let val = item[key];
			let filterVal = correspondences[key];

			if (typeof val === 'string') {
				val = val.toLowerCase();
				result &&= val.includes(filterVal.toLowerCase()); 
			} else if (typeof val === 'number') {
				if (typeof filterVal === 'object') {
					result &&= val >= filterVal.from && val <= filterVal.to;
				} else {
					result &&= val === filterVal;
				}
			}
		}

		return result;
	});
	originalData = tableFilter;
	createTable(tableFilter, idTable);
};

let clearFilter = (idTable, dataForm) => {
	let table = document.getElementById(idTable);
	table.innerHTML = '';
	createTable(data, TABLE_ID);
	dataForm.reset();
}

let createOption = (str, val) => {
	let item = document.createElement('option');
	item.text = str;
	item.value = val;
	return item;
};

let setSortSelect = (head, sortSelect) => {
	sortSelect.append(createOption('Нет', 0));
	for (let i in head) {
		if (!head[i].id){
			sortSelect.append(createOption(head[i], Number(i) + 1));
		}
	}
};

let setSortSelects = (data, dataForm) => {
	let head = Object.keys(data);
	let allSelect = dataForm.getElementsByTagName('select');

	for (let j = 0; j < allSelect.length; j++) {
		setSortSelect(head, allSelect[j]);
		if (j !== 0) {
			allSelect[j].disabled = true;
		}
	}
	document.getElementById("seconddesc").disabled = true;
	document.getElementById("thirddesk").disabled = true;
};

function updateSelect(selectElement, options, selectedTexts) {
  const selectOptions = selectElement.querySelectorAll("option");
  selectOptions.forEach(option => option.remove());
  selectElement.append(createOption("Нет", 0));

  for (let i in options) {
    if (!selectedTexts.includes(options[i])) {
      selectElement.append(createOption(options[i], Number(i) + 1));
    }
  }
}

function updateSecondSelect(firstSelect, secondSelect) {
	const selectedText = firstSelect.options[firstSelect.selectedIndex].text;
  updateSelect(secondSelect, sortingOptions, [selectedText]);
	secondSelect.disabled = firstSelect.value === "0";
	secondSelect.value = "0";
	document.getElementById("seconddesc").disabled = secondSelect.disabled;
}

function updateThirdSelect(firstSelect, secondSelect, thirdSelect) {
	const selectedTexts = [
    	firstSelect.options[firstSelect.selectedIndex].text,
    	secondSelect.options[secondSelect.selectedIndex].text
  	];
    updateSelect(thirdSelect, sortingOptions, selectedTexts);
	thirdSelect.disabled = [firstSelect.value, secondSelect.value].includes("0");
	thirdSelect.value = "0";
	document.getElementById("thirddesk").disabled = thirdSelect.disabled;
}

function sortTable(data, sortForm) {
	const firstOption = firstSelect.options[firstSelect.selectedIndex].text;
	const secondOption = secondSelect.options[secondSelect.selectedIndex].text;
	const thirdOption = thirdSelect.options[thirdSelect.selectedIndex].text;
	const firstDesc = document.getElementById("firstdesc").checked;
	const secondDesc = document.getElementById("seconddesc").checked;
	const thirdDesc = document.getElementById("thirddesk").checked;

	const compareFunctions = [];

	if (firstOption !== "Нет") {
		compareFunctions.push((a, b) => compareValues(a[firstOption], b[firstOption], firstDesc));
	}

	if (secondOption !== "Нет") {
		compareFunctions.push((a, b) => compareValues(a[secondOption], b[secondOption], secondDesc));
	}

	if (thirdOption !== "Нет") {
		compareFunctions.push((a, b) => compareValues(a[thirdOption], b[thirdOption], thirdDesc));
	}

	const sortedData = data.sort((a, b) => {
		for (const compareFunction of compareFunctions) {
			const result = compareFunction(a, b);
			if (result !== 0) return result; 
		}
		return 0; 
	});
	createTable(sortedData, TABLE_ID);
}

function compareValues(a, b, desc) {
    return a < b ? (desc ? 1 : -1) : (a > b ? (desc ? -1 : 1) : 0);
}