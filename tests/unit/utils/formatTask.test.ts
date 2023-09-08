import { task } from "../../../src/typeDefinitions/task.types";
import {
  formatTask,
  generateTaskResponseMessage,
} from "../../../src/utils/formatTask";
import { tasks } from "../../fixtures/tasks";

describe("Test formatTask function", () => {
  it("Should return a string", () => {
    const tasksData: task = tasks.tasks[0];
    const formattedTask = formatTask(tasksData);
    expect(typeof formattedTask).toBe("string");
  });

  it.skip("Should return a string with task details", () => {
    const tasksData: task = tasks.tasks[0];
    const formattedTask = formatTask(tasksData);
    const expectedTask = `
      **Title:** Test Cases for QR scanning feature
      **Progress:** 40%
      **Ends On:** 9 September 2023, 12:00 AM IST
      **More details:** [Task Details](https://status.realdevsquad.com/tasks/qaCqdCTjRyX1EPLuv1mJ)`;
    expect(formattedTask).toBe(expectedTask);
  });
});

describe("Test generateTaskResponseMessage function", () => {
  it("Should return a string", () => {
    const formattedTasks = tasks.tasks.map((task: task) => formatTask(task));
    const responseMessage = generateTaskResponseMessage(
      "sunny-s",
      formattedTasks,
      "IN_PROGRESS"
    );
    expect(typeof responseMessage).toBe("string");
  });

  it.skip("Should return a string with task details", () => {
    const formattedTasks = tasks.tasks.map((task: task) => formatTask(task));
    const responseMessage = generateTaskResponseMessage(
      "sunny-s",
      formattedTasks,
      "IN_PROGRESS"
    );
    const task1 = `
      **Title:** Test Cases for QR scanning feature
      **Progress:** 40%
      **Ends On:** 9 September 2023, 12:00 AM IST
      **More details:** [Task Details](https://status.realdevsquad.com/tasks/qaCqdCTjRyX1EPLuv1mJ)`;
    const task2 = `
      **Title:** /task command to  show assignee task details 
      **Progress:** 50%
      **Ends On:** 9 September 2023, 10:17 AM IST
      **More details:** [Task Details](https://status.realdevsquad.com/tasks/xylBsqi7LayeiZVlJfUr)`;
    const allTaskURL =
      " [→ All Tasks](https://status.realdevsquad.com/tasks?q=status:all+assignee:sunny-s)";
    const expectedResponseMessage = `
## In Progress Tasks of sunny-s
${task1}
${task2}\n
${allTaskURL}\n`;
    expect(responseMessage).toBe(expectedResponseMessage);
  });
});
