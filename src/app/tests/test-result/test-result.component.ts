import { Component, OnInit, Input } from '@angular/core';
import { Test, UserAnswers, ShareResultService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  test: any;
  userAnswer: UserAnswers;
  isLoaded: boolean = false;

  constructor(
    private shareResultService: ShareResultService,
    private router: Router,
  ) {
    this.test = this.shareResultService.getTest();
    console.log(`2) ${this.test}`)
    // this.shareResultService.test$.subscribe(data => {
    //   this.test = data;
    //   console.log(`2) ${this.test}`)
    // });

    this.shareResultService.userAnswers$.subscribe(data => this.userAnswer = data);
    if (!this.userAnswer) 
      this.router.navigateByUrl(`tests/${this.test.id}/result`);
    this.isLoaded = true;
  }

  ngOnInit() {

  }

}
