export interface VueElement extends HTMLElement {
  __vue__: any;
}

interface QuizQuestionOption {
  text: string;
}

export interface QuizQuestion {
  _id: string;
  structure: {
    answer: number | number[];
    options?: QuizQuestionOption[];
  };
}

export interface QuizData {
  questions: QuizQuestion[];
}
