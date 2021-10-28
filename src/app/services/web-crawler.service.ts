import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchCompanyResult } from '../dtos/search-company-result.model';

@Injectable()
export class WebCrawlerService {
  public apiUrl: string = 'https://us-central1-finding-company-api.cloudfunctions.net/api';
  // public apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getTopCV(name: string): Observable<SearchCompanyResult[]> {
    return this.http.post<SearchCompanyResult[]>(`${this.apiUrl}/top-cv`, {jobName: name})
  }
}
