import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Test, TestService, UserAnswers, Answer, UserAnswerDetails, ShareResultService, TestResultService } from 'src/app/core';

@Component({
  selector: 'app-test-launcher',
  templateUrl: './test-launcher.component.html',
  styleUrls: ['./test-launcher.component.css']
})
export class TestLauncherComponent implements OnInit {

  private test: Test;
  private result: { [id: number] : number; } = {};
  private userAnswers: UserAnswerDetails[] = [];
  isLoaded: boolean = false;
  isSubmit = false;

  // timer
  private timeLeft: number = 60;
  private interval;
  private subscribeTimer: any;
  
  progressbarValue = 100;

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router,
    private resultService: TestResultService
  ) { }

  ngOnInit() {
    this.getTest();
  }

  getTest() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.testService.getById(id).subscribe(data => {
      this.test = data;
      data.questions.forEach(question => {
        this.userAnswers.push({ questionId: question.id, answerId: null } as UserAnswerDetails)
      });
      this.isLoaded = true;
      this.startTimer(20);
    })
  }

  onSubmit() {
    if(!this.isSubmit) {
      console.log(this.userAnswers);
      var result = new UserAnswers();
      result.testId = this.test.id;
      result.details = this.userAnswers;
      console.log("lena ()()"+result);
  
      this.resultService.saveResult(result)
      .subscribe(data => {
        console.log(data);
        this.isSubmit = true;
        this.router.navigateByUrl(`/results/${data.id}`);
      })
    }
  }

  startTimer(seconds: number) {
    const time = seconds;
    const timer = interval(1000);
    this.timeLeft = seconds;

    const sub = timer.subscribe(sec => {
      this.progressbarValue = 100 - sec * 100 / seconds;
      this.timeLeft = time - sec;

      if (this.timeLeft <= 0) {
        sub.unsubscribe();
        if(!this.isSubmit)
          this.onSubmit();
      }
    })
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
