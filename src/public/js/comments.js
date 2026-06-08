document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".comment-card").forEach((comment) => {
    const editBtn = comment.querySelector(".edit-comment-btn");
    const form = comment.querySelector(".comment-edit-form");
    const content = comment.querySelector(".comment-content");
    const cancelBtn = comment.querySelector(".cancel-edit-btn");

    if (!editBtn || !form || !content) return;

    // EDIT CLICK
    editBtn.addEventListener("click", () => {
      content.classList.add("hidden");
      form.classList.remove("hidden");
      editBtn.classList.add("hidden");
    });

    // CANCEL CLICK
    cancelBtn?.addEventListener("click", () => {
      form.classList.add("hidden");
      content.classList.remove("hidden");
      editBtn.classList.remove("hidden");
    });
  });
});