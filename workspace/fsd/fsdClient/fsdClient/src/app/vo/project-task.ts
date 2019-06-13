import {Task} from './task';
export class ProjectTask {
  _id:number;
  task:Task;

  constructor(id,task){
    this._id = id;
    this.task = task;
  }
}
