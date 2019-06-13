import {Task} from './task';
export class Project {
  project:string;
  manager:string;
  startDate:string;
  endDate:string;
  priority:number;
  _id:number;
  _managerId:number;
  status:string;
  tasks:Task[];

  constructor(_project:string,
              _manager:string,
              _startDate:string,
              _endDate:string,
              _priority:number,
              _id:number,
              _managerId:number,
              status:string,
              tasks:Task[]
              ){


                this.project = _project;
                this.manager = _manager;
                this.startDate = _startDate;
                this.endDate = _endDate;
                this.priority = _priority;
                this._id = _id;
                this._managerId = _managerId;
                this.status = status;
                this.tasks = tasks;
              }
}
