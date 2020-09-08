import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoItem, TodoService } from '../todo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @Input() todo: TodoItem;
  todoForm: FormGroup;
  isLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.setupTodoForm();
    if (this.todo) {
      this.todoForm.patchValue(this.todo);
    }
  }

  handleTodoStorage(todo: TodoItem) {
    if (todo.id !== null) {
      this.updateTodo(todo);
    } else {
      this.saveTodo(todo);
    }
  }

  async saveTodo(todo: TodoItem) {
    try {
      this.isLoading = true;
      if (todo.id === null) {
        delete todo.id;
      }
      const res = await this.todoService.saveTodo(todo);
      this.activeModal.close();
    } catch (error) {
      this.toastr.error(error.message, 'Operation Failed');
    } finally {
      this.isLoading = false;
    }
  }

  async updateTodo(todo: TodoItem) {
    try {
      this.isLoading = true;
      const res = await this.todoService.updateTodo(todo);
      this.activeModal.close();
    } catch (error) {
      this.toastr.error(error.message, 'Operation Failed');
    } finally {
      this.isLoading = false;
    }
  }

  async deleteTodo(id: string) {
    try {
      this.isLoading = true;
      const res = await this.todoService.deleteTodo(id);
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }

  private setupTodoForm() {
    this.todoForm = this.fb.group({
      id: null,
      title: ['', Validators.required],
      description: '',
      dueAt: '',
      createdAt: new Date().toISOString(),
      isCompleted: false,
    });
  }
}
