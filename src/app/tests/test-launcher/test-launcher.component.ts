import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Test, TestService, UserAnswers, Answer, UserAnswerDetails, ShareResultService } from 'src/app/core';

@Component({
  selector: 'app-test-launcher',
  templateUrl: './test-launcher.component.html',
  styleUrls: ['./test-launcher.component.css']
})
export class TestLauncherComponent implements OnInit {

  private test: Test;
  private result: { [id: number] : number; } = {};
  isLoaded: boolean = false;

  // timer
  private timeLeft: number = 60;
  private interval;
  private subscribeTimer: any;
  
  progressbarValue = 100;

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router,
    private shareResultService: ShareResultService
  ) { }

  ngOnInit() {
    this.getTest();
    this.startTimer(10);
  }

  async getTest() {
    const id = +this.route.snapshot.paramMap.get('id');
    await this.testService.getById(id).subscribe(data => {
      this.test = data;
      this.isLoaded = true;
    })
  }

  async onSubmit() {
    console.log(this.result);
    var userAnswers = new UserAnswers();
    userAnswers.answers = this.result;

    await this.testService
      .saveResult(this.test.id, userAnswers)
      .subscribe(data => {
        console.log(data);
        console.log(this.test);
        this.shareResultService.setTest(this.test);
        this.shareResultService.setUserAnswer(data);
        this.router.navigateByUrl(`tests/${this.test.id}/result`);
      });
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
        this.onSubmit();
      }
    })
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
