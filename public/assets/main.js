
function launch(el) {
	var key = el.closest("fieldset").querySelector("input[type='text']").value;
	new Promise(function(resolve,reject) {
		if (el.closest("fieldset").querySelector("input[type='checkbox']").checked) {
			localforage.setItem("licencekey", key).then(function() { resolve(); });
		} else {
			localforage.removeItem("licencekey");
			resolve();
		}
	}).then(function() {
		gtag&&gtag('event', 'login', {
			'event_category': 'engagement',
			'event_label': 'app opened'
		});
		location.href='/app/?hash='+key;
	});
}

function checkKey() {
	localforage.getItem("licencekey").then(function(value) {
		writeKey(value, false, true);
	});
}

function writeKey(value, save, verify) {
	[].forEach.call(document.querySelectorAll('input[name="licencekey"]'),function(el) {
		el.value = value || '';
	});
	if (save) localforage.setItem("licencekey", value); // set via fs store callback
	if (verify && value) { // set when loading from localstorage
		fetch("https://www.coursesuite.ninja/api/validatelicence/" + value, {method:'GET',headers:{'content-type':'application/json','X-Requested-With':'XMLHttpRequest'},cache:'no-cache',credentials:'omit'})
			.then(function(response) {
				return response.json()
			})
			.then(function(obj) {
				switch (obj.status) {
				case "missing": warn("Not found"); break;
				case "expired": warn("Expired"); break;
				}
			});
	}
}

function warn(value) {
	[].forEach.call(document.querySelectorAll('input[name="licencekey"]'),function(el) {
		el.classList.add("uk-form-danger");
		var button = el.closest("fieldset").querySelector("button");
		button.classList.add("uk-button-danger");
		button.textContent = value;
	});
}

function readify() {
	[].forEach.call(document.querySelectorAll('input[name="licencekey"]'),function(el) {
		el.classList.remove("uk-form-danger");
		var button = el.closest("fieldset").querySelector("button");
		button.classList.remove("uk-button-danger");
		button.textContent = "Go";
	});
}

document.addEventListener('DOMContentLoaded', function () {
	checkKey();
	[].forEach.call(document.querySelectorAll('.my-launch'), function (node) {
		node.addEventListener('click', function (event) {
			var label = event.target.getAttribute('aria-expanded') === 'true' ? 'opened' : 'closed';
			gtag&&gtag('event', 'view_item', {
				'event_category': 'engagement',
				'event_label': 'launch app button ' + label
			});
		});
	});
	[].forEach.call(document.querySelectorAll('.my-pricing'), function (node) {
		node.addEventListener('click', function (event) {
			var label = event.target.getAttribute('aria-expanded') === 'true' ? 'opened' : 'closed';
			gtag&&gtag('event', 'view_item', {
				'event_category': 'engagement',
				'event_label': 'pricing button ' + label
			});
		});
	});
	[].forEach.call(document.querySelectorAll('[data-fsc-action="Reset,Add,Checkout"]'), function (node) {
		// binding click to the eventlistener won't fire; seems to be overriden by fastspring
		node.setAttribute('onclick','recordEvent(this.textContent)');
	});
});

function recordEvent(label) {
	gtag&&gtag('event', 'add_to_cart', {
		'event_category': 'ecommerce',
		'event_label': label
	});
}

window.fsSaveKey = function (v) {
	// console.log("fsSaveKey",event);
	fsWebhookReceived(event.data);
};

function fsWebhookReceived(data) {
	// console.log("fsWebhookReceived",data);
	if (data && data.items) {
		writeKey(data.items[0].fulfillments[Object.keys(data.items[0].fulfillments)[0]][0].license);
	}
}

// fs script loader has a callback after it loads. use it to modify pricing for local currencies.
function fsCallbackFunction(data) {
	var fn = function() {
			if (data && data.groups && data.groups.length) {
				var Products = data.groups[0].items;
				[].forEach.call(document.querySelectorAll("[data-fsc-item-pricetotal-callback]"), function (node) {
					var dObj = Products.find(function(o) {
						return (o && o.path && o.path === node.dataset.fscItemPath)
					});
					var format = node.dataset.format ? node.dataset.format : " - %price %currency";
					var price = dObj.unitPrice.replace(".00","");
					var text = format.replace("%price", price).replace("%currency", data.currency);
					node.innerHTML = text;
				});
			}
		},
		t = function () {
			if (document.readyState==='complete') {
				fn();
			} else {
				setTimeout(t,100);
			}
		};
	t();
}
