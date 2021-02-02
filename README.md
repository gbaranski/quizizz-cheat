# quizizz-cheat
## Works on Test and Classic mode
## Usage

1. Join quiz, wait for first question
2. Open console, paste this code
```ts
fetch("https://raw.githubusercontent.com/gbaranski/quizizz-cheat/master/dist/bundle.js")
.then((res) => res.text()
.then((t) => eval(t)))
```
3. Valid answers will be either highlighted or displayed in alert dialog, there's **no need** to paste this in console every question.


As we can see on this screenshot, anwser **www.quizizz.com** has highest opacity, that means its valid
![screenshot](/docs/screenshot_1.png)
