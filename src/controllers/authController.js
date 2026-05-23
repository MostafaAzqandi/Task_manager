import bcrypt from "bcrypt";
import { User } from "../models/index.js";

class AuthController {
  async register(req, res) {
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
      res.json({ message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) return res.status(401).json({ error: "invalid credentials" });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ error: "invalid credentials" });

      req.session.userId = user.id;
      res.json({ message: `Wellcome ${user.fullName}` });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
