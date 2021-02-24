/*
Quizizz-cheat
Copyright (C) gbaranski

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

github repository: https://github.com/gbaranski/quizizz-cheat
email: root@gbaranski.com
*/


export interface VueElement extends HTMLElement {
  __vue__: any;
}

export type Powerups = any[];

// There are probably more question types
export type QuestionType = "MSQ";
export type Origin = "Web";

export interface Score {
  base: number;
  powerups: Powerups;
  streak: number;
  timer: number;
  total: number;
}
export interface LeaderboardEntry {
  playerId: string;
  score: number;
  rank: number;
  monsterId: number;
  origin: Origin;
  // TODO: Correct type
  userAddons: null;
}

export interface ResponseProvisional {
  scoreBreakups: {
    correct: Score;
    incorrect: Score;
  };
  scores: {
    correct: number;
    incorrect: number;
  };
  teamAdjustments: [];
}

export interface Response {
  attempt: number;
  isEvaluated: boolean;
  provisional?: ResponseProvisional;
  questionId: string;
  questionType: QuestionType;
  // TODO: Correct type
  response: any;
  responseType: "original";
  timeTaken: number;
}

export interface ServerRequest {
  gameType: "live";
  playerId: string;
  powerupEffects: {
    // No idea what is that
    destroy: Powerups;
  };
  questionId: string;
  response: Response;
  roomHash: string;
}

export interface ServerResponse {
  // No idea
  __cid__: any;
  response: {
    // ISO 8601
    createdAt: string;
    deleted: boolean;
    elapsed: number;
    isCorrect: boolean;
    playerId: string;
    questionId: string;
    questionType: QuestionType;
    // TODO: Correct type
    response: any;
    scoreBreakup: Score;
    score: number;
    timeTaken: number;
    teamAdjustment: number;
    _v2: string;
    attempt: number;
  };
  playerId: string;
  question: {
    structure: {
      answer: any;
      options?: any;
    };
  };
  player: {
    currentStreak: number;
    maximumStreak: number;
  };
  powerupEffects: Powerups;
  leaderboard: LeaderboardEntry[];
  playerCount: number;
  // TODO: Correct type
  err: any;
}
