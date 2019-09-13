# A standard 'Switch' form control

## Authors

* Kent Tamura tkent@google.com

## Introduction

This document proposes a new HTML element for a 'switch' control.  It is provided as a [built-in module](https://github.com/tc39/proposal-javascript-standard-library/).

This proposal is intended to incubate in the WICG once it gets interest on [its Discourse thread](https://discourse.wicg.io/t/proposal-a-toggle-switch-control-element/3620). After incubation, if it gains multi-implementer interest, it will graduate to the [HTML Standard](https://html.spec.whatwg.org/multipage/) as a new standard HTML element.

### Why a switch control?

Many UI frameworks have switch controls to represent off/on states and ask a user to change the state.  As of April 2019 the HTML standard has a checkbox, which is functionally similar to switch control.  However:

* Semantically, a switch and checkbox have different meanings, with a switch being more appropriate for turning things on/off. (See e.g. [Microsoft Fluent design guidelines](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/toggles#choosing-between-toggle-switch-and-check-box), [Nielsen Norman Group](https://www.nngroup.com/articles/toggle-switch-guidelines/), [UX Planet](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8).)
* Switches and checkboxes manifest differently to accessibility technology: see the [`switch` ARIA role](http://w3c.github.io/aria/#switch).
* It's hard to change checkbox's appearance to a switch-like appearance, for when that user experience is desired.

## Goals

* Identical appearance on all platforms and all supported browsers by default ([Issue #21](https://github.com/tkent-google/std-switch/issues/21))
* Easy and flexible customization
  * The switch control should provide a way to switch its appearance from the default one to platform-dependent one.
  * The switch control should provide a way to customize color, size, radius, etc. of its visual parts.
* API similar to existing form controls
* Explore new ways of building HTML elements, including:
  * Being perfectly polyfillable ([see below](#why-does-the-name-have-a-dash-in-it))
  * Being opt-in / lazy-loadable ([see below](#as-a-new-global-element-instead-of-a-built-in-module))

## Sample code

```html
<script type="module">
import 'std:elements/switch';
</script>

<form action="...">
  <label>Enable something <std-switch name="something"></std-switch></label>
  <input type="submit">
</form>
```

This shows something like:<br> <img alt="Sample image" src=switch-example.png width=215>

Users can turn on/off the switch by clicking it, and submitting the form will have an entry for the switch control.

[Demo page](https://tkent-google.github.io/std-switch/demo.html)

## Proposed API

The element is provided as a [built-in module](https://github.com/tc39/proposal-javascript-standard-library/).
```import 'std:elements/switch'``` defines ```<std-switch>``` element,
and it can expose ```StdSwitchElement``` interface.

### Content attributes:

* [Global attributes](https://html.spec.whatwg.org/multipage/dom.html#global-attributes)
* ```autocomplete```
* ```disabled```
* ```form```
* ```name```
* ```required```

TODO: Supports ```autofocus```, which should be a global attribute. ([whatwg/html#4563](https://github.com/whatwg/html/issues/4563))

These attributes should work same as existing form controls.

```<std-switch>``` should support ```on``` and ```defaulton``` attributes ([Issue #2](https://github.com/tkent-google/std-switch/issues/2)).

`defaultOn` property reflects on `defaulton` attribute value, and `on` property reflects on `on` attribute.
Code like `switch.on = true` adds `on` attribute.  We need to specify `defaulton` attribute
if we want to reset the element to on state, like `<std-switch defaulton on>`` ([Issue #4](https://github.com/tkent-google/std-switch/issues/4))

### Properties and functions

* `on`  - Represents the element's state.  See the previous section
* `defaultOn` - Represents the default state.  See the previous section
* ```disabled``` - Same as existing form controls
* ```form``` - Same as existing form controls
* ```labels``` - Same as existing form controls
* ```name``` - Same as existing form controls
* ```type``` - returns ```'std-switch'```
* ```willValidate``` - Same as existing form controls
* ```validationMessage``` - Same as existing form controls

* ```checkValidity()``` - Same as existing form controls
* ```reportValidity()``` - Same as existing form controls
* ```setCustomValidity(errorMessage)``` - Same as existing form controls


### Pseudo classes

* Global ones such as ```:focus``` ```:hover``` ```:target```
* ```:valid``` - match if the element has no ```required``` attribute, of if the element has ```required``` attribute and the state is on.
* ```:invalid``` - match if the element doesn't match to ```:valid```.
* ```:disabled``` - match if the element has ```disabled``` attribute, or an ancestor ```<fieldset>``` has ```disabled``` attribute.
* ```:enabled``` - match if the element doesn't match to ```:disabled```.

TODO: Supports ```:checked``` ([Issue #3](https://github.com/tkent-google/std-switch/issues/3)), ```:required```, and ```:optional``` ([w3c/webcomponents#813](https://github.com/w3c/webcomponents/issues/813))


### Events

```<std-switch>``` dispatches ```input``` and ```change``` events when a user changes the element's state.


### Relationship with other elements

* ```form```<br>
  Markup like ```<form>...<std-switch></std-switch>...</form>``` associates the ```<std-switch>``` element to the ```<form>```.   ```<form>```'s ```elements``` property lists the ```<std-switch>```, and submitting the ```<form>``` adds an entry for the ```<std-switch>```.
* ```fieldset```<br>
  Markup like ```<fieldset>...<std-switch></std-switch>...</fieldset>``` associates the ```<std-switch>``` element to the ```<fieldset>```.   ```<fieldset>```'s ```elements``` property lists the ```<std-switch>```, and disabling the ```<fieldset>``` also disables the ```<std-switch>``` implicitly.
* ```label```<br>
  Markup like ```<label>...<std-switch></std-switch></label>``` associates the ```<std-switch>``` element to the ```<label>```.  Clicking anywhere in the ```<label>``` changes the state of the ```<std-switch>```.
  

### Form submission

There are two approaches. We have not decided yet. ([Issue #15](https://github.com/tkent-google/std-switch/issues/15), [Issue #5](https://github.com/tkent-google/std-switch/issues/5))

* A) Compatible with ```<input type=checkbox>```<br>
 ```<std-switch name=something>``` with "off" state will send no entry.  One with "on" state will send ```value``` attribute value if it exists, or ```something=on```.
* B) Send state simply<br>
 ```<std-switch name=something>``` with "off" state will send ```something=off```, one with "on" state will send ```something=on```.


### Appearance customization

TODO: an easy flag to enable platform-dependent appearance ([Issue #6](https://github.com/tkent-google/std-switch/issues/6))
When the flag is enabled, ```std-switch``` element is styled as UISwitch on iOS, [Material Design switch](https://material.io/design/components/selection-controls.html#switches) on Android, [Fluent design toggle switch](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/toggles) on Windows.

The element provides full customization capability by [CSS Shadow Parts](https://www.w3.org/TR/css-shadow-parts-1/).
A ```<std-switch>``` contains three parts, `track`, `track-fill`, and `thumb`. `track` and `thumb` are siblings, and `track-fill` is a child of `track`.

<img alt="Part structure" src=part-structure.svg width=460>

(See [Issue #7](https://github.com/tkent-google/std-switch/issues/7))


## Security and Privacy Considerations

There are no known security or privacy impacts of this feature.  Security/privacy impact of this feature is same as `<input type=checkbox>`.

If the platform-dependent appearance is enabled, the origin can detect user's platform. However, that information is already exposed by `navigator.platform`.


## Considered alternatives

### Making `<input type=checkbox>` customizable

Providing a switch control as a variant of `<input type=checkbox>` would be possible.
We can add ```switch``` content attribute, add ```switch``` keyword to ```appearance``` CSS property, or something.

However, as decribed in the '[Why a switch control?](#why-a-switch-control)' section, using `<input type=checkbox>`
for a switch control is semantically incorrect.
Also, it would add complexity to UA implementations, and it's difficult to provide
customization flexibility with a switch control implemented by these ways.

### As a new global element (instead of a built-in module)

We would like to experiment with ways of making new HTML elements "pay for what you use".
Instead of every page paying the cost of loading a switch implementation into memory as a global (e.g. `window.HTMLSwitchElement`),
we want pages to opt in to using the switch control.
The JavaScript module import system provides a convenient mechanism for this,
which is also used by other APIs that share the same goals (such as [KV Storage](https://wicg.github.io/kv-storage/)).

Note that although adding a global switch control implementation is a small step,
it contributes to a [tragedy of the commons](https://en.wikipedia.org/wiki/Tragedy_of_the_commons),
which makes it harder and harder to add new APIs and elements.
Exploring an opt-in solution here opens the door to more sustainable growth overall.

### Leaving this up to libraries

It is possible to continue requiring that web developers use a library to implement switches.
We believe that the platform should instead provide a basic control such as a switch out of the box.
Major modern UI platforms (e.g. Android, iOS, Windows, macOS) all provide switch controls,
and the web should as well.
The story for macOS is "use [`NSSwitch`](https://developer.apple.com/documentation/appkit/nsswitch) and you get a switch control."
The story for the web should be similarly simple, instead of "use a checkbox, customize it with tons of CSS, and remember to change its ARIA `role=""`."


## FAQs

### Why does the name have a dash in it?

The name `<std-switch>` is unusual compared to built-in HTML elements,
none of which have a dash.
A more natural choice might be `<switch>`, or perhaps `<toggleswitch>`.

The reason to include a dash in the name is to allow the element to be polyfillable,
using custom elements.
We'd like to experiment with moving away from the world where browsers get a special namespace that can never be polyfilled.

There are alternative ways of achieving this goal;
for example, we could lift the dash restriction on custom element names.
There is some more discussion in [WICG/virtual-scroller#161](https://github.com/WICG/virtual-scroller/issues/161).
This is definitely subject to change as we continue to prototype.

### Is this a custom element?

Not really.
This is a proposal for a new built-in HTML element,
similar to other new-ish elements like `<details>`, `<dialog>`, or the proposed `<portal>`.
If it graduates from incubation successfully, it will become part of the HTML Standard.

The name does have a dash, as noted above.
And the goal of allowing custom elements to perfectly polyfill `<std-switch>` will mean that `<std-switch>` behaves like a custom element in many ways.
(As we proceed to writing a rigorous spec, those will be enumerated in detail.)
Indeed, browsers may even choose to implement `<std-switch>` using custom elements under the hood.
(Chromium plans to do so.)
But in the end, this is a new element intended for the HTML Standard,
meant to ship natively with browsers.

### Will all browsers share code for the switch control?

This is a decision for individual browser vendors to make.
Note that historically some parts of browser codebases are shared
(e.g. Web Audio, `RegExp` engines, Web RTC)
while many parts are implemented independently.

It will likely be easier to share code for `<std-switch>` than for `<input type=checkbox>`,
because our goal of making it 100% polyfillable and layered means that it will depend on standardized web-exposed API concepts instead of hooking directly into internal implementation details.
But in the end,
this repository will only provide a specification,
which can be implemented however makes most sense to individual browsers.

## References &amp; Acknowledgements

* [whatwg/html#4180](https://github.com/whatwg/html/issues/4180) posted by Atishay Jain gave us a motivation to start this project.



