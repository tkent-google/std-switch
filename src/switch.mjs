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

'use strict'; // This is not necessary for a module.

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
  // Both of Android and ChromeOS return "Linux foobar".
  if (theme == THEME_MATERIAL || theme == THEME_MATCH_PLATFORM && platform.startsWith('Linux'))
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
  border: 1px solid black;
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
  vertical-align: middle;
  user-select: none;

  /* Internal variables based on exposed variables */
  --i-color-on: var(--std-switch-color-on, #0077ff);
}

:host(:disabled),
:host([disabled]) {
  opacity: 0.4;
}

:host(:focus) {
  outline-offset: 5px;
}

internal-meter {
  --i-track-height: 100%;
  --i-track-border: 2px solid #dddddd;
  --i-track-border-on: 2px solid var(--i-color-on);
  --i-track-border-on-active: 2px solid #77bbff;
  --i-track-radius: 13px;
  --i-track-padding: 0px;
  --i-track-background: transparent;
  --i-track-background-active: #dddddd;
  --i-track-background-on: var(--i-color-on);
  --i-track-background-on-active: #77bbff;
  --i-track-shadow: 0 0 0 1px #f8f8f8;
  --i-track-shadow-focus: 0 0 0 2px #f8f8f8;
  --i-track-shadow-on: var(--i-track-shadow);
  --i-track-shadow-on-focus: 0 0 0 2px #dddddd;
  --i-track-shadow-on-active: 0 0 0 2px #f8f8f8;

  --std-meter-value-radius: var(--std-switch-track-inner-radius, 11px);
  --std-meter-value-background: var(--i-track-background-on);

  background: var(--std-switch-track-background, var(--i-track-background));
  border: var(--std-switch-track-border, var(--i-track-border));
  border-radius: var(--std-switch-track-radius, var(--i-track-radius));
  box-shadow: var(--std-switch-track-shadow, var(--i-track-shadow));
  padding: var(--std-switch-track--padding, var(--i-track-padding));
  inline-size: 100%;
  block-size: var(--std-switch-track-height, var(--i-track-height));
  transition: all linear 0.1s; /* TODO(customizable) */
}

:host([on]) internal-meter {
  --std-meter-value-background: var(--std-switch-track-background, var(--i-track-background-on));
  border: var(--std-switch-track-border, var(--i-track-border-on));
  box-shadow: var(--std-switch-track-shadow, var(--i-track-shadow-on));
}

:host(:focus) internal-meter {
  box-shadow: var(--std-switch-track-shadow, var(--i-track-shadow-focus));
}

:host([on]:focus) internal-meter {
  box-shadow: var(--std-switch-track-shadow, var(--i-track-shadow-on-focus));
}

/* We can't use :enabled until all major browsers support FACE. */

:host(:not(:disabled):active) internal-meter {
  background: var(--std-switch-track-background, var(--i-track-background-active));
}

:host([on]:not(:disabled):active) internal-meter {
  --std-meter-value-background: var(--std-switch-track-background, var(--i-track-background-on-active));
  border: var(--std-switch-track-border, var(--i-track-border-on-active));
  box-shadow: var(--std-switch-track-shadow, var(--i-track-shadow-on-active));
}

.container {
  position: relative;
  display: inline-flex;
  align-items: center;
  inline-size: 100%;
  block-size: 100%;
}

.thumb {
  --i-thumb-width: 22px;
  --i-thumb-width-hover: 26px;
  --i-thumb-height: 22px;
  --i-thumb-radius: calc(var(--std-switch-thumb-height, var(--i-thumb-height)) / 2);
  --i-thumb-border: 1px solid black;
  --i-thumb-border-focus: 2px solid black;
  --i-thumb-border-on: 1px solid #0077ff;
  --i-thumb-border-on-focus: 2px solid #0077ff;
  --i-thumb-background: white;
  --i-thumb-margin-start: 2px;
  --i-thumb-margin-end: 2px;

  position: absolute !important;
  display: inline-block;
  border: var(--std-switch-thumb-border, var(--i-thumb-border));
  border-radius: var(--std-switch-thumb-radius, var(--i-thumb-radius));
  inline-size: var(--std-switch-thumb-width, var(--i-thumb-width));
  block-size: var(--std-switch-thumb-height, var(--i-thumb-height));
  background: var(--std-switch-thumb-background, var(--i-thumb-background));
  box-sizing: border-box;
  inset-inline-start: var(--std-switch-thumb-margin-start, var(--i-thumb-margin-start));
  transition: all linear 0.1s; /* TODO(customizable) */
  box-shadow: var(--std-switch-thumb-shadow);
}

:host(:not(:disabled):hover) .thumb {
  inline-size: var(--std-switch-thumb-width, var(--i-thumb-width-hover));
}

:host([on]) .thumb {
  border: var(--std-switch-thumb-border, var(--i-thumb-border-on));
  inset-inline-start: calc(100% - var(--std-switch-thumb-width, var(--i-thumb-width)) - var(--std-switch-thumb-margin-end, var(--i-thumb-margin-end)));
}

:host(:focus) .thumb {
  border: var(--std-switch-thumb-border, var(--i-thumb-border-focus));
}

:host([on]:focus) .thumb {
  border: var(--std-switch-thumb-border, var(--i-thumb-border-on-focus));
}

:host([on]:not(:disabled):hover) .thumb {
  inset-inline-start: calc(100% - var(--std-switch-thumb-width, var(--i-thumb-width-hover)) - var(--std-switch-thumb-margin-end, var(--i-thumb-margin-end)));
}

@supports not (inset-inline-start: 0px) {

.thumb {
  left: var(--std-switch-thumb-margin-start, var(--i-thumb-margin-start));
}

:host([on]) .thumb {
  left: calc(100% - var(--std-switch-thumb-width, var(--i-thumb-width)) - var(--std-switch-thumb-margin-end, var(--i-thumb-margin-end)));
}

:host([on]:not(:disabled):hover) .thumb {
  left: calc(100% - var(--std-switch-thumb-width, var(--i-thumb-width-hover)) - var(--std-switch-thumb-margin-end, var(--i-thumb-margin-end)));
}

}
`;

const kSwitchStyleMaterial = `
:host {
  inline-size: 36px;
  block-size: 20px;
  --std-switch-track-height: 14px;
  --std-switch-track-background: rgba(0,0,0,0.4);
  --std-switch-track-border: none;
  --std-switch-track-shadow: none;
  --std-switch-thumb-margin-start: 0px;
  --std-switch-thumb-margin-end: 0px;
  --std-switch-thumb-width: 20px;
  --std-switch-thumb-height: 20px;
  --std-switch-thumb-shadow: 0 1px 5px 0 rgba(0,0,0,0.6);
  --std-switch-thumb-border: none;
}

:host([on]) {
  --std-switch-track-background: rgba(63,81,181,0.5);
  --std-switch-thumb-background: rgb(63,81,181);
}

.ripple {
  display: inline-block;
  position: absolute;
  opacity: 0;
  background: gray;
  inset-inline-start: 10px;
  inset-block-start: 10px;
  inline-size: 0px;
  block-size: 0px;
  border-radius: 0px;
  pointer-events: none;
}
`;

const kSwitchStyleCocoa = `
:host {
  inline-size: 51px;
  block-size: 31px;
  --std-switch-track-radius: 15px;
  --std-switch-track-border: 1px solid lightgray;
  --std-switch-track-shadow: none;
  --std-switch-thumb-height: 29px;
  --std-switch-thumb-width: 29px;
  --std-switch-thumb-border: none;
  --std-switch-thumb-margin-start: 1px;
  --std-switch-thumb-margin-end: 1px;
  --std-switch-thumb-shadow: 0px 3px 4px 1px rgba(0,0,0,0.2);
}

:host([on]) {
  --std-switch-track-background: #4ad963;
  --std-switch-track-border: 1px solid #4ad963;
}
`;

const kSwitchStyleFluent = `
:host {
  inline-size: 44px;
  block-size: 20px;
  --std-switch-track-border: 2px solid #333333;
  --std-switch-track-shadow: none;
  --std-switch-thumb-height: 10px;
  --std-switch-thumb-width: 10px;
  --std-switch-thumb-border: none;
  --std-switch-thumb-background: #333333;
  --std-switch-thumb-margin-start: 5px;
  --std-switch-thumb-margin-end: 5px;
}

:host([on]) {
  --std-switch-track-border: 2px solid #4cafff;
  --std-switch-track-background: #4cafff;
  --std-switch-thumb-background: white;
}

:host(:active) {
  --std-switch-track-border: 2px solid darkgray;
  --std-switch-track-background: darkgray;
  --std-switch-thumb-background: white;
}
`;


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

class StdSwitchElement extends HTMLElement {
  static get formAssociated() { return true; }
  static get observedAttributes() { return ['on']; }

  //checked = false;
  //_internals = null;

  constructor() {
    super();
    if (HTMLElement.prototype.attachInternals) {
      this._internals = this.attachInternals();
      this._internals.setFormValue('off');
    }
    installBoolReflection(this, 'disabled');
    installBoolReflection(this, 'on');
    installStringReflection(this, 'name');
    this.addEventListener('click', this._onClick.bind(this));
    this.addEventListener('keypress', this._onKeyPress.bind(this));
  }

  get form() { return this._internals ? this._internals.form : null; }
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
    // TODO(tkent): Having theme-specific code isn't smart.
    if (theme == THEME_MATERIAL) {
      this._rippleElement = this._thumbElement.appendChild(this.ownerDocument.createElement('span'));
      this._rippleElement.className = 'ripple';
      const keyframes = {
	  left: ['10px', '-15px'],
	  top: ['10px', '-15px'],
	  width: ['0px', '50px'],
	  height: ['0px', '50px'],
	  borderRadius: ['0px', '25px'],
          opacity: [0, 0.3]
      };
      this.addEventListener('mousedown', event => {
        this._rippleElement.animate(keyframes, {
	  duration: 100,
	  fill: 'forwards'});
      });
      this.addEventListener('mouseup', event => {
        this._rippleElement.animate({
	  opacity: [0.3, 0, 0],
	  width: ['50px', '50px', '0'],
	  height: ['50px', '50px', '0'],
	  left: ['-15px', '-15px', '10px'],
	  top: ['-15px', '-15px', '10px']
	}, {
	  duration: 1000,
	  fill: 'forwards'});
      });
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == 'on') {
      if (this._internals)
        this._internals.setFormValue(newValue != null ? 'on' : 'off');
      if (this._trackElement)
	this._trackElement.value = newValue != null ? 100 : 0;
      this.setAttribute('aria-checked', newValue != null ? 'true' : 'false');
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

    if (!this.hasAttribute('tabindex'))
      this.setAttribute('tabindex', '0');
    if (!this.hasAttribute('aria-role'))
      this.setAttribute('aria-role', 'switch');
    this.setAttribute('aria-checked', this.on ? 'true' : 'false');
  }

  _onClick(event) {
    if (this.hasAttribute('disabled') || this.matches(':disabled'))
      return;
    this.on = !this.on;
    queueMicrotask(() => {
      this.dispatchEvent(new Event('input', {bubbles: true, composed: true}));
      this.dispatchEvent(new Event('change', {bubbles: true, composed: true}));
    });
  }

  _onKeyPress(event) {
    if (this.hasAttribute('disabled') || this.matches(':disabled'))
      return;
    console.dir(event);
    if (event.code == 'Space') {
      event.preventDefault();
      this._onClick(event);
    }
  }
}

customElements.define('std-switch', StdSwitchElement);
