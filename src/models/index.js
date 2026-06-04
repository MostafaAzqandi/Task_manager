import User from "./User.js";
import Workspace from "./Workspace.js";
import WorkspaceMember from "./WorkspaceMember.js";
import Board from "./Board.js";
import Task from "./Task.js";
import TaskAssignee from "./TaskAssignee.js";
import TaskComment from "./TaskComment.js";
import ActivityLog from "./ActivityLog.js";
import Notification from "./Notification.js";

// User <--> Workspace
User.belongsToMany(Workspace, {
  through: WorkspaceMember,
  foreignKey: "userId",
});

Workspace.belongsToMany(User, {
  through: WorkspaceMember,
  foreignKey: "workspaceId",
});

// Workspace --> Board
Workspace.hasMany(Board, { foreignKey: "workspaceId" });
Board.belongsTo(Workspace, { foreignKey: "workspaceId" });

// Board --> Task
Board.hasMany(Task, { foreignKey: "boardId" });
Task.belongsTo(Board, { foreignKey: "boardId" });

// Task <--> User
Task.belongsToMany(User, {
  through: TaskAssignee,
  foreignKey: "taskId",
  as: "assignees",
});
User.belongsToMany(Task, {
  through: TaskAssignee,
  foreignKey: "userId",
  as: "assignedTasks",
});

// User --> Task
User.hasMany(Task, { foreignKey: "createdBy", as: "createdTasks" });
Task.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

// Task --> Comment
Task.hasMany(TaskComment, {
  foreignKey: "taskId",
});
TaskComment.belongsTo(Task, {
  foreignKey: "taskId",
});

// User --> Comment
User.hasMany(TaskComment, {
  foreignKey: "userId",
});
TaskComment.belongsTo(User, {
  foreignKey: "userId",
  as: "author",
});

// User --> Activity
ActivityLog.belongsTo(User, {
  foreignKey: "userId",
  as: "actor",
});
User.hasMany(ActivityLog, {
  foreignKey: "userId",
  as: "activities",
});

// Task --> Activity
ActivityLog.belongsTo(Task, {
  foreignKey: "taskId",
  as: "task",
});
Task.hasMany(ActivityLog, {
  foreignKey: "taskId",
  as: "activities",
});

// User --> Notification
Notification.belongsTo(User,{
  foreignKey: "userId"
});
User.hasMany(Notification, {
  foreignKey: "userId"
});

export {
  User,
  Workspace,
  WorkspaceMember,
  Board,
  Task,
  TaskAssignee,
  TaskComment,
  ActivityLog,
  Notification
};
