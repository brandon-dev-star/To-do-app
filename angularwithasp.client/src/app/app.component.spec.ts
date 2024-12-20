import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let taskService: TaskService;

  const mockTasks: Task[] = [
    { id: '1', description: 'Task 1', isCompleted: false },
    { id: '2', description: 'Task 2', isCompleted: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [TaskService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should add a new task', () => {
    const newTask: Task = { id: '3', description: 'New Task', isCompleted: false };
    spyOn(taskService, 'addTask').and.returnValue(of(newTask));

    component.newTask = 'New Task';
    component.addTask();

    expect(taskService.addTask).toHaveBeenCalledWith({ description: 'New Task', completed: false });
    expect(component.tasks[0]).toEqual(newTask);
  });

  it('should delete a task', () => {
    spyOn(taskService, 'deleteTask').and.returnValue(of({}));
    spyOn(component, 'loadTasks');

    component.deleteTask('1');

    expect(taskService.deleteTask).toHaveBeenCalledWith('1');
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it('should update a task', () => {
    const updatedTask: Task = { id: '1', description: 'Updated Task', isCompleted: true };
    spyOn(taskService, 'updateTask').and.returnValue(of(updatedTask));

    component.updateTask(updatedTask);

    expect(taskService.updateTask).toHaveBeenCalledWith(updatedTask.id, updatedTask);
  });
});
