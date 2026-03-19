// script2.js - login, signup, session, address management, checkout, and payment

// ---------- DOM Elements (existing) ----------
const userIconContainer = document.getElementById('userIconContainer');
const userIcon = document.getElementById('userIcon');
const userDropdown = document.getElementById('userDropdown');
const logoutBtn = document.getElementById('logoutBtn');

const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirm = document.getElementById('signupConfirm');

const navHome = document.getElementById('navHome');
const navShop = document.getElementById('navShop');
const navNew = document.getElementById('navNew');
const navSale = document.getElementById('navSale');
const productDetail = document.getElementById('productDetail');
const closeProductDetail = document.getElementById('closeProductDetail');

// ---------- DOM Elements for Profile & Address ----------
const profileModal = document.getElementById('profileModal');
const closeProfileModal = document.getElementById('closeProfileModal');
const profileModalBody = document.getElementById('profileModalBody');
const addAddressBtn = document.getElementById('addAddressBtn');

const addressFormModal = document.getElementById('addressFormModal');
const closeAddressFormModal = document.getElementById('closeAddressFormModal');
const addressForm = document.getElementById('addressForm');
const addressFormTitle = document.getElementById('addressFormTitle');
const addressName = document.getElementById('addressName');
const addressLine = document.getElementById('addressLine');
const addressCity = document.getElementById('addressCity');
const addressState = document.getElementById('addressState');
const addressPincode = document.getElementById('addressPincode');
const addressPhone = document.getElementById('addressPhone');

const checkoutAddressModal = document.getElementById('checkoutAddressModal');
const closeCheckoutAddressModal = document.getElementById('closeCheckoutAddressModal');
const checkoutAddressList = document.getElementById('checkoutAddressList');
const confirmAddressBtn = document.getElementById('confirmAddressBtn');

// ---------- NEW: Payment Modal Elements ----------
const paymentModal = document.getElementById('paymentModal');
const closePaymentModal = document.getElementById('closePaymentModal');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
let selectedAddressForPayment = null; // store selected address index
// -----------------------------------------
// Initially hide the product detail
if (productDetail) productDetail.style.display = 'none';

// ---------- User Session (localStorage) ----------
let currentUser = JSON.parse(localStorage.getItem('shopnest_user')) || null;

// ---------- Helper: Show Toast ----------
function showToast(message, icon = 'fa-check-circle') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast glass';
  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---------- Update UI based on login state ----------
function updateUserUI() {
  if (currentUser) {
    userIcon?.classList.remove('far');
    userIcon?.classList.add('fas');
    userIconContainer?.classList.add('logged-in');
  } else {
    userIcon?.classList.remove('fas');
    userIcon?.classList.add('far');
    userIconContainer?.classList.remove('logged-in');
  }
}

// ---------- Address storage functions ----------
function getAddressesKey() {
  return currentUser ? `shopnest_addresses_${currentUser.email}` : null;
}

function loadAddresses() {
  if (!currentUser) return [];
  const key = getAddressesKey();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveAddresses(addresses) {
  if (!currentUser) return;
  const key = getAddressesKey();
  localStorage.setItem(key, JSON.stringify(addresses));
}

// ---------- Render profile modal ----------
function renderProfileModal() {
  if (!currentUser) {
    showToast('Please login first', 'fa-exclamation');
    return;
  }
  if (!profileModal || !profileModalBody) return;
  const addresses = loadAddresses();
  let html = '';
  if (addresses.length === 0) {
    html = '<p style="text-align:center; color:#64748b;">No addresses saved. Click "Add Address" to add one.</p>';
  } else {
    addresses.forEach((addr, index) => {
      html += `
        <div class="address-item" data-index="${index}">
          <div>
            <strong>${addr.name}</strong><br>
            ${addr.line}<br>
            ${addr.city}, ${addr.state} - ${addr.pincode}<br>
            Phone: ${addr.phone}
          </div>
          <div class="address-actions">
            <button class="edit-address" data-index="${index}"><i class="fas fa-edit"></i></button>
            <button class="delete-address" data-index="${index}"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
    });
  }
  profileModalBody.innerHTML = html;
  profileModal.style.display = 'flex';

  document.querySelectorAll('.edit-address').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      openAddressFormModal(loadAddresses()[index], index);
    });
  });
  document.querySelectorAll('.delete-address').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      const addresses = loadAddresses();
      addresses.splice(index, 1);
      saveAddresses(addresses);
      renderProfileModal();
      showToast('Address deleted', 'fa-trash');
    });
  });
}

// ---------- Open address form ----------
function openAddressFormModal(addr = null, index = null) {
  if (!currentUser) {
    showToast('Please login first', 'fa-exclamation');
    return;
  }
  if (!addressFormModal || !addressForm) return;
  if (addr) {
    addressFormTitle.textContent = 'Edit Address';
    addressName.value = addr.name || '';
    addressLine.value = addr.line || '';
    addressCity.value = addr.city || '';
    addressState.value = addr.state || '';
    addressPincode.value = addr.pincode || '';
    addressPhone.value = addr.phone || '';
  } else {
    addressFormTitle.textContent = 'Add Address';
    addressForm.reset();
  }
  addressForm.dataset.editIndex = index !== null ? index : '';
  addressFormModal.style.display = 'flex';
}

// ---------- Handle address form submit ----------
if (addressForm) {
  addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const addresses = loadAddresses();
    const newAddress = {
      name: addressName.value.trim(),
      line: addressLine.value.trim(),
      city: addressCity.value.trim(),
      state: addressState.value.trim(),
      pincode: addressPincode.value.trim(),
      phone: addressPhone.value.trim()
    };
    const editIndex = addressForm.dataset.editIndex;
    if (editIndex !== '') {
      addresses[editIndex] = newAddress;
      showToast('Address updated', 'fa-check');
    } else {
      addresses.push(newAddress);
      showToast('Address added', 'fa-check');
    }
    saveAddresses(addresses);
    addressFormModal.style.display = 'none';
    if (profileModal && profileModal.style.display === 'flex') {
      renderProfileModal();
    }
  });
}

// ---------- Checkout: show address selection ----------
function handleCheckout() {
  if (!currentUser) {
    showToast('Please login to checkout', 'fa-exclamation');
    openLoginModal();
    return;
  }
  const addresses = loadAddresses();
  if (addresses.length === 0) {
    showToast('Please add an address first', 'fa-exclamation');
    renderProfileModal();
    return;
  }
  if (!checkoutAddressModal || !checkoutAddressList) return;
  let html = '';
  addresses.forEach((addr, index) => {
    html += `
      <label class="address-radio-item">
        <input type="radio" name="checkoutAddress" value="${index}" ${index === 0 ? 'checked' : ''}>
        <div>
          <strong>${addr.name}</strong><br>
          ${addr.line}, ${addr.city}, ${addr.state} - ${addr.pincode}<br>
          Phone: ${addr.phone}
        </div>
      </label>
    `;
  });
  checkoutAddressList.innerHTML = html;
  checkoutAddressModal.style.display = 'flex';
}

// ---------- Confirm address and open payment modal ----------
confirmAddressBtn.addEventListener('click', () => {
  const selectedRadio = document.querySelector('input[name="checkoutAddress"]:checked');
  if (!selectedRadio) {
    showToast('Please select an address', 'fa-exclamation');
    return;
  }
  const index = selectedRadio.value;
  selectedAddressForPayment = index; // store for later use
  checkoutAddressModal.style.display = 'none';
  // Open payment modal
  if (paymentModal) paymentModal.style.display = 'flex';
});

// ---------- Confirm payment ----------
confirmPaymentBtn.addEventListener('click', () => {
  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
  if (!selectedPayment) {
    showToast('Please select a payment method', 'fa-exclamation');
    return;
  }
  const method = selectedPayment.value;
  let message = '';
  if (method === 'cod') {
    message = 'Order placed with Cash on Delivery!';
  } else {
    const methodName = method === 'credit' ? 'Credit Card' : method === 'debit' ? 'Debit Card' : 'UPI';
    message = `Payment successful via ${methodName}. Thank you for your purchase!`;
  }
  // Close payment modal
  paymentModal.style.display = 'none';
  // Clear cart (global function from script.js)
  if (typeof window.clearCart === 'function') {
    window.clearCart();
  }
  // Show success toast
  showToast(message, 'fa-check-circle');
  // Close cart modal if open
  const cartModal = document.getElementById('cartModal');
  if (cartModal) cartModal.style.display = 'none';
  // Reset stored address
  selectedAddressForPayment = null;
});

// ---------- Close payment modal ----------
closePaymentModal.addEventListener('click', () => {
  paymentModal.style.display = 'none';
});

// Expose handleCheckout globally
window.handleCheckout = handleCheckout;

// ---------- Update dropdown content (with Profile link) ----------
// ---------- Update dropdown content (with Profile link) ----------
function updateUserDropdown() {
  if (!userDropdown) return;
  if (currentUser) {
    userDropdown.innerHTML = `
      <div class="user-greeting">
        <i class="fas fa-user-circle"></i>
        <span>Hi, <strong>${currentUser.name}</strong></span>
      </div>
      <div class="dropdown-divider"></div>
      <a href="#" id="profileLink">
        <i class="fas fa-user"></i> My Profile
      </a>
      <a href="#" id="logoutBtn">
        <i class="fas fa-sign-out-alt"></i> Logout
      </a>
    `;
    document.getElementById('profileLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      userDropdown.classList.remove('show');
      renderProfileModal();
    });
  } else {
    // When not logged in, we don't show dropdown (logout only, but this case won't occur)
    userDropdown.innerHTML = `<a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>`;
  }
  attachLogoutListener();
}
// ---------- Attach logout event ----------
function attachLogoutListener() {
  const newLogoutBtn = document.getElementById('logoutBtn');
  if (newLogoutBtn) {
    newLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentUser = null;
      localStorage.removeItem('shopnest_user');
      updateUserUI();
      updateUserDropdown();
      if (userDropdown) userDropdown.classList.remove('show');
      showToast('Logged out', 'fa-sign-out-alt');
    });
  }
}

// ---------- Open login modal ----------
function openLoginModal() {
  if (!loginModal) return;
  loginModal.style.display = 'flex';
  loginTab?.classList.add('active');
  signupTab?.classList.remove('active');
  loginForm?.classList.add('active');
  signupForm?.classList.remove('active');
}

// ---------- Close login modal ----------
function closeLoginModalFunc() {
  if (loginModal) loginModal.style.display = 'none';
}

// ---------- Switch tabs ----------
loginTab?.addEventListener('click', () => {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
});
signupTab?.addEventListener('click', () => {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
});

// ---------- Signup ----------
signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;
  const confirm = signupConfirm.value;

  if (!name || !email || !password || !confirm) {
    showToast('Please fill all fields', 'fa-exclamation-triangle');
    return;
  }
  if (password !== confirm) {
    showToast('Passwords do not match', 'fa-exclamation-triangle');
    return;
  }

  let users = JSON.parse(localStorage.getItem('shopnest_users')) || [];
  if (users.find(u => u.email === email)) {
    showToast('Email already registered', 'fa-exclamation-circle');
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('shopnest_users', JSON.stringify(users));

  currentUser = { name, email };
  localStorage.setItem('shopnest_user', JSON.stringify(currentUser));
  updateUserUI();
  updateUserDropdown();
  closeLoginModalFunc();
  showToast(`Welcome, ${name}!`, 'fa-smile');
});

// ---------- Login ----------
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  const users = JSON.parse(localStorage.getItem('shopnest_users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showToast('Invalid email or password', 'fa-exclamation-circle');
    return;
  }

  currentUser = { name: user.name, email: user.email };
  localStorage.setItem('shopnest_user', JSON.stringify(currentUser));
  updateUserUI();
  updateUserDropdown();
  closeLoginModalFunc();
  showToast(`Logged in as ${user.name}`, 'fa-sign-in-alt');
});

// ---------- User icon click ----------
userIconContainer?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (currentUser) {
    userDropdown?.classList.toggle('show');
  } else {
    openLoginModal();
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (userIconContainer && !userIconContainer.contains(e.target)) {
    userDropdown?.classList.remove('show');
  }
});

// Close login modal
closeLoginModal?.addEventListener('click', closeLoginModalFunc);
window.addEventListener('click', (e) => {
  if (e.target === loginModal) closeLoginModalFunc();
});

// ---------- Close other modals ----------
closeProfileModal?.addEventListener('click', () => {
  if (profileModal) profileModal.style.display = 'none';
});
closeAddressFormModal?.addEventListener('click', () => {
  if (addressFormModal) addressFormModal.style.display = 'none';
});
closeCheckoutAddressModal?.addEventListener('click', () => {
  if (checkoutAddressModal) checkoutAddressModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === profileModal) profileModal.style.display = 'none';
  if (e.target === addressFormModal) addressFormModal.style.display = 'none';
  if (e.target === checkoutAddressModal) checkoutAddressModal.style.display = 'none';
  if (e.target === paymentModal) paymentModal.style.display = 'none';
});

// ---------- Add Address button ----------
addAddressBtn?.addEventListener('click', () => {
  openAddressFormModal();
});

// ---------- Navigation handlers ----------
navHome?.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.filter-btn[data-filter="all"]')?.click();
  if (productDetail) productDetail.style.display = 'none';
  showToast('Showing all products', 'fa-home');
});

navShop?.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.filter-btn[data-filter="all"]')?.click();
  if (productDetail) productDetail.style.display = 'none';
  showToast('Browse all products', 'fa-store');
});

navNew?.addEventListener('click', (e) => {
  e.preventDefault();
  if (typeof products === 'undefined') {
    showToast('Products not loaded', 'fa-exclamation');
    return;
  }
  const newProducts = products.filter(p => p.id > 15);
  if (typeof window.renderCustomGrid === 'function') {
    window.renderCustomGrid(newProducts, 'new');
  } else {
    document.querySelector('.filter-btn[data-filter="all"]')?.click();
  }
  if (productDetail) productDetail.style.display = 'none';
});

navSale?.addEventListener('click', (e) => {
  e.preventDefault();
  if (typeof products === 'undefined') {
    showToast('Products not loaded', 'fa-exclamation');
    return;
  }
  const saleProducts = products.filter(p => p.price < 500);
  if (typeof window.renderCustomGrid === 'function') {
    window.renderCustomGrid(saleProducts, 'sale');
  } else {
    document.querySelector('.filter-btn[data-filter="all"]')?.click();
  }
  if (productDetail) productDetail.style.display = 'none';
});
// ---------- About & Contact Modals ----------
const aboutModal = document.getElementById('aboutModal');
const closeAboutModal = document.getElementById('closeAboutModal');
const footerAbout = document.getElementById('footerAbout');

// Open About modal
footerAbout?.addEventListener('click', (e) => {
  e.preventDefault();
  if (aboutModal) aboutModal.style.display = 'flex';
});

// Close About modal
closeAboutModal?.addEventListener('click', () => {
  if (aboutModal) aboutModal.style.display = 'none';
});

// Close About modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === aboutModal) aboutModal.style.display = 'none';
});
// ---------- Initial UI update ----------
updateUserUI();
updateUserDropdown();