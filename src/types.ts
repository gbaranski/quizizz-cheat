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
    query: {
      text: string;
      answer: number;
    }
  };
}

export interface QuizInfo {
  data: {
    questions: QuizQuestion[];
  }
}

