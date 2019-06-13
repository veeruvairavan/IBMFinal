import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Task } from '../vo/task';
import { ProjectTask } from '../vo/project-task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks:Task[];
  private selectedTask:Task;

  constructor(private http:HttpClient) {

   }

  private host:string = 'http://localhost:3000/';

  public addTask(task:ProjectTask){
    return this.http.post<ProjectTask>(this.host+'project/addTask',task);
  }

  public updateTask(task:any){
    return this.http.post(this.host+'project/updateTask',task);
  }

  public getTasks(){
    return this.http.get(this.host+'task/');
  }

  public updateTasksLocally(task:Task){
    this.tasks.push(task);
  }

  public setTasks(tasks:[]){
    this.tasks = tasks;
  }

  public setSelectedTask(task:Task){
    this.selectedTask = task;
  }

  public getSelectedTask(){
    return this.selectedTask;
  }
}
