import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from './todo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TodoListComponent, TodoFormComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    SharedModule
  ],
  entryComponents: [TodoFormComponent],
  providers: [TodoService],
})
export class TodoModule {}
