let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

const products = [
    {id: 1, name: "Smartphone", price: 299.99, category: "electronics", img: "product image/iphone ultra.jpeg", desc: "Latest model smartphone with high-end features."},
    {id: 2, name: "Headphones", price: 99.99, category: "electronics", img: "product image/headphone.jpeg", desc: "Noise-cancelling over-ear headphones."},
    {id: 3, name: "T-Shirt", price: 19.99, category: "fashion", img: "product image/t-shirt.avif", desc: "Comfortable cotton t-shirt."},
    {id: 4, name: "Coffee Maker", price: 49.99, category: "home", img: "product image/coffer maker.jpeg", desc: "Brew your perfect coffee at home."}
];

const productGrid = document.getElementById('product-grid');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');

function displayProducts(productsToShow) {
    productGrid.innerHTML = '';
    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
        `;
        card.addEventListener('click', () => openModal(product));
        productGrid.appendChild(card);
    });
}

function addToCart(product) {
    cart.push(product);
    cartTotal += product.price;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    cartItemsEl.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsEl.appendChild(li);
    });
    cartTotalEl.textContent = cartTotal.toFixed(2);
    cartCountEl.textContent = cart.length;
}

// Filter by category
function filterCategory(category) {
    if(category === 'all') displayProducts(products);
    else displayProducts(products.filter(p => p.category === category));
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    displayProducts(products.filter(p => p.name.toLowerCase().includes(query)));
});

// Modal functionality
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalAddBtn = document.getElementById('modal-add-btn');
const closeModalBtn = document.getElementById('close-modal');

function openModal(product) {
    modal.style.display = 'block';
    modalImg.src = product.img;
    modalTitle.textContent = product.name;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalDesc.textContent = product.desc;
    modalAddBtn.onclick = () => {
        addToCart(product);
        modal.style.display = 'none';
    };
}

closeModalBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length === 0) alert('Your cart is empty!');
    else {
        alert(`Thank you for your purchase! Total: $${cartTotal.toFixed(2)}`);
        cart = [];
        cartTotal = 0;
        localStorage.removeItem('cart');
        updateCart();
    }
});

// Initialize
displayProducts(products);
updateCart();
