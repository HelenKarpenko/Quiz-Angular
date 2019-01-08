import { Answer } from './answer.model'

export class Question {
    id: number;
    name: string;
    text: string;

    answers: Answer[];
    correctAnswersId: number[];
}
