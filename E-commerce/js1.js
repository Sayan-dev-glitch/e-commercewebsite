document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartItemsElement = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
      const productElement = event.target.closest('.famous-product');
      const productId = productElement.getAttribute('data-id');
      const productName = productElement.querySelector('h3').textContent;
      const productPriceText = productElement.querySelector('p').textContent;
      const productPrice = parseFloat(productPriceText.replace(/[^\d.]/g, ''));

      cart.push({ id: productId, name: productName, price: productPrice });

      updateCartDisplay();
    });
  });

  // Function to update the cart display
  function updateCartDisplay() {
    cartItemsElement.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItemsElement.appendChild(li);

      totalPrice += item.price;
    });

    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Cart icon click event
  document.getElementById('cart-icon').addEventListener('click', () => {
    const cartSection = document.getElementById('cart-section');
    cartSection.style.display = cartSection.style.display === 'block' ? 'none' : 'block';
  });

  // Search icon click event
  document.getElementById('search-icon').addEventListener('click', () => {
    const searchInput = prompt('Enter a product name to search:');

    if (searchInput) {
      const products = document.querySelectorAll('.famous-product');

      products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();

        if (productName.includes(searchInput.toLowerCase())) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    }
  });

  // Order Now button click event
  document.getElementById('order-now').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add items to the cart before ordering.');
    } else {
      const orderSummary = cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n');
      const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

      alert(`Your order:\n${orderSummary}\nTotal: $${totalPrice}`);
      // You can integrate actual order processing or redirection here
    }
  });

  // Buy Now button click event (in ADV section)
  document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', (event) => {
      const productElement = event.target.closest('.advertisement-product');
      const productId = productElement.getAttribute('data-id');
      const productName = productElement.querySelector('h3').textContent;
      const productPriceText = productElement.querySelector('p').textContent;
      const productPrice = parseFloat(productPriceText.replace(/[^\d.]/g, ''));

      // Add to cart
      cart.push({ id: productId, name: productName, price: productPrice });
      updateCartDisplay();

      // Display order summary immediately after clicking Buy Now
      const orderSummary = `${productName} - $${productPrice.toFixed(2)}`;
      alert(`You bought:\n${orderSummary}\nTotal: $${productPrice.toFixed(2)}`);
    });
  });
});

// Search icon click event
document.getElementById('search-icon').addEventListener('click', () => {
  const searchInput = prompt('Enter a product name to search:');

  if (searchInput) {
    // Get all products with the class 'famous-product'
    const products = document.querySelectorAll('.famous-product');

    // Loop through each product
    products.forEach(product => {
      const productName = product.querySelector('h3').textContent.toLowerCase();

      // If product name contains the search input, display it; otherwise, hide it
      if (productName.includes(searchInput.toLowerCase())) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }
});

