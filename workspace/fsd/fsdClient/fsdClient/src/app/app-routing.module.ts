import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskComponent} from './screens/task/task.component';
import {ViewTaskComponent} from './screens/view-task/view-task.component';
import {ProjectComponent} from './screens/project/project.component';
import {UserComponent} from './screens/user/user.component';

const routes: Routes = [
  {path:'home', component:TaskComponent},
  {path:'update', component:TaskComponent},
  {path:'viewTask',component:ViewTaskComponent},
  {path:'addProject', component:ProjectComponent},
  {path:'addUser', component:UserComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
