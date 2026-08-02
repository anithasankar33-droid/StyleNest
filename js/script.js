/* =========================================================
   StyleNest — script.js
   Shared across every page: product data, cart/wishlist
   state, header (nav/search), newsletter, toast.
   Exposes window.SN so page-specific scripts (e.g. shop.js)
   can reuse data + helpers without duplicating them.
   ========================================================= */

(function () {

    /* ---------- Product data ---------- */
    const PRODUCTS = [
        {
            id: 'sn-0001',
            name: 'Elegant Evening Dress',
            color: 'Wine Red',
            category: 'Evening Wear',
            type: 'Maxi Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 4999,
            wasPrice: 5499,
            img: 'images/evening dress.jpg'
        },
        {
            id: 'sn-0002',
            name: 'Royal Wedding Gown',
            color: 'Ivory White',
            category: 'Wedding Guest',
            type: 'Bridal Gown',
            size: ['S', 'M', 'L', 'XL'],
            price: 8999,
            wasPrice: 9999,
            img: 'images/wedding gown.jpg'
        },
        {
            id: 'sn-0003',
            name: 'Classic Office Dress',
            color: 'Navy Blue',
            category: 'Office Wear',
            type: 'Shift Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3299,
            wasPrice: 3699,
            img: 'images/office dress.jpg'
        },
        {
            id: 'sn-0004',
            name: 'Golden Party Gown',
            color: 'Golden',
            category: 'Party Wear',
            type: 'Evening Gown',
            size: ['S', 'M', 'L'],
            price: 6999,
            wasPrice: 7999,
            img: 'images/party gown.jpg'
        },
        {
            id: 'sn-0005',
            name: 'Floral Summer Dress',
            color: 'Pink',
            category: 'Summer Collection',
            type: 'Floral Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 2799,
            wasPrice: 3199,
            img: 'images/summer dress.jpg'
        },
        {
            id: 'sn-0006',
            name: 'Casual Cotton Dress',
            color: 'Sky Blue',
            category: 'Casual Wear',
            type: 'Cotton Dress',
            size: ['XS', 'S', 'M', 'L', 'XL'],
            price: 2399,
            wasPrice: 2799,
            img: 'images/cotton dress.jpg'
        },
        {
            id: 'sn-0007',
            name: 'Black Cocktail Dress',
            color: 'Black',
            category: 'Party Wear',
            type: 'Cocktail Dress',
            size: ['S', 'M', 'L'],
            price: 5499,
            wasPrice: 5999,
            img: 'images/cocktail dress.jpg'
        },
        {
            id: 'sn-0008',
            name: 'Silk Evening Gown',
            color: 'Emerald Green',
            category: 'Luxury Collection',
            type: 'Silk Gown',
            size: ['XS', 'S', 'M', 'L'],
            price: 7999,
            wasPrice: 8999,
            img: 'images/evening gown.jpg'
        },
        {
            id: 'sn-0009',
            name: 'Denim Shirt Dress',
            color: 'Blue',
            category: 'Casual Wear',
            type: 'Shirt Dress',
            size: ['S', 'M', 'L', 'XL'],
            price: 2999,
            wasPrice: 3499,
            img: 'images/shirt dress.jpg'
        },
        {
            id: 'sn-0010',
            name: 'Linen Midi Dress',
            color: 'Beige',
            category: 'Office Wear',
            type: 'Midi Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3599,
            wasPrice: 3999,
            img: 'images/midi.jpg'
        },
        {
            id: 'sn-0011',
            name: 'Velvet Maxi Dress',
            color: 'Maroon',
            category: 'Winter Collection',
            type: 'Maxi Dress',
            size: ['S', 'M', 'L'],
            price: 6499,
            wasPrice: 7299,
            img: 'images/maxi dress.jpg'
        },
        {
            id: 'sn-0012',
            name: 'Satin A-Line Dress',
            color: 'Lavender',
            category: 'Designer Collection',
            type: 'A-Line Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 4299,
            wasPrice: 4799,
            img: 'images/line dress.jpg'
        },
        {
            id: 'sn-0013',
            name: 'Midnight Glam Dress',
            color: 'Midnight Blue',
            category: 'Evening Wear',
            type: 'Mermaid Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 5899,
            wasPrice: 6499,
            img: 'images/glam dress.jpg'
        },
        {
            id: 'sn-0014',
            name: 'Pearl Elegance Gown',
            color: 'Pearl White',
            category: 'Wedding Guest',
            type: 'Ball Gown',
            size: ['S', 'M', 'L', 'XL'],
            price: 9299,
            wasPrice: 9999,
            img: 'images/elegance gown.jpg'
        },
        {
            id: 'sn-0015',
            name: 'Executive Pencil Dress',
            color: 'Charcoal Grey',
            category: 'Office Wear',
            type: 'Pencil Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3499,
            wasPrice: 3899,
            img: 'images/pencil dress.jpg'
        },
        {
            id: 'sn-0016',
            name: 'Sparkle Sequin Dress',
            color: 'Silver',
            category: 'Party Wear',
            type: 'Sequin Dress',
            size: ['S', 'M', 'L'],
            price: 5799,
            wasPrice: 6399,
            img: 'images/sequin dress.jpg'
        },
        {
            id: 'sn-0017',
            name: 'Bloom Floral Maxi',
            color: 'Rose Pink',
            category: 'Summer Collection',
            type: 'Maxi Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3199,
            wasPrice: 3599,
            img: 'images/floral maxi.jpg'
        },
        {
            id: 'sn-0018',
            name: 'Relaxed Linen Dress',
            color: 'Cream',
            category: 'Casual Wear',
            type: 'Linen Dress',
            size: ['S', 'M', 'L', 'XL'],
            price: 2699,
            wasPrice: 3099,
            img: 'images/linen dress.jpg'
        },
        {
            id: 'sn-0019',
            name: 'Velvet Cocktail Dress',
            color: 'Deep Purple',
            category: 'Party Wear',
            type: 'Cocktail Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 5599,
            wasPrice: 6199,
            img: 'images/velvet dress.jpg'
        },
        {
            id: 'sn-0020',
            name: 'Royal Satin Gown',
            color: 'Royal Blue',
            category: 'Luxury Collection',
            type: 'Satin Gown',
            size: ['S', 'M', 'L'],
            price: 8399,
            wasPrice: 9199,
            img: 'images/royal gown.jpg'
        },
        {
            id: 'sn-0021',
            name: 'Weekend Denim Dress',
            color: 'Light Blue',
            category: 'Casual Wear',
            type: 'Denim Dress',
            size: ['XS', 'S', 'M', 'L', 'XL'],
            price: 2899,
            wasPrice: 3299,
            img: 'images/weekend dress.jpg'
        },
        {
            id: 'sn-0022',
            name: 'Office Chic Midi',
            color: 'Olive Green',
            category: 'Office Wear',
            type: 'Midi Dress',
            size: ['S', 'M', 'L'],
            price: 3799,
            wasPrice: 4199,
            img: 'images/chic midi.jpg'
        },
        {
            id: 'sn-0023',
            name: 'Winter Knit Dress',
            color: 'Coffee Brown',
            category: 'Winter Collection',
            type: 'Knit Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 4699,
            wasPrice: 5199,
            img: 'images/knit dress.jpg'
        },
        {
            id: 'sn-0024',
            name: 'Designer Wrap Dress',
            color: 'Emerald Green',
            category: 'Designer Collection',
            type: 'Wrap Dress',
            size: ['S', 'M', 'L', 'XL'],
            price: 4999,
            wasPrice: 5599,
            img: 'images/wrap dress.jpg'
        },
        {
            id: 'sn-0025',
            name: 'Rose Bloom Dress',
            color: 'Rose Pink',
            category: 'Floral Collection',
            type: 'A-Line Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3499,
            wasPrice: 3999,
            img: 'images/bloom dress.jpg'
        },
        {
            id: 'sn-0026',
            name: 'Ivory Lace Gown',
            color: 'Ivory',
            category: 'Wedding Guest',
            type: 'Lace Gown',
            size: ['S', 'M', 'L', 'XL'],
            price: 8499,
            wasPrice: 9299,
            img: 'images/ivory gown.jpg'
        },
        {
            id: 'sn-0027',
            name: 'Urban Chic Dress',
            color: 'Grey',
            category: 'Office Wear',
            type: 'Bodycon Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3699,
            wasPrice: 4199,
            img: 'images/urban dress.jpg'
        },
        {
            id: 'sn-0028',
            name: 'Ruby Spark Dress',
            color: 'Ruby Red',
            category: 'Party Wear',
            type: 'Mini Dress',
            size: ['S', 'M', 'L'],
            price: 4599,
            wasPrice: 5199,
            img: 'images/ruby dress.jpg'
        },
        {
            id: 'sn-0029',
            name: 'Sunshine Maxi Dress',
            color: 'Yellow',
            category: 'Summer Collection',
            type: 'Maxi Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3199,
            wasPrice: 3699,
            img: 'images/sunshine dress.jpg'
        },
        {
            id: 'sn-0030',
            name: 'Soft Linen Dress',
            color: 'Cream',
            category: 'Casual Wear',
            type: 'Linen Dress',
            size: ['XS', 'S', 'M', 'L', 'XL'],
            price: 2799,
            wasPrice: 3299,
            img: 'images/soft dress.jpg'
        },
        {
            id: 'sn-0031',
            name: 'Moonlight Gown',
            color: 'Silver',
            category: 'Evening Wear',
            type: 'Ball Gown',
            size: ['S', 'M', 'L'],
            price: 7899,
            wasPrice: 8599,
            img: 'images/moonlight.jpg'
        },
        {
            id: 'sn-0032',
            name: 'Velvet Royale Dress',
            color: 'Dark Purple',
            category: 'Luxury Collection',
            type: 'Velvet Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 6599,
            wasPrice: 7299,
            img: 'images/velvet.jpg'
        },
        {
            id: 'sn-0033',
            name: 'Classic Denim Dress',
            color: 'Dark Blue',
            category: 'Casual Wear',
            type: 'Denim Dress',
            size: ['S', 'M', 'L', 'XL'],
            price: 3099,
            wasPrice: 3599,
            img: 'images/denim dress.jpg'
        },
        {
            id: 'sn-0034',
            name: 'Olive Wrap Dress',
            color: 'Olive Green',
            category: 'Designer Collection',
            type: 'Wrap Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 4299,
            wasPrice: 4899,
            img: 'images/olive dress.jpg'
        },
        {
            id: 'sn-0035',
            name: 'Winter Comfort Dress',
            color: 'Chocolate Brown',
            category: 'Winter Collection',
            type: 'Sweater Dress',
            size: ['S', 'M', 'L'],
            price: 4399,
            wasPrice: 4999,
            img: 'images/winter dress.jpg'
        },
        {
            id: 'sn-0036',
            name: 'Emerald Designer Gown',
            color: 'Emerald Green',
            category: 'Designer Collection',
            type: 'Evening Gown',
            size: ['XS', 'S', 'M', 'L'],
            price: 6999,
            wasPrice: 7699,
            img: 'images/emerald.jpg'
        },
        {
            id: 'sn-0037',
            name: 'Cherry Blossom Dress',
            color: 'Cherry Pink',
            category: 'Floral Collection',
            type: 'Floral Maxi Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3799,
            wasPrice: 4299,
            img: 'images/cherry.jpg'
        },
        {
            id: 'sn-0038',
            name: 'Lavender Breeze Dress',
            color: 'Lavender',
            category: 'Floral Collection',
            type: 'A-Line Dress',
            size: ['S', 'M', 'L'],
            price: 3599,
            wasPrice: 3999,
            img: 'images/breeze.jpg'
        },
        {
            id: 'sn-0039',
            name: 'Sunflower Meadow Dress',
            color: 'Sunflower Yellow',
            category: 'Floral Collection',
            type: 'Midi Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 3399,
            wasPrice: 3899,
            img: 'images/sunflower.jpg'
        },
        {
            id: 'sn-0040',
            name: 'Rose Garden Dress',
            color: 'Rose Red',
            category: 'Floral Collection',
            type: 'Wrap Dress',
            size: ['XS', 'S', 'M', 'L', 'XL'],
            price: 3999,
            wasPrice: 4499,
            img: 'images/rose.jpg'
        },
        {
            id: 'sn-0041',
            name: 'Royal Anarkali Dress',
            color: 'Maroon',
            category: 'Ethnic Collection',
            type: 'Anarkali',
            size: ['S', 'M', 'L', 'XL'],
            price: 6499,
            wasPrice: 7199,
            img: 'images/anarkali.jpg'
        },
        {
            id: 'sn-0042',
            name: 'Elegant Kurti Dress',
            color: 'Turquoise',
            category: 'Ethnic Collection',
            type: 'Kurti',
            size: ['XS', 'S', 'M', 'L'],
            price: 2899,
            wasPrice: 3399,
            img: 'images/kurti.jpg'
        },
        {
            id: 'sn-0043',
            name: 'Festive Embroidered Gown',
            color: 'Emerald Green',
            category: 'Ethnic Collection',
            type: 'Embroidered Gown',
            size: ['S', 'M', 'L'],
            price: 7299,
            wasPrice: 7999,
            img: 'images/festive.jpg'
        },
        {
            id: 'sn-0044',
            name: 'Silk Heritage Dress',
            color: 'Royal Purple',
            category: 'Ethnic Collection',
            type: 'Silk Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 5999,
            wasPrice: 6699,
            img: 'images/silk.jpg'
        },
        {
            id: 'sn-0045',
            name: 'Urban Fashion Dress',
            color: 'red',
            category: 'New Arrivals',
            type: 'Bodycon Dress',
            size: ['XS', 'S', 'M', 'L'],
            price: 4199,
            wasPrice: 4699,
            img: 'images/urban.jpg'
        },
        {
            id: 'sn-0046',
            name: 'Modern Chic Dress',
            color: 'Coral',
            category: 'New Arrivals',
            type: 'Mini Dress',
            size: ['S', 'M', 'L'],
            price: 3899,
            wasPrice: 4399,
            img: 'images/modern.jpg'
        },
        {
            id: 'sn-0047',
            name: 'Signature Elegance Dress',
            color: 'Champagne Gold',
            category: 'New Arrivals',
            type: 'Evening Dress',
            size: ['XS', 'S', 'M', 'L', 'XL'],
            price: 7599,
            wasPrice: 8299,
            img: 'images/signature.jpg'
        },
        {
            id: 'sn-0048',
            name: 'Diamond Luxe Gown',
            color: 'Silver Grey',
            category: 'New Arrivals',
            type: 'Luxury Gown',
            size: ['S', 'M', 'L', 'XL'],
            price: 9999,
            wasPrice: 10999,
            img: 'images/gown.jpg'
        },

        {
            id: 'sn-0049',
            name: 'Relaxed Cotton Shirt',
            color: 'White',
            category: 'Casual Wear',
            type: 'Shirt',
            size: ['S', 'M', 'L', 'XL'],
            price: 2499,
            wasPrice: 2899,
            img: 'images/Casual/shirt.jpg'
        },
        {
            id: 'sn-0050',
            name: 'Weekend Hoodie',
            color: 'Light Grey',
            category: 'Casual Wear',
            type: 'Hoodie',
            size: ['S', 'M', 'L', 'XL'],
            price: 3299,
            wasPrice: 3799,
            img: 'images/Casual/hoodie.jpg'
        },
        {
            id: 'sn-0051',
            name: 'Classic Polo Tee',
            color: 'Navy Blue',
            category: 'Casual Wear',
            type: 'Polo T-Shirt',
            size: ['S', 'M', 'L', 'XL'],
            price: 1899,
            wasPrice: 2299,
            img: 'images/Casual/polo.jpg'
        },
        {
            id: 'sn-0052',
            name: 'Slim Fit Jeans',
            color: 'Dark Blue',
            category: 'Casual Wear',
            type: 'Jeans',
            size: ['28', '30', '32', '34', '36'],
            price: 2999,
            wasPrice: 3499,
            img: 'images/Casual/jeans.jpg'
        },
        {
            id: 'sn-0053',
            name: 'Linen Casual Top',
            color: 'Cream',
            category: 'Casual Wear',
            type: 'Top',
            size: ['XS', 'S', 'M', 'L'],
            price: 2199,
            wasPrice: 2599,
            img: 'images/Casual/top.jpg'
        },
        {
            id: 'sn-0054',
            name: 'Cargo Jogger Pants',
            color: 'Olive Green',
            category: 'Casual Wear',
            type: 'Joggers',
            size: ['S', 'M', 'L', 'XL'],
            price: 2899,
            wasPrice: 3299,
            img: 'images/Casual/cargo.jpg'
        },
        {
            id: 'sn-0055',
            name: 'Oversized Graphic Tee',
            color: 'Black',
            category: 'Casual Wear',
            type: 'T-Shirt',
            size: ['S', 'M', 'L', 'XL'],
            price: 1699,
            wasPrice: 1999,
            img: 'images/Casual/graphic.jpg'
        },
        {
            id: 'sn-0056',
            name: 'Casual Denim Jacket',
            color: 'Blue',
            category: 'Casual Wear',
            type: 'Jacket',
            size: ['S', 'M', 'L', 'XL'],
            price: 4299,
            wasPrice: 4899,
            img: 'images/Casual/jacket.jpg'
        },
        {
            id: 'sn-0057',
            name: 'Everyday Co-Ord Set',
            color: 'Beige',
            category: 'Casual Wear',
            type: 'Co-Ord Set',
            size: ['XS', 'S', 'M', 'L'],
            price: 3899,
            wasPrice: 4399,
            img: 'images/Casual/coord.jpg'
        },
        {
            id: 'sn-0058',
            name: 'Relaxed Sweatshirt',
            color: 'Dusty Pink',
            category: 'Casual Wear',
            type: 'Sweatshirt',
            size: ['S', 'M', 'L', 'XL'],
            price: 2699,
            wasPrice: 3099,
            img: 'images/Casual/sweatshirt.jpg'
        },
    ];

    const money = (paise) => `₹${paise.toLocaleString('en-IN')}`;

    /* ---------- State (persisted) ---------- */
    const storage = {
        get(key) {
            try { return JSON.parse(localStorage.getItem(key)) || []; }
            catch { return []; }
        },
        set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
    };

    let wishlist = storage.get('sn_wishlist');
    let cart = storage.get('sn_cart');

    function updateCounts() {
        const w = document.getElementById('wishlistCount');
        const c = document.getElementById('cartCount');
        if (w) w.textContent = wishlist.length;
        if (c) c.textContent = cart.length;
    }

    function toast(msg) {
        const el = document.getElementById('toast');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(() => el.classList.remove('show'), 2200);
    }

    function toggleWishlist(id) {
        const product = PRODUCTS.find(p => p.id === id);
        const isActive = wishlist.includes(id);
        if (isActive) {
            wishlist = wishlist.filter(w => w !== id);
            toast(`Removed ${product.name} from wishlist`);
        } else {
            wishlist.push(id);
            toast(`Added ${product.name} to wishlist`);
        }
        storage.set('sn_wishlist', wishlist);
        updateCounts();
        return !isActive;
    }

    function addToCart(id) {
        const product = PRODUCTS.find(p => p.id === id);
        cart.push(id);
        storage.set('sn_cart', cart);
        updateCounts();
        toast(`${product.name} added to cart`);
    }

    function cardHTML(p) {
        const isWishlisted = wishlist.includes(p.id);
        return `
      <article class="product-card" data-id="${p.id}" data-type="${p.type}" data-category="${p.category}" data-price="${p.price}">
        <div class="product-media">
          ${p.tag ? `<span class="product-tag${p.tag === 'Sale' ? ' sale' : ''}">${p.tag}</span>` : ''}
          <button class="wishlist-toggle${isWishlisted ? ' active' : ''}" aria-label="Toggle wishlist" data-id="${p.id}">
            <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.35-9.5-8.5C.7 8.1 2.1 4.5 5.7 4.1 8 3.85 10 5 12 7.5 14 5 16 3.85 18.3 4.1c3.6.4 5 4 3.2 7.4C19 15.65 12 20 12 20z"/></svg>
          </button>
          <img src="${p.img}" alt="${p.name}, ${p.color} dress" loading="lazy">
          <button class="quick-add" data-id="${p.id}">Add to Cart — ${money(p.price)}</button>
        </div>
        <div class="product-info">
          <p class="product-name">${p.name}</p>
          <div class="product-meta">
            <span class="product-color">${p.color}</span>
            <span class="product-price">${p.wasPrice ? `<span class="was">${money(p.wasPrice)}</span>` : ''}${money(p.price)}</span>
          </div>
        </div>
      </article>`;
    }

    /* Delegate wishlist + quick-add clicks for any grid on the page */
    function wireGridEvents(gridEl, onChange) {
        gridEl.addEventListener('click', (e) => {
            const wishBtn = e.target.closest('.wishlist-toggle');
            const addBtn = e.target.closest('.quick-add');

            if (wishBtn) {
                const active = toggleWishlist(wishBtn.dataset.id);
                wishBtn.classList.toggle('active', active);
            }
            if (addBtn) {
                addToCart(addBtn.dataset.id);
            }
            if (onChange) onChange();
        });
    }

    /* ---------- Expose shared API ---------- */
    window.SN = { PRODUCTS, money, storage, wishlist, cart, updateCounts, toast, toggleWishlist, addToCart, cardHTML, wireGridEvents };

    /* ========================================================
       Page-agnostic UI: header nav, search, newsletter
       ======================================================== */
    document.addEventListener('DOMContentLoaded', () => {
        updateCounts();

        /* ---------- Mobile nav ---------- */
        const navToggle = document.getElementById('navToggle');
        const mainNav = document.getElementById('mainNav');
        if (navToggle && mainNav) {
            navToggle.addEventListener('click', () => {
                const isOpen = mainNav.classList.toggle('open');
                navToggle.classList.toggle('open', isOpen);
                navToggle.setAttribute('aria-expanded', isOpen);
            });
            mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
                mainNav.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', false);
            }));
        }

        /* ---------- Search panel ---------- */
        const searchBtn = document.getElementById('searchBtn');
        const searchPanel = document.getElementById('searchPanel');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('searchInput');
        if (searchBtn && searchPanel) {
            searchBtn.addEventListener('click', () => {
                searchPanel.classList.add('open');
                searchPanel.querySelector('input').focus();
            });
            searchClose.addEventListener('click', () => searchPanel.classList.remove('open'));
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape')
                    searchPanel.classList.remove('open');
            });
        }

        /* ---------- Newsletter form ---------- */
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            const newsletterMsg = document.getElementById('newsletterMsg');
            const emailInput = document.getElementById('newsletterEmail');
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = emailInput.value.trim();
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                if (!isValid) {
                    newsletterMsg.textContent = 'Please enter a valid email address.';
                    newsletterMsg.style.color = '#E08A8A';
                    return;
                }
                newsletterMsg.textContent = `You're on the list, ${email.split('@')[0]}. Watch your inbox.`;
                newsletterMsg.style.color = '';
                newsletterForm.reset();
            });
        }

        /* ---------- Sticky header shadow on scroll ---------- */
        const header = document.getElementById('siteHeader');
        if (header) {
            window.addEventListener('scroll', () => {
                header.style.boxShadow = window.scrollY > 8 ? '0 2px 14px rgba(26,20,32,0.06)' : 'none';
            }, { passive: true });
        }

        /* ========================================================
           Homepage-only: trending grid + filter tabs
           ======================================================== */
        const homeGrid = document.getElementById('productGrid');
        if (homeGrid) {
            function renderHome(filter = 'all') {
                const items = filter === 'all'
                    ? PRODUCTS
                    : PRODUCTS.filter(p => p.category === filter);
                homeGrid.innerHTML = items.map(cardHTML).join('');
            }
            renderHome();
            // Live Search
            if (searchInput) {
                searchInput.addEventListener("input", function () {
                    const keyword = this.value.toLowerCase().trim();

                    const filtered = PRODUCTS.filter(product =>
                        product.name.toLowerCase().includes(keyword) ||
                        product.category.toLowerCase().includes(keyword) ||
                        product.type.toLowerCase().includes(keyword) ||
                        product.color.toLowerCase().includes(keyword)
                    );

                    homeGrid.innerHTML = filtered.map(cardHTML).join("");

                    // Reattach events after rendering
                    wireGridEvents(homeGrid);
                });
            }
            wireGridEvents(homeGrid);

            const tabs = document.querySelectorAll('#filterTabs .tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    renderHome(tab.dataset.filter);
                });
            });
        }
    });

})();
