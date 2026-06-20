const API = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch { return null; }
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.quantity, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}

function updateNav() {
  const user = getUser();
  const token = getToken();
  const loginLink = document.getElementById('loginLink');
  const logoutBtn = document.getElementById('logoutBtn');
  const ordersLink = document.getElementById('ordersLink');
  const adminLink = document.getElementById('adminLink');

  if (token && user) {
    if (loginLink) loginLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
    if (ordersLink) ordersLink.style.display = 'inline-block';
    if (adminLink && user.isAdmin) adminLink.style.display = 'inline-block';
  } else {
    if (loginLink) loginLink.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (ordersLink) ordersLink.style.display = 'none';
    if (adminLink) adminLink.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function addToCart(id, name, price, image) {
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast(`"${name}" added to cart!`);
}

function clearCart() {
  if (confirm('Clear all items from cart?')) {
    saveCart([]);
    updateCartCount();
    window.location.reload();
  }
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    background: #6c63ff; color: #fff;
    padding: 0.75rem 1.25rem; border-radius: 8px;
    font-size: 0.9rem; font-weight: 600;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    z-index: 9999; animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);