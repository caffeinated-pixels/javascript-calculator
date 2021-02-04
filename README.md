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

I fell down a bit of a rabbit hole trying to implement comma-separated numbers on the display. There's not a straight-forward way to do this for numbers containing multiple decimal places using just a regex and replace(). The only solution I could think of would be to remove the decimal section, add in the commas with regex/replace() and then add the decimal section back.

In the end, I opted for using toLocalString(). However, by default, this method will remove any decimal zeros from the end (eg "2000.100" is converted to "2,000.1"), which is no good for processing calculator inputs!

To get around this, we can use the minimumFractionDigits option. Obviously, the correct value for this option changes as we add extra decimal places to the number. So, before using toLocalString(), we need to test if the number contains a decimal point and if so how many decimal places it uses. We can then pass this value into the method eg:

`const newCurrVal = Number(removeCommas).toLocaleString('en-US', { minimumFractionDigits: minDigits })`
