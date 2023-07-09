import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private readonly appService: AppService,
    private readonly titleService: Title
  ) {}
 
  search_query = '';
  readonly #per_page = 10;
  page_no = 1;
  result: any = {};
  async ngOnInit() {
    this.titleService.setTitle('Search Engine')
    // console.log(this.search_query);
    // this.result =await this.appService.search(this.search_query, 1) ;
  }

  async submit() {
    this.result = await this.appService.search(this.search_query, 1);
    console.log(this.result);
  }

  async next() {
    if ((this.page_no + 1) * this.#per_page >= 100) return;
    this.result = await this.appService.search(
      this.search_query,
      ++this.page_no
    );
  }

  async prev() {
    if ((this.page_no - 1) * this.#per_page <= 0) return;
    this.result = await this.appService.search(
      this.search_query,
      --this.page_no
    );
  }
}
