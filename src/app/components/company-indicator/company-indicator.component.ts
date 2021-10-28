import { Component, Input } from '@angular/core';
import { SearchCompanyResult } from 'src/app/dtos/search-company-result.model';

@Component({
  selector: 'app-company-indicator',
  templateUrl: './company-indicator.component.html',
  styleUrls: ['./company-indicator.component.scss']
})
export class CompanyIndicatorComponent {
  @Input() public company: SearchCompanyResult | undefined;
  constructor() { }

  public searchGoogle(): void {
    window.open(`http://google.com/search?q=${this.company?.companyName}`)
  }

  public searchLinkedLn(): void {
    window.open(`https://www.linkedin.com/search/results/all/?keywords=${this.company?.companyName}`)
  }
}
