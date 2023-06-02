import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ToDoItem {
  _id: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./todo.component.css'],
})
export class AppComponent {
  text: string = '';
  toDo: ToDoItem[] = [];
  isUpdating: boolean = false;
  toDoId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllItems();
  }

  addToDoItem() {
    if (this.isUpdating) {
      this.updateToDoItem(this.toDoId, this.text);
    } else {
      const newItem = { text: this.text };
      this.http
        .post<ToDoItem>('http://localhost:8080/api/additem', newItem)
        .subscribe((item) => {
          this.toDo.push(item);
          this.text = '';
        });
    }
  }

  getAllItems() {
    this.http
      .get<ToDoItem[]>('http://localhost:8080/api/getAllItems')
      .subscribe((items) => {
        this.toDo = items;
      });
  }

  deleteToDoItem(id: string) {
    this.http
      .delete(`http://localhost:8080/api/deleteItem/${id}`)
      .subscribe(() => {
        this.toDo = this.toDo.filter((item) => item._id !== id);
      });
  }

  updateMode(id: string, text: string) {
    this.isUpdating = true;
    this.toDoId = id;
    this.text = text;
  }

  updateToDoItem(id: string, newText: string) {
    const updatedItem = { text: newText };
    this.http
      .put<ToDoItem>(`http://localhost:8080/api/updateItem/${id}`, updatedItem)
      .subscribe((item) => {
        this.toDo = this.toDo.map((item) =>
          item._id === id ? { ...item, text: newText } : item
        );
        this.text = '';
        this.isUpdating = false;
      });
  }
}
