/* =========================================================
   StyleNest — orders.js
   Runs on orders.html. Renders orders saved in localStorage
   by checkout.js (falls back to an empty state if none exist).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('ordersList');
    if (!list || !window.SN) return;

    const { storage, money } = window.SN;
    const orders = storage.get('sn_orders');
    const emptyState = document.getElementById('emptyOrders');

    if (orders.length === 0) {
        list.hidden = true;
        emptyState.hidden = false;
        return;
    }

    function formatDate(iso) {
        return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    list.innerHTML = orders.map(order => `
    <article class="order-card">
      <div class="order-card-head">
        <div>
          <p class="order-id">${order.id}</p>
          <p class="order-date">Placed ${formatDate(order.date)}</p>
        </div>
        <span class="order-status">${order.status}</span>
      </div>
      <div class="order-card-body">
        ${order.items.map(item => `
          <div class="order-item-row">
            <img src="${item.img}" alt="${item.name}">
            <div>
              <p class="product-name">${item.name}</p>
              <p class="product-color">Qty ${item.qty}</p>
            </div>
            <p class="row-price">${money(item.price * item.qty)}</p>
          </div>`).join('')}
      </div>
      <div class="order-card-foot">
        <span class="order-total">Total: ${money(order.total)}</span>
        <button class="btn btn-ghost">Track Order</button>
      </div>
    </article>`).join('');
});