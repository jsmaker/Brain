var initBrain = function(){
	window.__Brain__ = window.__Brain__ || {};
}
var initBrain = "(" + initBrain.toString() + ")()";


var page_getProperties = function () {
	window.__Brain__ = window.__Brain__ || {};
	window.__Brain__.Map = window.__Brain__.Map || Object.create(null);
	var props = Object.create(null);

	function setData(getter, attr, selector, prop) {
		try {
			if (Array.isArray(getter)) {
				return
			}
			if (typeof getter === 'object') {

				var val = eval('$0.' + prop);
				if (getter.adapt) {
					val = (new Function('$', 'return ' + getter.adapt))(val);
				}
				if (getter.display_only_if) {
					if ((new Function('$', 'return ' + getter.display_only_if))(val)) {
						if (getter.as_abs) {
							props[getter.as_abs] = val;
						} else {
							props[attr + '.' + selector + '.' + getter.as] = val;
						}
					}
				} else {
					if (getter.as_abs) {
						props[getter.as_abs] = val;
					} else {
						props[attr + '.' + selector + '.' + getter.as] = val;
					}
				}
				return;
			}
			if (getter === true) {
				props[attr + '.' + selector + '.' + prop] = eval('$0.' + prop);
			}
		} catch (e) {
			props.$_ = props.$_ || {};
			props.$_[attr + '.' + selector + '.' + prop] = e;
		}

	}

	for (var attr in window.__Brain__.Map) {
		var attr_val = eval('$0.' + attr) || $0.getAttribute(attr);
		if (!attr_val) { continue;}
		props[attr] = attr_val;
		var attr_map = window.__Brain__.Map[attr];
		for (var selector in attr_map) {
			var m_reg = new RegExp(selector, 'mi');
			if (!m_reg.test(attr_val)) {
				continue;
			}
			var getters = attr_map[selector];
			for (var getterKey in getters) {
				setData(getters[getterKey], attr, selector, getterKey);
			}
		}
	}

	return props;
};
var page_getObject = function () {
	var cleanProto = function (subject) {
		subject.__proto__ = null;
		for (var k in subject) {
			if (typeof subject[k] === 'object') {
				cleanProto(subject[k]);
			}
		}
		return subject;
	}
	try {
		return cleanProto(window.__Brain__.Map);
	} catch (e) {}
}

var getdata = "(" + page_getProperties.toString() + ")()";
var getAttributeMapper = "(" + page_getObject.toString() + ")()";

chrome.devtools.panels.elements.createSidebarPane("Brain", function (sidebar) {
	sidebar.setExpression(initBrain);
	sidebar.setExpression(getAttributeMapper);
	chrome.devtools.panels.elements.onSelectionChanged.addListener(sidebar.setExpression.bind(sidebar, getAttributeMapper));
});

chrome.devtools.panels.elements.createSidebarPane("Knoledge", function (sidebar) {
	chrome.devtools.panels.elements.onSelectionChanged.addListener(sidebar.setExpression.bind(sidebar, getdata));
});
