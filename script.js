// inciciacion carrito
let cart = [];

// Elementos del DOM del Navbar / Carrito desplegable
const cartBtn = document.getElementById('cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalVal = document.getElementById('cart-total-val');
const clearCartBtn = document.getElementById('clear-cart');

// 1. Mostrar / Ocultar el desplegable del carrito al hacer clic en el ícono
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartDropdown.classList.toggle('show');
});

// Cerrar el carrito si se hace clic fuera de él
document.addEventListener('click', (e) => {
    if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.classList.remove('show');
    }
});

// evento que suma y resta el carrito
document.querySelectorAll('.producto-card').forEach(card => {
    const productId = card.getAttribute('data-id');
    const productName = card.getAttribute('data-nombre');
    const productPrice = parseFloat(card.getAttribute('data-precio'));
    
    const btnMas = card.querySelector('.btn-mas');
    const btnMenos = card.querySelector('.btn-menos');
    const cantDisplay = card.querySelector('.cant-item');

    // Botón (+)
    btnMas.addEventListener('click', () => {
        let item = cart.find(p => p.id === productId);
        
        if (!item) {
            item = { id: productId, name: productName, price: productPrice, quantity: 1 };
            cart.push(item);
        } else {
            item.quantity++;
        }
        
        cantDisplay.textContent = item.quantity;
        updateCart();
    });

    // Botón (-)
    btnMenos.addEventListener('click', () => {
        let item = cart.find(p => p.id === productId);
        
        if (item) {
            item.quantity--;
            if (item.quantity <= 0) {
                // Eliminar del array si llega a 0
                cart = cart.filter(p => p.id !== productId);
                cantDisplay.textContent = 0;
            } else {
                cantDisplay.textContent = item.quantity;
            }
            updateCart();
        }
    });
});

// 3. Función general para actualizar los contadores, el total y la lista visual del carrito
function updateCart() {
    // Calcular cuantos productos y el total
    let totalQuantity = 0;
    let totalPrice = 0;
    
    cartItemsContainer.innerHTML = ''; // Limpiar contenedor visual del carrito

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty">El carrito está vacío</p>';
    } else {
        cart.forEach(product => {
            totalQuantity += product.quantity;
            totalPrice += product.price * product.quantity;

            // manejo dom para el carrito por cada prodcuto
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-dropdown-item');
            itemElement.innerHTML = `
                <span>${product.name} (x${product.quantity})</span>
                <strong>$${(product.price * product.quantity).toFixed(2)}</strong>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

   
    cartCount.textContent = totalQuantity;
    cartTotalVal.textContent = totalPrice.toFixed(2);

    // Sincronizar las unidades mostradas en las tarjetas si se modificaron desde fuera
    document.querySelectorAll('.producto-card').forEach(card => {
        const id = card.getAttribute('data-id');
        const item = cart.find(p => p.id === id);
        const cantDisplay = card.querySelector('.cant-item');
        cantDisplay.textContent = item ? item.quantity : 0;
    });
}

// 4. Vaciar el carrito 
clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
});
