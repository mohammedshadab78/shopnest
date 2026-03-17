# 🛍️ shopnest – E-commerce Product Page

**shopnest** is a modern, responsive e-commerce product page built with HTML, CSS, and JavaScript. It showcases a curated collection of electronics, clothing, accessories, and footwear with a sleek **glassmorphism** design. The app simulates a real shopping experience including product browsing, wishlist, cart, user authentication, address management, and checkout.

🌐 **Live Demo:**    https://mohammedshadab78.github.io/shopnest/
---

## ✨ Features

- **Product Catalog** – 40+ products across 4 categories (Electronics, Clothing, Accessories, Footwear).
- **Product Detail View** – High-res image gallery with thumbnail navigation, quantity selector, add to cart/wishlist.
- **Wishlist** – Save items for later; accessible via modal.
- **Shopping Cart** – Add/remove items, adjust quantities, live total.
- **User Authentication** – Sign up and log in (email/password) with session persistence using `localStorage`.
- **Address Management** – Add, edit, delete delivery addresses (stored per user).
- **Checkout Flow** – Select address, choose payment method (Credit/Debit Card, UPI, Cash on Delivery), success message.
- **Search** – Real-time search with debounce (searches product names and categories).
- **Filter & Sort** – Filter by category; sort by price, name, or rating.
- **Responsive Design** – Fully optimized for mobile, tablet, and desktop.
- **Toast Notifications** – User-friendly feedback for all actions.
- **Glassmorphism UI** – Modern frosted glass effect throughout.

---

## 🛠️ Technologies Used

- **HTML5** – Semantic markup.
- **CSS3** – Flexbox, Grid, animations, media queries, glassmorphism.
- **JavaScript (ES6)** – DOM manipulation, local storage, event handling.
- **Font Awesome 6** – Icons.
- **Google Fonts** – 'Inter' font.
- **LocalStorage** – Persistent user data (accounts, addresses, cart, wishlist).

---
## 📖 How to Use

- **Browse products** – Scroll through the grid. Use filter buttons or search to narrow down.
- **View product details** – Click on any product card (or the quick view eye icon).
- **Add to wishlist** – Click the heart icon on a card or in the product detail view.
- **Add to cart** – Click the cart button and select quantity.
- **View wishlist/cart** – Click the heart or bag icon in the navbar.
- **Login / Signup** – Click the user icon (top-right) and fill in details.
- **Manage addresses** – After login, click user icon → My Profile → Add Address.
- **Checkout** – Open cart, click Checkout, select address, choose payment method, and confirm.
.

## 📁 File Structure

shopnest/
│
├── index.html          # Main HTML file – structure and modals
├── style.css           # Core styles (layout, product cards, modals)
├── style2.css          # Additional styles (login, user dropdown, address, payment)
├── script.js           # Core functionality: products, gallery, wishlist, cart, filter/sort
├── script2.js          # Authentication, address management, checkout, payment
└── logo.png            # Site logo 


## 🔐 Local Storage Keys

| Key                          | Purpose                                      |
|------------------------------|----------------------------------------------|
| `shopnest_users`             | Array of registered users                    |
| `shopnest_user`              | Currently logged-in user object              |
| `shopnest_addresses_<email>` | Array of addresses for a specific user       |
| `shopnest_wishlist`          | (Optional – can be added for persistence)    |
| `shopnest_cart`              | (Optional – can be added for persistence)    |

---

## 📱 Responsive Breakpoints

- **Desktop:** > 768px – full grid and layout.
- **Tablet:** ≤ 768px – adjusted padding and grid.
- **Mobile:** ≤ 600px – single column, stacked filters, smaller thumbnails.
- **Small mobile:** ≤ 480px – compact cards, full-width buttons.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/mohammedshadab78/shopnest/issues).

---

## 👨‍💻 Developer

**Mohammed Shadab**  
📧 ms1198779@gmail.com 
📱 [WhatsApp](https://wa.me/918085353685)  
🌐 [GitHub](https://github.com/mohammedshadab78)

---

## 🙏 Acknowledgements

- Product images from [Pexels](https://www.pexels.com), [Unsplash](https://unsplash.com), and [PostIMG](https://postimg.cc).
- Icons by [Font Awesome](https://fontawesome.com).
- Font 'Inter' by [Google Fonts](https://fonts.google.com).

---

⭐ **If you like this project, don't forget to give it a star!** ⭐
