import { Injectable, EventEmitter,  } from '@angular/core';
import { UserAnswers, Test } from '../models';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareResultService {

  public test$: Observable<Test>;
  public userAnswers$: Observable<UserAnswers>;

  private testSubject = new BehaviorSubject<Test>({} as Test);
  private userAnswerSubject = new BehaviorSubject<UserAnswers>({} as UserAnswers);

  constructor() {
    this.test$ = this.testSubject.asObservable();
    this.userAnswers$ = this.userAnswerSubject.asObservable();
  }

  setTest(test: Test) {
    this.testSubject.next(test);
  }

  getTest(): Test {
    return this.testSubject.value;
  }

  setUserAnswer(answers: UserAnswers) {
    this.userAnswerSubject.next(answers);
  }

  getUserAnswers(): UserAnswers {
    return this.userAnswerSubject.value;
  }
}
