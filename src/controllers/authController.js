import bcrypt from "bcrypt";
import { User } from "../models/index.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { fullName, username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        fullName,
        username,
        email,
        password: hashedPassword,
      });
      req.session.userId = user.id;
      // res.json({ message: "User registered successfully" });
      res.redirect("/auth/login");
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) return res.status(401).render("auth/login", {error: "Invalid credentials"});  //json({ error: "invalid credentials" });
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return res.status(401).render("auth/login", {error: "Invalid credentials"});  //json({ error: "invalid credentials" });

      req.session.userId = user.id;
      res.redirect("/workspaces");
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      req.session.destroy((error) => {
        if (error) return next(error);
        res.clearCookie("connect.sid");
        res.redirect("/auth/login");
      });
    } catch (error) {}
  }
  async loginPage(req, res, next) {
    try {
      res.render("auth/login", {error: null});
    } catch (error) {
      next(error);
    }
  }
  async registerPage(req, res, next) {
    try {
      res.render("auth/register");
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
