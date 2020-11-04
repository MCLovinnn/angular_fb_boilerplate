'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
  constructor() {
    super();
    this.isNormalMode = this.getAttribute('mode') === 'normal';
  }

  connectedCallback() {
    this.render(this.isNormalMode);
  }

  render(isNormalMode) {
    let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">angular-formbuilder documentation</a>
                </li>

                <li class="divider"></li>
                ${isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : ''}
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${isNormalMode ?
      'data-target="#modules-links"' : 'data-target="#xs-modules-links"'}>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#components-links-module-AppModule-b8d9c7d24047035b96cbb46a68cf3e12"' : 'data-target="#xs-components-links-module-AppModule-b8d9c7d24047035b96cbb46a68cf3e12"'}>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="components-links-module-AppModule-b8d9c7d24047035b96cbb46a68cf3e12"' :
      'id="xs-components-links-module-AppModule-b8d9c7d24047035b96cbb46a68cf3e12"'}>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AutocompleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckboxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ControlpanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlpanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DialogsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FieldComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RadiobuttonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RadiobuttonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SliderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#classes-links"' :
      'data-target="#xs-classes-links"'}>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'}>
                            <li class="link">
                                <a href="classes/Field.html" data-type="entity-link">Field</a>
                            </li>
                            <li class="link">
                                <a href="classes/Form.html" data-type="entity-link">Form</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#injectables-links"' :
      'data-target="#xs-injectables-links"'}>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'}>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link">ConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataConnectorService.html" data-type="entity-link">DataConnectorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataFlattnerService.html" data-type="entity-link">DataFlattnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormService.html" data-type="entity-link">FormService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#interfaces-links"' :
      'data-target="#xs-interfaces-links"'}>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'}>
                            <li class="link">
                                <a href="interfaces/ExampleFlatNode.html" data-type="entity-link">ExampleFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FoodNode.html" data-type="entity-link">FoodNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FoodNode-1.html" data-type="entity-link">FoodNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICodeEntry.html" data-type="entity-link">ICodeEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomValidation.html" data-type="entity-link">ICustomValidation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDialogConfig.html" data-type="entity-link">IDialogConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IField.html" data-type="entity-link">IField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFlatObject.html" data-type="entity-link">IFlatObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IForm.html" data-type="entity-link">IForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHTMLAttributes.html" data-type="entity-link">IHTMLAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IValidator.html" data-type="entity-link">IValidator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tile.html" data-type="entity-link">Tile</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#miscellaneous-links"'
      : 'data-target="#xs-miscellaneous-links"'}>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'}>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
    this.innerHTML = tp.strings;
  }
});
