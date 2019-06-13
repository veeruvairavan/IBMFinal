import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ProjectTask } from '../../vo/project-task';
import { Task } from '../../vo/task';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalWrapperComponent } from '../../components/modal-wrapper/modal-wrapper.component';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../vo/project';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task:Task = new Task("","","","",0,0,null,"");

  action:string = "Add Task";

  tasks:Task[];

  parentTask:Task;

  projects:Project[];

  projectTask:ProjectTask;

  project:Project;

  isUpdate:boolean = false;

  constructor(private route:ActivatedRoute,
            private taskService:TaskService,
            private modalService:NgbModal,
            private projectService:ProjectService,
          private router:Router) { }

  ngOnInit() {

    if(this.route.routeConfig.path != 'home'){
      var i = 0;
      this.action = "Update Task";
      this.isUpdate = true;
      this.task = new Task(this.taskService.getSelectedTask().task,
                            this.taskService.getSelectedTask().parentTask,
                            this.taskService.getSelectedTask().startDate,
                            this.taskService.getSelectedTask().endDate,
                            this.taskService.getSelectedTask().priority,
                            this.taskService.getSelectedTask()._id,
                            this.taskService.getSelectedTask()._parentId,
                            this.taskService.getSelectedTask().status
                          );

      this.project = this.projectService.getSelectedProject();

      /*this.tasks.forEach((task,index)=>{
        if((task._id == this.task._parentId)){
          i = index;
        }
      });

      this.parentTask = this.tasks[i];*/
    }else{
      this.isUpdate = false;
    }

    /*this.route.params.subscribe(params=>{
      console.log(params.task);
    });*/


  /*  this.taskService.getTasks().subscribe(tasks=>{
      this.tasks = tasks as Task[];
      this.parentTask = this.tasks[0];

      if(this.route.routeConfig.path != ''){
        var i = 0;
        this.action = "Update Task";
        this.task = new Task(this.taskService.getSelectedTask().task,
                              this.taskService.getSelectedTask().parentTask,
                              this.taskService.getSelectedTask().startDate,
                              this.taskService.getSelectedTask().endDate,
                              this.taskService.getSelectedTask().priority,
                              this.taskService.getSelectedTask()._id,
                              this.taskService.getSelectedTask()._parentId,
                              this.taskService.getSelectedTask().status
                            );

        this.tasks.forEach((task,index)=>{
          if((task._id == this.task._parentId)){
            i = index;
          }
        });

        this.parentTask = this.tasks[i];
      }
    });*/

  }

  getProjects(){

  }

  onChange(event){
    this.task._parentId = this.parentTask._id;
    this.task.parentTask = this.parentTask.task;
  }

  onAdd(){
    console.log(this.task);
    if(this.route.routeConfig.path == 'home'){
      const task = new Task(this.task.task,
                                        this.task.parentTask,
                                        this.task.startDate,
                                        this.task.endDate,
                                        this.task.priority,
                                        null,
                                        this.task._parentId,
                                        "CREATED");
      delete task._id;
      this.projectTask = new ProjectTask(this.project._id,task);
      this.taskService.addTask(this.projectTask)
                                    .subscribe(
                                    task=>{
                                            console.log(task);
                                            //this.taskService.updateTasksLocally(task.task);
                                            this.router.navigate(["/viewTask"]);
                                          },
                                    error=>console.log(error));
    }else{
      this.taskService.updateTask({_id:this.project._id,
                                    _taskId:this.task._id,
                                    task:this.task})
                                    .subscribe(
                                    task=>{
                                            console.log(task);
                                          //  this.taskService.updateTasksLocally(task);
                                          this.router.navigate(["/viewTask"]);
                                          },
                                    error=>console.log(error));
    }

  }

  open(){
    const modalRef = this.modalService.open(ModalWrapperComponent);
    modalRef.componentInstance.datas = this.tasks;
    modalRef.componentInstance.field = "task";

    modalRef.componentInstance.selectedData.subscribe((value) => {
      this.task._parentId = value._id;
      this.task.parentTask = value.task;
		});
  }

  selectedData(data){
    console.log(data);
  }

  openProject(){
    if(this.projects && this.projects.length>0){
      this.openProjectDialog();
    }else{
      this.projectService.getProjects().subscribe(projects => {
        this.projects = projects;
        this.openProjectDialog();
      },err=>{
        console.log(err);
      });
    }

  }

  openProjectDialog(){
    const modalRef = this.modalService.open(ModalWrapperComponent);
    modalRef.componentInstance.datas = this.projects;
    modalRef.componentInstance.field = "project";

    modalRef.componentInstance.selectedData.subscribe((value) => {

        this.projectService.getProjectById(value._id).subscribe(project=>{
          this.project = project;
          this.tasks = project.tasks;
          this.projectService.setSelectedProject(project);
        },err=>console.log(err));
    });
  }

}
