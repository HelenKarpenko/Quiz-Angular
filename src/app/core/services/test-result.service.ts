import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserAnswers } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  private resultUrl = '/testResults';

  constructor(private apiService: ApiService) {}

  getById(id: number): Observable<UserAnswers> {
    const url = `${this.resultUrl}/${id}`;
    return this.apiService.get(url);
  }

  saveResult(answers: UserAnswers): Observable<UserAnswers> {
    return this.apiService.post(this.resultUrl, answers);
  }
}
