import bcrypt from "bcrypt";
import { User } from "../models/index.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { fullName, username, email, password } = req.body;
      if (!fullName || !username || !email || !password) {
        req.flash("error", "All fields are required!");
        return res.redirect("/auth/register");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        fullName,
        username,
        email,
        password: hashedPassword,
      });
      req.session.userId = user.id;
      req.flash("success", "User created successfully");
      return res.redirect("/auth/login");
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

      if (!user) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/auth/login");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/auth/login");
      }

      req.session.userId = user.id;
      req.flash("success", "Login successful");
      return res.redirect("/workspaces");
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
    } catch (error) {
      next(error);
    }
  }
  async loginPage(req, res, next) {
    try {
      res.render("auth/login");
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
