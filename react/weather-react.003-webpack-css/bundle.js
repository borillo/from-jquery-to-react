/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var styles = __webpack_require__(1);

	var g, GLoc = {
	   settings: {
	      geoButton: $('#geo-button'),
	      startPos: '',
	      searchQuery: ''
	   },

	   init: function () {
	      g = this.settings;
	      this.bindUIActions();
	   },

	   bindUIActions: function () {
	      g.geoButton.on('click', function () {
	         GLoc.getGeoLocation();
	      });
	   },

	   getGeoLocation: function (numToGet) {
	      navigator.geolocation.getCurrentPosition(GLoc.geoSuccess);
	   },

	   geoSuccess: function (position) {
	      // Do magic with the location
	      g.startPos = position;
	      g.searchQuery = 'http://api.openweathermap.org/data/2.5/weather?lat=' + g.startPos.coords.latitude + '&lon=' + g.startPos.coords.longitude + '&appid=0596fe0573fa9daa94c2912e5e383ed3' + '';

	      $.getJSON(g.searchQuery, function (data) {
	         WeatherInfo.setWeatherData(data);
	      });
	   }
	};

	var w, WeatherInfo = {
	   settings: {
	      tempIcon: $('#temp-icon'),
	      weather: $('#weather'),
	      weatherInfo: $('#weather-info'),
	      location: $('#location'),
	      weatherDescription: $('#weather-description'),
	      temperature: $('#temperature'),
	      tempNumber: '',
	      fahrenheit: $('#fahrenheit'),
	      celsius: $('#celsius'),
	      wind: $('#wind'),
	      searchLocationInput: $('#search-location-input'),
	      searchLocationButton: $('#search-location-button'),
	      celsiusButton: $('#celsius'),
	      fahrenheitButton: $('#fahrenheit'),
	      humidity: $('#humidity'),
	      speedUnit: $('#speed-unit'),
	      windSpeed: '',
	      windDirection: $('#wind-direction'),
	      windDegree: '',
	      dayOrNight: '',
	      closeAttribution: $('#close-attribution'),
	      openAttribution: $('#noun-project'),
	      attributionModal: $('#attribution-links')
	   },

	   init: function () {
	      w = this.settings;
	      this.bindUIActions();
	      w.searchLocationInput.keypress(function (e) {
	         if (e.keyCode === 13) {
	            w.searchLocationButton.click();
	         }
	      });
	   },

	   bindUIActions: function () {
	      w.searchLocationButton.on('click', function () {
	         WeatherInfo.getWeatherData();
	      });

	      w.closeAttribution.on('click', function () {
	         WeatherInfo.closeAttributionModal();
	      });

	      w.openAttribution.on('click', function () {
	         WeatherInfo.openAttributionModal();
	      });
	   },

	   closeAttributionModal: function () {
	      w.attributionModal.addClass('hide');
	   },


	   openAttributionModal: function () {
	      w.attributionModal.removeClass('hide');
	   },

	   getWeatherData: function (searchQuery) {
	      if (w.searchLocationInput.val() !== '') {
	         w.searchQuery = 'http://api.openweathermap.org/data/2.5/weather?q=' + w.searchLocationInput.val() + '&appid=0596fe0573fa9daa94c2912e5e383ed3' + '';
	         $.getJSON(w.searchQuery, function (data) {
	            WeatherInfo.setWeatherData(data);
	         });
	      }
	   },

	   setWeatherData: function (data) {
	      if (!data.sys) {
	         alert('Country error!!');
	         return;
	      }

	      $('#front-page-description').addClass('hide');
	      w.weather.removeClass('hide');
	      w.location.text(data.name + ', ' + data.sys.country);
	      w.humidity.text(data.main.humidity);
	      w.weatherDescription.text(data.weather[0].description);
	      w.tempNumber = data.main.temp;
	      w.windSpeed = data.wind.speed;
	      w.windDegree = data.wind.deg;
	      WeatherInfo.getWeatherDirection();
	      WeatherInfo.changeTempUnit();
	   },

	   getWeatherDirection: function () {
	      if (w.windDegree > 337.5 || w.windDegree <= 22.5) {
	         w.windDirection.text('N');
	      } else if (22.5 < w.windDegree <= 67.5) {
	         w.windDirection.text('NE');
	      } else if (67.5 < w.windDegree <= 112.5) {
	         w.windDirection.text('E');
	      } else if (112.5 < w.windDegree <= 157.5) {
	         w.windDirection.text('SE');
	      } else if (157.5 < w.windDegree <= 202.5) {
	         w.windDirection.text('S');
	      } else if (202.5 < w.windDegree <= 247.5) {
	         w.windDirection.text('SW');
	      } else if (247.5 < w.windDegree <= 292.5) {
	         w.windDirection.text('W');
	      } else if (292.5 < w.windDegree <= 337.5) {
	         w.windDirection.text('NW');
	      }

	   },

	   isValid: function (weatherDataPiece) {
	      if (typeof weatherDataPiece !== undefined) {
	         return weatherDataPiece + ' ';
	      } else {
	         return '';
	      }
	   },

	   changeTempUnit: function (unit) {
	      var newTemp = w.tempNumber - 273.15;

	      w.celsius.addClass('checked');
	      w.fahrenheit.removeClass('checked');
	      w.temperature.addClass('celsius-degree');
	      w.temperature.removeClass('fahrenheit-degree');
	      w.temperature.html(Math.round(newTemp));
	      WeatherInfo.changeSpeedUnit('km');
	   },

	   changeSpeedUnit: function () {
	      w.wind.text('' + Math.round(w.windSpeed * 3.6));
	      w.speedUnit.text('km/h');
	   }
	};

	$(function () {
	   GLoc.init();
	   WeatherInfo.init();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./weather.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./weather.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "*, *:before, *:after {\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.hide {\n    display: none;\n}\n\n.geo-error-message, .attribution-links {\n    max-width: 400px;\n    -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);\n    -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);\n    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);\n    background: #fff;\n    padding: 25px;\n    margin: 6rem auto;\n    position: relative;\n    z-index: 10;\n}\n\n.close-error, .close-attribution {\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-radius: 0;\n    border: 1px solid #ccc;\n    background-color: #fff;\n}\n\n.search-bar {\n    background: #fff;\n    height: 129px;\n    color: #555;\n    padding-top: 5px;\n}\n\n.search-location-text {\n    font-size: 16px;\n    font-weight: 300;\n}\n\n.search-text {\n    text-align: center;\n    margin-bottom: 10px;\n}\n\n.search-button {\n    border: none;\n    width: 50%;\n    background-color: #ddd;\n    color: #555;\n    height: 50px;\n    font-size: 16px;\n    display: inline-block;\n}\n\n.search-location-button {\n    border-right: 1px solid #fff;\n}\n\n.geo-button {\n    border-left: 1px solid #fff;\n}\n\n.search-location-input {\n    color: #000;\n    padding: 7px;\n}\n\n@media all and (min-width: 401px) {\n    .search-bar {\n        height: 107px;\n    }\n\n}\n\n@media all and (min-width: 505px) {\n\n    .search-bar {\n        padding-top: 0;\n        height: 50px;\n    }\n\n    .search-text {\n        text-align: left;\n        float: left;\n        margin-top: 5px;\n        margin-bottom: 0;\n        padding-left: 10px;\n    }\n\n    .search-location-button-group {\n        float: right;\n    }\n\n    .search-button {\n        width: 50px;\n    }\n\n}\n\n@media all and (min-width: 753px) {\n\n    .search-bar {\n        height: 64px;\n        padding-top: 0;\n    }\n\n    .search-location-text {\n        font-size: 24px;\n        position: relative;\n        top: 5px;\n    }\n\n    .search-text {\n        text-align: left;\n        display: inline;\n        margin: 0;\n    }\n\n    .search-location-button-group {\n        display: inline;\n        float: right;\n    }\n\n    .search-button {\n        width: 64px;\n        float: left;\n        height: 64px;\n    }\n}\n\nbody {\n    margin: 0;\n    padding: 0;\n    font-family: 'Open Sans', sans-serif;\n}\n\n#rain-canvas, #weather-canvas, #cloud-canvas, #time-canvas, #lightning-canvas {\n    position: absolute;\n    z-index: -1;\n}\n\n/* Canvas Background Classes */\n\n.thunderstorm {\n    background-color: #34495E;\n}\n\n.drizzle, .rain {\n    background-color: #2080B6;\n}\n\n.snow {\n    background-color: #959B9F;\n}\n\n.atmosphere {\n    background-color: #5E668F;\n}\n\n.clouds {\n    background-color: #3498DB;\n}\n\n.clearsky, .default-weather {\n    background-color: #6FC2D4;\n}\n\n.extreme-weather {\n    background-color: #C0392B;\n}\n\n.thunderstorm.nighttime {\n    background-color: #1B2631;\n}\n\n.drizzle.nighttime, .rain.nighttime {\n    background-color: #0E3A53;\n}\n\n.snow.nighttime {\n    background-color: #333537;\n}\n\n.atmosphere.nighttime {\n    background-color: #32364A;\n}\n\n.clouds.nighttime {\n    background-color: #164362;\n}\n\n.clearsky.nighttime {\n    background-color: #222;\n}\n\n.extreme-weather.nighttime {\n    background-color: #491611;\n}\n\nh1, h2, h3, h4, h5, h6 {\n    font-weight: 300;\n}\n\n.weather, .front-page-description {\n    text-align: center;\n    color: #fff;\n    font-size: 20px;\n    font-weight: 300;\n}\n\n.nighttime .weather {\n    text-shadow: 1px 1px 4px #000;\n    font-weight: 400;\n}\n\n.nighttime .checked {\n    color: rgba(255, 255, 255, .5);\n}\n\n.weather-info {\n    list-style-type: none;\n    padding: 0;\n    text-align: center;\n    font-size: 16px;\n}\n\n.weather-item {\n    text-align: center;\n    display: inline-block;\n    background-repeat: no-repeat;\n    background-size: contain;\n}\n\n.middle {\n    margin: 10px 0;\n}\n\n@media all and (min-width: 500px) {\n    .middle {\n        position: absolute;\n        top: 50%;\n        right: 0;\n        left: 0;\n        -webkit-transform: translateY(-50%);\n        -moz-transform: translateY(-50%);\n        -ms-transform: translateY(-50%);\n        -o-transform: translateY(-50%);\n        transform: translateY(-50%);\n    }\n}\n\n.temp-change {\n    clear: both;\n}\n\n.weather-container {\n    position: relative;\n}\n\n.weather-description {\n    display: inline-block;\n    text-transform: capitalize;\n}\n\n.weather-description, .weather-box {\n    padding: 10px 0;\n}\n\n.temp-change-button {\n    background: none;\n    border: none;\n    padding: 0 10px;\n    font-weight: 600;\n    font-size: 14px;\n}\n\n.celsius {\n    border-right: 2px solid #fff;\n}\n\n.checked {\n    color: rgba(0, 0, 0, .5);\n}\n\n.temperature {\n    font-size: 8rem;\n    line-height: 1;\n    margin-left: 35px;\n}\n\n@media all and (min-width: 320px) {\n    .temperature {\n        font-size: 12rem;\n    }\n}\n\n.temperature:after {\n    content: '\\B0   C';\n    font-size: 40px;\n    line-height: 2.2;\n    vertical-align: top;\n    margin-left: -6px;\n}\n\n.fahrenheit-degree:after {\n    content: '\\B0   F';\n}\n\n.celsius-degree:after {\n    content: '\\B0   C';\n}\n\na {\n    color: #333;\n}\n\n/* Sticky Footer */\n\n* {\n    margin: 0;\n}\n\nhtml, body {\n    height: 100%;\n}\n\n.page-wrap {\n    min-height: 100%;\n    /* equal to footer height */\n    margin-bottom: -100px;\n}\n\n.page-wrap:after {\n    content: \"\";\n    display: block;\n}\n\n.site-footer, .page-wrap:after {\n    height: 100px;\n}\n\n.site-footer {\n    background: #fff;\n    color: #555;\n    font-size: 14px;\n    text-align: center;\n}\n\n.site-footer-section {\n    padding: 5px 5px 0 5px;\n    font-size: 14px;\n}\n\n.noun-project {\n    border: none;\n    background: none;\n    padding: 0;\n    text-decoration: underline;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);