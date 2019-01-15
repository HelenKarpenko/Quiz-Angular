import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Test, TestService } from 'src/app/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.css']
})
export class TestPreviewComponent {
  @Input() test: Test;
  @Input() onEditClick: boolean = false;
  @Output() onRemoveClick = new EventEmitter<Test>();
  isAuth: boolean = false;

  constructor(
    public dialog: MatDialog,
    private testService: TestService, 
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {id: this.test.id, name: this.test.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if(result) {
        this.deleteTest();
      }
    });
  }

  startTest() {
    this.router.navigateByUrl(`/tests/${this.test.id}`);
  }

  deleteTest() {
    this.testService.deleteById(this.test.id).subscribe(data => {
      console.log(`delet test ${data.id}`);
      this.onRemoveClick.emit(data);
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{

  constructor(
    public dialogRef: MatDialogRef<TestPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}