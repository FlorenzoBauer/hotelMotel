/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_home_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_home_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*{\n  font-family: 'Comic Sans MS', cursive, sans-serif;\n}\n\nbody {\n  background: linear-gradient(90deg, #4CAF50, #2196F3);\n  color: #fff; \n  height: 100vh;\n  margin: 0;\n}\n\nheader {\n  padding: 10px;\n  text-align: center;\n}\n\nnav {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\nli {\n  display: inline-block;\n  margin: 0 15px;\n}\n\na {\n  text-decoration: none;\n  color: #ffffff; \n  padding: 10px;\n  border-radius: 5px;\n  transition: background-color 0.3s;\n}\n\n.home-container {\n  height: 100vh;\n  width: 100vw;\n  text-align: center;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat;\n  background-size: 200px, 200px;\n  background-position: center;\n}\n\na:hover {\n  background-color: #157ac2;\n}\n\nsection {\n  padding: 20px;\n}\n\nfooter {\n  background-color: #333;\n  color: #fff;\n  text-align: center;\n  position: fixed;\n  bottom: 0;\n  width: 100vw;\n}\n\n.bookings-container {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n}\n\n.bookings-container h3 {\n  font-size: 24px;\n  margin-bottom: 10px;\n  color: #333; \n}\n\n.future-bookings-container,\n.past-bookings-container {\n  display: grid;\n  grid-template-columns: repeat(3,auto);\n}\n\n.booking-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 200px;\n  height: 200px;\n  margin: 20px;\n  padding: 20px;\n  background-color: #08636d;\n  border-radius: 5px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  transition: box-shadow 0.3s;\n}\n\n.billings-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  overflow-y: auto;\n}\n\n.billing-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 70%;\n  height: 120px;\n  margin: 15px;\n  padding: 15px;\n  background-color: #04385b;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3); \n  transition: transform 0.3s, box-shadow 0.3s;\n}\n\n.billing-card:hover {\n  transform: scale(1.05); \n  box-shadow: 0 6px 12px rgba(52, 152, 219, 0.5); \n}\n\n.total-container {\n  padding: 20px;\n  text-align: center;\n  margin-bottom: 20px;\n  margin-top:20px;\n  background-color: #065e98; \n  border-radius: 10px; \n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  color: #ffffff; \n\n  \n  animation: bounce 2s infinite;\n}\n@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-10px);\n  }\n  60% {\n    transform: translateY(-5px);\n  }\n}\n.totalSign {\n  font-size: 24px;\n  color: #fffdfd; \n  margin-bottom: 10px;\n}\n@media screen and (max-width: 600px) {\n  .total-container {\n    font-size: 16px; \n  }\n  .totalSign {\n    font-size: 20px;\n  }\n}\n\n.available-room-container {\n  display: grid;\n  grid-template-columns: repeat(4, .5fr);\n  justify-content: center;\n  align-items: center;\n  overflow-y: auto;\n}\n\n.available-room-card{\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  width: 200px;\n  height: 200px;\n  margin: 20px;\n  padding: 20px;\n  background-color: #08636d;\n  border-radius: 5px;\n  box-shadow: 0 0 10px rgba(0,0,0,0.2);\n  transition: box-shadow 0.3s;\n}\n\n.btn {\n  display: inline-block;\n  padding: 10px 20px;\n  font-size: 16px;\n  text-align: center;\n  text-decoration: none;\n  background-color: #086434;\n  color: #fff;\n  border: 2px solid #3498db;\n  border-radius: 5px;\n  transition: background-color 0.3s, color 0.3s;\n  cursor: pointer;\n}\n\n.btn:hover {\n  background-color: #2980b9;\n  color: #fff;\n}\n\nform-container {\n  width: 200px;\n  margin: 20px auto;\n  padding: 20px;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n\nlabel {\n  font-size: 16px;\n  color: #333;\n}\n\ninput {\n  width: 200px;\n  padding: 10px;\n  font-size: 16px;\n  border: 1px solid #ccc;\n  border-radius: 10px;\n}\n\n#submit-button {\n  width: 100px;\n  padding: 12px;\n  font-size: 16px;\n  background-color: #055a2b;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n#submit-button:hover {\n  background-color: #2980b9;\n}\n\n#book-button:focus,\n.billing-card:focus,\n.booking-card:focus {\n  outline: 2px solid rgb(0, 255, 128);\n}\n\n.confirmationMessage {\n  display: flex;\n  flex-direction: column;\n  width: 100vw;\n  text-align: center;\n}\n\n#login-button {\n    background-color: #066950;\n    border: none;\n    color: white;\n    padding: 15px 32px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin-top: 25px;\n    cursor: pointer;\n    border-radius: 10px;\n    transition: background-color 0.3s;\n  }\n  \n  #login-button:hover {\n    background-color: #c30c0c;\n    transform: scale(1.5); \n  }\n\n.hidden{\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["*{\n  font-family: 'Comic Sans MS', cursive, sans-serif;\n}\n\nbody {\n  background: linear-gradient(90deg, #4CAF50, #2196F3);\n  color: #fff; \n  height: 100vh;\n  margin: 0;\n}\n\nheader {\n  padding: 10px;\n  text-align: center;\n}\n\nnav {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\nli {\n  display: inline-block;\n  margin: 0 15px;\n}\n\na {\n  text-decoration: none;\n  color: #ffffff; \n  padding: 10px;\n  border-radius: 5px;\n  transition: background-color 0.3s;\n}\n\n.home-container {\n  height: 100vh;\n  width: 100vw;\n  text-align: center;\n  background-image: url('../images/home.png') no-repeat;\n  background-size: 200px, 200px;\n  background-position: center;\n}\n\na:hover {\n  background-color: #157ac2;\n}\n\nsection {\n  padding: 20px;\n}\n\nfooter {\n  background-color: #333;\n  color: #fff;\n  text-align: center;\n  position: fixed;\n  bottom: 0;\n  width: 100vw;\n}\n\n.bookings-container {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n}\n\n.bookings-container h3 {\n  font-size: 24px;\n  margin-bottom: 10px;\n  color: #333; \n}\n\n.future-bookings-container,\n.past-bookings-container {\n  display: grid;\n  grid-template-columns: repeat(3,auto);\n}\n\n.booking-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 200px;\n  height: 200px;\n  margin: 20px;\n  padding: 20px;\n  background-color: #08636d;\n  border-radius: 5px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  transition: box-shadow 0.3s;\n}\n\n.billings-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  overflow-y: auto;\n}\n\n.billing-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 70%;\n  height: 120px;\n  margin: 15px;\n  padding: 15px;\n  background-color: #04385b;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3); \n  transition: transform 0.3s, box-shadow 0.3s;\n}\n\n.billing-card:hover {\n  transform: scale(1.05); \n  box-shadow: 0 6px 12px rgba(52, 152, 219, 0.5); \n}\n\n.total-container {\n  padding: 20px;\n  text-align: center;\n  margin-bottom: 20px;\n  margin-top:20px;\n  background-color: #065e98; \n  border-radius: 10px; \n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  color: #ffffff; \n\n  \n  animation: bounce 2s infinite;\n}\n@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-10px);\n  }\n  60% {\n    transform: translateY(-5px);\n  }\n}\n.totalSign {\n  font-size: 24px;\n  color: #fffdfd; \n  margin-bottom: 10px;\n}\n@media screen and (max-width: 600px) {\n  .total-container {\n    font-size: 16px; \n  }\n  .totalSign {\n    font-size: 20px;\n  }\n}\n\n.available-room-container {\n  display: grid;\n  grid-template-columns: repeat(4, .5fr);\n  justify-content: center;\n  align-items: center;\n  overflow-y: auto;\n}\n\n.available-room-card{\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  width: 200px;\n  height: 200px;\n  margin: 20px;\n  padding: 20px;\n  background-color: #08636d;\n  border-radius: 5px;\n  box-shadow: 0 0 10px rgba(0,0,0,0.2);\n  transition: box-shadow 0.3s;\n}\n\n.btn {\n  display: inline-block;\n  padding: 10px 20px;\n  font-size: 16px;\n  text-align: center;\n  text-decoration: none;\n  background-color: #086434;\n  color: #fff;\n  border: 2px solid #3498db;\n  border-radius: 5px;\n  transition: background-color 0.3s, color 0.3s;\n  cursor: pointer;\n}\n\n.btn:hover {\n  background-color: #2980b9;\n  color: #fff;\n}\n\nform-container {\n  width: 200px;\n  margin: 20px auto;\n  padding: 20px;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n\nlabel {\n  font-size: 16px;\n  color: #333;\n}\n\ninput {\n  width: 200px;\n  padding: 10px;\n  font-size: 16px;\n  border: 1px solid #ccc;\n  border-radius: 10px;\n}\n\n#submit-button {\n  width: 100px;\n  padding: 12px;\n  font-size: 16px;\n  background-color: #055a2b;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n#submit-button:hover {\n  background-color: #2980b9;\n}\n\n#book-button:focus,\n.billing-card:focus,\n.booking-card:focus {\n  outline: 2px solid rgb(0, 255, 128);\n}\n\n.confirmationMessage {\n  display: flex;\n  flex-direction: column;\n  width: 100vw;\n  text-align: center;\n}\n\n#login-button {\n    background-color: #066950;\n    border: none;\n    color: white;\n    padding: 15px 32px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 16px;\n    margin-top: 25px;\n    cursor: pointer;\n    border-radius: 10px;\n    transition: background-color 0.3s;\n  }\n  \n  #login-button:hover {\n    background-color: #c30c0c;\n    transform: scale(1.5); \n  }\n\n.hidden{\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/home.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchData: () => (/* binding */ fetchData)
/* harmony export */ });
const getPromises = [
    fetch('https://murmuring-plateau-60579-55a1e980f710.herokuapp.com/api/v1/customers/'),
    fetch('https://murmuring-plateau-60579-55a1e980f710.herokuapp.com/api/v1/bookings'),
    fetch('https://murmuring-plateau-60579-55a1e980f710.herokuapp.com/api/v1/rooms')
];
// this is a comment for no reason that to redeploy
const fetchData = () => {
    return Promise.all(getPromises);
}

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findBookings: () => (/* binding */ findBookings),
/* harmony export */   matchRooms: () => (/* binding */ matchRooms),
/* harmony export */   totalSpend: () => (/* binding */ totalSpend)
/* harmony export */ });
const totalSpend = (customer) => {
    customer.total =  customer.rooms.reduce((totals, room) => {
        
        totals += room.costPerNight;
        return totals
    }, 0)
    return customer
}

const matchRooms = (customer, allrooms) => {
    customer.rooms = []
     customer.bookings.forEach(booking => {
        allrooms.map(room => {
            if(room.number === booking.roomNumber) {
            customer.rooms.push(room)
            }
        
        })
    })
    return customer
}


const findBookings = (customer, allbookings) => {
    customer.bookings =  allbookings.filter(booking => booking.userID === customer.id);
    return customer
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);





const bookingsButton = document.querySelector('#bookings-button');
const billingsButton = document.querySelector('#billings-button');
const bookRoomButton = document.querySelector('#book-room-button');
const homeButton = document.querySelector('#home-button');

const availableRoomsContainer = document.querySelector('.available-room-container');
const bookRoomFormSubmit = document.querySelector('#book-room-form');
const bookingsContainer = document.querySelector('.bookings-container');
const billingsContainer = document.querySelector('.billings-container');
const bookARoomContainer = document.querySelector('.book-a-room-container');
const checkDate = document.querySelector('#date');
const formView = document.querySelector('.book-a-room-container');
const homeContainer = document.querySelector('.home-container');
const navBar = document.querySelector('.nav-bar');
const loginContainer = document.querySelector('.login-container');

const loginButton = document.querySelector('#login-button');
const userName = document.querySelector('#username');
const password = document.querySelector('#password');

let allCustomers;
let allBookings;
let allRooms;
let currentCustomer0;
let currentCustomer;
let bookDate;
let bookedRoom;
let currentDate = new Date();
let customerId;

const loginMoment = (event) => {
    event.preventDefault();
    const regex = new RegExp(/^customer\d{1,}$/);
    if(regex.test(userName.value) && password.value === 'overlook2021') {
        customerId = Number(userName.value.replace('customer',""));
        retrieveData();
    }
    else{
        alert('Please enter a valid username and password');
    }
}

loginButton.addEventListener('click', (event) => {
    loginMoment(event);
});

availableRoomsContainer.addEventListener('click', (event) => {
    if (event.target.id === 'book-button') {
        submitBooking(event)
    }
});

homeButton.addEventListener('click', () => {
renderHomeView();
});

bookRoomFormSubmit.addEventListener('submit', (event) => {
    event.preventDefault();

    const dateInput = document.getElementById('date');
    const bedNumberInput = document.getElementById('bed-number');

    if (!dateInput.value || !bedNumberInput.value) {
        alert('Please fill out all form fields.');
        return
    }

    displayAvailableRooms();
});

bookRoomButton.addEventListener('click', () => {
renderBookRoomForm();
});

bookingsButton.addEventListener('click', () => {
    rendershowBookings();
});

billingsButton.addEventListener('click', () => {
    rendershowBillings();
});

function retrieveData() {
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_2__.fetchData)()
        .then(responses => {
            return Promise.all(
                responses.map(response => {
                    if (!response.ok) {
                        throw new Error('Wowza! Something went wrong!')
                    }
                    return response.json();
                })
            );
        })
        .then(data => {
            allCustomers = data[0].customers;
            allBookings = data[1].bookings;
            allRooms = data[2].rooms;
            currentCustomer0 = allCustomers[customerId - 1];
            
        })
       .then(() => {
            customerObject();
       })
        .then(() => {
            renderHomeView();
        
       })
        .catch(err => console.log(err.message, err));
}

function submitBooking(event) {
    
    bookDate = document.querySelector('#date');
        
    bookedRoom = event.target.closest('.available-room-card');
    
    if (bookedRoom) {
        const roomNumberElement = bookedRoom.querySelector('#room-number');
        console.log(roomNumberElement)
        if (roomNumberElement) {
            const roomNumber = roomNumberElement.textContent.trim().replace('Room Number: ', '');
            console.log(roomNumber);
            sendBookedRoom('https://murmuring-plateau-60579-55a1e980f710.herokuapp.com/api/v1/bookings', roomNumber, bookDate)
            
        } else {
            console.error('Room number element not found in the selected room card.');
        }
    } else {
        alert('Please select a room to book');
    }
}

const sendBookedRoom = (url, number, bookDate) => {
    const data = {
      userID: parseInt(currentCustomer.id),
      date: `${bookDate.value.replaceAll('-', '/')}`,
      roomNumber: parseInt(number),
    };
    fetch(url, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.newBooking)
        currentCustomer.bookings.push(data.newBooking)
        showConfirmationMessage();
    } )
    .catch(err => console.log(err.message, err));
      
  }

  function customerObject() {
        let currentCustomer1st = (0,_customer__WEBPACK_IMPORTED_MODULE_3__.findBookings)(currentCustomer0, allBookings);
        let currentCustomer2nd = (0,_customer__WEBPACK_IMPORTED_MODULE_3__.matchRooms)(currentCustomer1st, allRooms);
        currentCustomer = (0,_customer__WEBPACK_IMPORTED_MODULE_3__.totalSpend)(currentCustomer2nd);
        console.log(currentCustomer)
   
}

function rendershowBillings() {
    billingsContainer.classList.remove('hidden');
    bookingsContainer.classList.add('hidden');
    formView.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');

    billingsContainer.innerHTML =' ';

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');
    
    const totalSign = document.createElement('h2');
    totalSign.classList.add('totalSign');
    totalSign.textContent = `Total Cost: $${currentCustomer.total.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    
    totalContainer.appendChild(totalSign);
    billingsContainer.appendChild(totalContainer);

    currentCustomer.rooms.forEach(room => {
        const billingCard = document.createElement('article');
        billingCard.classList.add('billing-card');
        billingCard.setAttribute('tabindex', '0');
        billingCard.setAttribute('aria-labelledby', 'room-number');

        billingCard.innerHTML = `
            <p id="room-number">Room Number: ${room.number}</p>
            <p>Room Type: ${room.roomType}</p>
            <p>Cost per Night: $${room.costPerNight}</p>
        `;
        
        billingsContainer.appendChild(billingCard);
    });
}


function rendershowBookings() {
    bookingsContainer.classList.remove('hidden');
    billingsContainer.classList.add('hidden');
    formView.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');

    const sortedBookings = currentCustomer.bookings.sort((a, b) => new Date(a.date) - new Date(b.date));

    const futureBookings = sortedBookings.filter(booking => new Date(booking.date) >= currentDate);
    const pastBookings = sortedBookings.filter(booking => new Date(booking.date) < currentDate);
    if (futureBookings.length > 0) {
        const futureContainer = document.querySelector('.future-bookings-container');
  
        futureContainer.innerHTML = futureBookings.map(booking => {
            return `
            <article class="booking-card" tabindex="0" aria-labelledby="room-number">
                <p id="room-number">Room Number: ${booking.roomNumber}</p>
                <p>Date: ${booking.date}</p>
            </article>
            `;
        }).join('');
    }

    if (pastBookings.length > 0) {
        const pastContainer = document.querySelector('.past-bookings-container');
      
        pastContainer.innerHTML = pastBookings.map(booking => {
            return `
            <article class="booking-card" tabindex="0" aria-labelledby="room-number">
                <p id="room-number">Room Number: ${booking.roomNumber}</p>
                <p>Date: ${booking.date}</p>
            </article>
            `;
        }).join('');
    }
}

const findBookedRooms = () => {
    let checkInDate = checkDate.value
    .split('-')
    .join('/');

   return allBookings.filter((booking) => booking.date === checkInDate).map((room)=> room.roomNumber)
}

const findUnbookedRooms = (bookedRooms) => {
    return allRooms.filter((room) => !bookedRooms.includes(room.number));
}

const getAvailableRooms = () => { 
    const numBeds = document.getElementById('bed-number').value;
    const bookedRooms2 = findBookedRooms();
    const unbookedRooms2 = findUnbookedRooms(bookedRooms2);
    
    const result = unbookedRooms2.filter((room) => room.numBeds >= numBeds)
    return result
}

function displayAvailableRooms() {
    const result = getAvailableRooms();
    formView.classList.add('hidden');
    homeContainer.classList.add('hidden');

    availableRoomsContainer.classList.remove('hidden');

    availableRoomsContainer.innerHTML = '';

    if (result.length > 0) {
        result.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.classList.add('available-room-card');
            roomCard.setAttribute('aria-labelledby', 'room-number');

            const roomNumberElement = document.createElement('p');
            roomNumberElement.id = 'room-number';
            roomNumberElement.textContent = `Room Number: ${room.number}`;
            roomCard.appendChild(roomNumberElement);

            const roomTypeElement = document.createElement('p');
            roomTypeElement.textContent = `Room Type: ${room.roomType}`;
            roomCard.appendChild(roomTypeElement);

            const costPerNightElement = document.createElement('p');
            costPerNightElement.textContent = `Cost Per Night: $${room.costPerNight}`;
            roomCard.appendChild(costPerNightElement);

            const bookButton = document.createElement('button');
            bookButton.id = 'book-button';
            bookButton.textContent = 'Book';
            roomCard.appendChild(bookButton);

            availableRoomsContainer.appendChild(roomCard);
        });
    } else {
        availableRoomsContainer.innerHTML = '<p>No available rooms.</p>';
    }
}

function showConfirmationMessage() {
    availableRoomsContainer.innerHTML = '';

    availableRoomsContainer.innerHTML = `
        <h2 class="confirmationMessage">Thank you for your booking!</h2>
    `;

    setTimeout(() => {
        rendershowBookings();
    }, 2000);
}

function renderHomeView() {
    bookingsContainer.classList.add('hidden');
    billingsContainer.classList.add('hidden');
    bookARoomContainer.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    loginContainer.classList.add('hidden');
    
    navBar.classList.remove('hidden');
    homeContainer.classList.remove('hidden');
}

function renderBookRoomForm() {
    bookingsContainer.classList.add('hidden');
    billingsContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    
    bookARoomContainer.classList.remove('hidden');  
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map