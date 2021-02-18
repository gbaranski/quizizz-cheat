# quizizz-cheat

There are two method of retrieving answers

- [Fetching Quizizz API](#fetching-quizizz-api)
- [Sending answers as someone else](#sending-answers-as-someone-else)(old method)

# Methods
## Fetching Quizizz API

Should work in Test and Classic mode.
1. Join Quiz
2. Open console and paste this
```ts
fetch("https://raw.githubusercontent.com/gbaranski/quizizz-cheat/master/dist/bundle.js")
.then((res) => res.text()
.then((t) => eval(t)))
```
3. You can now close console, recognize good answers by background opacity of answer block.

## Sending answers as someone else

This works in different way, instead of fetching Quizizz API it sends answer to current question as someone else, Quizizz returns valid answer in response to submission.

1. Join quiz, wait for first question and open console
2. Paste this code to console
```ts
fetch("https://raw.githubusercontent.com/gbaranski/quizizz-cheat/oldmethod/dist/bundle.js")
.then((res) => res.text()
.then((t) => eval(t)))
```
3. Enter user name of any player(he won't get points even if he sent valid answer).
4. Go to step 2


As we can see on this screenshot, anwser **www.quizizz.com** has highest opacity, that means its valid
![screenshot](/docs/screenshot_1.png)
