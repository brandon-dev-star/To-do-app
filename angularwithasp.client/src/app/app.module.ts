import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { TaskComponent } from './components/task/task.component'; // Import the TaskComponent
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests

@NgModule({
  declarations: [
    AppComponent,
    AddTaskDialogComponent,
    TaskComponent // Declare the TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule // Include HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstrap the AppComponent
})
export class AppModule { }
