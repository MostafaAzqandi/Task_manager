document.addEventListener("DOMContentLoaded", () => {
  console.log("comments.js loaded");

  const comments = document.querySelectorAll(".comment-card");

  comments.forEach((comment) => {
    const editBtn = comment.querySelector(".edit-comment-btn");
    const form = comment.querySelector(".comment-edit-form");
    const content = comment.querySelector(".comment-content");
    const cancelBtn = comment.querySelector(".cancel-edit-btn");

    if (!editBtn) return;

    editBtn.addEventListener("click", () => {
      console.log("edit clicked");

      content.classList.add("hidden");
      form.classList.remove("hidden");
      editBtn.classList.add("hidden");
    });

    cancelBtn?.addEventListener("click", () => {
      form.classList.add("hidden");
      content.classList.remove("hidden");
      editBtn.classList.remove("hidden");
    });
  });
});