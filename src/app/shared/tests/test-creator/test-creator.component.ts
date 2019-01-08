import { Component, OnInit } from '@angular/core';
import { Question, Test, TestService } from 'src/app/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-creator',
  templateUrl: './test-creator.component.html',
  styleUrls: ['./test-creator.component.css']
})
export class TestCreatorComponent implements OnInit{

  test: Test = new Test();
  testCreatorForm: FormGroup;
  get formDataQuestions() { return <FormArray>this.testCreatorForm.get('questions'); }

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    private location: Location 
  ) { }

  ngOnInit() {
    this.testCreatorForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      questions: this.formBuilder.array([
        this.initQuesions()
      ], Validators.minLength(1))
    })
  }

  initQuesions() {
    return this.formBuilder.group({
      text: ['', Validators.required],
      answers: this.formBuilder.array([
        this.initAnswers()
      ], Validators.minLength(2))
    })
  }

  initAnswers() {
    return this.formBuilder.group({
      text: ['', Validators.required],
      isCorrect: [''],
    })
  }

  save(formGroup: FormGroup) {
    var test = formGroup.value as Test;

    this.testService.create(test).subscribe(data => console.log(data));
  }

  addQuestion() {
    const control = <FormArray>this.testCreatorForm.controls['questions'];
    control.push(this.initQuesions());
  }

  removeQuestion(index: number) {
    const control = <FormArray>this.testCreatorForm.controls['questions'];
    control.removeAt(index);
  }

  onCancel() {
    this.location.back();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.testCreatorForm.controls[controlName].hasError(errorName);
  }

  onCreateTest() {
    console.log(this.test);
    // this.testService
    // .create(this.test)
    // .subscribe(data => console.log(data));
  }

  
}
