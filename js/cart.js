/* =========================================================
   StyleNest — cart.js
   Runs on cart.html. Cart is stored as an array of product
   ids (duplicates = quantity) via window.SN's shared storage.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsEl = document.getElementById('cartItems');
    if (!cartItemsEl || !window.SN) return;

    const { PRODUCTS, money, storage, toast } = window.SN;

    const SHIPPING_FLAT = 199;
    const FREE_SHIPPING_THRESHOLD = 5000;
    let promoDiscount = 0;

    function getCart() { return storage.get('sn_cart'); }
    function setCart(cart) { storage.set('sn_cart', cart); document.getElementById('cartCount').textContent = cart.length; }

    function groupCart(cart) {
        const counts = {};
        cart.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
        return Object.entries(counts).map(([id, qty]) => ({
            product: PRODUCTS.find(p => p.id === id),
            qty
        })).filter(row => row.product);
    }

    function rowHTML(row) {
        const { product, qty } = row;
        return `
      <article class="cart-row" data-id="${product.id}">
        <img src="${product.img}" alt="${product.name}">
        <div class="cart-row-info">
          <p class="product-name">${product.name}</p>
          <p class="product-color">${product.color} · Size M</p>
          <button class="remove-link" data-id="${product.id}">Remove</button>
        </div>
        <div class="qty-stepper">
          <button class="qty-btn" data-action="dec" data-id="${product.id}">−</button>
          <span>${qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${product.id}">+</button>
        </div>
        <p class="row-price">${money(product.price * qty)}</p>
      </article>`;
    }

    function render() {
        const cart = getCart();
        const rows = groupCart(cart);
        const cartLayout = document.getElementById('cartLayout');
        const emptyState = document.getElementById('emptyCart');

        if (rows.length === 0) {
            cartLayout.hidden = true;
            emptyState.hidden = false;
            return;
        }
        cartLayout.hidden = false;
        emptyState.hidden = true;

        cartItemsEl.innerHTML = rows.map(rowHTML).join('');

        const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0);
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
        const total = Math.max(0, subtotal + shipping - promoDiscount);

        document.getElementById('subtotal').textContent = money(subtotal);
        document.getElementById('shippingCost').textContent = shipping === 0 ? 'Free' : money(shipping);
        document.getElementById('totalCost').textContent = money(total);
    }

    cartItemsEl.addEventListener('click', (e) => {
        const qtyBtn = e.target.closest('.qty-btn');
        const removeBtn = e.target.closest('.remove-link');
        let cart = getCart();

        if (qtyBtn) {
            const id = qtyBtn.dataset.id;
            if (qtyBtn.dataset.action === 'inc') {
                cart.push(id);
            } else {
                const idx = cart.indexOf(id);
                if (idx !== -1) cart.splice(idx, 1);
            }
            setCart(cart);
            render();
        }

        if (removeBtn) {
            const id = removeBtn.dataset.id;
            const product = PRODUCTS.find(p => p.id === id);
            cart = cart.filter(c => c !== id);
            setCart(cart);
            toast(`${product.name} removed from cart`);
            render();
        }
    });

    document.getElementById('promoApply').addEventListener('click', () => {
        const code = document.getElementById('promoInput').value.trim().toUpperCase();
        const msg = document.getElementById('promoMsg');
        if (code === 'STYLE10') {
            const cart = getCart();
            const subtotal = groupCart(cart).reduce((sum, r) => sum + r.product.price * r.qty, 0);
            promoDiscount = Math.round(subtotal * 0.10);
            msg.textContent = '10% off applied — happy fitting.';
            msg.style.color = 'var(--sage)';
        } else if (code) {
            promoDiscount = 0;
            msg.textContent = 'That code isn\u2019t valid right now.';
            msg.style.color = '#B5555F';
        }
        render();
    });

    render();
});