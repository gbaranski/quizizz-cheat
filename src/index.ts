import { VueElement, QuizData, QuizQuestion } from "./types";

const getQuestionsElement = () => {
  const questionsElem = document.querySelector(
    "body > div > div.root-component > div > div > div > div.page-container.in-quiz > div.screen.screen-game > div.transitioner.transitioner-component > div > div > div > div > div > div.options-container > div"
  );
  if (!questionsElem)
    throw new Error("Unable to retreive questions list element");

  return questionsElem;
};

const changeElementOpacity = (elem: HTMLElement) => {
  elem.style.opacity = "20%";
};

const highlightAnswers = (question: QuizQuestion) => {
  const questionsElem = getQuestionsElement();
  const arr: VueElement[] = Array.prototype.slice.call(questionsElem.children);

  arr.filter((e) => {
    if (Array.isArray(question.structure.answer)) {
      return !(question.structure.answer.some((ansID) => e.__vue__.optionData.actualIndex === ansID));
    } else {
      return e.__vue__.optionData.actualIndex !== question.structure.answer
    }
  }).forEach(changeElementOpacity);
}

const getQuestionInfo = (): {
  questionID: string;
  roomHash: string;
  playerId: string;
  quizID: string;
  roomCode: string;
} => {
  const rootObject = document.querySelector("body > div") as VueElement | null;
  if (!rootObject) throw new Error("Could not retreive root object");
  const vue = rootObject.__vue__;

  return { 
    roomHash:   vue.$store._vm._data.$$state.game.data.roomHash, 
    playerId:   vue.$store._vm._data.$$state.game.player.playerId, 
    quizID:     vue.$store._vm._data.$$state.game.data.quizId,
    roomCode:   vue.$store._vm._data.$$state.game.data.roomCode,
    questionID: vue.$store._vm.currentQuestion.id
  };
};

(async () => {
  console.log(
    `%c 
    Script created by grzegorz#5119! 
    https://github.com/gbaranski/quizizz-cheat
      `,
    "color: red;"
  );
  const questionInfo = getQuestionInfo();
  console.log({questionInfo})

  const res = await fetch(`https://quizizz.com/api/main/game/${questionInfo.roomHash}`, {
    method: 'GET',
  });
  const quizData = (await res.json()).data as QuizData;
  for (const q of quizData.questions) {
    if (questionInfo.questionID === q._id) {
      highlightAnswers(q);
    }
  }}
)();
