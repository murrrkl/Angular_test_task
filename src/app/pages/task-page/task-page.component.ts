import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {TaskService} from "../../data/services/task.service";

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  taskData: any;
  taskService = inject(TaskService);
  router = inject(Router);

  constructor(private route: ActivatedRoute) {
  }

  dateTransformation(date: string) {
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const dateTime = new Date(date);
    const day = dateTime.getDate();
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }

  ngOnInit(): void {
    this.taskData = history.state.taskData;
    // console.log(this.taskData);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        this.router.navigate(['']); // Переход на главную страницу после удаления
      });
  }

  updateTask(taskData: any) {
    this.router.navigate(['/update_task'], { state: { taskData: taskData } });
  }
}
