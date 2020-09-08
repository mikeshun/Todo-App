import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItem, TodoService } from '../todo.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  today = new Date();
  greeting: string;
  user: firebase.User;
  isLoading = false;
  term = '';

  constructor(
    private modalCtrl: NgbModal,
    private authService: AuthService,
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchTodos();
    this.getGreeting();
    this.fetchCurrentUser();
  }

  fetchTodos() {
    try {
      this.isLoading = true;
      this.todoService.getTodos().onSnapshot((snapshot) => {
        let changes = snapshot.docs;
        this.todos = [];
        changes.forEach(change => {
          let todoList: any = change.data();
          todoList.id = change.id;
          this.todos.push(todoList);
        })
        console.log('todos', this.todos)
        this.todos.sort((a: any, b: any) => {
         return a.isCompleted - b.isCompleted;
        })
      });
    } catch (error) {
      this.toastr.error(error.message, 'Oopssy😥')
    } finally {
      this.isLoading = false;
    }
  }

  openTodoForm(todo?: TodoItem) {
    const modal = this.modalCtrl.open(TodoFormComponent, {
      centered: true,
      size: 'md',
    });
    modal.componentInstance.todo = todo;
  }

  async fetchCurrentUser() {
    this.user = await this.authService.getUserInfo();
  }

  async completeTodo(todo: TodoItem) {
    try {
      this.isLoading = true;
      todo.isCompleted = todo.isCompleted ? false : true;
      const res = await this.todoService.updateTodo(todo);
    } catch (error) {
      this.toastr.error(error.message, 'Operation Failed');
    } finally {
      this.isLoading = false;
    }
  }

  private getGreeting() {
    const currentHour = this.today.getHours();
    if (currentHour < 12) {
      this.greeting = 'morning 🌄';
    } else if (currentHour < 18) {
      this.greeting = 'afternoon ☀';
    } else {
      this.greeting = 'evening 🌆';
    }
  }
}
