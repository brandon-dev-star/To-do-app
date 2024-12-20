import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/api/task';  // Your backend API URL

  constructor(private http: HttpClient) { }

  // Get all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new task
  addTask(newTask: { description: string; isCompleted: boolean }): Observable<any> {
    console.log("addTask");
    return this.http.post<any>(this.apiUrl, newTask);
  }

  // Delete a task by ID
  deleteTask(id: string): Observable<void> {
    console.log("Delete");
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Toggle task completion by ID
  updateTask(id: string, updatedTask: Task): Observable<Task> {
    const url = `${this.apiUrl}/${id}`; // The URL with the task's ID to update
    return this.http.put<Task>(url, {
      description: updatedTask.description,
      isCompleted: updatedTask.isCompleted,
    } ); // Send PUT request to update task
  }
}
