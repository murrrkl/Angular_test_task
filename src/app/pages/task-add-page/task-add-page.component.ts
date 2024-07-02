import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "../../data/services/task.service";
import {TaskFormComponent} from "../../common_ui/task-form/task-form.component";

@Component({
  selector: 'app-task-add-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    TaskFormComponent
  ],
  templateUrl: './task-add-page.component.html',
  styleUrl: './task-add-page.component.scss'
})
export class TaskAddPageComponent {

}
