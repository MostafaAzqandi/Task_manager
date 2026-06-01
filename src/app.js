import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from "method-override";
import authRouter from "./routes/auth.js";
import workspaceRouter from "./routes/workspace.js";
import boardRouter from "./routes/board.js";
import taskRouter from "./routes/task.js";
import commentRouter from "./routes/comment.js";

import {
  errorHandler,
  globalMiddleWare,
  loadUserMiddleware,
} from "./middlewares/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change_this_in_production",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  }),
);
app.use(flash());
app.use(loadUserMiddleware);
app.use(globalMiddleWare);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/workspaces", workspaceRouter);
app.use("/workspaces/:workspaceId/boards", boardRouter);
app.use("/workspaces/:workspaceId/boards/:boardId/tasks", taskRouter);
app.use("/workspaces/:workspaceId/boards/:boardId/tasks/:taskId/comments", commentRouter);


app.use(errorHandler);

export default app;
