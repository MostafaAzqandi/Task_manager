import  User  from "./User.js";
import  Workspace  from "./Workspace.js";
import  WorkspaceMember  from "./WorkspaceMember.js";
import  Board  from "./Board.js";
import  Task  from "./Task.js";
import  TaskAssignee  from "./TaskAssignee.js";

// User <--> Workspace
User.belongsToMany(Workspace, {
  through: WorkspaceMember,
  foreignKey: "user_id"
});

Workspace.belongsToMany(User, {
  through: WorkspaceMember,
  foreignKey: "workspace_id"
});

// Workspace --> Board
Workspace.hasMany(Board, { foreignKey: "workspace_id" });
Board.belongsTo(Workspace, { foreignKey: "workspace_id" });

// Board --> Task
Board.hasMany(Task, { foreignKey: "board_id" });
Task.belongsTo(Board, { foreignKey: "board_id" });

// Task <--> User
Task.belongsToMany(User, {
    through: TaskAssignee,
  foreignKey: "task_id"
});
User.belongsToMany(Task, {
    through: TaskAssignee,
  foreignKey: "user_id"
});


export  {
    User,
    Workspace,
    WorkspaceMember,
    Board,
    Task,
    TaskAssignee
}