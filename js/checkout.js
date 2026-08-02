/* =========================================================
   StyleNest — checkout.js
   Runs on checkout.html. Reviews the cart, toggles payment
   fields, validates the form, then "places" the order.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const reviewItemsEl = document.getElementById('reviewItems');
    if (!reviewItemsEl || !window.SN) return;

    const { PRODUCTS, money, storage } = window.SN;
    const SHIPPING_FLAT = 199;
    const FREE_SHIPPING_THRESHOLD = 5000;

    function groupCart() {
        const cart = storage.get('sn_cart');
        const counts = {};
        cart.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
        return Object.entries(counts).map(([id, qty]) => ({
            product: PRODUCTS.find(p => p.id === id),
            qty
        })).filter(row => row.product);
    }

    function renderReview() {
        const rows = groupCart();
        reviewItemsEl.innerHTML = rows.map(r => `
      <div class="review-row">
        <img src="${r.product.img}" alt="${r.product.name}">
        <div>
          <p class="product-name">${r.product.name}</p>
          <p class="product-color">Qty ${r.qty}</p>
        </div>
        <p class="row-price">${money(r.product.price * r.qty)}</p>
      </div>`).join('');

        const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0);
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
        const total = subtotal + shipping;

        document.getElementById('reviewSubtotal').textContent = money(subtotal);
        document.getElementById('reviewShipping').textContent = shipping === 0 ? 'Free' : money(shipping);
        document.getElementById('reviewTotal').textContent = money(total);

        document.getElementById('cartCount').textContent = storage.get('sn_cart').length;

        if (rows.length === 0) {
            document.getElementById('checkoutForm').querySelector('.place-order-btn').textContent = 'Your cart is empty';
            document.getElementById('checkoutForm').querySelector('.place-order-btn').disabled = true;
        }
    }
    renderReview();

    /* ---------- Payment method toggle ---------- */
    const cardFields = document.getElementById('cardFields');
    document.querySelectorAll('#payMethods input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.pay-option').forEach(opt => opt.classList.remove('active'));
            radio.closest('.pay-option').classList.add('active');
            cardFields.style.display = radio.value === 'card' ? 'grid' : 'none';
        });
    });

    /* ---------- Submit / place order ---------- */
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const orderId = 'SN-' + Math.floor(100000 + Math.random() * 900000);
        storage.set('sn_cart', []);

        document.getElementById('confirmOrderId').textContent = `Order ${orderId}`;
        document.getElementById('confirmOverlay').hidden = false;
        document.body.style.overflow = 'hidden';
    });
});