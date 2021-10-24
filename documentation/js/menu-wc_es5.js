'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">formbuilderapp documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/FormbuilderModule.html\" data-type=\"entity-link\" >FormbuilderModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"' : 'data-target="#xs-components-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"' : 'id="xs-components-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AutocompleteComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AutocompleteComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/BaseFieldComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >BaseFieldComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/CheckboxComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CheckboxComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ConfirmDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ConfirmDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/DateInputComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DateInputComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ErrorDialogSimpleComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ErrorDialogSimpleComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FileInputComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FileInputComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormbuilderComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormbuilderComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/InfoDialogSimpleComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >InfoDialogSimpleComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/RadiobuttonComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >RadiobuttonComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SelectComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SelectComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SlideToggleComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SlideToggleComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SliderComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SliderComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/TableComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TableComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/TextInputComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TextInputComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"' : 'data-target="#xs-injectables-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"' : 'id="xs-injectables-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ConfigService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ConfigService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/DataFlattnerService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DataFlattnerService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#pipes-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"' : 'data-target="#xs-pipes-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"', ">\n                                            <span class=\"icon ion-md-add\"></span>\n                                            <span>Pipes</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="pipes-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"' : 'id="xs-pipes-links-module-FormbuilderModule-6136b99ec87f7446a21a3bbed1f966d1"', ">\n                                            <li class=\"link\">\n                                                <a href=\"pipes/TranslatePipe.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TranslatePipe</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/AngularCsv.html\" data-type=\"entity-link\" >AngularCsv</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/AutoSearch.html\" data-type=\"entity-link\" >AutoSearch</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CsvConfigConsts.html\" data-type=\"entity-link\" >CsvConfigConsts</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthenticationService.html\" data-type=\"entity-link\" >AuthenticationService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/DataConnectorService.html\" data-type=\"entity-link\" >DataConnectorService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/DataStoreService.html\" data-type=\"entity-link\" >DataStoreService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/DialogService.html\" data-type=\"entity-link\" >DialogService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/FormbuilderService.html\" data-type=\"entity-link\" >FormbuilderService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/FormService.html\" data-type=\"entity-link\" >FormService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TranslationService.html\" data-type=\"entity-link\" >TranslationService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserService.html\" data-type=\"entity-link\" >UserService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/ICodeEntry.html\" data-type=\"entity-link\" >ICodeEntry</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ICustomValidation.html\" data-type=\"entity-link\" >ICustomValidation</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IDialogConfig.html\" data-type=\"entity-link\" >IDialogConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IField.html\" data-type=\"entity-link\" >IField</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IFlatObject.html\" data-type=\"entity-link\" >IFlatObject</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IForm.html\" data-type=\"entity-link\" >IForm</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IFormObj.html\" data-type=\"entity-link\" >IFormObj</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IHTMLAttributes.html\" data-type=\"entity-link\" >IHTMLAttributes</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ISliderConfig.html\" data-type=\"entity-link\" >ISliderConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ITableHeader.html\" data-type=\"entity-link\" >ITableHeader</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ITableViewOptions.html\" data-type=\"entity-link\" >ITableViewOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IValidator.html\" data-type=\"entity-link\" >IValidator</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/MenuNode.html\" data-type=\"entity-link\" >MenuNode</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Options.html\" data-type=\"entity-link\" >Options</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/optionsConfig.html\" data-type=\"entity-link\" >optionsConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/searchObj.html\" data-type=\"entity-link\" >searchObj</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));