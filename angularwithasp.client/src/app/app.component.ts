import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newTask: string = '';
  tasks: Task[] = [];

  constructor(private taskService: TaskService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      // Sort tasks: incomplete tasks first, completed tasks last
      this.tasks = tasks.sort((a, b) => {
        return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
      });
    });
  }

  // Open the Add Task Dialog
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '800px', // Adjust the width as needed
      height: 'auto', // Ensure the height adjusts dynamically
      disableClose: true, // Optional: prevent closing the dialog by clicking outside,
      panelClass: 'custom-dialog-container', // Add custom styles (optional)
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.trim() !== '') {
        this.newTask = result;
        this.addTask();
      } else {
        // Show an alert if the result is blank
        this.snackBar.open('Please enter a valid task.', 'Close', {
          duration: 3000, // Duration for the snack bar in milliseconds
          horizontalPosition: 'center', // Centered on the screen
          verticalPosition: 'bottom', // Show at the bottom of the screen
          panelClass: ['custom-snack-bar'] // Optional: Add custom styling
        });
      }
    });
  }

  // Add a new task
  addTask() {
    console.log("app.components/addTask");
    if (this.newTask.trim()) {
      const newTask = { description: this.newTask, completed: false } as any;
      this.taskService.addTask(newTask).subscribe((newTask: Task) => {
        this.tasks.unshift(newTask);
        console.log("newTask", newTask);
        //this.loadTasks();
      });
    }
  }

  // Delete a task
  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  // Update a task's completion status
  toggleCompletion(task: Task) {
    this.updateTask(task);
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task.id, task).subscribe(
      () => {
        console.log('Task updated:', task);
        this.loadTasks(); // Reload tasks to reflect the update
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
}
