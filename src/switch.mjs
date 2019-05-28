// Copyright 2019 The Chromium Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// https://html.spec.whatwg.org/C/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes

function installBoolReflection(obj, attrName, propName = attrName) {
  Object.defineProperty(obj, propName, {
    enumerable: true,
    get() {
      return this.hasAttribute(attrName);
    },
    set(v) {
      if (v)
        this.setAttribute(attrName, "");
      else
        this.removeAttribute(attrName);
    }
  });
}

function installStringReflection(obj, attrName, propName = attrName) {
  Object.defineProperty(obj, propName, {
    enumerable: true,
    get() {
      let value = this.getAttribute(attrName);
      return value === null ? '' : value;
    },
    set(v) {
      this.setAttribute(attrName, v);
    }
  });
}

const APP_MATCH_PLATFORM = 'match-platform';

function isMaterial(app) {
  return app == 'material' || app == APP_MATCH_PLATFORM && navigator.platform == 'Android';
}

function isCocoa(app) {
  return app == 'cocoa' || app == APP_MATCH_PLATFORM && (navigator.platform.startsWith('iP') || navigator.platform.startsWith('Mac'));
}

function isFluent(app) {
  return app == 'fluent' || app == APP_MATCH_PLATFORM && navigator.platform.startsWith('Win');
}


const kMeterStyle = `
:host {
  display: inline-block;
  inline-size: 10em;
  block-size: 1em;
  border: var(--std-meter-border, 1px solid black);
  border-radius: var(--std-meter-radius);
  padding: var(--std-meter-padding);
  box-sizing: border-box;
  overflow: hidden;
}

.bar {
  display: inline-block;
  background: var(--std-meter-value-background, lime);
  block-size: 100%;
  inline-size: 0%;
  border-radius: var(--std-meter-value-radius);
  vertical-align: top;
  box-sizing: border-box;
  box-shadow: var(--std-meter-value-shadow);
  transition: all linear 0.1s;
}`;

const kSwitchStyle = `
:host {
  display: inline-block;
  border: none;
  inline-size: 54px;
  block-size: 26px;
  box-sizing: border-box;

  /* Internal variables based on exposed variables */
  --i-track-border: var(--std-switch-track-border, 2px solid #dddddd);
  --i-track-border-on: var(--std-switch-track-border-on, 2px solid var(--i-color-on));
  --i-track-radius: var(--std-switch-track-radius, 13px);
  --i-track-padding: var(--std-switch-track--padding, 0px);
  --i-track-inner-radius: var(--std-switch-track-inner-radius, 11px);
  --i-track-background: var(--std-switch-track-background, transparent);
  --i-track-background-on: var(--std-switch-track-background-on, var(--i-color-on));
  --i-track-shadow: var(--std-switch-track-shadow, 0 0 0 1px #f8f8f8);
  --i-track-shadow-focus: var(--std-switch-track-shadow-focus, 0 0 0 2px #f8f8f8);
  --i-track-shadow-on: var(--std-switch-track-shadow-on);
  --i-track-shadow-on-focus: var(--std-switch-track-shadow-on-focus, 0 0 0 2px #dddddd);
  --i-color-on: var(--std-switch-color-on, #0077ff);

  --std-meter-border: var(--i-track-border);
  --std-meter-radius: var(--i-track-radius);
  --std-meter-padding: var(--i-track-padding);
  --std-meter-value-radius: var(--i-track-inner-radius);
  --std-meter-value-background: var(--i-track-background);
}

:host(:disabled) {
  opacity: 0.4;
}

:host(:focus) {
  outline-offset: 5px;
}

:host([on]) internal-meter  {
  border: var(--i-track-border-on);
  box-shadow: var(--i-track-shadow-on);
  --std-meter-value-background: var(--i-track-background-on);
}

:host(:focus) internal-meter {
  box-shadow: var(--i-track-shadow-focus);
}
:host([on]:focus) internal-meter {
  box-shadow: var(--i-track-shadow-on-focus);
}

/* We can't use :enabled until all major browsers support FACE. */

:host(:not(:disabled):active) internal-meter {
  background-color: #dddddd;
}
:host([on]:not(:disabled):active) internal-meter {
  --std-meter-value-background: #77bbff;
  border-color: #77bbff;
  box-shadow: 0 0 0 2px #f8f8f8;
}

internal-meter {
  box-shadow: var(--i-track-shadow);
  inline-size: 100%;
  block-size: var(--std-switch-track-height, 100%);
  transition: all linear 0.1s;
}

.container {
  position: relative;
  display: inline-flex;
  align-items: center;
  inline-size: 100%;
  block-size: 100%;
}

.thumb {
  --thumb-width: var(--std-switch-thumb-width, 22px);
  --thumb-width-hover: var(--std-switch-thumb-width, 26px);
  --thumb-height: 22px;
  --thumb-radius: calc(var(--thumb-height) / 2);
  --thumb-right-margin: var(--std-switch-thumb-right-margin, 2px);

  position: absolute !important;
  display: inline-block;
  border: var(--std-switch-thumb-border, 1px solid black);
  border-radius: var(--thumb-radius);
  inline-size: var(--thumb-width);
  block-size: var(--thumb-height);
  background: white;
  box-sizing: border-box;
  inset-inline-start: var(--std-switch-thumb-left-margin, 2px);
  transition: all linear 0.1s;
}

:host(:not(:disabled):hover) .thumb {
  inline-size: var(--thumb-width-hover);
}

:host([on]) .thumb {
  border: var(--std-switch-thumb-border-on, 1px solid #0077ff);
  inset-inline-start: calc(100% - var(--thumb-width) - var(--thumb-right-margin));
}

:host(:focus) .thumb {
  border-width: 2px;
}

:host([on]:not(:disabled):hover) .thumb {
  inset-inline-start: calc(100% - var(--thumb-width-hover) - var(--thumb-right-margin));
}
`;

const kSwitchStyleMaterial = ``;
const kSwitchStyleCocoa = ``;
const kSwitchStyleFluent = ``;


let meterSheet;
let switchSheet, switchSheetMaterial, switchSheetCocoa, switchSheetFluent;
if (document.adoptedStyleSheets !== undefined) {
  meterSheet = new CSSStyleSheet();
  meterSheet.replaceSync(kMeterStyle);
  switchSheet = new CSSStyleSheet();
  switchSheet.replaceSync(kSwitchStyle);
  switchSheetMaterial = new CSSStyleSheet();
  switchSheetMaterial.replaceSync(kSwitchStyleMaterial);
  switchSheetCocoa = new CSSStyleSheet();
  switchSheetCocoa.replaceSync(kSwitchStyleCocoa);
  switchSheetFluent = new CSSStyleSheet();
  switchSheetFluent.replaceSync(kSwitchStyleFluent);
}

class InternalMeterElement extends HTMLElement {
  //#barElement;
  //#value = 0;

  constructor() {
    super();
    this._value = 0;
  }

  connectedCallback() {
    this.maybeInitialize();
  }

  /**
   * @param i 0-100 number
   */
  set value(i) {
    if (i < 0 || i > 100)
      throw new RangeError();
    let oldValue = this._value;
    this._value = i;
    this.maybeInitialize();
    //this._barElement.animate({width: [oldValue + '%', i + '%']}, 300);
    this._barElement.style.inlineSize = i + '%';
  }

  maybeInitialize() {
    if (this._barElement)
      return;
    let doc = this.ownerDocument;
    let root = this.attachShadow({mode: 'closed'});
    if (meterSheet) {
      root.adoptedStyleSheets = [meterSheet];
    } else {
      let style = doc.createElement('style');
      style.textContent = kMeterStyle;
      root.appendChild(style);
    }
    this._barElement = doc.createElement('span');
    this._barElement.className = 'bar';
    root.appendChild(this._barElement);
  }
}

// TODO(tkent): We'd like not to expose this element.
// Need scoped registry? https://github.com/w3c/webcomponents/issues/716
customElements.define('internal-meter', InternalMeterElement);

export class StdSwitchElement extends HTMLElement {
  static get formAssociated() { return true; }

  //checked = false;
  //_internals = null;

  constructor() {
    super();
    if (HTMLElement.prototype.attachInternals)
      this._internals = this.attachInternals();
    installBoolReflection(this, 'disabled');
    installBoolReflection(this, 'on');
    installStringReflection(this, 'name');
  }

  get form() { return this._internals.form; }
  get type() { return this.localName; }

  connectedCallback() {
    if (!this.isConnected)
      return;
    let appearance = getComputedStyle(this).getPropertyValue('--std-control-appearance');
    this._initializeDOM();
    this.addEventListener('click', this._onClick.bind(this));
    if (switchSheet) {
      let sheets = [switchSheet];
      if (isMaterial(appearance)) {
        sheets.push(switchSheetMaterial);
      } else if (isCocoa(appearance)) {
        sheets.push(switchSheetCocoa);
      } else if (isFluent(appearance)) {
        sheets.push(switchSheetFluent);
      }
      this._root.adoptedStyleSheets = sheets;
    } else {
      let styleText = kSwitchStyle;
      if (isMaterial(appearance)) {
        styleText += kSwitchStyleMaterial;
      } else if (isCocoa(appearance)) {
        styleText += kSwitchStyleCocoa;
      } else if (isFluent(appearance)) {
        styleText += kSwitchStyleFluent;
      }
      this._root.querySelector('style').textContent = styleText;
    }
  }

  _initializeDOM() {
    if (this._root)
      return;
    let doc = this.ownerDocument;
    this._root = this.attachShadow({mode: 'closed'});
    if (!switchSheet)
      this._root.appendChild(doc.createElement('style'));
    let container = doc.createElement('span');
    container.className = 'container';
    this._root.appendChild(container);
    this._trackElement = container.appendChild(doc.createElement('internal-meter'));
    this._thumbElement = container.appendChild(doc.createElement('span'));
    this._thumbElement.className = 'thumb';
  }

  _onClick(event) {
    this.on = !this.on;
    this._trackElement.value = this.on ? 100 : 0;
    queueMicrotask(() => {
      this.dispatchEvent(new Event('input', {bubbles: true, composed: true}));
      this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
    });
  }
}

customElements.define('std-switch', StdSwitchElement);
