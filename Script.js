// Load cart from local storage or start empty
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Add product to cart
function addToCart(productCard) {
  const name = productCard.querySelector('.product-name').textContent;
  const priceText = productCard.querySelector('.product-price').textContent;
  const price = parseFloat(priceText.replace('$', ''));
  const imgSrc = productCard.querySelector('.product-image').src;

  const existingItem = cartItems.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      name,
      price,
      quantity: 1,
      image: imgSrc,
    });
  }

  updateLocalStorage();
  updateCartDisplay();
}

// Update the cart UI
function updateCartDisplay() {
  const cartList = document.getElementById('cart-item');
  const totalElement = document.getElementById('total-price');
  const countElement = document.getElementById('cart-count');

  cartList.innerHTML = '';

  let total = 0;
  let itemCount = 0;

  cartItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
      </div>
      <div class="quantity-controls">
        <button onclick="changeQuantity('${item.name}', -1)">-</button>
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
      </div>
      <button class="remove" onclick="removeItem('${item.name}')">X</button>
    `;
    cartList.appendChild(li);

    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  totalElement.textContent = total.toFixed(2);
  countElement.textContent = itemCount;
}

// Change quantity of an item
function changeQuantity(name, delta) {
  const item = cartItems.find((i) => i.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeItem(name);
    } else {
      updateLocalStorage();
      updateCartDisplay();
    }
  }
}

// Remove an item completely
function removeItem(name) {
  cartItems = cartItems.filter((i) => i.name !== name);
  updateLocalStorage();
  updateCartDisplay();
}

// Store cart in local storage
function updateLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load cart on page load
window.onload = updateCartDisplay;

// Cart open/close logic
let cartIcon = document.querySelector('.cart-icon');
let cartModel = document.querySelector('.cart-model');
let cartClose = document.querySelector('.close-btn');

cartIcon.onclick = () => {
  cartModel.classList.add('open-cart');
};
cartClose.onclick = () => {
  cartModel.classList.remove('open-cart');
};

// slider
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector('.slides');
    const boxes = document.querySelectorAll('.product-box');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    let index = 0;
    const total = boxes.length;

    function showSlide(i) {
        if (i >= total) index = 0;
        if (i < 0) index = total - 1;
        slides.style.transform = `translateX(${-index * 100}%)`;
    }

    next.addEventListener('click', () => {
        index++;
        showSlide(index);
    });

    prev.addEventListener('click', () => {
        index--;
        showSlide(index);
    });
});




