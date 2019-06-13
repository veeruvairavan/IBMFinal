import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../vo/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects:Project[];
  private selectedProject:Project;
  private selectedProjectIndex: number;

  constructor(private http:HttpClient) {

   }

  private host:string = 'http://localhost:3000/';

  public addProject(project:Project){
    return this.http.post<Project>(this.host+'project/addProject',project);
  }

  public updateProject(project:Project){
    return this.http.post<Project>(this.host+'project/updateProject',project);
  }

  public getProjects(){
    return this.http.get<Project[]>(this.host+'project/getProjects');
  }

  public updateProjectsLocally(project:Project){
    this.projects.push(project);
  }

  public setProjects(projects:[]){
    this.projects = projects;
  }

  public setSelectedProject(project:Project){
    this.selectedProject = project;
  }

  public deleteProject(project:Project){
    return this.http.delete(this.host+'project/deleteProject/'+project._id);
  }

  public getSelectedProject(){
    return this.selectedProject;
  }

  public getProjectById(id){
    return this.http.get<Project>(this.host+'project/getProject/'+id);
  }

  public setSelectedProjectIndex(index:number){
    this.selectedProjectIndex = index;
  }

  public getSelectedProjectIndex(){
    return this.selectedProjectIndex;
  }


}
