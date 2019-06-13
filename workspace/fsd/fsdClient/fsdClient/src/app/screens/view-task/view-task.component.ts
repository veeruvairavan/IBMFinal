import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../vo/task';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalWrapperComponent } from '../../components/modal-wrapper/modal-wrapper.component';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../vo/project';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  private tasks:Task[];
  private filteredTask : Task[];
  private projects:Project[];
  private project:Project;


  constructor(private router:Router,
              private taskService:TaskService,
              private modalService:NgbModal,
              private projectService:ProjectService
              ) {
  /*  this.taskService.getTasks().subscribe(
      tasks=>{
        this.tasks = tasks as Task[];
        this.filteredTask = Object.assign([],this.tasks);
        console.log(this.tasks);
        //this.taskService.setTasks(tasks);
      },
      error=>{
        console.log(error);
      }
    );*/

    this.projectService.getProjects().subscribe(projects=>{
      this.projects = projects;
      if(this.projectService.getSelectedProject() != null){
        const index  = projects.findIndex(x => x._id === this.projectService.getSelectedProject()._id);
        this.tasks = projects.length>0 ? projects[index].tasks : null;
        this.project = projects.length>0 ? projects[index] : null;
      }else{
        this.tasks = projects.length>0 ? projects[0].tasks : null;
        this.project = projects.length>0 ? projects[0] : null;
      }

    },err=>{
      console.log(err);
    });
  }

  ngOnInit() {
    console.log("Task !!!!");
  }

  onEdit(task:Task){
    this.taskService.setSelectedTask(task);
    this.projectService.setSelectedProject(this.project);
    this.router.navigate(["/update"]);
  }

  onSearch(data){
    console.log(data.searchText);
    this.filteredTask = this.tasks.filter(task=>{
      console.log(task);
      if(data.searchField == "priority"){
        return (task[data.searchField] == data.searchText);
      }else{
        return (task[data.searchField].indexOf(data.searchText) != -1);
      }


    });
  }

  onEndTask(task:Task){
    task.status = "Completed";

    this.updateTask(task);
  }

  dummy(t){
    console.log(t);

    return false;
  }

  openProjectDialog(){
    const modalRef = this.modalService.open(ModalWrapperComponent);
    modalRef.componentInstance.datas = this.projects;
    modalRef.componentInstance.field = "project";

    modalRef.componentInstance.selectedData.subscribe((value) => {

        this.projectService.getProjectById(value._id).subscribe(project=>{
          this.tasks = project.tasks;
          this.project =  project;
        },err=>console.log(err));
    });
  }

  updateTask(task){
    this.taskService.updateTask({_id:this.project._id,
                                  _taskId:task._id,
                                  task:task})
                                  .subscribe(
                                  task=>{
                                          console.log(task);
                                          //this.taskService.updateTasksLocally(task);
                                        },
                                  error=>console.log(error));


  }



}
