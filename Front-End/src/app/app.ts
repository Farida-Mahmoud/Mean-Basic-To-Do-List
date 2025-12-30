import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  todos: any[] = [];
  newTodo = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<any[]>('http://localhost:3000/api/todos')
      .subscribe(data => this.todos = data);
  }

  addTodo() {
    if (!this.newTodo.trim()) return;

    this.http.post('http://localhost:3000/api/todos', {
      text: this.newTodo
    }).subscribe(() => {
      this.newTodo = '';
      this.loadTodos();
    });
  }
}
