import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {TaskService} from "../../data/services/task.service";
import {TaskFormComponent} from "../../common_ui/task-form/task-form.component";

@Component({
  selector: 'app-task-update-page',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterOutlet,
        RouterLink,
        TaskFormComponent
    ],
  templateUrl: './task-update-page.component.html',
  styleUrl: './task-update-page.component.scss'
})
export class TaskUpdatePageComponent implements OnInit {
  router = inject(Router);

  taskData: any;

  ngOnInit() {
    this.taskData = history.state.taskData;
  }
}
