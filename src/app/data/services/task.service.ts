import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../interfaces/task.interface";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http = inject(HttpClient)

  constructor() { }

  getData(page: number, limit: number, sort: string, priority_filters: string[], label_filters: string[]) {
    const priorityFiltersString = priority_filters.join(',');
    const labelFiltersString = label_filters.join(',');

    const url = `http://91.239.27.153/getTasks.php?page=${page}&limit=${limit}&sort=${sort}&priority_filters=${priorityFiltersString}&labels=${labelFiltersString}`;
    return this.http.get<Task[]>(url);
  }

  addTask(payload: {name: string, priority: string, labels: string[], description: string}) {
    const url = `http://91.239.27.153/addTask.php`;

    const fd = new FormData();
    const labelsString = payload.labels.join(',');

    fd.append('name', payload.name);
    fd.append('priority', payload.priority);
    fd.append('labels', labelsString);
    fd.append('description', payload.description);

    return this.http.post(url, fd);
  }

  deleteTask(id: number) {
    const url = `http://91.239.27.153/updateTask.php?id=${id}`;

    return this.http.get(url);
  }

  updateTask(payload: {id: number, name: string, date: string, priority: string, labels: string[], description: string}) {
    const url = `http://91.239.27.153/updateTask.php`;
    const fd = new FormData();
    const labelsString = payload.labels.join(',');

    fd.append('id', payload.id.toString());
    fd.append('name', payload.name);
    fd.append('date', payload.date);
    fd.append('priority', payload.priority);
    fd.append('labels', labelsString);
    fd.append('description', payload.description);

    return this.http.post(url, fd);
  }
}
