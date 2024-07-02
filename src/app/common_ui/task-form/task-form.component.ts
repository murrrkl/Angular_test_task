import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "../../data/services/task.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  selectedValue: string = 'low';
  showOptions: boolean = false;

  taskService = inject(TaskService);
  router = inject(Router);

  @Input() formMode!: string;
  @Input() taskData!: any;

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    priority: new FormControl(null, Validators.required),
    labels: new FormControl([]),
    description: new FormControl(null, Validators.required)
  })

  update_form = new FormGroup({
    id: new FormControl(this.taskData ? this.taskData.id : 0, Validators.required),
    name: new FormControl(this.taskData ? this.taskData.name : '', Validators.required),
    date: new FormControl(this.taskData ? this.taskData.date : ''),
    priority: new FormControl(this.taskData ? this.taskData.priority : 'low', Validators.required),
    labels: new FormControl(this.taskData ? this.taskData.labels.split(",") : []),
    description: new FormControl(this.taskData ? this.taskData.description : '', Validators.required)
  })

  ngOnInit() {
    this.updateLabelsInForm();
  }

  toggleOptions(event: Event) {
    this.showOptions = !this.showOptions;
  }

  onPriorityChange(event: any) {
    this.update_form.get('priority')?.setValue(event.target.value);
  }

  updateLabelsInForm() {
    if (this.taskData) {
      // @ts-ignore
      this.update_form.get('labels').setValue(this.taskData.labels.split(","));
      // @ts-ignore
      this.update_form.get('id').setValue(this.taskData.id);
      // @ts-ignore
      this.update_form.get('name').setValue(this.taskData.name);
      // @ts-ignore
      this.update_form.get('date').setValue(this.taskData.date);
      // @ts-ignore
      this.update_form.get('description').setValue(this.taskData.description);
      // @ts-ignore
      this.update_form.get('priority').setValue(this.taskData.priority);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // console.log(this.form.value);
      // @ts-ignore
      this.taskService.addTask(this.form.value).subscribe(res => {
        this.router.navigate(['']);
        console.log(res);
      })
    }
  }
  updateTask() {
    if (this.update_form.valid) {
      // @ts-ignore
      this.taskService.updateTask(this.update_form.value).subscribe(res => {
        this.router.navigate(['']);
      })
    }
  }

}
