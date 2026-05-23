import express from "express";
import session from "express-session";
import authRouter from "./routes/auth.js";
import workspaceRouter from "./routes/workspace.js";
import boardRouter from "./routes/board.js";
import errorHandler from "./middlewares/errorHandler.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change_this_in_production",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // Set to true if using HTTPS
  })
);
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/workspaces", workspaceRouter);
app.use("/workspaces/:workspaceId/boards", boardRouter)

app.use(errorHandler);






export default app;
