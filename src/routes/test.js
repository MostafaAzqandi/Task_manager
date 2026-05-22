import express from "express";

import  {User, Workspace} from "../models/index.js";

const testRouter = express.Router();

testRouter.get("/", async (req, res) => {
  try {
    const user = await User.create({
      fullName: "Mostafa",
      username: "mostafa222",
      email: "mostafa2331@test.com",
      password: "password123",
    });
    res.json(user);
  } catch (error) {
    console.log(error.original?.sqlMessage);
    console.log(error);
    
  }
  const workspace = await Workspace.create({
    title: "Mostafa's Workspace",
    createdBy: user.id,
  });

  await workspace.addUser(user, { through: { role: "owner" } });

  res.json(
    await Workspace.findAll({
      include: User,
    }),
  );
});

export default testRouter;
