import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskComponent } from './task.component';
import { Task } from '../../models/task.model';
import { DebugElement } from '@angular/core';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let debugElement: DebugElement;

  const mockTask: Task = {
    id: '1',
    description: 'Test Task',
    isCompleted: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    // Assign mock input
    component.task = mockTask;

    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task description', () => {
    const taskDescription = debugElement.query(By.css('.task-description')).nativeElement;
    expect(taskDescription.textContent).toContain(mockTask.description);
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.deleteTask, 'emit');

    const deleteButton = debugElement.query(By.css('.delete-button')).nativeElement;
    deleteButton.click();

    expect(component.deleteTask.emit).toHaveBeenCalledWith(mockTask.id);
  });

  it('should emit update event when completion status is toggled', () => {
    spyOn(component.updateTask, 'emit');

    const checkbox = debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    checkbox.click();

    expect(component.updateTask.emit).toHaveBeenCalledWith({
      ...mockTask,
      isCompleted: !mockTask.isCompleted,
    });
  });
});
