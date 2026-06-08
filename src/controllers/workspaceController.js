import { Op } from "sequelize";
import sequelize from "../database/database.js";
import {
  User,
  Task,
  Workspace,
  WorkspaceMember,
  Board,
  Notification,
} from "../models/index.js";
import { routes } from "../utils/routes.js";
import { getPagination } from "../utils/pagination.js";

class WorkspaceController {
  async createWorkspace(req, res, next) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      if (!req.body.title?.trim() || !req.body.visibility?.trim()) {
        req.flash("error", "Title cannot be empty");
        return res.redirect("/workspaces/new");
      }
      const workspace = await Workspace.create(
        {
          title: req.body.title,
          visibility: req.body.visibility,
          createdBy: req.user.id,
        },
        { transaction },
      );
      await WorkspaceMember.create(
        {
          userId: req.user.id,
          workspaceId: workspace.id,
          role: "owner",
        },
        { transaction },
      );
      await transaction.commit();

      // res.json(workspace);
      req.flash("success", "Workspace created");
      return res.redirect("/workspaces");
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      next(error);
    }
  }
  async updateWorkspace(req, res, next) {
    try {
      if (!req.body.title?.trim() || !req.body.visibility?.trim()) {
        req.flash("error", "Title cannot be empty");
        return res.redirect(routes.workspace(req.workspace.id) + "/edit");
      }
      await req.workspace.update({
        title: req.body.title,
        visibility: req.body.visibility,
      });
      req.flash("success", "Workspace updated");
      return res.redirect(routes.workspace(req.workspace.id));
    } catch (error) {
      next(error);
    }
  }
  async deleteWorkspace(req, res, next) {
    try {
      await req.workspace.destroy();
      // res.json({ message: "Task deleted" });
      req.flash("success", "Workspace Deleted");
      return res.redirect("/workspaces");
    } catch (error) {
      next(error);
    }
  }
  async getWorkspaces(req, res, next) {
    try {
      const workspaces = await req.user.getWorkspaces();
      res.json(workspaces);
    } catch (error) {
      next(error);
    }
  }
  getWorkspace(req, res, next) {
    try {
      res.json(req.workspace);
    } catch (error) {
      next(error);
    }
  }
async getWorkspacesPage(req, res, next) {
  try {

    const { limit, offset, currentPage } =
      getPagination(req.query.page, 6);

    // PUBLIC
    const publicWorkspaces =
      await Workspace.findAll({

        where: {
          visibility: "public",
        },

        include: [Board],
      });

    // MEMBER
    const memberWorkspaces =
      await req.user.getWorkspaces({

        include: [Board],

        joinTableAttributes: ["role"],
      });

    const map = new Map();

    [...publicWorkspaces, ...memberWorkspaces]
      .forEach(workspace => {

        map.set(workspace.id, workspace);

      });

    const allWorkspaces =
      [...map.values()];

    // PAGINATION
    const totalItems =
      allWorkspaces.length;

    const totalPages =
      Math.ceil(totalItems / limit);

    const workspaces =
      allWorkspaces.slice(
        offset,
        offset + limit
      );

    res.render("workspaces/index", {
      workspaces,
      currentPage,
      totalPages,
    });

  } catch (error) {
    next(error);
  }
}
  async getWorkspacePage(req, res, next) {
    try {
      const { limit, offset, currentPage } = getPagination(req.query.page, 6);

      const workspace = req.workspace;

      const memberCount = await workspace.countUsers();

      const { rows: boards, count: totalBoards } = await Board.findAndCountAll({
        where: {
          workspaceId: workspace.id,
        },

        include: [Task],

        limit,
        offset,

        order: [["createdAt", "DESC"]],

        distinct: true,
      });

      const totalPages = Math.ceil(totalBoards / limit);

      res.render("workspaces/show", {
        workspace,
        boards,
        totalBoards,
        memberCount,
        currentPage,
        totalPages,
        routes,
      });
    } catch (error) {
      next(error);
    }
  }
  createWorkspacePage(req, res, next) {
    try {
      res.render("workspaces/create");
    } catch (error) {
      next(error);
    }
  }
  getWorkspaceEditPage(req, res, next) {
    try {
      const workspace = req.workspace;
      res.render("workspaces/edit", { workspace, routes });
    } catch (error) {
      next(error);
    }
  }
  async inviteUser(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        req.flash("error", "User Not found");
        return res.redirect(routes.workspace(req.workspace.id));
      }
      const existingMember = await WorkspaceMember.findOne({
        where: {
          userId: user.id,
          workspaceId: req.workspace.id,
        },
      });
      if (existingMember) {
        req.flash("error", "User already a member");
        return res.redirect(routes.workspace(req.workspace.id));
      }

      await WorkspaceMember.create({
        workspaceId: req.workspace.id,
        userId: user.id,
        role: "member",
      });
      await Notification.create({
        userId: user.id,
        type: "Workspace invitation",
        message: `You are invited to workspace: ${req.workspace.title}`,
      });
      req.flash("success", "User invited");
      res.redirect(routes.workspace(req.workspace.id));
    } catch (error) {
      next(error);
    }
  }
}

export default new WorkspaceController();
