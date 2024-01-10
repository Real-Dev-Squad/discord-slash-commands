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

  it("Should return a string with task details", () => {
    const tasksData: task = tasks.tasks[0];
    const formattedTask = formatTask(tasksData);
    const expectedTitle = `**Title:** Test Cases for QR scanning feature`;
    const expectedProgress = `**Progress:** 40%`;
    const expectedEndsOn = `**Ends On:** 09/09/2023`;
    const expectedMoreDetails = `**More details:** [Task Details](https://status.realdevsquad.com/tasks/qaCqdCTjRyX1EPLuv1mJ)`;
    const expectedTask = `${expectedTitle}\n${expectedProgress}\n${expectedEndsOn}\n${expectedMoreDetails}`;
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

  it("Should return a string with task details", () => {
    const formattedTasks = tasks.tasks.map((task: task) => formatTask(task));
    console.log("format task frm fail", formattedTasks.length);
    const responseMessage = generateTaskResponseMessage(
      "sunny-s",
      formattedTasks,
      "IN_PROGRESS"
    );
    const expectedMessage = `## In Progress Tasks of sunny-s`;

    const expectedTitle1 = `**Title:** Test Cases for QR scanning feature`;
    const expectedProgress1 = `**Progress:** 40%`;
    const expectedEndsOn1 = `**Ends On:** 09/09/2023`;
    const expectedMoreDetails1 = `**More details:** [Task Details](https://status.realdevsquad.com/tasks/qaCqdCTjRyX1EPLuv1mJ)`;

    const expectedTitle2 =
      "**Title:** /task command to  show assignee task details";
    const expectedProgress2 = `**Progress:** 50%`;
    const expectedEndsOn2 = `**Ends On:** 09/09/2023`;
    const expectedMoreDetails2 = `**More details:** [Task Details](https://status.realdevsquad.com/tasks/xylBsqi7LayeiZVlJfUr)`;

    const task1 = `${expectedTitle1}\n${expectedProgress1}\n${expectedEndsOn1}\n${expectedMoreDetails1}`;

    const task2 = `${expectedTitle2}\n${expectedProgress2}\n${expectedEndsOn2}\n${expectedMoreDetails2}`;

    const allTaskURL = `[→ All Tasks](https://status.realdevsquad.com/tasks?q=status:all+assignee:sunny-s)`;

    const expectedResponseMessage = `${expectedMessage}\n${task1}\n\n${task2}\n${allTaskURL}\n`;
    expect(responseMessage).toBe(expectedResponseMessage);
  });

  it("should return a string if user don't have any in-progress task", () => {
    const formattedTasks: [] = [];
    console.log("format task frm fail", formattedTasks.length);
    const responseMessage = generateTaskResponseMessage(
      "anish-pawaskar",
      formattedTasks,
      "IN_PROGRESS"
    );
    const expectedMessage = `## anish-pawaskar doesn't have any in-progress task`;
    const allTaskURL = `[→ All Tasks](https://status.realdevsquad.com/tasks?q=status:all+assignee:anish-pawaskar)`;
    const expectedResponseMessage = `${expectedMessage}\n\n${allTaskURL}\n`;
    expect(responseMessage).toBe(expectedResponseMessage);
  });
});
