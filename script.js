const products = [
  {
    id: 1,
    name: "Dubai Chewy Cookie",
    price: 400,
    img: "https://buddiesbagels.com/wp-content/uploads/2026/01/dubai-chewy-cookie-aka-dubai-chocolate-cookie.jpg"
  },
  {
    id: 2,
    name: "Samyang Buldak Korean Ramen",
    price: 250,
    img: "https://happyhour.ph/cdn/shop/products/buldak-carbonara-hot-chicken-flavor-ramen-718011.jpg?v=1709890988&width=990"
  },
  {
    id: 3,
    name: "Konu Mini Crunch Cereal",
    price: 137,
    img: "https://media.karousell.com/media/photos/products/2025/7/9/konu_mini_krunch_1752086722_f9ce7628_progressive.jpg"
  },
  {
    id: 4,
    name: "Chunky Chocolate Chip Cookies",
    price: 300,
    img: "https://iambaker.net/wp-content/uploads/2024/07/Ultimate-Thick-and-Chewy-Chocolate-Chip-Cookie-4.jpg"
  }
];

let cart = [];

function displayProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const cartItem = cart.find(item => item.id === p.id);

    list.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>₱${p.price}</p>

        ${
          cartItem
          ? `<button disabled>In Cart (${cartItem.qty})</button>`
          : `<button onclick="addToCart(${p.id})">Add</button>`
        }
      </div>
    `;
  });
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart-items");
  const count = document.getElementById("count");
  const totalText = document.getElementById("total");

  cartDiv.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  displayProducts();

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
  }

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    totalItems += item.qty;

    cartDiv.innerHTML += `
      <div class="card">
        <p><b>${item.name}</b></p>
        <p>₱${item.price} x ${item.qty}</p>
        <p>Subtotal: ₱${subtotal}</p>

        <button onclick="changeQty(${item.id}, -1)">-</button>
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
  });

  count.innerText = totalItems;
  totalText.innerText = "Total: ₱" + total;
}

function changeQty(id, change) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    removeItem(id);
  } else {
    updateCart();
  }
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function checkout() {
  alert("Checkout successful!");
}

displayProducts();
