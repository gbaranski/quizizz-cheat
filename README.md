# quizizz-cheat
## Usage

1. Join quiz, wait for first question
2. Open console, paste this code
```ts
fetch("https://raw.githubusercontent.com/gbaranski/quizizz-cheat/master/dist/bundle.js")
.then((res) => res.text()
.then((t) => eval(t)))
```
3. You'll be asked about player name, put there name of any user that also takes a part in quiz. Answer will be printed out in console.
4. Repeat step 2 and 3 every single question.
