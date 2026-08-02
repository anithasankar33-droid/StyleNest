/* =========================================================
   StyleNest — product-details.js
   Runs on product-details.html. Reads ?id= from the URL to
   find the product in window.SN.PRODUCTS and renders the page.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const pdpLayout = document.getElementById('pdpLayout');
    if (!pdpLayout || !window.SN) return;

    const { PRODUCTS, money, storage, toast, addToCart, toggleWishlist, cardHTML, wireGridEvents } = window.SN;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');
    const product = PRODUCTS.find(p => p.id === requestedId) || PRODUCTS[0];

    let selectedSize = product.size[0];
    let qty = 1;

    /* ---------- Populate static fields ---------- */
    document.getElementById('pdpCrumb').textContent = product.name;
    document.title = `${product.name} — StyleNest`;
    document.getElementById('pdpCategory').textContent = {
        wedding: 'Wedding Guest', work: 'Office to Evening', gala: 'Black Tie', everyday: 'Everyday Linen'
    }[product.category] || product.category;
    document.getElementById('pdpName').textContent = product.name;
    document.getElementById('pdpColor').textContent = product.color;
    document.getElementById('pdpMainImg').src = product.img;
    document.getElementById('pdpMainImg').alt = `${product.name}, ${product.color} dress`;

    const priceEl = document.getElementById('pdpPrice');
    priceEl.innerHTML = product.wasPrice
        ? `<span class="was">${money(product.wasPrice)}</span>${money(product.price)}`
        : money(product.price);

    const tagEl = document.getElementById('pdpTag');
    if (product.tag) {
        tagEl.textContent = product.tag;
        tagEl.hidden = false;
        if (product.tag === 'Sale') tagEl.classList.add('sale');
    }

    /* ---------- Thumbnails (reuse the same image at a few crops for a believable gallery) ---------- */
    const thumbsEl = document.getElementById('pdpThumbs');
    const gallery = [product.img, product.img, product.img];
    thumbsEl.innerHTML = gallery.map((src, i) => `
    <button class="pdp-thumb${i === 0 ? ' active' : ''}" data-src="${src}">
      <img src="${src}" alt="${product.name} view ${i + 1}">
    </button>`).join('');

    thumbsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.pdp-thumb');
        if (!btn) return;
        document.getElementById('pdpMainImg').src = btn.dataset.src;
        thumbsEl.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
    });

    /* ---------- Size selector ---------- */
    const sizesEl = document.getElementById('pdpSizes');
    const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
    sizesEl.innerHTML = ALL_SIZES.map(s => {
        const available = product.size.includes(s);
        return `<button type="button" class="size-chip${s === selectedSize ? ' active' : ''}" data-size="${s}" ${available ? '' : 'disabled'}>${s}</button>`;
    }).join('');

    sizesEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.size-chip');
        if (!chip || chip.disabled) return;
        selectedSize = chip.dataset.size;
        sizesEl.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
    });

    /* ---------- Quantity stepper ---------- */
    const qtyEl = document.getElementById('pdpQty');
    document.getElementById('pdpQtyDec').addEventListener('click', () => {
        qty = Math.max(1, qty - 1);
        qtyEl.textContent = qty;
    });
    document.getElementById('pdpQtyInc').addEventListener('click', () => {
        qty = Math.min(10, qty + 1);
        qtyEl.textContent = qty;
    });

    /* ---------- Add to cart / wishlist ---------- */
    document.getElementById('pdpAddCart').addEventListener('click', () => {
        for (let i = 0; i < qty; i++) addToCart(product.id);
        toast(`${qty} × ${product.name} (${selectedSize}) added to cart`);
    });

    const wishBtn = document.getElementById('pdpWishBtn');
    const wishlist = storage.get('sn_wishlist');
    if (wishlist.includes(product.id)) wishBtn.classList.add('active');
    wishBtn.addEventListener('click', () => {
        const active = toggleWishlist(product.id);
        wishBtn.classList.toggle('active', active);
    });

    /* ---------- Tabs ---------- */
    document.querySelectorAll('.pdp-tab-head').forEach(head => {
        head.addEventListener('click', () => {
            document.querySelectorAll('.pdp-tab-head').forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.pdp-tab-panel').forEach(p => p.classList.remove('active'));
            head.classList.add('active');
            document.getElementById(`tab-${head.dataset.tab}`).classList.add('active');
        });
    });

    /* ---------- Related products (same category, excluding self) ---------- */
    const relatedGrid = document.getElementById('relatedGrid');
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = related.map(cardHTML).join('');
    wireGridEvents(relatedGrid);
});