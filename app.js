// ===============================
// MOBILE MENU
// ===============================
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".navlinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });
}


// ===============================
// CURRENT YEAR
// ===============================
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ===============================
// FOOD DATA
// ===============================
const foods = [
    {
        name: "Margherita Pizza",
        category: "Pizza",
        type: "Veg",
        price: 199,
        description: "Classic cheese and tomato pizza"
    },
    {
        name: "Farmhouse Pizza",
        category: "Pizza",
        type: "Veg",
        price: 249,
        description: "Loaded with fresh vegetables"
    },
    {
        name: "Paneer Tikka Pizza",
        category: "Pizza",
        type: "Veg",
        price: 279,
        description: "Pizza topped with spicy paneer tikka"
    },
    {
        name: "Veg Momos",
        category: "Momos",
        type: "Veg",
        price: 120,
        description: "Steamed vegetable momos"
    },
    {
        name: "Chicken Momos",
        category: "Momos",
        type: "Non-Veg",
        price: 160,
        description: "Juicy chicken momos"
    },
    {
        name: "Veg Thali",
        category: "Thali",
        type: "Veg",
        price: 180,
        description: "Complete traditional Indian meal"
    },
    {
        name: "Paneer Butter Masala",
        category: "Indian",
        type: "Veg",
        price: 220,
        description: "Creamy paneer curry"
    },
    {
        name: "Chicken Biryani",
        category: "Biryani",
        type: "Non-Veg",
        price: 250,
        description: "Aromatic chicken biryani"
    }
];


// ===============================
// FOOD ICON
// ===============================
function getFoodIcon(category) {

    if (category === "Pizza") return "🍕";
    if (category === "Momos") return "🥟";
    if (category === "Thali") return "🍛";
    if (category === "Biryani") return "🍚";

    return "🍽️";
}


// ===============================
// DISPLAY FOOD
// ===============================
const foodGrid = document.getElementById("foodGrid");
const foodSearch = document.getElementById("foodSearch");
const dietFilter = document.getElementById("dietFilter");

function displayFoods() {

    if (!foodGrid) return;

    const searchText = foodSearch
        ? foodSearch.value.toLowerCase().trim()
        : "";

    const selectedDiet = dietFilter
        ? dietFilter.value
        : "All";

    const filteredFoods = foods.filter(function (food) {

        const matchesSearch =
            food.name.toLowerCase().includes(searchText) ||
            food.category.toLowerCase().includes(searchText);

        const matchesDiet =
            selectedDiet === "All" ||
            food.type === selectedDiet;

        return matchesSearch && matchesDiet;
    });

    foodGrid.innerHTML = "";

    if (filteredFoods.length === 0) {

        foodGrid.innerHTML = `
            <div class="empty">
                <h3>No food found</h3>
                <p>Try searching for pizza, momos or thali.</p>
            </div>
        `;

        return;
    }

    filteredFoods.forEach(function (food) {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <div style="
                height:180px;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#fff0e8;
                font-size:80px;
            ">
                ${getFoodIcon(food.category)}
            </div>

            <div class="card-body">

                <span class="badge ${food.type === "Veg" ? "green" : ""}">
                    ${food.type}
                </span>

                <h3>${food.name}</h3>

                <p class="small">
                    ${food.description}
                </p>

                <div class="meta" style="margin-top:12px">

                    <span class="price">
                        ₹${food.price}
                    </span>

                    <button
                        class="btn btn-primary"
                        onclick="addToCart('${food.name}', ${food.price})">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        foodGrid.appendChild(card);
    });
}


// ===============================
// SEARCH
// ===============================
if (foodSearch) {
    foodSearch.addEventListener("input", displayFoods);
}


// ===============================
// DIET FILTER
// ===============================
if (dietFilter) {
    dietFilter.addEventListener("change", displayFoods);
}


// ===============================
// ADD TO CART
// ===============================
function addToCart(name, price) {

    let cart =
        JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    const existingItem = cart.find(function (item) {
        return item.name === name;
    });

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem(
        "freshbiteCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");
}


// ===============================
// CART COUNT
// ===============================
function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    const totalQuantity = cart.reduce(function (total, item) {
        return total + Number(item.quantity);
    }, 0);

    document.querySelectorAll(".cart-count").forEach(function (element) {
        element.textContent = totalQuantity;
    });
}


// ===============================
// DISPLAY CART
// ===============================
const cartItems = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");

function displayCart() {

    if (!cartItems) return;

    const cart =
        JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    cartItems.innerHTML = "";

    // EMPTY CART
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty">

                <h3>Your cart is empty 🛒</h3>

                <p>
                    Add some delicious food from the menu.
                </p>

                <a
                    href="menu.html"
                    class="btn btn-primary"
                    style="margin-top:15px">
                    Browse Menu
                </a>

            </div>
        `;

        if (subtotalElement) {
            subtotalElement.textContent = "₹0";
        }

        if (totalElement) {
            totalElement.textContent = "₹39";
        }

        updateCartCount();

        return;
    }


    // CART HAS ITEMS
    let subtotal = 0;

    cart.forEach(function (item, index) {

        const quantity = Number(item.quantity);
        const price = Number(item.price);

        const itemTotal = price * quantity;

        subtotal += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div style="
                    width:90px;
                    height:75px;
                    border-radius:12px;
                    background:#fff0e8;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:35px;
                ">
                    🍽️
                </div>

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p class="small">
                        ₹${price} each
                    </p>

                    <div class="qty">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <strong>
                            ${quantity}
                        </strong>

                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                        <button
                            onclick="removeFromCart(${index})"
                            style="
                                margin-left:10px;
                                width:auto;
                                padding:5px 10px;
                            ">
                            🗑️
                        </button>

                    </div>

                </div>

                <strong class="line-total">
                    ₹${itemTotal}
                </strong>

            </div>
        `;
    });


    const delivery = 39;
    const total = subtotal + delivery;

    if (subtotalElement) {
        subtotalElement.textContent = "₹" + subtotal;
    }

    if (totalElement) {
        totalElement.textContent = "₹" + total;
    }

    updateCartCount();
}


// ===============================
// CHANGE QUANTITY
// ===============================
function changeQuantity(index, change) {

    let cart =
        JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    if (!cart[index]) return;

    cart[index].quantity =
        Number(cart[index].quantity) + change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem(
        "freshbiteCart",
        JSON.stringify(cart)
    );

    displayCart();
}


// ===============================
// REMOVE FROM CART
// ===============================
function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "freshbiteCart",
        JSON.stringify(cart)
    );

    displayCart();
}


// ===============================
// START APP
// ===============================
displayFoods();
displayCart();
updateCartCount();
// ===============================
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutResult = document.getElementById("checkoutResult");

function displayCheckoutTotal() {

    if (!checkoutTotal) return;

    const cart =
        JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    let subtotal = 0;

    cart.forEach(function(item) {
        subtotal += item.price * item.quantity;
    });

    const delivery = cart.length > 0 ? 39 : 0;
    const total = subtotal + delivery;

    checkoutTotal.textContent = "₹" + total;
}

displayCheckoutTotal();


// ===============================
// PLACE ORDER
// ===============================
// PLACE SIMULATED ORDER
// ===============================

const checkoutForm = document.getElementById("checkoutForm");
const checkoutResult = document.getElementById("checkoutResult");
const checkoutTotal = document.getElementById("checkoutTotal");

function getCart() {
    return JSON.parse(localStorage.getItem("freshbiteCart")) || [];
}


// Show cart total on checkout page
function showCheckoutTotal() {

    if (!checkoutTotal) return;

    const cart = getCart();

    let subtotal = 0;

    cart.forEach(function(item) {
        subtotal += item.price * item.quantity;
    });

    const delivery = cart.length > 0 ? 39 : 0;
    const total = subtotal + delivery;

    checkoutTotal.textContent = "₹" + total;
}

showCheckoutTotal();


// Place order
if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const cart = getCart();

        // Check cart
        if (cart.length === 0) {

            checkoutResult.innerHTML = `
                <div class="notice">
                    <h3>🛒 Your cart is empty</h3>
                    <p>Please add food before placing your order.</p>
                    <a href="menu.html"
                       class="btn btn-primary"
                       style="margin-top:10px;">
                       Go to Menu
                    </a>
                </div>
            `;

            return;
        }


        // Calculate amount
        let subtotal = 0;

        cart.forEach(function(item) {
            subtotal += item.price * item.quantity;
        });

        const delivery = 39;
        const total = subtotal + delivery;


        // Create order ID
        const orderId =
            "FB" + Math.floor(100000 + Math.random() * 900000);


        // Save order
        const order = {
            orderId: orderId,
            items: cart,
            subtotal: subtotal,
            delivery: delivery,
            total: total,
            date: new Date().toLocaleString()
        };

        localStorage.setItem(
            "freshbiteLatestOrder",
            JSON.stringify(order)
        );


        // Clear cart
        localStorage.removeItem("freshbiteCart");

        updateCartCount();


        // Show confirmation
        checkoutResult.innerHTML = `
            <div class="notice" style="margin-top:20px;">
                <h2>🎉 Order Confirmed!</h2>

                <p>
                    Your simulated order has been placed successfully.
                </p>

                <p>
                    <strong>Order ID:</strong> ${orderId}
                </p>

                <p>
                    <strong>Order Total:</strong> ₹${total}
                </p>

                <p>
                    <strong>Delivery:</strong> 30–40 minutes
                </p>

                <a href="menu.html"
                   class="btn btn-primary"
                   style="margin-top:15px;">
                   Order More Food
                </a>

                <a href="index.html"
                   class="btn btn-secondary"
                   style="margin-top:10px;">
                   Back to Home
                </a>
            </div>
        `;


        // Update checkout amount
        checkoutTotal.textContent = "₹0";


        // Prevent submitting again
        checkoutForm.reset();

    });
}
// ===============================
// ORDER HISTORY
// ===============================

const ordersList =
    document.getElementById("ordersList");

function displayOrders() {

    if (!ordersList) return;

    const orders =
        JSON.parse(localStorage.getItem("freshbiteOrders")) || [];

    // No orders
    if (orders.length === 0) {

        ordersList.innerHTML = `
            <div class="card">
                <div class="empty">

                    <h3>No orders yet 🛒</h3>

                    <p>
                        Your previous orders will appear here.
                    </p>

                    <a href="menu.html"
                       class="btn btn-primary"
                       style="margin-top:15px;">
                        Browse Menu
                    </a>

                </div>
            </div>
        `;

        return;
    }


    ordersList.innerHTML = "";


    orders.forEach(function(order) {

        let itemsHTML = "";

        order.items.forEach(function(item) {

            itemsHTML += `
                <p>
                    ${item.name}
                    × ${item.quantity}
                    — ₹${item.price * item.quantity}
                </p>
            `;

        });


        ordersList.innerHTML += `

            <div class="card"
                 style="
                    padding:22px;
                    margin-bottom:20px;
                 ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
                    flex-wrap:wrap;
                ">

                    <div>

                        <span class="badge green">
                            ${order.status}
                        </span>

                        <h2 style="
                            margin-top:8px;
                            font-size:1.4rem;
                        ">
                            Order #${order.orderId}
                        </h2>

                        <p class="small">
                            ${order.date}
                        </p>

                    </div>


                    <div style="
                        text-align:right;
                    ">

                        <p class="small">
                            Order Total
                        </p>

                        <strong style="
                            font-size:1.3rem;
                        ">
                            ₹${order.total}
                        </strong>

                    </div>

                </div>


                <div style="
                    border-top:1px solid var(--border);
                    margin-top:15px;
                    padding-top:15px;
                ">

                    <h3>
                        Items
                    </h3>

                    ${itemsHTML}

                </div>

            </div>

        `;
    });
}

displayOrders();
