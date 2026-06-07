// public/js/notification.js

const btn = document.getElementById("notificationBtn");
const popup = document.getElementById("notificationPopup");

// toggle popup
btn?.addEventListener("click", () => {
  popup?.classList.toggle("hidden");
});

// close popup when clicking outside
document.addEventListener("click", (e) => {
  if (
    popup &&
    btn &&
    !btn.contains(e.target) &&
    !popup.contains(e.target)
  ) {
    popup.classList.add("hidden");
  }
});

// mark notification as read
document.querySelectorAll("[data-notification-item]").forEach((item) => {
  item.addEventListener("click", async () => {
    const id = item.dataset.id;

    try {
      const res = await fetch(`/notifications/${id}/read`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {

        // update notification style
        item.classList.remove("bg-indigo-50");
        item.classList.add("bg-white");

        // update badge
        const badge = document.querySelector(
          "[data-notification-badge]"
        );

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

    } catch (error) {
      console.error(error);
    }
  });
});