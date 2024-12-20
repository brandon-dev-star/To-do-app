import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task; // Task passed from the parent component
  @Output() deleteTask = new EventEmitter<string>(); // Emit when the task is deleted
  @Output() toggleComplete = new EventEmitter<Task>(); // Emit when task is toggled

  // Emit delete task event
  onDelete() {
    this.deleteTask.emit(this.task.id);
  }

  // Emit toggle completion event
  onToggleComplete() {
    this.task.isCompleted = !this.task.isCompleted; // Toggle locally
    this.toggleComplete.emit(this.task); // Notify parent
  }
}
