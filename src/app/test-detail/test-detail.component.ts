import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Test } from '../core/models';
import { TestService } from '../core/services/test.service';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {

  test: Test;

  constructor (
    private route: ActivatedRoute,
    private testService: TestService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTest();
  }

  getTest(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    // this.testService.getById(id)
    //   .subscribe(test => this.test = test); 
  }

  goBack(): void {
    this.location.back();
  }
 
  // update(): void {
  //   this.testService.update(this.test)
  //     .subscribe(() => this.goBack());
  // }

}
