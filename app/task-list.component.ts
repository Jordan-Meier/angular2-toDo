import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import {DonePipe} from './done.pipe';
import {PriorityPipe} from './priority.pipe';

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  pipes: [DonePipe, PriorityPipe],
  template: `
  <select (change)="onChange($event.target.value)" class="filter">
    <option value="all">Show All</option>
    <option value="done">Show Done</option>
    <option value="notDone" selected="selected">Show Not Done</option>
  </select>

  <select (change)="buttChange($event.target.value)" class="filter">
    <option value="high">Show high priority</option>
    <option value="medium">Show medium priority</option>
    <option value="low" >Show low priority</option>
    <option value="all" selected="selected">Show all priorities</option>
  </select>

  <task-display *ngFor="#currentTask of taskList | done:filterDone:filterPriority | priority:filterPriority:filterDone"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
  </edit-task-details>
  <new-task (onSubmitNewTask)="createTask($event)"></new-task>
  `
})

export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task;
  public filterDone: string = "notDone";
  public filterPriority: string = "all";
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log('child', clickedTask);
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }

  createTask(taskArray:string[]): void {
    this.taskList.push(
      new Task(taskArray[0], this.taskList.length, taskArray[1])
    );
  }
  onChange(filterOption) {
    this.filterDone = filterOption;
    console.log(this.filterDone);
  }

  buttChange(filterOption) {
    this.filterPriority = filterOption;
  }
}
