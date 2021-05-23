// ==UserScript==
// @name         Quizizz Cheat
// @source       https://github.com/gbaranski/quizizz-cheat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       gbaranski, PsuperX 
// @match        https://quizizz.com/*
// @icon         https://cf.quizizz.com/img/favicon/favicon-32x32.png
// @require      https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        none
// ==/UserScript==

// We need to wait until the options-container is created!
waitForKeyElements(".options-container", onQuizCreate)
let isQuizCreated = false

function onQuizCreate() {
    if (isQuizCreated) return // Quick fix to ensure script is only loaded once
    isQuizCreated = true

    // Start the magic
    fetch("https://raw.githubusercontent.com/gbaranski/quizizz-cheat/master/dist/bundle.js")
        .then((res) => res.text()
        .then((t) => eval(t)))
}
