# JavaScript Calculator

My React-based app for the [Build a JavaScript Calculator](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator) freeCodeCamp project. I setup this version using create-react-app.

## Goals

- use React & Sass
- mobile-first responsive design
- grid container for keypad
- formula/expression logic (probably this!!!)

## To-do list

- positive/negative btn functionality
- digit limit
- proper math symbols for operators on display
- simple styling of elements
- make pretty

## Stretch goals

- keyboard input
- del/backspace key
- comma separation of digits
- without using eval

## Notes

### Lookbehinds

I originally used several regex Lookbehinds. However, these are still not supported in Safari, so I replaced with other regex solutions.

### Comma separated numbers

I fell down a bit of a rabbit hole trying to implement comma separated numbers on the display. There's not a straight-foward way to do this for numbers containing multiple decimal places using just a regex and replace().

So I opeted for using toLocalString(). By default, this method will remove any decimal zeros from the end (eg "2000.100" is converted to "2,000.1"), which is no good for processing inputs.

To get round this, we can use the minimumFractionDigits options. Obivously, this correct value for this option changes as we add extra digits to the number. So, before using toLocalString(), we need to test if the number contains a decimal point and if so how many decimal places it uses. We can then pass this value into the method eg:

`const newCurrVal = Number(removeCommas).toLocaleString('en-US', { minimumFractionDigits: minDigits })`
