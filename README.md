# Quizizz-cheat

There are two methods for retrieving answers.

1. [Fetching Quizizz API](#fetching-quizizz-api)
2. [Sending answers as someone else](#sending-answers-as-someone-else) (old method)

You can load this script automatically using a browser extension.
- [Using Tampermonkey](#load-automatically-using-tampermonkey)

# Methods
## Fetching Quizizz API

It should work in Test and Classic mode.
1. Join Quiz
2. Open console and paste this
```ts
fetch("https://raw.githubusercontent.com/gbaranski/quizizz-cheat/master/dist/bundle.js")
.then((res) => res.text()
.then((t) => eval(t)))
```
3. You can now close the console. The good answers should be highlighted by background opacity.

## Sending answers as someone else

An alternative method is more invasive. Instead of fetching Quizizz API, it sends a random answer to a current question as a different user (consuming his answer); as a response, Quizizz returns a valid answer, which is then displayed to the user.

1. Join quiz, wait for first question, and open console
2. Paste this code to the console
```ts
fetch("https://raw.githubusercontent.com/gbaranski/quizizz-cheat/oldmethod/dist/bundle.js")
.then((res) => res.text()
.then((t) => eval(t)))
```
3. Enter the user name of any other player (he won't get points even if he sent a valid answer).
4. Go to step 2

### Load automatically using Tampermonkey
1. Install the browser extension on **https://www.tampermonkey.net/**
2. Create a new user script and paste the contents of [scripts/tampermonkey-alternative-method.js](scripts/tampermonkey-alternative-method.js)
3. The script should now be automatically loaded every time you enter a quizizz.

As we can see on this screenshot, the answer **www.quizizz.com** has the highest opacity, indicating a valid answer.
![screenshot](/docs/screenshot_1.png)
