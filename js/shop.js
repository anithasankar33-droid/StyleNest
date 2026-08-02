/* =========================================================
   StyleNest — shop.js
   Runs only on shop.html. Reads window.SN (from script.js)
   for product data + cart/wishlist helpers, and layers on
   multi-criteria filtering, sorting, and pagination.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('shopGrid');
    if (!grid || !window.SN) return;

    const { PRODUCTS, cardHTML, wireGridEvents } = window.SN;

    const PAGE_SIZE = 8;
    let currentPage = 1;

    const state = {
        categories: new Set(),
        types: new Set(),
        sizes: new Set(),
        maxPrice: 10000,
        sort: 'featured'
    };

    const resultCount = document.getElementById('resultCount');
    const noResults = document.getElementById('noResults');
    const pagination = document.getElementById('pagination');

    function getFiltered() {
        let items = PRODUCTS.filter(p => {
            if (state.categories.size && !state.categories.has(p.category)) return false;
            if (state.types.size && !state.types.has(p.type)) return false;
            if (state.sizes.size && !p.size.some(s => state.sizes.has(s))) return false;
            if (p.price > state.maxPrice) return false;
            return true;
        });

        switch (state.sort) {
            case 'price-asc': items.sort((a, b) => a.price - b.price); break;
            case 'price-desc': items.sort((a, b) => b.price - a.price); break;
            case 'name-asc': items.sort((a, b) => a.name.localeCompare(b.name)); break;
            default: break; // featured = catalogue order
        }
        return items;
    }

    function renderPagination(totalItems) {
        const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
        if (currentPage > totalPages) currentPage = totalPages;
        pagination.innerHTML = '';
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
            btn.textContent = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                render();
                window.scrollTo({ top: document.getElementById('shopFilters').offsetTop - 100, behavior: 'smooth' });
            });
            pagination.appendChild(btn);
        }
    }

    function render() {
        const filtered = getFiltered();
        const start = (currentPage - 1) * PAGE_SIZE;
        const pageItems = filtered.slice(start, start + PAGE_SIZE);

        resultCount.textContent = `${filtered.length} dress${filtered.length === 1 ? '' : 'es'}`;
        grid.innerHTML = pageItems.map(cardHTML).join('');
        noResults.hidden = filtered.length !== 0;
        grid.style.display = filtered.length === 0 ? 'none' : 'grid';

        renderPagination(filtered.length);
    }

    wireGridEvents(grid);

    /* ---------- Category + type checkboxes ---------- */
    document.querySelectorAll('#shopFilters input[name="category"]').forEach(box => {
        box.addEventListener('change', () => {
            box.checked ? state.categories.add(box.value) : state.categories.delete(box.value);
            currentPage = 1;
            render();
        });
    });

    document.querySelectorAll('#shopFilters input[name="type"]').forEach(box => {
        box.addEventListener('change', () => {
            box.checked ? state.types.add(box.value) : state.types.delete(box.value);
            currentPage = 1;
            render();
        });
    });

    /* ---------- Size chips ---------- */
    document.querySelectorAll('.size-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const size = chip.dataset.size;
            const active = chip.classList.toggle('active');
            active ? state.sizes.add(size) : state.sizes.delete(size);
            currentPage = 1;
            render();
        });
    });

    /* ---------- Price range ---------- */
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    priceRange.addEventListener('input', () => {
        state.maxPrice = Number(priceRange.value);
        priceValue.textContent = `₹${state.maxPrice.toLocaleString('en-IN')}`;
        currentPage = 1;
        render();
    });

    /* ---------- Sort ---------- */
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        state.sort = e.target.value;
        currentPage = 1;
        render();
    });

    /* ---------- Clear filters ---------- */
    document.getElementById('clearFilters').addEventListener('click', () => {
        state.categories.clear();
        state.types.clear();
        state.sizes.clear();
        state.maxPrice = 10000;
        state.sort = 'featured';
        currentPage = 1;

        document.querySelectorAll('#shopFilters input[type="checkbox"]').forEach(b => b.checked = false);
        document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
        priceRange.value = 10000;
        priceValue.textContent = '₹10,000';
        document.getElementById('sortSelect').value = 'featured';

        render();
    });

    render();
});