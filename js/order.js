/* =========================================================
   StyleNest — order.js
   Displays saved orders and handles View Order clicks
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("ordersList");
  const emptyState = document.getElementById("emptyOrders");

  if (!list || !emptyState || !window.SN) {
    console.error("StyleNest: Order elements or window.SN are missing.");
    return;
  }

  const { storage, money } = window.SN;

  // Load saved orders
  const orders = storage.get("sn_orders") || [];

  if (!Array.isArray(orders) || orders.length === 0) {
    list.innerHTML = "";
    list.hidden = true;
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  list.hidden = false;

  // Format order date
  function formatDate(iso) {
    const date = new Date(iso);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // Display order cards
  list.innerHTML = orders
    .map(
      (order) => `
        <article class="order-card">
          <div class="order-card-head">
            <div>
              <p class="order-id">${order.id ?? "N/A"}</p>
              <p class="order-date">
                Placed ${formatDate(order.date)}
              </p>
            </div>

            <span class="order-status">
              ${order.status ?? "Confirmed"}
            </span>
          </div>

          <div class="order-card-body">
            ${(Array.isArray(order.items) ? order.items : [])
              .map(
                (item) => `
                    <div class="order-item-row">
                      <img
                        src="${item.img ?? ""}"
                        alt="${item.name ?? "Product"}"
                      >

                      <div>
                        <p class="product-name">
                          ${item.name ?? "Product"}
                        </p>

                        <p class="product-color">
                          Qty ${item.qty ?? 1}
                        </p>
                      </div>

                      <p class="row-price">
                        ${money(
                          (Number(item.price) || 0) * (Number(item.qty) || 1),
                        )}
                      </p>
                    </div>
                  `,
              )
              .join("")}
          </div>

          <div class="order-card-foot">
            <span class="order-total">
              Total: ${money(Number(order.total) || 0)}
            </span>

            <button
              type="button"
              class="btn btn-primary view-order-btn"
              data-order-id="${order.id ?? ""}"
            >
              View Order
            </button>
          </div>
        </article>
      `,
    )
    .join("");

  // Handle View Order button clicks
  list.addEventListener("click", (event) => {
    const button = event.target.closest(".view-order-btn");

    if (!button) return;

    const orderId = button.dataset.orderId;

    const selectedOrder = orders.find(
      (order) => String(order.id) === String(orderId),
    );

    if (!selectedOrder) {
      alert("Order not found!");
      return;
    }

    alert(
      `Order ID: ${selectedOrder.id}\n` +
        `Status: ${selectedOrder.status ?? "Confirmed"}\n` +
        `Total: ${money(Number(selectedOrder.total) || 0)}`,
    );
  });
});
