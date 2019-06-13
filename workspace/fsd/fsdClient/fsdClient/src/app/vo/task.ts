export class Task {
  task:string;
  parentTask:string;
  startDate:string;
  endDate:string;
  priority:number;
  _id:number;
  _parentId:number;
  status:string

  constructor(_task:string,
              _parentTask:string,
              _startDate:string,
              _endDate:string,
              _priority:number,
              _id:number,
              _parentId:number,
              status:string
              ){


                this.task = _task;
                this.parentTask = _parentTask;
                this.startDate = _startDate;
                this.endDate = _endDate;
                this.priority = _priority;
                this._id = _id;
                this._parentId = _parentId;
                this.status = status;
              }
}
