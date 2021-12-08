/*
Quizizz-cheat
Copyright (C) gbaranski

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

github repository: https://github.com/gbaranski/quizizz-cheat
email: root@gbaranski.com
*/




import { VueElement, QuizQuestion, QuizInfo } from "./types";

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

  if (Array.isArray(question.structure.answer) && question.structure.answer.length < 1 && question.structure.options) {
    const answers = question.structure.options.map((option) => option.text).join(" or ");
    alert(answers);

    return;
  }

  arr.filter((e) => {
    if (Array.isArray(question.structure.answer) && question.structure.answer.length > 0) {
      return !(question.structure.answer.some((ansID) => e.__vue__.optionData.actualIndex === ansID));
    } else if (typeof question.structure.answer == "number") {
      return e.__vue__.optionData.actualIndex !== question.structure.answer
    } else {
      console.error("Fail detecting type of question: ", question);
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
  if (!rootObject) throw new Error("Could not retrieve root object");
  const vue = rootObject.__vue__;

  return {
    roomHash: vue.$store._vm._data.$$state.game.data.roomHash,
    playerId: vue.$store._vm._data.$$state.game.player.playerId,
    quizID: vue.$store._vm._data.$$state.game.data.quizId,
    roomCode: vue.$store._vm._data.$$state.game.data.roomCode,
    questionID: vue.$store._vm._data.$$state.game.questions.currentId,
  };
};

const getRoomHash = (): string => {
  const rootObject = document.querySelector("body > div") as VueElement | null;
  if (!rootObject) throw new Error("Could not retrieve root object");
  const vue = rootObject.__vue__;

  return vue.$store._vm._data.$$state.game.data.roomHash;
}

const msg = `%c 
    Script created by gbaranski#5119! 
    https://github.com/gbaranski/quizizz-cheat
      `;


const QCA_SERVER_URL = "https://qca.gbaranski.com/";
const QCA_LOCAL_STORAGE_ID = "_qca";

function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const sendAnalytics = async () => {
  const clientID = localStorage.getItem(QCA_LOCAL_STORAGE_ID);
  if (clientID == "" || clientID == null) {
    localStorage.setItem(QCA_LOCAL_STORAGE_ID, uuidv4());
  }

  await fetch(QCA_SERVER_URL, {
    method: "POST",
    body: JSON.stringify({
      clientID
    }),
  });
}


(async () => {
  console.log(msg, "color: red;");

  try {
    await sendAnalytics()
  } catch (err) {
    console.log("Failed to send analytics data", err);
  }

  const quiz: QuizInfo = await (await fetch(`https://quizizz.com/_api/main/game/${getRoomHash()}`)).json();

  let lastQuestionID: string | undefined = undefined;

  setInterval(() => {
    const questionInfo = getQuestionInfo();
    if (questionInfo.questionID !== lastQuestionID) {
      for (const q of quiz.data.questions) {
        if (questionInfo.questionID === q._id) {
          console.log({ q });
          highlightAnswers(q);
          lastQuestionID = questionInfo.questionID;
        }
      }
    }
  }, 500)

})();
