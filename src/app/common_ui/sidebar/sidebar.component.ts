import {Component, inject} from '@angular/core';
import {StartPageComponent} from "../../pages/start-page/start-page.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  start_page = inject(StartPageComponent);

  onSortChange(type_sort: string) {
    this.start_page.page = 0;
    this.start_page.tasks = [];
    this.start_page.sort_type = (type_sort == 'new') ? "desc" : "asc";
    this.start_page.loadMore();
  }

  onFilterPriority(filter: string) {

    if (this.start_page.priority_filters.includes(filter)) {
      this.start_page.priority_filters = this.start_page.priority_filters.filter(item => item !== filter);
    } else {
      this.start_page.priority_filters.push(filter);
    }
    this.start_page.page = 0;
    this.start_page.tasks = [];
    this.start_page.loadMore();
  }

  onFilterLabel(filter: string) {

    if (this.start_page.label_filters.includes(filter)) {
      this.start_page.label_filters = this.start_page.label_filters.filter(item => item !== filter);
    } else {
      this.start_page.label_filters.push(filter);
    }
    this.start_page.page = 0;
    this.start_page.tasks = [];
    console.log(this.start_page.priority_filters, this.start_page.label_filters);
    this.start_page.loadMore();
  }
}
