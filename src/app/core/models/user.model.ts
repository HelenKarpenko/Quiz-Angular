import { UserAnswers } from './user-answers.model';
export class User {
    id: string;
    email: string;
    username: string;
    roles: string[];
    token?: string;
    testResults: UserAnswers[];
}
