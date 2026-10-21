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
        const cart = storage.get('sn_cart') || [];
        const counts = {};

        cart.forEach(id => {
            counts[id] = (counts[id] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([id, qty]) => ({
                product: PRODUCTS.find(p => String(p.id) === String(id)),
                qty
            }))
            .filter(row => row.product);
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
    const upiFields = document.getElementById('upiFields');

    function updatePaymentFields() {
        const selected = document.querySelector(
            '#payMethods input[name="payment"]:checked'
        );

        const method = selected ? selected.value : 'card';

        document.querySelectorAll('.pay-option').forEach(option => {
            const radio = option.querySelector('input[name="payment"]');
            option.classList.toggle('active', !!radio && radio.checked);
        });

        if (cardFields) {
            cardFields.style.display =
                method === 'card' ? 'grid' : 'none';

            cardFields.querySelectorAll('input').forEach(field => {
                field.disabled = method !== 'card';
                field.required = method === 'card';
            });
        }

        if (upiFields) {
            upiFields.style.display = method === 'upi' ? 'grid' : 'none';

            upiFields.querySelectorAll('input').forEach(field => {
                field.disabled = method !== 'upi';
                field.required = method === 'upi';
            });
        }
    }

    document.querySelectorAll(
        '#payMethods input[name="payment"]'
    ).forEach(radio => {
        radio.addEventListener('change', updatePaymentFields);
    });

    updatePaymentFields();



    const form = document.getElementById('checkoutForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Read the latest cart directly from storage.
        const cart = storage.get('sn_cart');

        const counts = {};
        cart.forEach(id => {
            counts[id] = (counts[id] || 0) + 1;
        });

        const rows = Object.entries(counts)
            .map(([id, qty]) => ({
                product: PRODUCTS.find(p => String(p.id) === String(id)),
                qty
            }))
            .filter(row => row.product);

        console.log('Cart at checkout:', cart);
        console.log('Valid checkout rows:', rows);

        if (rows.length === 0) {
            alert('Your cart is empty! Please add a product first.');
            return;
        }

        const selectedPayment =
            form.querySelector('input[name="payment"]:checked')?.value;

        if (selectedPayment === 'upi') {
            const upiId = form.elements.upiId.value.trim();

            if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
                alert('Please enter a valid UPI ID.');
                form.elements.upiId.focus();
                return;
            }
        }

        if (selectedPayment === 'card' || selectedPayment === 'upi') {
            alert(
                'Online payments are not connected yet. ' +
                'Please use Cash on Delivery to test checkout.'
            );
            return;
        }

        const subtotal = rows.reduce(
            (sum, row) => sum + row.product.price * row.qty,
            0
        );

        const shipping =
            subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
                ? 0
                : SHIPPING_FLAT;

        const order = {
            id: 'SN-' + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toISOString(),
            status: 'Confirmed',
            items: rows.map(row => ({
                id: row.product.id,
                name: row.product.name,
                img: row.product.img,
                price: row.product.price,
                qty: row.qty
            })),
            total: subtotal + shipping
        };

        // Preserve existing orders and add the new order.
        const orders = storage.get('sn_orders');
        orders.unshift(order);
        storage.set('sn_orders', orders);

        // Clear the cart only after the order has been saved.
        storage.set('sn_cart', []);
        window.SN.cart = [];

        // Update the review and cart count.
        renderReview();
        window.SN.updateCounts();

        // Show confirmation.
        const overlay = document.getElementById('confirmOverlay');
        document.getElementById('confirmOrderId').textContent =
            `Order ${order.id}`;

        overlay.hidden = false;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });


    const closeConfirm = document.getElementById('closeConfirm');
    console.log('Close button found:', closeConfirm);
    const confirmOverlay = document.getElementById('confirmOverlay');


    if (closeConfirm && confirmOverlay) {
        closeConfirm.addEventListener('click', () => {
            console.log('Close button clicked!');
            confirmOverlay.hidden = true;
            confirmOverlay.style.display = 'none';
            document.body.style.overflow = '';
        });

        confirmOverlay.addEventListener('click', (event) => {
            if (event.target === confirmOverlay) {
                confirmOverlay.hidden = true;
                document.body.style.overflow = '';
            }
        });
    }



});