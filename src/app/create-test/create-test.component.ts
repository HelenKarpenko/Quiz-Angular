import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../core/services';
import { Test } from '../core/models';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  test: Test = {} as Test;
  testForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService 
  ) { 
    this.testForm = this.formBuilder.group({
      name: '',
      description: '',
    });
  }

  ngOnInit() {
    // this.route.data.subscribe((data: { test: Test}) => {
    //   if (data.test) {
    //     this.test = data.test;
    //     this.testForm.patchValue(data.test);
    //   }
    // });
  }

  onSubmit() {
    this.isSubmitting = true;

    this.updateTest(this.testForm.value);

    // this.testService
    // .create(this.test)
    // .subscribe(
    //   test => this.router.navigateByUrl(`/tests/${test.id}`),
    //   err => {
    //     this.errors = err;
    //     this.isSubmitting = false;
    //   }
    // )
  }

  updateTest(values: Object) {
    Object.assign(this.test, values);
  }
}
