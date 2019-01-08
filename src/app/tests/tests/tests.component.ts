import { Component, Input  } from '@angular/core';

import { Test } from 'src/app/core/models';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})

export class TestsComponent {

  tests: Test[] = [];
  @Input() limit: number;



  constructor(private testService: TestService) { }

  ngOnInit() {
    this.getTests();
  }

  getTests(): void {
    // this.testService
    //   .getAll()
    //   .subscribe(tests => {
    //     this.tests = tests;
    //   });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    console.log(name);
    // this.testService
    //   .create({ name } as Test)
    //   .subscribe(test => {
    //     this.tests.push(test);
    //   })
  }

  // delete(test: Test): void {
  //   console.log(test.id);
  //   let index = this.tests.indexOf(test);
  //   if (index !== -1) {
  //     this.tests.splice(index, 1);
  //   }
  //   this.testService.delete(test).subscribe();
  // }
}
