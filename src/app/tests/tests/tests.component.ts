import { Component, Input } from '@angular/core';
import { Output } from '@angular/core';
import { PageEvent } from '@angular/material';
import { EventEmitter } from '@angular/core';

import { TestService, ListConfig, Test } from 'src/app/core';
@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})

export class TestsComponent {

  @Output() inputChange = new EventEmitter();
  @Output() editClick = new EventEmitter();

  constructor(
    private testService: TestService
  ) {
    this.query = this.listConfig;
    this.currentPage = 1;
    this.runQuery();
  }

  listConfig: ListConfig = {
    filters: {}
  };

  query: ListConfig;
  result: Test[];
  loading = false;
  currentPage = 1;
  totalPage: Array<number> = [1];
  totalRecordCount: number;
  pageSize: number = 8;
  searchString: string = "";
  onEditClick: boolean = false;

  change(pageEvent: PageEvent) {
    console.log(pageEvent)
    this.currentPage = pageEvent.pageIndex+1;
    // this.listConfig.filters.pageSize = pageEvent.pageSize;
    this.runQuery();
  }

  onSearchChange(searchString: string) {  
    this.searchString = searchString;
    this.currentPage = 1;
    this.runQuery();
  }

  deleteTest(test: Test) {
    // var filtered = this.result.filter(function(el) {
    //   return el.id === test.id;
    // });
    // var index = this.result.indexOf(filtered[0]);
    // if(index !== -1){
    //   this.result.splice(index, 1);
    // }
    this.doIfSomethingChange();
  }

  runQuery() {
    this.loading = true;
    this.result = [];

    if (this.pageSize) {
      this.query.filters.page = this.currentPage;
      this.query.filters.pageSize = this.pageSize;
      this.query.filters.query = this.searchString;
    }

    this.testService
    .query(this.query)
    .subscribe((data: any) => {
      console.log(data);
      this.loading = false;
      this.result = data.data;
      console.log(this.result);

      this.totalPage = data.paging.pageCount;
      this.totalRecordCount = data.paging.totalRecordCount
    })
  }

  onEditClickEvent() {
    this.onEditClick = !this.onEditClick;
  }

  doIfSomethingChange() {
    this.currentPage = 1;
    this.runQuery();
  }
}
