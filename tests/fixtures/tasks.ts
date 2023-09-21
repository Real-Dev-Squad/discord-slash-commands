export const tasks = {
  tasks: [
    {
      id: "qaCqdCTjRyX1EPLuv1mJ",
      percentCompleted: 40,
      endsOn: 1694217600,
      github: {
        issue: {
          id: 1847136216,
          assignee: "biswanathTewari",
          status: "open",
          assigneeRdsInfo: {
            firstName: "Biswanath",
            lastName: "Tewari",
            username: "biswanath",
          },
        },
      },
      createdBy: "ankush",
      assignee: "sunny-s",
      title: "Test Cases for QR scanning feature",
      type: "feature",
      priority: "TBD",
      status: "IN_PROGRESS",
      assigneeId: "jbGcfZLGYjHwxQ1Zh8ZJ",
      dependsOn: [],
    },
    {
      id: "xylBsqi7LayeiZVlJfUr",
      percentCompleted: 50,
      endsOn: 1694254620,
      github: {
        issue: {
          id: 1851253319,
          status: "open",
        },
      },
      createdBy: "amitprakash",
      assignee: "sunny-s",
      title: "/task command to  show assignee task details",
      type: "feature",
      priority: "TBD",
      status: "IN_PROGRESS",
      assigneeId: "jbGcfZLGYjHwxQ1Zh8ZJ",
      dependsOn: [],
    },
  ],
};

export const tasksResponse = {
  message: "Tasks returned successfully!",
  tasks: tasks.tasks,
  prev: "",
  next: "",
};
