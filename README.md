# JavaScript Calculator

My React-based app for the [Build a JavaScript Calculator](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator) freeCodeCamp project. I setup this version using create-react-app.

I found this project quite challenging, as there are many permutations when it comes to processing the inputs and outputs. Particularly as I decided to add in functionality beyond what the FCC brief required. So, I spent a lot of time fixing various bugs and I'm sure they're still some I've missed. However, I did get to brush up on my regex and .replace() skills.

Extra features I added include:

- formula display
- comma separation of numbers
- del/backspace button
- pos/neg button
- limited max digits to 21 (JS switches to scientific notation at 22)
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

I fell down a bit of a rabbit hole trying to implement comma-separated numbers on the display. There's not a straight-forward way to do this for numbers containing a variable number of decimal places using just a regex and replace(). The only solution I could think of would be to remove the decimal section, add in the commas with regex/replace() and then add the decimal section back.

In the end (for better or worse!), I opted for using toLocalString(). However, by default, this method will remove any decimal zeros from the end (eg "2000.100" is converted to "2,000.1"), which is no good for processing calculator inputs!

To get around this, we can use the minimumFractionDigits option. Obviously, the correct value for this option changes as we add extra decimal places to the number. So, before using toLocalString(), we need to test if the number contains a decimal point and if so how many decimal places it uses. We can then pass this value into the method eg:

`const newCurrVal = Number(removeCommas).toLocaleString('en-US', { minimumFractionDigits: minDigits })`

### eval() alternative

Because the formula that gets built up from the inputs has to be stored as a string (eg "2+-57\*5"), the simplest way to evaluate the result is to use eval() method. But everyone tells you that eval() is EVIL, including the React package which spams you through both the linter and the dev console!

The reasons for this is two-fold:

- eval() is a serious security risk because of its potential for malicious code injection
- eval() can slow down your app because it invokes the JS interpreter

If my understanding is correct, eval() is not really a security risk in this context because the input is strictly limited to digits and math operators and is not stored or shared anywhere.

However, I still wanted to see if I could up with a solution that didn't involve using eval(). Admittedly, I didn't get very far by myself and my solution is heavily based on one posted on [Stack Overflow](https://stackoverflow.com/a/6482814/8958062).
