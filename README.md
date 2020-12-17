# quizizz-cheat
## Usage

1. Join quiz, wait for first question
2. Open console, paste this code
```ts
fetch("https://raw.githubusercontent.com/gbaranski/quizizz-cheat/master/dist/bundle.js")
.then((res) => res.text()
.then((t) => eval(t)))
```
3. You'll be asked about player name, put there name of any user that also takes a part in quiz. Bad answer will have much lower opacity than the correct ones.
4. Repeat step 2 and 3 every single question.


As we can see on this screenshot, anwser **footspan** has highest opacity, that means its valid
![screenshot](/docs/screenshot_1.png)