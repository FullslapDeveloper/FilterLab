(function(window, document, undefined) {
	var FILTERS = {},
	currentFilter = '',
	imagePreviewer = document.getElementById('imagePreviewer'),
	cssOutput = document.getElementById('cssOutput');

function applyFilters() {
	var filterList = [],
		filterString;
	for (var key in FILTERS) {
		if (FILTERS.hasOwnProperty(key)) {
			filterList.push(key + '(' + FILTERS[key] + ')');
		}
	}

	currentFilter = filterList.join(' ');
	imagePreviewer.style.filter = currentFilter;
	renderCSSOutput(filterList);
}

function renderCSSOutput(filterList) {
	cssOutput.innerText = '.filter {\n  filter: ' + (filterList.length ? filterList.join('\n\t  ') : 'none') + ';\n}';
}

function startApp() {
	var controlsContainer = document.getElementById('slidersControl');

	controlsContainer.addEventListener('input', function(evt) {
		var functionName = evt.target.dataset.functioname,
			params = evt.target.dataset.param,
			currentInputValue = evt.target.valueAsNumber,
			functionParam = params.replace(/(%s)/g, currentInputValue);

		if (currentInputValue > 0) {
			FILTERS[functionName] = functionParam;
		} else {
			delete FILTERS[functionName];
		}
		applyFilters();

	});

	var saveBtn = document.getElementById('saveBtn');

	saveBtn.addEventListener('click', function() {
		var canvas = document.createElement('canvas');

        canvas.width = imagePreviewer.width;
        canvas.height = imagePreviewer.height;

        var canvasContext = canvas.getContext('2d');
		canvasContext.drawImage(imagePreviewer, 0, 0, canvas.width, canvas.height);
		canvasContext.filter = currentFilter;

		var imageBase64 = canvas.toDataURL('image/png');
		var w = window.open("");
        w.document.body.appendChild(w.document.createElement('iframe'))
            .src = imageBase64

	});

	applyFilters();
}


startApp();


}(window, document));
