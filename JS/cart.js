// Obtener elementos del DOM
const cartBtn = document.querySelector('.cartbtn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartContainer = document.getElementById('cart');

// Crear notificación
const notification = document.createElement('div');
notification.id = "cart-notification";
notification.style.position = "fixed";
notification.style.bottom = "20px";
notification.style.right = "20px";
notification.style.padding = "10px 20px";
notification.style.backgroundColor = "#4CAF50";
notification.style.color = "white";
notification.style.fontSize = "16px";
notification.style.borderRadius = "5px";
notification.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.2)";
notification.style.display = "none";
notification.style.zIndex = "1000";
document.body.appendChild(notification);

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}

// Validar si los elementos existen
if (!cartBtn || !cartItemsContainer || !cartCount || !cartContainer) {
    console.error("No se encontraron elementos necesarios en el DOM. Revisa el HTML.");
}

// Cargar carrito desde localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito
function updateCart() {
    console.log("Actualizando carrito...");

    // Limpiar el contenido actual del carrito
    cartItemsContainer.innerHTML = '';

    // Actualizar contador del carrito
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Mostrar los productos en el carrito
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<li>No hay productos en el carrito</li>';
    } else {
        let total = 0;
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.style.display = "flex";
            li.style.flexDirection = "column";
            li.style.marginBottom = "10px";
            li.style.borderBottom = "1px solid #ccc";
            li.style.paddingBottom = "10px";

            const productContainer = document.createElement('div');
            productContainer.style.display = "flex";
            productContainer.style.alignItems = "center";

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.width = "60px";
            img.style.height = "60px";
            img.style.objectFit = "cover";
            img.style.marginRight = "10px";
            img.style.borderRadius = "8px";

            const text = document.createElement('div');
            text.style.flex = "1";

            const name = document.createElement('p');
            name.textContent = item.name;
            name.style.fontWeight = "bold";
            name.style.margin = "0";

            const price = document.createElement('p');
            price.textContent = `$${item.price}`;
            price.style.margin = "5px 0 0 0";

            text.appendChild(name);
            text.appendChild(price);

            const quantityControls = document.createElement('div');
            quantityControls.style.display = "flex";
            quantityControls.style.alignItems = "center";
            quantityControls.style.marginTop = "5px";

            const minusButton = document.createElement('button');
            minusButton.textContent = "-";
            minusButton.style.marginRight = "5px";
            minusButton.style.padding = "5px 10px";
            minusButton.style.backgroundColor = "#f0f0f0";
            minusButton.style.border = "1px solid #ccc";
            minusButton.style.cursor = "pointer";
            minusButton.onclick = () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cartItems.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCart();
            };

            const quantityText = document.createElement('span');
            quantityText.textContent = item.quantity;
            quantityText.style.margin = "0 5px";

            const plusButton = document.createElement('button');
            plusButton.textContent = "+";
            plusButton.style.marginLeft = "5px";
            plusButton.style.padding = "5px 10px";
            plusButton.style.backgroundColor = "#f0f0f0";
            plusButton.style.border = "1px solid #ccc";
            plusButton.style.cursor = "pointer";
            plusButton.onclick = () => {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCart();
            };

            quantityControls.appendChild(minusButton);
            quantityControls.appendChild(quantityText);
            quantityControls.appendChild(plusButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Eliminar";
            deleteButton.style.marginTop = "5px";
            deleteButton.style.padding = "5px 10px";
            deleteButton.style.backgroundColor = "red";
            deleteButton.style.color = "white";
            deleteButton.style.border = "none";
            deleteButton.style.cursor = "pointer";
            deleteButton.style.borderRadius = "5px";
            deleteButton.onclick = () => {
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCart();
            };

            productContainer.appendChild(img);
            productContainer.appendChild(text);
            li.appendChild(productContainer);
            li.appendChild(quantityControls);
            li.appendChild(deleteButton);

            cartItemsContainer.appendChild(li);

            total += item.price * item.quantity;
        });

        // Mostrar el total
        const totalContainer = document.createElement('div');
        totalContainer.style.fontWeight = "bold";
        totalContainer.style.textAlign = "center";
        totalContainer.style.marginTop = "10px";
        totalContainer.textContent = `Total: $${total.toFixed(2)}`;
        cartItemsContainer.appendChild(totalContainer);

        // Botón de WhatsApp
        const whatsappButton = document.createElement('button');
        whatsappButton.textContent = "Pedir vía WhatsApp";
        whatsappButton.style.backgroundColor = "#25D366";
        whatsappButton.style.color = "white";
        whatsappButton.style.border = "none";
        whatsappButton.style.padding = "10px";
        whatsappButton.style.width = "100%";
        whatsappButton.style.borderRadius = "5px";
        whatsappButton.style.cursor = "pointer";
        whatsappButton.style.fontSize = "16px";
        whatsappButton.style.marginTop = "10px";
        whatsappButton.onclick = () => {
            const phoneNumber = "593961166952";
            let message = "Hola, me gustaría hacer un pedido:\n\n";
            cartItems.forEach(item => {
                message += `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
            });
            message += `\nTotal: $${total.toFixed(2)}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
        };
        cartItemsContainer.appendChild(whatsappButton);
    }
}

// Mostrar y ocultar el carrito
cartBtn.addEventListener('click', () => {
    cartContainer.classList.toggle('active');
    updateCart();
});

// Agregar producto al carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart');
if (addToCartButtons.length === 0) {
    console.warn("No se encontraron botones con la clase 'add-to-cart'. Revisa el HTML.");
} else {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productElement = this.closest('.menu-item');
            if (!productElement) {
                console.error("No se encontró el elemento del producto. Revisa la estructura del HTML.");
                return;
            }

            const productName = productElement.querySelector('h2')?.innerText || "Producto sin nombre";
            const productPrice = productElement.querySelector('.price')?.innerText.replace('$', '') || "0.00";
            const productImage = productElement.querySelector('img')?.src || "";

            const existingProduct = cartItems.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                const product = {
                    name: productName,
                    price: parseFloat(productPrice),
                    quantity: 1,
                    image: productImage,
                };
                cartItems.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCart();
            showNotification(`"${productName}" ha sido agregado al carrito.`);
        });
    });
}

updateCart();
