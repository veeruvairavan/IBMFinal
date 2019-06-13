import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalWrapperComponent } from '../../components/modal-wrapper/modal-wrapper.component';
import { Project } from '../../vo/project';
import { UserService } from '../../services/user.service';
import { User } from '../../vo/user';
import { ProjectService } from '../../services/project.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private modalService:NgbModal,
              private userService:UserService,
              private projectService:ProjectService ) { }
  project:Project = new Project("","","","",0,0,0,"",[]);

  user:string = "";

  action:string = "Add Project";

  users:User[];

  projects:Project[];

  searchText:string;

  searchItem:string = "project";

  ngOnInit() {
    this.userService.getUsers().subscribe(users=>{
      this.users = users;
    },error=>{console.log(error)});

    this.fetchProjects();
  }

  fetchProjects(){
    this.projectService.getProjects().subscribe(projects=>{
       this.projects = projects;
       console.log(this.projects);
     },error=>{console.log(error)});
  }

  open(){
    const modalRef = this.modalService.open(ModalWrapperComponent);
    modalRef.componentInstance.datas = this.users;
    modalRef.componentInstance.field = "firstName";
    modalRef.componentInstance.selectedData.subscribe(data=>{
      this.project._managerId = data._id;
      this.project.manager = data.firstName;
    });
  }

  onAdd(){
    if(this.action == 'Add Project'){
      delete this.project._id;
      this.projectService.addProject(this.project).subscribe(data=>{
        this.fetchProjects();
        this.onReset();
      }, error=>{console.log(error)});
    }else{
      this.projectService.updateProject(this.project).subscribe(data=>{
        this.fetchProjects();
        this.onReset();
        this.action = "Add Project";
      },error=>{console.log(error)});
    }

  }

  select(data){
    if(data.action == 'delete'){
      this.onDelete(data);

    /*  this.displayItems = this.displayItems.filter(user=>{
        return (user._id != data.displayItem._id);
      });*/
    }else{
      //edit
      this.project.project = data.project;
      this.project.startDate = data.startDate;
      this.project.endDate = data.endDate;
      this.project.priority = data.priority;
      this.project.manager = data.manager;
      this.project.tasks = data.tasks;
      this.project._id = data._id;


      this.action = "Edit Project";

    }
  }

  onReset(){
    this.project = new Project("","","","",0,0,0,"",[]);
  }

  onDelete(project){
    this.projectService.deleteProject(project.displayItem).subscribe(data=>{
      this.fetchProjects();
    },err=>{this.fetchProjects()});


  }

  sortBy(by){
    this.projects.sort(this.compareValues(by));
  }

  // function for dynamic sorting
  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

}
