# A standard 'Switch' form control

## Authors

* Kent Tamura tkent@google.com

## Introduction

This document proposes a new HTML element for a 'switch' control.  It is provided as a [built-in module](https://github.com/tc39/proposal-javascript-standard-library/).

### Why a switch control?

Many UI frameworks have switch controls to represent off/on states and ask a user to change the state.  As of April 2019 the HTML standard has a checkbox, which is functionally similar to switch control.  However:

* Semantically, a switch and checkbox have different meanings, with a switch being more appropriate for turning things on/off. (See e.g. [Microsoft Fluent design guidelines](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/toggles#choosing-between-toggle-switch-and-check-box), [Nielsen Norman Group](https://www.nngroup.com/articles/toggle-switch-guidelines/), [UX Planet](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8).)
* Switches and checkboxes manifest differently to accessibility technology: see the [`switch` ARIA role](http://w3c.github.io/aria/#switch).
* It's hard to change checkbox's appearance to a switch-like appearance, for when that user experience is desired.

## Goals

* Identical appearance on all platforms and all supported browsers by default
* Easy and flexible customization
  * The switch control should provide a way to switch its appearance from the default one to platform-dependent one.
  * The switch control should provide a way to customize color, size, radius, etc. of its visual parts.
* API similar to existing form controls


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
```import 'std:elements/switch'``` defines ```<std-switch>``` element and ```StdSwitchElement``` interface.

```<std-switch>``` is similar to ```<input type=checkbox>``` in terms of API. A ```<std-switch>``` instance has two states; "off" and "on".  It doesn't support indeterminate state like the checkbox.

### Content attributes:

* [Global attributes](https://html.spec.whatwg.org/multipage/dom.html#global-attributes)
* ```autocomplete```
* ```disabled```
* ```form```
* ```name```
* ```required```

TODO: Supports ```autofocus```, which should be a global attribute. ([whatwg/html#4563](https://github.com/whatwg/html/issues/4563))

These attributes should work same as existing form controls.

```<std-switch>``` should support ```checked``` and ```defaultchecked``` attributes ([Issue #2](https://github.com/tkent-google/std-switch/issues/2)).  There are some approaches for them. We have not decided yet. ([Issue #4](https://github.com/tkent-google/std-switch/issues/4))

* A) Compatible with ```<input type=checkbox>```<br>
```checked``` attribute represents the default state, and ```defaultChecked``` property reflects on ```checked``` attribute. No attribute mapped to ```checked``` property.
* B) Simple mappings<br>
```defaultChecked``` property reflects on ```defaultchecked``` attribute value, and ```checked``` property reflects on ```checked``` attribute.  Code like ```switch.checked = true``` adds ```checked``` attribute.  We need to specify ```defaultchecked``` attribute if we want to reset the element to on state, like ```<std-switch defaultchecked checked>```

### Properties and functions

* ```checked```  - Represents the element's state.  See the previous section
* ```defaultChecked``` - Represents the default state.  See the previous section
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

There are two approaches. We have not decided yet. ([Issue #5](https://github.com/tkent-google/std-switch/issues/5))

* A) Compatible with ```<input type=checkbox>```<br>
 ```<std-swtich name=something>``` with "off" state will send no entry.  One with "on" state will send ```value``` attribute value if it exists, or ```something=on```.
* B) Send state simply<br>
 ```<std-swtich name=something>``` with "off" state will send ```something=off```, one with "on" state will send ```something=on```.


### Appearance customization

TODO: an easy flag to enable platform-dependent appearance ([Issue #6](https://github.com/tkent-google/std-switch/issues/6))
When the flag is enabled, ```std-switch``` element is styled as UISwitch on iOS, [Material Design switch](https://material.io/design/components/selection-controls.html#switches) on Android, [Fluent design toggle switch](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/toggles) on Windows.

TODO: Full customization.  Shadow parts? CSS custom properties? ([Issue #7](https://github.com/tkent-google/std-switch/issues/7))


## Security and Privacy Considerations

There are no known security or privacy impacts of this feature.  Security/privacy impact of this feature is same as `<input type=checkbox>`.

If the platform-dependent appearance is enabled, the origin can detect user's platform. However, that information is already exposed by `navigator.platform`.


## Considered alternatives

### Making &lt;input type=chekbox> customizable

Providing a swtich control as a variant of &lt;input type=checkbox> would be possible.
We can add ```switch``` content attribute, add ```swtich``` keyword to ```appearance``` CSS property, or something.

However, as decribed in 'Why a switch control?' section, using &lt;input type=checkbox>
for a switch control is semantically incorrect.
Also, it would add complexity to UA implementations, and it's difficult to provide
customization flexibility with a switch control implemented by these ways.

### Native implementation in UAs vs. a built-in module

Form control elements are major sources of interoperability issues.
Native implementations likely introduce new interoperability issues.

UAs can share a built-in module implementation because it's a JavaScript code,
and web developers won't see interoperablity issues with it at all.

### Third-party library, vs. a built-in module

See [JavaScript Standard Library Proposal](https://github.com/tc39/proposal-javascript-standard-library/)

## References &amp; Acknowledgements

* [whatwg/html#4180](https://github.com/whatwg/html/issues/4180) posted by Atishay Jain gave us a motivation to start this project.



