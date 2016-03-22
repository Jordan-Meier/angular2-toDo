import {Pipe, PipeTransform} from 'angular2/core';
import {Task} from './task.model';

@Pipe ({
  name: "priority",
  pure: false
})

export class PriorityPipe implements PipeTransform {
  transform(input: Task[], args) {
    var desiredPriorityStatus = args[0];
    if(desiredPriorityStatus === "high") {
      return input.filter((task) => {
        return task.priority === "high";
      });
    } else if (desiredPriorityStatus === "medium") {
      return input.filter((task) => {
        return task.priority === "medium";
      });
    } else if (desiredPriorityStatus === "low") {
      return input.filter((task) => {
        return task.priority === "low";
      });
    } else {
      return input;
    }
  }
}
