// popup toggle
const btn = document.getElementById("notificationBtn");
const popup = document.getElementById("notificationPopup");

btn.addEventListener("click", () => {
  popup.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!btn.contains(e.target) && !popup.contains(e.target)) {
    popup.classList.add("hidden");
  }
});

// mark as read (AJAX)
document.querySelectorAll(".notification-item").forEach((item) => {
  item.addEventListener("click", async () => {
    const id = item.dataset.id;

    const res = await fetch(`/notifications/${id}/read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success) {
      item.classList.remove("unread");
      item.classList.add("read");

      // update badge
      const badge = document.querySelector(".notification-badge");

      if (badge) {
        let count = parseInt(badge.innerText);

        count -= 1;

        if (count <= 0) {
          badge.remove();
        } else {
          badge.innerText = count;
        }
      }
    }
  });
});
