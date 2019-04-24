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

There are some differences
* No indeterminate state
* ```checked``` attribute handling.

### Content attributes:

* [Global attributes](https://html.spec.whatwg.org/multipage/dom.html#global-attributes)
* autocomplete
* checked
* defaultchecked
* disabled
* form
* name
* required

TODO: autofocus

### Pseudo classes

* Global ones such as :focus :hover :target
* :valid
* :invalid
* :disabled
* :enabled

TODO: :checked, :required, :optional

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

### Appearance customization

TBW: an easy flag to enable platform-dependent appearance

TBW: Full customization

