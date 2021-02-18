# JavaScript Calculator

My React-based app for the [Build a JavaScript Calculator](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator) freeCodeCamp project. I setup this version using create-react-app.

You can [see the app in action](https://mercenary-calculator.netlify.app/) here.

I found this project quite challenging and time consuming, as there are many permutations when it comes to processing the inputs and outputs. Particularly as I decided to add in functionality beyond what the FCC brief required and wanted to complete the project without using `eval()`.

So, I spent a lot of time fixing various bugs and I'm sure they're still some I've missed. However, it was great refresher for using regex and `replace()`.

Extra features I added include:

- formula display with customised scrollbar (I used the [react-custom-scrollbars library](https://github.com/malte-wessel/react-custom-scrollbars))
- comma separation of digits
- a del/backspace button
- a proper pos/neg button (as opposed to just using the subtract key)
- limited max digits to 21
- keyboard controls

## Notes

### Lookbehinds

I initially used several regex Lookbehinds. However, these are still not supported in Safari, so I replaced them with other regex solutions. Damn you Safari!!!

### Comma separated digits

I fell down a bit of a rabbit hole trying to implement comma-separated digits for the display. I originally opted for `toLocalString()` but this was rounding very large numbers (16+ digits), so I borrowed a regex from a [Stack Overflow post](https://stackoverflow.com/a/2901298/8958062).

To deal with the decimals, we need to remove and store them first using `split(".")` and then add then back later using `join(".")`.

### Digit limit

I opted for a digit limit of 21 as after this JS switches to scientific notation (ie 1e+21). However, when converting to a string, large numbers starting getting rounded after 16 significant digits! So perhaps there's not really much point going beyond 16?

### eval() alternative

Because the formula that gets built up from the inputs has to be stored as a string (eg "2+-57\*5"), the simplest way to evaluate the result is to use the `eval()` method. But everyone tells you that `eval()` is pure EVIL. The MDN tell you never to use it and the React dev environment spams you with warnings through both the linter and the dev console!

The reason for this disapproval is two-fold:

- `eval()` is a serious security risk because of its potential for malicious code injection
- `eval()` can slow down your app significantly because it invokes the JS interpreter

If my understanding is correct, `eval()` is not really a security risk in this context because the input is strictly limited to digits and math operators and is not stored or shared anywhere.

Anyway, I still wanted to see if I could up with a solution that didn't involve using `eval()`. Admittedly, I didn't get very far by myself and my solution is heavily based on one posted on [Stack Overflow](https://stackoverflow.com/a/6482814/8958062).

But I still had to modify their regex to account for negative numbers and exponentials (eg 1e+24). I also switched to using `match()` instead of relying on the `RegExp.$1`, `RegExp.$2`, etc properties, which are now deprecated and may be removed from JS in the future.
