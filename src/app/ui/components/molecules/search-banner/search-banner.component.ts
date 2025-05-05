import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-banner',
  templateUrl: './search-banner.component.html',
  styleUrls: ['./search-banner.component.scss']
})
export class SearchBannerComponent {
  @Input() categories: { id: number; name: string }[] = [];
}
