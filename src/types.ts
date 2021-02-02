export interface VueElement extends HTMLElement {
  __vue__: any;
}

export interface QuizQuestion {
  _id: string;
  structure: {
    answer: number | number[];
    options?: any;
  };
}

export interface QuizData {
  questions: QuizQuestion[];
}
