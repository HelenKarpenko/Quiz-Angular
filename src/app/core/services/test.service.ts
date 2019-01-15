import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Test, ListConfig, Paging, UserAnswers } from '../models';
import { ApiService} from './api.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private testUrl = '/tests';

  constructor(private apiService: ApiService) { }

  query(config: ListConfig): Observable<{tests: Test[], paging: Paging}> {
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(this.testUrl, new HttpParams({ fromObject: params}));
  }

  create(test: Test): Observable<Test> {
    return this.apiService.post(this.testUrl, test);
  }

  getById(id: number): Observable<Test> {
    const url = `${this.testUrl}/${id}`;
    return this.apiService.get(url);
  }

  saveResult(testId: number, answers: UserAnswers): Observable<UserAnswers> {
    const url = `${this.testUrl}/${testId}/results`;
    console.log(answers)
    return this.apiService.post(url, answers);
  }

  deleteById(id: number) {
    const url = `${this.testUrl}/${id}`;
    return this.apiService.delete(url);
  }

  // getAll(): Observable<Test[]> {
  //   return this.apiService
  //   .get(this.testUrl)
  //   .pipe(
  //     map(tests => {
  //       return tests.map(test => {
  //           return { id: test.Id, name: test.Name } as Test;
  //       });
  //     })
  //   );
  // }

  // getById(id: number): Observable<Test> {
  //   const url = `${this.testUrl}/${id}`;
  //   return this.http
  //   .get<any>(url)
  //   .pipe(
  //     map(data => {
  //       return { id: data.Id, name: data.Name } as Test;
  //     })
  //   );
  // }

  // create(test: Test): Observable<Test> {
  //   return this.http
  //   .post<any>(this.testUrl, test)
  //   .pipe(
  //     map(test => {
  //       return { id: test.Id, name: test.Name } as Test;
  //     })
  //   );
  // }

  // delete (test: Test): Observable<Test> {
  //   const url = `${this.testUrl}/${test.id}`;
  //   return this.http
  //     .delete<any>(url, httpOptions)
  //     .pipe(
  //       map(test => {
  //         return { id: test.Id, name: test.Name };
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  // update (test: Test): Observable<Test> {
  //   const url = `${this.testUrl}/${test.id}`;
  //   return this.http
  //     .put<any>(url, test, httpOptions)
  //     .pipe (
  //       map (test => {
  //         return { id: test.Id, name: test.Name };
  //       }),
  //       catchError(this.handleError)
  //     );
  // }
}
