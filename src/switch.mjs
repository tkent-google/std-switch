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

const PROP_CONTROL_THEME = '--std-control-theme';
const THEME_DEFAULT = 'default';
const THEME_MATCH_PLATFORM = 'match-platform';
const THEME_MATERIAL = 'material';
const THEME_COCOA = 'cocoa';
const THEME_FLUENT = 'fluent';

function effectiveTheme(theme) {
  let platform = navigator.platform;
  if (theme == THEME_MATERIAL || theme == THEME_MATCH_PLATFORM && platform == 'Android')
    return THEME_MATERIAL;
  if (theme == THEME_COCOA || theme == THEME_MATCH_PLATFORM && (platform.startsWith('iP') || platform.startsWith('Mac')))
    return THEME_COCOA;
  if (theme == THEME_FLUENT || theme == THEME_MATCH_PLATFORM && platform.startsWith('Win'))
    return THEME_FLUENT;
  return THEME_DEFAULT;
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
  background: var(--std-meter-value-background, red);
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
  vertical-align: bottom;
  user-select: none;

  /* Internal variables based on exposed variables */
  --i-color-on: var(--std-switch-color-on, #0077ff);
  --i-track-height: var(--std-switch-track-height, 100%);
  --i-track-border: var(--std-switch-track-border, 2px solid #dddddd);
  --i-track-border-on: var(--std-switch-track-border-on, 2px solid var(--i-color-on));
  --i-track-border-on-active: var(--std-switch-track-border-on-active, 2px solid #77bbff);
  --i-track-radius: var(--std-switch-track-radius, 13px);
  --i-track-padding: var(--std-switch-track--padding, 0px);
  --i-track-inner-radius: var(--std-switch-track-inner-radius, 11px);
  --i-track-background: var(--std-switch-track-background, transparent);
  --i-track-background-active: var(--std-switch-track-background-active, var(--std-switch-track-background, #dddddd));
  --i-track-background-on: var(--std-switch-track-background-on, var(--i-color-on));
  --i-track-background-on-active: var(--std-switch-track-background-on-active, var(--std-switch-track-background-on, #77bbff));
  --i-track-shadow: var(--std-switch-track-shadow, 0 0 0 1px #f8f8f8);
  --i-track-shadow-focus: var(--std-switch-track-shadow-focus, 0 0 0 2px #f8f8f8);
  --i-track-shadow-on: var(--std-switch-track-shadow-on);
  --i-track-shadow-on-focus: var(--std-switch-track-shadow-on-focus, 0 0 0 2px #dddddd);
  --i-track-shadow-on-active: var(--std-switch-track-shadow-on-active, 0 0 0 2px #f8f8f8);

  --i-thumb-width: var(--std-switch-thumb-width, 22px);
  --i-thumb-width-hover: var(--std-switch-thumb-width-hover, 26px);
  --i-thumb-height: var(--std-switch-thumb-height, 22px);
  --i-thumb-radius: var(--std-switch-thumb-radius, calc(var(--i-thumb-height) / 2));
  --i-thumb-border: var(--std-switch-thumb-border, 1px solid black);
  --i-thumb-border-focus: var(--std-switch-thumb-border-focus, 2px solid black);
  --i-thumb-border-on: var(--std-switch-thumb-border-on, 1px solid #0077ff);
  --i-thumb-border-on-focus: var(--std-switch-thumb-border-on-focus, 2px solid #0077ff);
  --i-thumb-background: var(--std-switch-thumb-background, white);
  --i-thumb-background-on: var(--std-switch-thumb-background-on, var(--std-switch-thumb-background, white));
  --i-thumb-margin-start: var(--std-switch-thumb-margin-start, 2px);
  --i-thumb-margin-end: var(--std-switch-thumb-margin-end, 2px);
  --i-thumb-shadow: var(--std-switch-thumb-shadow);


  --std-meter-border: var(--i-track-border);
  --std-meter-radius: var(--i-track-radius);
  --std-meter-padding: var(--i-track-padding);
  --std-meter-value-radius: var(--i-track-inner-radius);
  --std-meter-value-background: var(--i-track-background-on);
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
}

:host(:focus) internal-meter {
  box-shadow: var(--i-track-shadow-focus);
}
:host([on]:focus) internal-meter {
  box-shadow: var(--i-track-shadow-on-focus);
}

/* We can't use :enabled until all major browsers support FACE. */

:host(:not(:disabled):active) internal-meter {
  background: var(--i-track-background-active);
}
:host([on]:not(:disabled):active) internal-meter {
  --std-meter-value-background: var(--i-track-background-on-active);
  border: var(--i-track-border-on-active);
  box-shadow: var(--i-track-shadow-on-active);
}

internal-meter {
  background: var(--i-track-background);
  box-shadow: var(--i-track-shadow);
  inline-size: 100%;
  block-size: var(--i-track-height);
  transition: all linear 0.1s; /* TODO(customizable) */
}

.container {
  position: relative;
  display: inline-flex;
  align-items: center;
  inline-size: 100%;
  block-size: 100%;
}

.thumb {
  position: absolute !important;
  display: inline-block;
  border: var(--i-thumb-border);
  border-radius: var(--i-thumb-radius);
  inline-size: var(--i-thumb-width);
  block-size: var(--i-thumb-height);
  background: var(--i-thumb-background);
  box-sizing: border-box;
  inset-inline-start: var(--i-thumb-margin-start);
  transition: all linear 0.1s; /* TODO(customizable) */
  box-shadow: var(--i-thumb-shadow);
}

:host(:not(:disabled):hover) .thumb {
  inline-size: var(--i-thumb-width-hover);
}

:host([on]) .thumb {
  background: var(--i-thumb-background-on);
  border: var(--i-thumb-border-on);
  inset-inline-start: calc(100% - var(--i-thumb-width) - var(--i-thumb-margin-end));
}

:host(:focus) .thumb {
  border: var(--i-thumb-border-focus);
}

:host([on]:focus) .thumb {
  border: var(--i-thumb-border-on-focus);
}

:host([on]:not(:disabled):hover) .thumb {
  inset-inline-start: calc(100% - var(--i-thumb-width-hover) - var(--i-thumb-margin-end));
}
`;

const kSwitchStyleMaterial = `
:host {
  inline-size: 36px;
  block-size: 20px;
  --std-switch-track-height: 14px;
  --std-switch-track-background: rgba(0,0,0,0.4);
  --std-switch-track-background-on: rgba(63,81,181,0.5);
  --std-switch-track-border: none;
  --std-switch-track-border-on: none;
  --std-switch-track-border-on-active: none;
  --std-switch-thumb-margin-start: 0px;
  --std-switch-thumb-margin-end: 0px;
  --std-switch-thumb-width: 20px;
  --std-switch-thumb-width-hover: 20px;
  --std-switch-thumb-height: 20px;
  --std-switch-thumb-shadow: 0 1px 5px 0 rgba(0,0,0,0.6);
  --std-switch-thumb-border: none;
  --std-switch-thumb-border-focus: none;
  --std-switch-thumb-border-on: none;
  --std-switch-thumb-border-on-focus: none;
  --std-switch-thumb-background-on: rgb(63,81,181);
}

`;

const kSwitchStyleCocoa = `
:host {
  inline-size: 51px;
  block-size: 31px;
  --std-switch-track-radius: 15px;
  --std-switch-track-background-on: #4ad963;
  --std-switch-track-border: 1px solid lightgray;
  --std-switch-track-border-on: 1px solid #4ad963;
  --std-switch-thumb-height: 29px;
  --std-switch-thumb-width: 29px;
  --std-switch-thumb-width-hover: 29px;
  --std-switch-thumb-border: none;
  --std-switch-thumb-border-on: none;
  --std-switch-thumb-margin-start: 1px;
  --std-switch-thumb-margin-end: 1px;
  --std-switch-thumb-shadow: 0px 3px 4px 1px rgba(0,0,0,0.2);
}
`;

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
    this._initializeDOM();
  }

  /**
   * @param i 0-100 number
   */
  set value(i) {
    if (i < 0 || i > 100)
      throw new RangeError();
    let oldValue = this._value;
    this._value = i;
    this._barElement.style.inlineSize = i + '%';
  }

  _initializeDOM() {
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
    this.addEventListener('click', this._onClick.bind(this));
  }

  get form() { return this._internals.form; }
  get type() { return this.localName; }

  connectedCallback() {
    if (!this.isConnected)
      return;
    let theme = effectiveTheme(getComputedStyle(this).getPropertyValue(PROP_CONTROL_THEME).trim());
    this._initializeDOM();
    if (switchSheet) {
      let sheets = [switchSheet];
      if (theme == THEME_MATERIAL) {
        sheets.push(switchSheetMaterial);
      } else if (theme == THEME_COCOA) {
        sheets.push(switchSheetCocoa);
      } else if (theme == THEME_FLUENT) {
        sheets.push(switchSheetFluent);
      }
      this._root.adoptedStyleSheets = sheets;
    } else {
      let styleText = kSwitchStyle;
      if (theme == THEME_MATERIAL) {
        styleText += kSwitchStyleMaterial;
      } else if (theme == THEME_COCOA) {
        styleText += kSwitchStyleCocoa;
      } else if (theme == THEME_FLUENT) {
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
    this._trackElement.value = this.on ? 100 : 0;
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
