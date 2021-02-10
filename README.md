# JavaScript Calculator

My React-based app for the [Build a JavaScript Calculator](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator) freeCodeCamp project. I setup this version using create-react-app.

I found this project quite challenging, as there are many permutations when it comes to processing the inputs and outputs. Particularly as I decided to add in functionality beyond what the FCC brief required. So, I spent a lot of time fixing various bugs and I'm sure they're still some I've missed. However, I did get to brush up on my regex and .replace() skills.

Extra features I added include:

- formula display
- comma separation of numbers
- del/backspace button
- pos/neg button
- limited max digits to 16
- keyboard controls

## Goals

- use React & Sass
- mobile-first responsive design
- grid container for keypad
- formula/expression logic)

## To-do list

- proper math symbols for operators on display
- simple styling of elements
- make pretty

## Stretch goals

- without using eval

## Notes

### Lookbehinds

I originally used several regex Lookbehinds. However, these are still not supported in Safari, so I replaced with other regex solutions.

### Comma separated numbers

I fell down a bit of a rabbit hole trying to implement comma-separated numbers on the display. I originally opted for toLocalString() but this was rounding very large numbers (16+ digits), so I borrowed a regex from a [Stack Overflow post](https://stackoverflow.com/a/2901298/8958062).

To deal with the decimals, we need to remove them first using .split(".") and then add then back later using .join(".")

### Digit limit

I originally opted for a digit limit of 21 as after this JS switches to scientific notation (ie 1e+22). However, I realised that when converting a number to a string, numbers starting getting rounded after 16 digits! So there's not really much point going beyond 16.

### eval() alternative

Because the formula that gets built up from the inputs has to be stored as a string (eg "2+-57\*5"), the simplest way to evaluate the result is to use eval() method. But everyone tells you that eval() is EVIL, including the React package which spams you through both the linter and the dev console!

The reasons for this is two-fold:

- eval() is a serious security risk because of its potential for malicious code injection
- eval() can slow down your app because it invokes the JS interpreter

If my understanding is correct, eval() is not really a security risk in this context because the input is strictly limited to digits and math operators and is not stored or shared anywhere.

However, I still wanted to see if I could up with a solution that didn't involve using eval(). Admittedly, I didn't get very far by myself and my solution is heavily based on one posted on [Stack Overflow](https://stackoverflow.com/a/6482814/8958062).
