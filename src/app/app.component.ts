import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchCompanyResult } from './dtos/search-company-result.model';
import { WebCrawlerService } from './services/web-crawler.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public searchText$: Subject<string> = new Subject();
  public searchText: string = '';
  public isSearchSuccess: boolean = false;
  public isLoading: boolean = false;

  public topCvSearchResult: SearchCompanyResult[] = [];

  constructor(public webCrawler: WebCrawlerService) {}

  ngOnInit(): void {
    this.searchText$
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((keyword) => {
        this.fetchTopCv(keyword);
      });
  }

  public enterSearch(): void {
    if (!this.searchText) {
      return;
    }
    
    this.isLoading = true;
    this.searchText$.next(this.searchText);
  }

  public fetchTopCv(keyword: string): void {
    this.webCrawler
      .getTopCV(keyword)
      .subscribe((res) => {
        this.topCvSearchResult = res
        this.isSearchSuccess = true;
        this.isLoading = false;
      });
  }

  public onSuggestionTagClick(value: string): void {
    this.searchText = value;
    this.enterSearch();
  }
}
