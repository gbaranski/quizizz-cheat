import { ServerRequest, ServerResponse, VueElement } from "./types";

console.log("Hi there!!");

const sendResponse = async (request: ServerRequest): Promise<void> => {
  const res = await fetch("https://game.quizizz.com/play-api/v4/proceedGame", {
    method: "POST",
    body: JSON.stringify(request),
  });
  console.log({ res });
  console.log({ json: await res.json() });
};

const getQuestionInfo = (): Promise<{
  id: string;
  roomHash: string;
}> => {
  const rootObject = document.querySelector("body > div") as VueElement | null;
  if (!rootObject) throw new Error("Could not retreive root object");
  const vue = rootObject.__vue__;

  return new Promise((resolve, reject) => {
    // Non blocking loop
    const interval = setInterval(() => {
      const questionId = vue.$store._vm.currentQuestion.id;
      const roomHash = vue.$store._vm._data.$$state.game.data.roomHash;
      if (questionId && roomHash) {
        resolve({
          id: questionId,
          roomHash,
        });
        clearInterval(interval);
      }
    }, 0);
  });
};

async function start() {
  console.log("Started!");
  const questionInfo = await getQuestionInfo();
  console.log("Successfully retreived question info!");

  // @ts-ignore
  window.getAnwsers = async () => {
    const request: ServerRequest = {
      gameType: "live",
      playerId: Math.random().toString(16),
      powerupEffects: {
        destroy: [],
      },
      questionId: questionInfo.id,
      response: {
        attempt: 0,
        isEvaluated: false,
        //   @ts-ignore just for testing
        provisional: undefined,
        questionId: questionInfo.id,
        questionType: "MSQ",
        response: [0, 3],
        responseType: "original",
        timeTaken: Math.floor(Math.random() * 10000),
      },
      roomHash: questionInfo.roomHash,
    };
    sendResponse(request);
  };
}

const script: HTMLScriptElement = document.createElement("script");
script.setAttribute("type", "text/javascript");

const fnStr = `(${start.toString()})()`;
script.innerHTML = fnStr;

document.body.appendChild(script);
