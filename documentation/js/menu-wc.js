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
                    <a href="index.html" data-type="index-link">formbuilder documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
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
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/FormbuilderModule.html" data-type="entity-link">FormbuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' : 'data-target="#xs-components-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' :
                                            'id="xs-components-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' }>
                                            <li class="link">
                                                <a href="components/AutocompleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BaseFieldComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BaseFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckboxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormbuilderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormbuilderComponent</a>
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
                                                <a href="components/TextInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' : 'data-target="#xs-injectables-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' :
                                        'id="xs-injectables-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataFlattnerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataFlattnerService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' : 'data-target="#xs-pipes-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' :
                                            'id="xs-pipes-links-module-FormbuilderModule-57c1aea1e1420da2f657ae85f79405a0"' }>
                                            <li class="link">
                                                <a href="pipes/TranslatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TranslatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataConnectorService.html" data-type="entity-link">DataConnectorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormbuilderService.html" data-type="entity-link">FormbuilderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormService.html" data-type="entity-link">FormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslationService.html" data-type="entity-link">TranslationService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AutoSearch.html" data-type="entity-link">AutoSearch</a>
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
                                <a href="interfaces/IFormObj.html" data-type="entity-link">IFormObj</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHTMLAttributes.html" data-type="entity-link">IHTMLAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISliderConfig.html" data-type="entity-link">ISliderConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IValidator.html" data-type="entity-link">IValidator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuNode.html" data-type="entity-link">MenuNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/optionsConfig.html" data-type="entity-link">optionsConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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