import { ActivityLog } from "../models/index.js";

export async function logActivity({ taskId, userId, action }) {
  try {
    await ActivityLog.create({ taskId, userId, action });
    console.log(`User: ${userId} in Task: ${taskId}, action: ${action}`);
  } catch (error) {
    console.error("log failed: ", error);
  }
}
