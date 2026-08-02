/* =========================================================
   StyleNest — wishlist.js
   Runs on wishlist.html. Renders PRODUCTS filtered to the
   ids saved in sn_wishlist.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('wishlistGrid');
    if (!grid || !window.SN) return;

    const { PRODUCTS, storage, cardHTML, wireGridEvents, toggleWishlist } = window.SN;
    const emptyState = document.getElementById('emptyWishlist');

    function render() {
        const ids = storage.get('sn_wishlist');
        const items = PRODUCTS.filter(p => ids.includes(p.id));

        if (items.length === 0) {
            grid.hidden = true;
            emptyState.hidden = false;
            return;
        }
        grid.hidden = false;
        emptyState.hidden = true;
        grid.innerHTML = items.map(cardHTML).join('');
    }

    wireGridEvents(grid, render);
    render();
});