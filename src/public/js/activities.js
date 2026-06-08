document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loadMoreActivities");
  const list = document.querySelector(".activity-section .space-y-3");

  if (!btn || !list) return;

  let loading = false;

  let offset = Number(btn.dataset.offset);
  const taskId = btn.dataset.task;
  const workspaceId = btn.dataset.workspace;
  const boardId = btn.dataset.board;

  btn.addEventListener("click", async () => {
    if (loading) return;

    loading = true;
    btn.innerText = "Loading...";

    try {
      const res = await fetch(
        `/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}/activities?offset=${offset}`
      );

      const data = await res.json();

      if (!data.activities.length) {
        btn.remove();
        return;
      }

      data.activities.forEach((a) => {
        const div = document.createElement("div");
        div.className = "flex gap-3";

        div.innerHTML = `
          <div class="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
          <div class="flex-1">
            <p class="text-sm">
              <strong>${a.actor.fullName}</strong> ${formatAction(a.action)}
            </p>
            <p class="text-xs text-gray-400">
              ${new Date(a.createdAt).toLocaleString()}
            </p>
          </div>
        `;

        list.appendChild(div);
      });

      offset += data.activities.length;

      if (!data.hasMore) {
        btn.remove();
      }

    } catch (err) {
      console.error(err);
      btn.innerText = "Try again";
    } finally {
      loading = false;
    }
  });

  function formatAction(action) {
    return {
      comment_created: "added a comment",
      comment_updated: "updated a comment",
      comment_deleted: "deleted a comment",
      task_assigned: "assigned a user"
    }[action] || "did something";
  }
});