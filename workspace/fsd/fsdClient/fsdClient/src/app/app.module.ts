import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angularMaterialModule';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpdateDisplayComponent } from './components/update-display/update-display.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ProjectComponent } from './screens/project/project.component';
import { TaskComponent } from './screens/task/task.component';
import { ViewTaskComponent } from './screens/view-task/view-task.component';
import { SearchComponent } from './components/search/search.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { ModalWrapperComponent } from './components/modal-wrapper/modal-wrapper.component';
import { UserComponent } from './screens/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    UpdateDisplayComponent,
    FilterPipe,
    ProjectComponent,
    TaskComponent,
    ViewTaskComponent,
    SearchComponent,
    ModalComponent,
    ModalWrapperComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
entryComponents:[ModalWrapperComponent]
})
export class AppModule { }
