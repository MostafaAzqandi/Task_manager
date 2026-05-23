import  User  from "./User.js";
import  Workspace  from "./Workspace.js";
import  WorkspaceMember  from "./WorkspaceMember.js";
import  Board  from "./Board.js";
import  Task  from "./Task.js";
import  TaskAssignee  from "./TaskAssignee.js";

// User <--> Workspace
User.belongsToMany(Workspace, {
  through: WorkspaceMember,
  foreignKey: "userId"
});

Workspace.belongsToMany(User, {
  through: WorkspaceMember,
  foreignKey: "workspaceId"
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
  foreignKey: "taskId"
});
User.belongsToMany(Task, {
    through: TaskAssignee,
  foreignKey: "userId"
});


export  {
    User,
    Workspace,
    WorkspaceMember,
    Board,
    Task,
    TaskAssignee
}