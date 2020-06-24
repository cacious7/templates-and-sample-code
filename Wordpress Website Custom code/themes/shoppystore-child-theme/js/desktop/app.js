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

/***/ "./resources/assets/js/desktop/app.js":
/*!********************************************!*\
  !*** ./resources/assets/js/desktop/app.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/util */ "./resources/assets/js/helpers/util.js");
 //JQUERY = WORDPRESS JQUERY - REASON: to avoid any jquery conflicts

 //make header and footer dissappear on authentication page

Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["remove_header_and_footer_from_Auth_page"])(); //insert a loader to the my-account page before its contents and remove it after the whole page loads

jQuery('<i class="fa fa-spinner fa-pulse fa-3x fa-fw" id="my-account-loader"></i><span class="sr-only">Loading...</span>').insertBefore('.woocommerce-account #contents');
jQuery(document).ready(function () {
  //remove my-account loader
  Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(document.querySelector('#my-account-loader')); //display the my-account content

  jQuery('.woocommerce-account #contents').css('display', 'inline-block');
  /* DESKTOP JS*/

  /**************/
  // Change global variable, custom_text.cart_text value to Add To Basket

  Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["setCustomText"])('cart_text', 'ADD TO BASKET'); // Change the header micicart's "Go To Cart" button text to "Go To Basket"

  Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["minicart_ADD_TO_CART_to_ADD_TO_BASKET"])(); // add woocommerce login or signup messages to the login/signup page with ID number 29

  Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["addNoticesToAuthPage"])(); // include facebook login in AJAX login modal social login location = target element

  var ajaxLoginModal = document.querySelector(".block-popup-login .login-line");
  Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["insert_social_login_in_target_Element"])(ajaxLoginModal); //re-design auth page

  var platform = 'desktop';
  Object(_helpers_util__WEBPACK_IMPORTED_MODULE_0__["design_auth_page"])(platform);
});

/***/ }),

/***/ "./resources/assets/js/helpers/GulaitAuth.js":
/*!***************************************************!*\
  !*** ./resources/assets/js/helpers/GulaitAuth.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GulaitAuth; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./resources/assets/js/helpers/util.js");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}



var GulaitAuth =
/*#__PURE__*/
function () {
  //if the isLogin variable is true, then we set up the login part else, we set up the register part
  function GulaitAuth(isLoginSection, loginForm, platform) {
    _classCallCheck(this, GulaitAuth);

    this._isLoginSection = isLoginSection;
    this._loginForm = loginForm; //platform can be mobile or desktop only

    this._platform = platform == 'mobile' || platform == 'desktop' ? platform : function () {
      console.log('Error: Gulait auth platform not set correctly');
      return null;
    };
    this.initLocalVars(); //bind functions that will be used in event handlers or called not as members of GulaitAuth class
    //so that this can be maintained within the functions and prevent scope or other errors
    //such as function not defined errors

    this.showRegisterSection = this.showRegisterSection.bind(this);
    this.showLoginSection = this.showLoginSection.bind(this);
    this.showAuthSection = this.showAuthSection.bind(this);
  }
  /**
   * This function initializes local variables to their supposed values
   * except those passed in on creation of class obj.
   * This is due to an unknown issue where variables simply get reset  to undefined
   */


  _createClass(GulaitAuth, [{
    key: "initLocalVars",
    value: function initLocalVars() {
      this._loginDiv = document.querySelector('.woocommerce #customer_login').firstElementChild;
      this._registerDiv = document.querySelector('.woocommerce #customer_login').lastElementChild;
      this._desktopMyAccHeader = document.querySelector('.woocommerce-account #main #contents header h2');
      this._mobileMyAccLoginImage = document.querySelector('.mobile-layout.woocommerce-account.woocommerce-page .image-login');
      this._socialLoginContainer = document.querySelector('#customer_login .apsl-login-networks.theme-2.clearfix');
      this._authPageLoginForm = document.querySelector('.woocommerce-page #customer_login form.login');
      this._authPageRegisterForm = document.querySelector('.woocommerce-page #customer_login form.register');
      this._loginAuthdesigned = false; //prevents multiple elements from being created

      this._registerAuthDesigned = false;
    }
  }, {
    key: "setupAuthPage",
    value: function setupAuthPage() {
      //setup the authentication page
      //css styles for Auth page if the loginForm exists on the page
      if (this._loginForm) {
        //if platform is not mobile or desktop, don't setup
        if (this._platform == null) {
          console.log('Error: Gulait auth platform not set correctly');
          return;
        } //setup or remove platform specific elements to match design


        if (this._platform == 'desktop') {
          //desktop
          //hide desktop header
          Object(_util__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(this._desktopMyAccHeader);
        } else {
          //mobile
          //mobile's auth login image from DOM
          Object(_util__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(this._mobileMyAccLoginImage); //hide the header element

          var mobileHeader = document.querySelector('.page-id-29.mobile-layout #header.header');
          if (mobileHeader) Object(_util__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(mobileHeader); //remove social share buttons at the bottom
          //to prevent any distractions

          var socialShare = document.querySelector('.social-share');
          if (socialShare) Object(_util__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(socialShare); //Add breadcrumb to the top of (or before) auth div

          this.addBreadcrumb();
        } //remove currency switcher


        var currencySwitcher = document.querySelector('.woocs_auto_switcher');
        jQuery(currencySwitcher).css('display', 'none');
        if (currencySwitcher) Object(_util__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(currencySwitcher); //remove currency switcher so that it only shows when scrolling down

        var toTopArrow = document.querySelector('#ya-totop');
        jQuery(toTopArrow).css('display', 'none');
        if (toTopArrow) Object(_util__WEBPACK_IMPORTED_MODULE_0__["removeElement"])(toTopArrow); //center the auth div

        jQuery('body.page-id-29 .container .row.sidebar-row').css('text-align', 'center');
        jQuery('.woocommerce-account #contents').css({
          'max-width': '38.5em',
          'display': 'inline-block',
          'text-align': 'initial',
          'padding': '1.5em',
          'border-top': '.15em solid #DF1F26e5'
        });

        if (this._isLoginSection) {
          this.showLoginSection();
        } else {
          this.showRegisterSection();
        }
      } else {
        console.log('ERROR: This is not an authentication page. GulaitAuth cant run.');
      }
    }
    /**
     * Show Login or Register Section based on _isLoginSection variable
     */

  }, {
    key: "showLoginOrRegister",
    value: function showLoginOrRegister() {
      if (this._isLoginSection) {
        //edit the login div
        jQuery(this._loginDiv).css({
          'min-width': '100%',
          'padding': '0',
          'display': 'block'
        }); //hide the register div

        jQuery(this._registerDiv).css('display', 'none');
      } else {
        //hide the login div
        jQuery(this._loginDiv).css('display', 'none'); //edit the register div

        jQuery(this._registerDiv).css({
          'min-width': '100%',
          'padding': '0',
          'display': 'block'
        });
      }
    }
    /**
     * This deals with the styling that is common for both login and register auth forms
     */

  }, {
    key: "styleAuthForm",
    value: function styleAuthForm() {
      //remove full width on checkbox
      jQuery('.woocommerce #customer_login form input[type="checkbox"]').css('min-width', '0 !important'); //remove extra spacing to the right

      jQuery('.woocommerce-account #main #contents .type-page').css('padding', '0'); //row containing login and register forms is slightly pushed to the left with margin
      //this makes styling difficult as it has wierd positioning

      jQuery('div#customer_login.row').css('margin', '0'); //remove extra space after the Auth form content

      jQuery('.entry .entry-content .entry-summary').css('margin-bottom', '0'); //remove Auth form margin

      jQuery('.woocommerce-page #customer_login form').css('margin', '0'); //give the input elements equal size by adding the bootstrap class form-control
      //and styling that make them behave and look uniform

      jQuery('input.input-text').addClass('form-control').css({
        'padding': '10px',
        'border': '1px solid #ccc',
        'background': 'white'
      }); //run mobile styles

      if (this._platform == 'mobile') this.mobileStyles();
    }
    /**
     * Mobile specific styles to make the auth fit the intended design
     */

  }, {
    key: "mobileStyles",
    value: function mobileStyles() {
      //style the p element containers for the input fields and their labels
      jQuery('.mobile-layout.woocommerce-account.woocommerce-page #customer_login form .form-row.form-row-wide').css({
        'background': 'none',
        //remove the icons from the input fields
        'padding-left': '0',
        //remove padding intented for icons
        'border-bottom': 'none' //remove the border at the bottom of the input fields

      }); //properly space fields

      jQuery('.woocommerce form .form-row').css('padding', '.25em 0'); //change to uniform label colors for firstName and lastName on registration section

      jQuery('.woocommerce #customer_login .form-row label').css('color', '#7d7d7d'); //add some space to the sides of the auth div

      jQuery('.mobile-layout.woocommerce-account.woocommerce-page #contents').css('margin', '0 1em 6em');
    }
    /**
     * Add breadcrumb html element before the auth div
     */

  }, {
    key: "addBreadcrumb",
    value: function addBreadcrumb() {
      jQuery(Object(_util__WEBPACK_IMPORTED_MODULE_0__["getBreadcrumb"])()).insertBefore('.page-id-29.mobile-layout .body-wrapper .container');
    }
    /**
     * Edit login and register text for the authentication form
     */

  }, {
    key: "editAuthFormTitle",
    value: function editAuthFormTitle() {
      //form title
      var formTitle = '<span id="login-text">Login</span><span id="or-text"> Or </span><span id="register-text">Register</span>';
      var inactiveTitleSelector = this._isLoginSection ? '#register-text' : '#login-text';
      var activeTitleSelector = this._isLoginSection ? '#login-text' : '#register-text'; //common styling for the auth title

      jQuery('.woocommerce #customer_login h2').css({
        'border-bottom': '0',
        'margin-bottom': '0',
        'padding-bottom': '0.2em'
      }).text('').append(formTitle); //specific styling of form title 
      //grey out inactive title

      jQuery("#or-text, ".concat(inactiveTitleSelector)).css({
        'opacity': '.2',
        'font-size': '16px',
        'word-spacing': '.12em',
        'font-weight': '450'
      }); //specific styling of form title depending on platform in use
      //active text

      var activeStyles = this._platform == 'mobile' ? {
        'font-size': '22px'
      } : {
        'font-size': '24px'
      }; //jQuery( activeTitleSelector ).css( activeStyles );
    }
    /**
     * Insert the link that allows a user to switch the authentication section
     */

  }, {
    key: "insertAuthSwitch",
    value: function insertAuthSwitch() {
      if (this._registerAuthDesigned && this._registerAuthDesigned) return; //the part of the switch question that is different

      var questionDifference = this._isLoginSection ? 'Dont' : 'Already'; //link text for switch

      var linkText = this._isLoginSection ? 'Register now' : 'Login now'; //selector of element to insert the switch after

      var targetElementSelector = this._isLoginSection ? 'form.login p.lost_password' : 'form.register button.woocommerce-Button.button';
      var eventHandler = this._isLoginSection ? this.showLoginSection : this.showRegisterSection;
      jQuery("<p style='margin-top: 2em;'>".concat(questionDifference, " have an account? <strong id='register-link'><a href='#'>").concat(linkText, "</a></strong></p>")).insertAfter("#customer_login ".concat(targetElementSelector)).children("#register-link").click(this._isLoginSection ? this.showRegisterSection : this.showLoginSection); //if true it should bring the one to make it false, inshort, the opposite
    }
    /**
     * Delete original social login and replace with custom version in the 
     * prefered position to fit design
     */

  }, {
    key: "relocateSocialLogin",
    value: function relocateSocialLogin() {
      //Delete existing social login
      if (this._isLoginSection) this._socialLoginContainer.parentNode.removeChild(this._socialLoginContainer); //Insert custom social login just before login and register form on auth page = my-account page

      var formSelector = this._isLoginSection ? this._authPageLoginForm : this._authPageRegisterForm;
      Object(_util__WEBPACK_IMPORTED_MODULE_0__["insert_custom_social_login_before_target_Element"])(formSelector);
    }
    /**
     * Show the appropriate auth section
     */

  }, {
    key: "showAuthSection",
    value: function showAuthSection() {
      //show register section
      this.showLoginOrRegister(); //edit the auth form title

      this.editAuthFormTitle(); //prevent redesigning

      if (this._registerAuthDesigned && this._registerAuthDesigned) return; //style the authentication form

      this.styleAuthForm(); //Delete original social login and replace with custom version in the 
      //prefered position

      this.relocateSocialLogin(); //insert Auth section switch

      this.insertAuthSwitch();
    }
    /**
     * Make the login section visible and style it
     */

  }, {
    key: "showLoginSection",
    value: function showLoginSection() {
      console.log('Login Section'); //set isLogin to true in order to show content as designed for the login form

      this._isLoginSection = true; //show appropriate auth section

      this.showAuthSection();
      this._loginAuthdesigned = true;
    }
    /**
     * Make the register section visible and style it
     */

  }, {
    key: "showRegisterSection",
    value: function showRegisterSection() {
      console.log('Register Section'); //set isLogin to false in order to show content as designed for the register form

      this._isLoginSection = false; //show appropriate auth section

      this.showAuthSection();
      this._registerAuthDesigned = true;
    }
  }]);

  return GulaitAuth;
}();



/***/ }),

/***/ "./resources/assets/js/helpers/util.js":
/*!*********************************************!*\
  !*** ./resources/assets/js/helpers/util.js ***!
  \*********************************************/
/*! exports provided: minicart_ADD_TO_CART_to_ADD_TO_BASKET, setCustomText, prependByPageId, pageIdClassFactory, appendByPageId, isPageIdClass, getPageIdClass, getClassList, removeElement, addNoticesToAuthPage, isMobile, insert_social_login_in_target_Element, remove_header_and_footer_from_Auth_page, design_auth_page, insert_custom_social_login_before_target_Element, insert_custom_social_login_after_target_Element, prepend_custom_social_login_to_target_Element, append_custom_social_login_to_target_Element, getBreadcrumb */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeElement", function() { return removeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNoticesToAuthPage", function() { return addNoticesToAuthPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert_social_login_in_target_Element", function() { return insert_social_login_in_target_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove_header_and_footer_from_Auth_page", function() { return remove_header_and_footer_from_Auth_page; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "design_auth_page", function() { return design_auth_page; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert_custom_social_login_before_target_Element", function() { return insert_custom_social_login_before_target_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert_custom_social_login_after_target_Element", function() { return insert_custom_social_login_after_target_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prepend_custom_social_login_to_target_Element", function() { return prepend_custom_social_login_to_target_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append_custom_social_login_to_target_Element", function() { return append_custom_social_login_to_target_Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBreadcrumb", function() { return getBreadcrumb; });
/* harmony import */ var _GulaitAuth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GulaitAuth */ "./resources/assets/js/helpers/GulaitAuth.js");
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
/* remove an element if it exists
 * @return: void
 * @args: HTMLElement
*/


function removeElement(element) {
  if (element) element.parentNode.removeChild(element);
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
      removeElement(redundantWCNotices);
    }

    jQuery(usefulWCNotices).css('opacity', '1'); //change opacity to trigger the transition after prepending as a callback
  };

  prependByPageId(targetContainer, contentToPrepend, pageIdClass, WoocommerceNoticesPrependCallBack);
}
/*Find out if browser is mobile size */


function isMobile() {
  return jQuery(window).width >= 500;
}
/**
 * include facebook login in login modal
 * */


function insert_social_login_in_target_Element(targetElement) {
  //let login_modal_append_target_elem  = document.querySelector(".block-popup-login .login-line");
  var social_login_container_elem = '<div class="apsl-login-networks theme-2 clearfix">' + '<span class="apsl-login-new-text">Login With Facebook</span>' + '<div class="social-networks">' + '<a title="Login with facebook" href="https://www.gulait.com/wp-login.php?apsl_login_id=facebook_login&amp;state=cmVkaXJlY3RfdG89aHR0cHMlM0ElMkYlMkZ3d3cuZ3VsYWl0LmNvbSUzQTQ0MyUyRm15LWFjY291bnQlMkYlM0Z2JTNENzBmNzNlZTUxMzNm">' + '<div class="apsl-icon-block icon-facebook">' + '<i class="fa fa-facebook"></i>' + '<span class="apsl-login-text">Login</span>' + '<span class="apsl-long-login-text">Login with facebook</span>' + '</div>' + '</a>' + '</div>' + '</div>';

  if (targetElement && social_login_container_elem) {
    jQuery(targetElement).append(social_login_container_elem);
  } else {
    console.log('Ajax-Login Modal elements not yet loaded into DOM. Failed to insert social login inside AJAX login modal.');
  }
}
/**
 * returns edited social login HTML 
 */


function get_custom_social_login() {
  var social_login_container_elem = '<div class="apsl-login-networks theme-2 clearfix" id="custom-social-login">' + '<div class="social-networks">' + '<a title="Login with facebook" href="https://www.gulait.com/wp-login.php?apsl_login_id=facebook_login&amp;state=cmVkaXJlY3RfdG89aHR0cHMlM0ElMkYlMkZ3d3cuZ3VsYWl0LmNvbSUzQTQ0MyUyRm15LWFjY291bnQlMkYlM0Z2JTNENzBmNzNlZTUxMzNm">' + '<button type="button" class="btn apsl-login-new-text">Continue With Facebook</button>' + '</a>' + '</div>' + '</div>';
  return social_login_container_elem;
}
/**
 * Append custom social login to target element
 * */


function append_custom_social_login_to_target_Element(targetElement) {
  var social_login_container_elem = get_custom_social_login();

  if (targetElement && social_login_container_elem) {
    jQuery(targetElement).append(social_login_container_elem);
  } else {
    console.log('Failed to insert custom social login inside target element listed below');
    console.log(targetElement);
  }
}
/**
 * Prepend custom social login to target element
 * */


function prepend_custom_social_login_to_target_Element(targetElement) {
  var social_login_container_elem = get_custom_social_login();

  if (targetElement && social_login_container_elem) {
    jQuery(targetElement).prepend(social_login_container_elem);
  } else {
    console.log('Failed to insert custom social login inside target element listed below');
    console.log(targetElement);
  }
}
/**
 * Insert custom social login before target element
 * */


function insert_custom_social_login_before_target_Element(targetElement) {
  var social_login_container_elem = get_custom_social_login();

  if (targetElement && social_login_container_elem) {
    jQuery(social_login_container_elem).insertBefore(targetElement);
  } else {
    console.log('Failed to insert custom social login inside target element listed below');
    console.log(targetElement);
  }
}
/**
 * Insert custom social login before target element
 * */


function insert_custom_social_login_after_target_Element(targetElement) {
  var social_login_container_elem = get_custom_social_login();

  if (targetElement && social_login_container_elem) {
    jQuery(social_login_container_elem).insertAfter(targetElement);
  } else {
    console.log('Failed to insert custom social login inside target element listed below');
    console.log(targetElement);
  }
}
/**
 * Hide the header and Footer from the Authentication page
 */


function remove_header_and_footer_from_Auth_page() {
  var loginForm = document.querySelector('body.page-id-29.page-my-account #customer_login form.login');
  var headerAndFooter = document.querySelector('body.page-id-29.page-my-account div.yt-header.wrap#yt_header, body.page-id-29.page-my-account div.yt-footer.wrap#yt_footer');

  if (loginForm && headerAndFooter) {
    jQuery(headerAndFooter).css('display', 'none');
  } else if (headerAndFooter) {
    jQuery(headerAndFooter).css('display', 'block');
  }
}
/**
 * Design the Auth page to look simplified
 */


function design_auth_page(platform) {
  var loginForm = document.querySelector('body.page-id-29.page-my-account #customer_login form.login'); //setup the Gulait Auth page as designed

  if (loginForm) {
    //This tracks whether or not the user is on the login or register section of the auth page
    var isLoginSection = true;
    var Auth = new _GulaitAuth__WEBPACK_IMPORTED_MODULE_0__["default"](isLoginSection, loginForm, platform);
    Auth.setupAuthPage();
  }
}
/**
 * get breadcrumb HTML element
 */


function getBreadcrumb() {
  var breadcrumb = '<div class="container"> ' + '<ul class="breadcrumb"> ' + '<li> ' + '<a href="https://test.gulait.com">Home</a> ' + '<span class="go-page"></span> ' + '</li> ' + '<li class="active"> ' + '<span>My Account</span> ' + '</li> ' + '</ul> ' + '</div> ';
  return breadcrumb;
} //EXPORTS




/***/ }),

/***/ "./resources/assets/sass/style.scss":
/*!******************************************!*\
  !*** ./resources/assets/sass/style.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************************************!*\
  !*** multi ./resources/assets/js/desktop/app.js ./resources/assets/sass/style.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! E:\Gulait - git repository [product catalog]\Gulait.com\resources\resources\assets\js\desktop\app.js */"./resources/assets/js/desktop/app.js");
module.exports = __webpack_require__(/*! E:\Gulait - git repository [product catalog]\Gulait.com\resources\resources\assets\sass\style.scss */"./resources/assets/sass/style.scss");


/***/ })

/******/ });