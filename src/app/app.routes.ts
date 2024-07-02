import { Routes } from '@angular/router';
import {StartPageComponent} from "./pages/start-page/start-page.component";
import {TaskPageComponent} from "./pages/task-page/task-page.component";
import {TaskAddPageComponent} from "./pages/task-add-page/task-add-page.component";
import {TaskUpdatePageComponent} from "./pages/task-update-page/task-update-page.component";

export const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'task_page', component: TaskPageComponent},
  {path: 'add_task', component: TaskAddPageComponent},
  {path: 'update_task', component: TaskUpdatePageComponent}
];
