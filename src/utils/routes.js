export const routes = {

  workspace: (workspaceId) =>
    `/workspaces/${workspaceId}`,

  workspaceBoards: (workspaceId) =>
    `/workspaces/${workspaceId}/boards`,

  board: (workspaceId, boardId) =>
    `/workspaces/${workspaceId}/boards/${boardId}`,

  task: (workspaceId, boardId, taskId) =>
    `/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}`,

};