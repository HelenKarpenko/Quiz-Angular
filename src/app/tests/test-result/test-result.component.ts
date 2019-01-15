import { Component, OnInit, Input } from '@angular/core';
import { Test, UserAnswers, ShareResultService, TestResultService, User, TestService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  test: any;
  userAnswers: UserAnswers;
  isLoaded: boolean = false;

  constructor(
    private shareResultService: ShareResultService,
    private resultService: TestResultService,
    private testResult: TestService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getResult();
  }

  getResult() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resultService.getById(id).subscribe(
      (result: UserAnswers) => {
        this.userAnswers = result;
        console.log(this.userAnswers.details[0].answerId);
        this.getTest();
      }
    )
  }

  getTest() {
    console.log("jopa "+ this.userAnswers.testId);
    this.testResult.getById(this.userAnswers.testId).subscribe(
      (test: Test) => {
        this.test = test;
        this.isLoaded = true;

        console.log(this.test);
        this.userAnswers.details[0].answerId
      }
    )
  }

}
