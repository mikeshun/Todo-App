import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todo_db = 'Todos';
  private readonly user_db = 'Users';
  currentUserId = localStorage.getItem('CurrentUid');

  constructor(private afs: AngularFirestore) { }

  getTodos() {
    const userDoc = this.afs.doc<any>(`${this.user_db}/${this.currentUserId}`);
    return userDoc.collection<any>(this.todo_db).ref.orderBy('createdAt', 'desc')
  }

  saveTodo(todo: TodoItem) {
    const userDoc = this.afs.doc<any>(`${this.user_db}/${this.currentUserId}`);
    return userDoc.collection<any>(`${this.todo_db}`).add(todo);
  }

  updateTodo(todo: TodoItem) {
    const userDoc = this.afs.doc<any>(`${this.user_db}/${this.currentUserId}`);
    return userDoc.collection<any>(`${this.todo_db}`).doc(todo.id).update({
      title: todo.title,
      description: todo.description,
      completedAt: todo.dueAt,
      isCompleted: todo.isCompleted
    });
  }

  deleteTodo(id: string) {
    const userDoc = this.afs.doc<any>(`${this.user_db}/${this.currentUserId}`);
    return userDoc.collection<any>(`${this.todo_db}`).doc(id).delete();
  }
}

export interface TodoItem {
  id?: string;
  title: string;
  description: string;
  createdAt: string;
  dueAt: string;
  isCompleted: boolean
}