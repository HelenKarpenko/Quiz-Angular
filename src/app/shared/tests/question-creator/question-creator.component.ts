import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { Answer, Question } from 'src/app/core/models'

@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css']
})
export class QuestionCreatorComponent implements OnInit{

  @Input('group')
    public questionCreatorForm: FormGroup;
    get formDataAnswers() { return <FormArray>this.questionCreatorForm.get('answers'); }

    form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      gender: ['', Validators.required]
    });
  }

  initAnswers() {
    return this.formBuilder.group({
      text: ['', Validators.required],
      isCorrect: [''],
    })
  }

  addAnswer() {
    const control = <FormArray>this.questionCreatorForm.controls['answers'];
    control.push(this.initAnswers());
  }

  removeAnswer(index: number) {
    const control = <FormArray>this.questionCreatorForm.controls['answers'];
    control.removeAt(index);
  }

  public hasError = (form: FormGroup, controlName: string, errorName: string) =>{
    return form.controls[controlName].hasError(errorName);
  }

  ngOnInit() { }
}
