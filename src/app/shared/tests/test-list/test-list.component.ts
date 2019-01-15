import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Test } from '../../../core';
@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent{
  @Input() tests: Test[];
  @Input() searchString: string = "";
  @Input() onEditClick: boolean = false;
  @Output() onRemoveClick = new EventEmitter<Test>();

  deleteTest(test: Test) {
    console.log(test);
    this.onRemoveClick.emit(test);
  }
}
