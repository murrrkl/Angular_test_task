import {Component, inject} from '@angular/core';
import {TaskService} from "../../data/services/task.service";
import {Task} from "../../data/interfaces/task.interface";
import {TaskCardComponent} from "../../common_ui/task-card/task-card.component";
import {SidebarComponent} from "../../common_ui/sidebar/sidebar.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    TaskCardComponent,
    SidebarComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  taskService : TaskService = inject(TaskService);
  router = inject(Router);

  tasks: Task[] = [];
  page: number = 0;
  limit: number = 15;
  loadingInProgress = false;
  sort_type: string = "desc";
  priority_filters : string[] = [];
  label_filters : string[] = [];

  ngOnInit() {
    this.loadMore();
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loadingInProgress) {
        this.loadMore();
      }
    };
  }

  loadMore() {
    this.loadingInProgress = true;
    this.taskService.getData(this.page, this.limit, this.sort_type, this.priority_filters,  this.label_filters).subscribe((data: Task[]) => {
      this.tasks = [...this.tasks, ...data];
      this.page++;
      this.loadingInProgress = false;
    });
  }

  goToEditTask(task: Task) {
    this.router.navigate(['/task_page'], { state: { taskData: task } });
  }
}
