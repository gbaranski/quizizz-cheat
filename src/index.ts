console.log("Hi there!!");

interface VueObject {}

interface VueElement extends Element {
  __vue__: VueObject;
}

function start() {
  console.log("Running!");
  const fn = () => {
    // @ts-ignore
    const vue = document.querySelector("body > div").__vue__;
    console.log(vue);
  };
  setInterval(fn, 500);
}

const script: HTMLScriptElement = document.createElement("script");
script.setAttribute("type", "text/javascript");

const fnStr = `(${start.toString()})()`;
script.innerHTML = fnStr;

document.body.appendChild(script);
