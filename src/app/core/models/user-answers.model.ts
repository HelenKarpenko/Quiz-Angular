import { UserAnswerDetails } from './user-answer-details.model';
export class UserAnswers {
    // answers: { [id: number] : number; } = {};
    id: number;
    testId: number;
    testName: string;
    userId: string;
    passageDate: Date;
    result: number;
    maxResult: number;
    details: UserAnswerDetails[];
}
