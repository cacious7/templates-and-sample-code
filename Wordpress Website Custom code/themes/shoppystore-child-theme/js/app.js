/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/app.js":
/*!************************************!*\
  !*** ./resources/assets/js/app.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/util */ "./resources/assets/js/helpers/util.js");
 //JQUERY = WORDPRESS JQUERY - REASON: to avoid any jquery conflicts


jQuery(document).ready(function () {
  /* ALL DEVICES */

  /**************/
  //Change global variable, custom_text.cart_text value to Add To Basket
  Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["setCustomText"])('cart_text', 'ADD TO BASKET');
  /* MOBILE RESPONSIVE CODE */

  /*************************/

  /* DESKTOP JS */

  if (!_helpers_util__WEBPACK_IMPORTED_MODULE_0__["isMobile"]) {
    //Change the header micicart's "Go To Cart" button text to "Go To Basket"
    Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["minicart_ADD_TO_CART_to_ADD_TO_BASKET"])(); //add woocommerce login or signup messages to the login/signup page with ID number 29

    Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["addNoticesToAuthPage"])();
  }
  /* MOBILE JS */
  else {//mobile code comes here
    }
});

/***/ }),

/***/ "./resources/assets/js/helpers/util.js":
/*!*********************************************!*\
  !*** ./resources/assets/js/helpers/util.js ***!
  \*********************************************/
/*! exports provided: minicart_ADD_TO_CART_to_ADD_TO_BASKET, setCustomText, prependByPageId, pageIdClassFactory, appendByPageId, isPageIdClass, getPageIdClass, getClassList, removeChild, addNoticesToAuthPage, isMobile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minicart_ADD_TO_CART_to_ADD_TO_BASKET", function() { return minicart_ADD_TO_CART_to_ADD_TO_BASKET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCustomText", function() { return setCustomText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prependByPageId", function() { return prependByPageId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageIdClassFactory", function() { return pageIdClassFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendByPageId", function() { return appendByPageId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPageIdClass", function() { return isPageIdClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageIdClass", function() { return getPageIdClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClassList", function() { return getClassList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeChild", function() { return removeChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNoticesToAuthPage", function() { return addNoticesToAuthPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
 //JQUERY = WORDPRESS JQUERY - REASON: to avoid any jquery conflicts and futher jquery initialization

/*Change the header micicart's "Go To Cart"button text to "Go To Basket" */

function minicart_ADD_TO_CART_to_ADD_TO_BASKET() {
  var minicartNumberAtStart = jQuery("span.minicart-number").text(); //number of items in cart/basket when page loads

  var currentMinicartNumber = minicartNumberAtStart; //stores the current minicart number

  var cartHasContentsAtStart = false; //Indicates whether or not the cart has contents when it loads

  minicartNumberAtStart >= 1 ? cartHasContentsAtStart = true : cartHasContentsAtStart = false; //Indicates whether the minicart number at start has been checked after page load
  //The minicart nummber at start can only be checked once after the page loads
  //This is because all other actions can be detected when the number changes in the interval loop

  var minicartNumberCheckedAtStart = false; // Change the header micicart's "Go To Cart" button text to "Go To Basket" 
  // when the cart items are atleast 1  

  function changeCartToBasket() {
    if (currentMinicartNumber >= 1) {
      jQuery(".wrapp-minicart .cart-checkout .cart-link a").text("Go To Basket");
    }
  } //scenario 01: cart number is 0 when the page loaded
  //therefore, the number has to change to greater than 0 before the cart text can be changed
  //because the "go to cart" text that requires changing is dynamically added to the DOM
  //*when the cart contains >= 1 number of items*


  var intervalKey = setInterval(function () {
    //loop every 10sec
    var newMinicartNumber = jQuery("span.minicart-number").text(); //recently checked minicartcart/basket item number

    var cartNumberChanged = false; //indicates whether a change to minicart number occured

    currentMinicartNumber !== newMinicartNumber ? cartNumberChanged = true : cartNumberChanged = false;

    if (cartNumberChanged) {
      //change occured
      currentMinicartNumber = newMinicartNumber; //update minicart item number after change

      changeCartToBasket(); //change cart text to basket
    } else if (minicartNumberAtStart >= 1 && minicartNumberCheckedAtStart == false) {
      //scenario 01: cart number is already >= 1 when the page loaded
      changeCartToBasket();
      minicartNumberCheckedAtStart = true;
    }
  }, 5000);
}
/* Set or alter properties of the global custom_text variable */


function setCustomText(key, value) {
  if (typeof key === 'string') custom_text[key] = value;
}
/* Add content to the beginning of an html element
 * specific to a page who's page ID has been provided
*/


function prependByPageId(domElement, contentToPrepend, pageIdClass, transitionCallback) {
  if (isPageIdClass(pageIdClass)) {
    jQuery(domElement).prepend(contentToPrepend);
    transitionCallback(); //run the transiotion callback functions
  }
}
/* Add content at the end of an html element
 * specific to a page who's page ID has been provided
*/


function appendByPageId(domElement, contentToAppend, pageIdClass, transitionCallback) {
  if (isPageIdClass(pageIdClass)) {
    jQuery(domElement).append(contentToAppend);
    transitionCallback(); //run the transition callback function
  }
}
/* from page id, it will create 'page-id-pageId' which is a valid pageIdClass format
 * @return: string
*/


function pageIdClassFactory(pageId) {
  return 'page-id-' + pageId;
}
/* if the provided page ID belongs the current page
 *return: boolean
*/


function isPageIdClass(pageIdClass) {
  return jQuery('body').hasClass(pageIdClass);
  ;
}
/* get the current page's page ID
 * page ID is the 1st class in the body element using a ZERO INDEX basis
 * @return: string
*/


function getPageIdClass() {
  return getClassList('body')[1];
}
/* cget an array class list from an html element
 * @return: array 
 * @args: jquery-element-selector 
 *
*/


function getClassList(element) {
  return $(element).attr('class').split(/\s+/);
  ;
}
/* remove an element
 * @return: void
 * @args: HTMLElement
*/


function removeChild(element) {
  element.parentNode.removeChild(element);
}
/* Add Woocommerce notices 
 * RECOMMENDED EDIT: needs editing, mabe we just need the structure and the message is added dynamicaly
 * or select the notice element using jquery and use that as the contentToPrepend variable
 * @return: void
 * @args: none 
*/


function addNoticesToAuthPage() {
  var pageIdClass = pageIdClassFactory(29); //from page id, it create 'page-id-29' which is a valid pageIdClass

  var contentToPrepend = document.getElementsByClassName('woocommerce-notices-wrapper');
  var targetContainer = document.getElementById('contents'); //element to prepend to

  jQuery(contentToPrepend).css({
    'opacity': '0',
    'transition': 'opacity 3s ease-out 0'
  }); //make opacity 0 and give transition for smooth prepending

  var WoocommerceNoticesPrependCallBack = function WoocommerceNoticesPrependCallBack() {
    //there exists a woocommerce-notices-wrapper in the target container
    //however, its not being used correctly and so we shall remove it before adding another one
    var redundantWCNotices = document.querySelector('div#contents > div:nth-child(2)');
    var usefulWCNotices = document.querySelector('div#contents > div:nth-child(1)');

    if (isPageIdClass(pageIdClass)) {
      removeChild(redundantWCNotices);
    }

    jQuery(usefulWCNotices).css('opacity', '1'); //change opacity to trigger the transition after prepending as a callback
  };

  prependByPageId(targetContainer, contentToPrepend, pageIdClass, WoocommerceNoticesPrependCallBack);
}
/*Find out if browser is mobile size */


function isMobile() {
  return jQuery(window).width >= 500;
} //EXPORTS




/***/ }),

/***/ 0:
/*!******************************************!*\
  !*** multi ./resources/assets/js/app.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Gulait - git repository [product catalog]\Gulait.com\resources\resources\assets\js\app.js */"./resources/assets/js/app.js");


/***/ })

/******/ });