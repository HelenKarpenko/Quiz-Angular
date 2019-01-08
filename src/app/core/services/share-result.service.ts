import { Injectable, EventEmitter,  } from '@angular/core';
import { UserAnswers, Test } from '../models';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareResultService {

  public test$: Observable<Test>;
  userAnswers$: Observable<UserAnswers>;

  private testSubject = new BehaviorSubject<Test>({} as Test);
  private userAnswerSubject = new BehaviorSubject<UserAnswers>({} as UserAnswers);

  constructor() {
    this.test$ = this.testSubject.asObservable();
    this.userAnswers$ = this.userAnswerSubject.asObservable();
  }

  setTest(test) {
    console.log(`1)Shared ${test}`)
    this.testSubject.next(test);
  }

  getTest(): Test {
    return this.testSubject.value;
  }

  setUserAnswer(answers) {
    console.log(`Shared ${answers.answers}`)
    this.userAnswerSubject.next(answers);
  }

}
