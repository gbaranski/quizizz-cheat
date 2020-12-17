import { ServerRequest, ServerResponse, VueElement } from "./types";

console.log("Hi there!");

const getQuestionVueObject = () => {
  const questionsElem = document.querySelector(
    "body > div > div.root-component > div > div > div > div.page-container.in-quiz > div.screen.screen-game > div.transitioner.transitioner-component > div > div > div > div > div > div.options-container"
  ) as VueElement | null;
  if (!questionsElem)
    throw new Error("Unable to retreive questions list element");
  const vueObject = questionsElem.__vue__;
  if (!vueObject)
    throw new Error("Unable to retreive vue object on questions list element");
  return vueObject;
};

const getAnswersForArray = (anwsers: any[]) => {
  const vueObject = getQuestionVueObject();
  const validAnswers = vueObject.options
    .filter((e) => anwsers.some((v) => v === e.actualIndex))
    .map((e) => e.text);
  console.log(validAnswers);
};
const getAnwsersForSingle = (anwser: number) => {
  const vueObject = getQuestionVueObject();
  const validAnswers = vueObject.options
    .filter((e) => e.actualIndex === anwser)
    .map((e) => e.text);
  console.log(validAnswers);
};

const getAnwsersForText = (obj: any[]) => {
  const anwsers = obj.map((e) => e.text);
  console.log(anwsers);
};

const sendResponse = async (request: ServerRequest): Promise<void> => {
  const res = await fetch("https://game.quizizz.com/play-api/v4/proceedGame", {
    headers: {
      accept: "application/json",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,no;q=0.7,pl;q=0.6",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "experiment-name": "main_main",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-csrf-token": "eCAD63NH-xDaB6c-M4tnWof4elPFwcM1-_ZY",
    },
    referrer: "https://quizizz.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify(request),
    method: "POST",
    mode: "cors",
    credentials: "include",
  });

  const json = (await res.json()) as ServerResponse;
  console.log(json);
  const answer = json.question.structure.answer;
  if (answer instanceof Array && answer.length > 0) getAnswersForArray(answer);
  else if (typeof answer == "number") getAnwsersForSingle(answer);
  else if (json.question.structure.options)
    getAnwsersForText(json.question.structure.options);
  else console.log("Unable to detect automaticcly anwser type", json.question);
};

const getQuestionInfo = (): {
  id: string;
  roomHash: string;
  playerId: string;
} => {
  const rootObject = document.querySelector("body > div") as VueElement | null;
  if (!rootObject) throw new Error("Could not retreive root object");
  const vue = rootObject.__vue__;

  const questionId = vue.$store._vm.currentQuestion.id;
  const roomHash = vue.$store._vm._data.$$state.game.data.roomHash;
  if (!questionId || !roomHash)
    throw new Error("Couldn't retreive questionID or roomHash");

  const previousContext = localStorage.getItem("previousContext");
  if (!previousContext) throw new Error("Couldn't retreive previousContext");
  const playerId = JSON.parse(previousContext).currentPlayer.playerId;

  return { id: questionId, roomHash, playerId };
};

(async () => {
  console.log(
    `%c 
  Script created by grzegorz#5119! 
  https://github.com/gbaranski/quizizz-cheat
  `,
    "color: red;"
  );
  const playerId = prompt(
    "Enter other player name here, he must take a part in quiz!"
  );
  if (!playerId) throw new Error("PlayerID not defined");
  const questionInfo = getQuestionInfo();
  // console.log({ questionID: questionInfo.id, roomHash: questionInfo.roomHash });

  const request: ServerRequest = {
    gameType: "live",
    playerId,
    powerupEffects: {
      destroy: [],
    },
    questionId: questionInfo.id,
    response: {
      attempt: 0,
      isEvaluated: false,
      questionId: questionInfo.id,
      questionType: "MSQ",
      provisional: {
        scoreBreakups: {
          correct: {
            base: 600,
            powerups: [],
            streak: 20,
            timer: 0,
            total: 500,
          },
          incorrect: {
            base: 0,
            powerups: [],
            streak: 0,
            timer: 0,
            total: 0,
          },
        },
        scores: {
          correct: 600,
          incorrect: 0,
        },
        teamAdjustments: [],
      },
      response: [],
      responseType: "original",
      timeTaken: Math.floor(Math.random() * 10000),
    },
    roomHash: questionInfo.roomHash,
  };
  sendResponse(request);
})();
