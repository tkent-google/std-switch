Definitely WIP

# An interoperable 'Switch' form control

This document explains a new HTML element for a 'switch' form control.  

## Why a switch control?

Many UI frameworks have toggle-switch widgets to represent off/on states and ask a user to change the state.  The current HTML standard has a checkbox, 

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

## Goals

## Proposed API

```<std-switch>``` is similar to ```<input type=checkbox>``` in terms of API.

### Content attributes:

* [Global attributes](https://html.spec.whatwg.org/multipage/dom.html#global-attributes)
* ```autocomplete```
* ```disabled```
* ```form```
* ```name```
* ```required```

TODO: Supports ```autofocus```

```<std-switch>``` should support ```checked``` and ```defaultchecked``` attributes.  There are some approaches for them. We have not decided yet.

* A) Compatible with ```<input type=checkbox>```<br>
```checked``` attribute represents the default state, and ```defaultChecked``` property reflects on ```checked``` attribute. No attribute mapped to ```checked``` property.
* B) Simple mappings<br>
```defaultChecked``` property reflects on ```defaultchecked``` attribute value, and ```checked``` property reflects on ```checked``` attribute.  Code like ```switch.checked = true``` adds ```checked``` attribute.  We need to specify ```defaultchecked``` attribute if we want to reset the element to on state, like ```<std-switch defaultchecked checked>```

### Properties and functions

* ```checked```
* ```defaultChecked```
* ```disabled```
* ```form```
* ```labels```
* ```name```
* ```type``` - returns ```'std-switch'```
* ```willValidate```
* ```validationMessage```

* ```checkValidity()```
* ```reportValidity()```
* ```setCustomValidity(errorMessage)```

### Pseudo classes

* Global ones such as ```:focus``` ```:hover``` ```:target```
* ```:valid``` - match if the element has no ```required``` attribute, of if the element has ```required``` attribute and the state is on.
* ```:invalid``` - match if the element doesn't match to ```:valid```.
* ```:disabled``` - match if the element has ```disabled``` attribute, or an ancestor ```<fieldset>``` has ```disabled``` attribute.
* ```:enabled``` - match if the element doesn't match to ```:disabled```.

TODO: Supports ```:checked```, ```:required```, and ```:optional```


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

There are two approaches. We have not decided yet.

* A) Compatible with ```<input type=checkbox>```<br>
 ```<std-swtich name=something>``` with off state will send no entry.  One with on state will send ```value``` attribute value if it exists, or ```something=on```.
* B) Send state simply<br>
 ```<std-swtich name=something>``` with off state will send ```something=off```, one with on state will send ```something=on```.


### Appearance customization

TBW: an easy flag to enable platform-dependent appearance

TBW: Full customization

