import { Component, Input } from '@angular/core';
import {PageEvent} from '@angular/material';

import { TestService, TestListConfig, Test } from '../../../core';
@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent{

  constructor(
    private testService: TestService
  ) { }

  @Input() pageSize: number;
  @Input()
  set config(config: TestListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: TestListConfig;
  result: Test[];
  loading = false;
  currentPage = 1;
  totalPage: Array<number> = [1];

  change(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex + 1;
    this.config.filters.pageSize = pageEvent.pageSize;
  }

  // public getServerData(event?: PageEvent){
  //   event.
  //   this.fooService.getdata(event).subscribe(
  //     response =>{
  //       if(response.error) {
  //         // handle error
  //       } else {
  //         this.datasource = response.data;
  //         this.pageIndex = response.pageIndex;
  //         this.pageSize = response.pageSize;
  //         this.length = response.length;
  //       }
  //     },
  //     error =>{
  //       // handle error
  //     }
  //   );
  //   return event;
  // }

  runQuery() {
    this.loading = true;
    this.result = [];

    if (this.pageSize) {
      this.query.filters.page = this.currentPage;
      this.query.filters.pageSize = this.pageSize;
    }

    this.testService
    .query(this.query)
    .subscribe((data: any) => {
      console.log(data);
      this.loading = false;
      this.result = data.tests;
      console.log(this.result);

      this.totalPage = data.paging.pageCount;
    })
  }
}
