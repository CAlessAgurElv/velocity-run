
const imageList = [
    "photo-1542291026-7eec264c27ff",
    "photo-1608231387042-66d1773070a5",
    "photo-1552346154-21d32810aba3",
    "photo-1460353581641-37baddab0fa2",
    "photo-1495555961986-6d4c1ecb7be3",
    "photo-1542291026-7eec264c27ff",
    "photo-1600185365483-26d7a4cc7519",
    "photo-1551107696-a4b0c5a0d9a2",
    "photo-1461896836934-ffe607ba8211",
    "photo-1538805060514-97d9cc17730c"
];

const categories = [
    {
        id: "running-products",
        names: [
            "Velocity X-Pro", "Velocity AirFlow", "Velocity Sprint",
            "Velocity Endurance", "Velocity Ultra", "Velocity RoadFlex",
            "Velocity SpeedMax", "Velocity CloudRun", "Velocity Marathon",
            "Velocity AeroLite"
        ],
        prices: [3499, 2899, 3199, 2999, 3799, 2699, 3299, 2899, 3599, 3099],
        badges: ["Más vendido", "Nuevo", "", "Popular", "", "Descuento", "", "Nuevo", "", ""]
    },
    {
        id: "training-products",
        names: [
            "Velocity Flex", "Velocity Power", "Velocity GymPro",
            "Velocity CrossFit", "Velocity Stability", "Velocity Force",
            "Velocity Motion", "Velocity Core", "Velocity Impact",
            "Velocity Active"
        ],
        prices: [2799, 2599, 2899, 3099, 2699, 2999, 2499, 2799, 3199, 2599],
        badges: ["Nuevo", "", "Más vendido", "", "", "Popular", "", "", "Nuevo", ""]
    },
    {
        id: "lifestyle-products",
        names: [
            "Velocity Street", "Velocity Urban", "Velocity Classic",
            "Velocity Daily", "Velocity Neo", "Velocity StreetFlex",
            "Velocity Essential", "Velocity Retro", "Velocity City",
            "Velocity Comfort"
        ],
        prices: [2299, 2199, 2499, 1999, 2399, 2299, 1899, 2599, 2199, 2399],
        badges: ["Popular", "", "Más vendido", "", "Nuevo", "", "", "Edición retro", "", ""]
    },
    {
        id: "special-products",
        names: [
            "Velocity X-Pro Elite", "Velocity Olympic", "Velocity Gold",
            "Velocity Champion", "Velocity Limited", "Velocity Signature",
            "Velocity Legacy", "Velocity Victory", "Velocity Platinum",
            "Velocity Legends"
        ],
        prices: [4299, 4599, 4899, 4199, 4499, 4799, 4399, 4599, 4999, 4699],
        badges: ["Edición limitada", "Especial", "", "Nuevo", "Exclusivo", "", "", "Colección", "", "Exclusivo"]
    }
];

const cart = [];

function formatPrice(price) {
    return "L " + price.toLocaleString("es-HN");
}

function renderProducts(category) {
    const container = document.getElementById(category.id);

    category.names.forEach((name, index) => {
        const image = imageList[index % imageList.length];
        const price = category.prices[index];
        const badge = category.badges[index];

        const column = document.createElement("div");
        column.className = "col-6 col-md-4 col-xl-3";

        column.innerHTML = `
            <article class="product-card">
                <div class="product-image-wrap">
                    <img
                        class="product-image"
                        src="https://images.unsplash.com/${image}?auto=format&fit=crop&w=600&q=80"
                        alt="${name}"
                        loading="lazy"
                        width="600"
                        height="600"
                    >
                    ${badge ? `<span class="product-badge">${badge}</span>` : ""}
                </div>
                <div class="product-info">
                    <h3>${name}</h3>
                    <p class="product-price">${formatPrice(price)}</p>
                    <button class="btn btn-velocity add-cart" type="button">
                        Añadir al carrito
                    </button>
                </div>
            </article>
        `;

        column.querySelector(".add-cart").addEventListener("click", () => {
            addToCart(name, price);
        });

        container.appendChild(column);
    });
}

categories.forEach(renderProducts);

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();

    const modalElement = document.getElementById("cartModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}

function updateCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent = formatPrice(total);

    const cartItems = document.getElementById("cart-items");
    cartItems.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "text-muted";
        emptyMessage.textContent = "Tu carrito está vacío.";
        cartItems.appendChild(emptyMessage);
        return;
    }

    cart.forEach(item => {
        const line = document.createElement("div");
        line.className = "cart-line";

        const details = document.createElement("div");
        const productName = document.createElement("strong");
        const productQuantity = document.createElement("div");

        productName.textContent = item.name;
        productQuantity.textContent =
            `${item.quantity} × ${formatPrice(item.price)}`;

        details.append(productName, productQuantity);

        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-sm btn-outline-danger";
        removeButton.textContent = "Quitar";
        removeButton.type = "button";

        removeButton.addEventListener("click", () => {
            const index = cart.findIndex(product => product.name === item.name);

            if (index !== -1) {
                cart.splice(index, 1);
            }

            updateCart();
        });

        line.append(details, removeButton);
        cartItems.appendChild(line);
    });
}

document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Añade un producto antes de continuar.");
        return;
    }

    alert("Esta es una demostración académica. La compra y el pago no están habilitados.");
});

document.getElementById("newsletter-form").addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("email");
    const message = document.getElementById("newsletter-message");

    message.textContent = `¡Gracias por tu interés! ${email.value} se ha validado en este prototipo.`;
    message.setAttribute("role", "status");

    event.target.reset();
});
