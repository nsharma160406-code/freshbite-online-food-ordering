// ======================================================
// FRESHBITE - COMPLETE APP.JS
// ======================================================


// ======================================================
// MOBILE MENU
// ======================================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".navlinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });
}


// ======================================================
// CURRENT YEAR
// ======================================================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ======================================================
// FOOD DATA
// ======================================================

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


// ======================================================
// GET CART
// ======================================================

function getCart() {
    return JSON.parse(localStorage.getItem("freshbiteCart")) || [];
}


// ======================================================
// SAVE CART
// ======================================================

function saveCart(cart) {
    localStorage.setItem("freshbiteCart", JSON.stringify(cart));
}


// ======================================================
// FOOD ICON
// ======================================================

function getFoodIcon(category) {

    if (category === "Pizza") return "🍕";
    if (category === "Momos") return "🥟";
    if (category === "Thali") return "🍛";
    if (category === "Biryani") return "🍚";

    return "🍽️";
}


// ======================================================
// DISPLAY FOODS
// ======================================================

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


// ======================================================
// SEARCH
// ======================================================

if (foodSearch) {
    foodSearch.addEventListener("input", displayFoods);
}


// ======================================================
// DIET FILTER
// ======================================================

if (dietFilter) {
    dietFilter.addEventListener("change", displayFoods);
}


// ======================================================
// ADD TO CART
// ======================================================

function addToCart(name, price) {

    const cart = getCart();

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

    saveCart(cart);

    updateCartCount();

    alert(name + " added to cart!");
}


// ======================================================
// CART COUNT
// ======================================================

function updateCartCount() {

    const cart = getCart();

    const totalQuantity = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    document.querySelectorAll(".cart-count").forEach(function (element) {
        element.textContent = totalQuantity;
    });
}


// ======================================================
// CALCULATE CART TOTAL
// ======================================================

function calculateCartTotal() {

    const cart = getCart();

    let subtotal = 0;

    cart.forEach(function (item) {
        subtotal += item.price * item.quantity;
    });

    const delivery = cart.length > 0 ? 39 : 0;

    return {
        subtotal: subtotal,
        delivery: delivery,
        total: subtotal + delivery
    };
}


// ======================================================
// CART PAGE
// ======================================================

const cartItems = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");

function displayCart() {

    if (!cartItems) return;

    const cart = getCart();

    cartItems.innerHTML = "";

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
            totalElement.textContent = "₹0";
        }

        updateCartCount();

        return;
    }


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;

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

                    <h3>${item.name}</h3>

                    <p class="small">
                        ₹${item.price} each
                    </p>

                    <div class="qty">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <strong>
                            ${item.quantity}
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


    const totals = calculateCartTotal();

    if (subtotalElement) {
        subtotalElement.textContent =
            "₹" + totals.subtotal;
    }

    if (totalElement) {
        totalElement.textContent =
            "₹" + totals.total;
    }

    updateCartCount();
}


// ======================================================
// CHANGE QUANTITY
// ======================================================

function changeQuantity(index, change) {

    const cart = getCart();

    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);

    displayCart();

    updateCartCount();
}


// ======================================================
// REMOVE FROM CART
// ======================================================

function removeFromCart(index) {

    const cart = getCart();

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCart(cart);

    displayCart();

    updateCartCount();
}


// ======================================================
// CHECKOUT TOTAL
// ======================================================

const checkoutTotal =
    document.getElementById("checkoutTotal");

function displayCheckoutTotal() {

    if (!checkoutTotal) return;

    const totals = calculateCartTotal();

    checkoutTotal.textContent =
        "₹" + totals.total;
}


// ======================================================
// CHECKOUT FORM
// ======================================================

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutResult =
    document.getElementById("checkoutResult");


if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get cart
        const cart = getCart();


        // Check empty cart
        if (cart.length === 0) {

            checkoutResult.innerHTML = `

                <div class="notice">

                    <h3>🛒 Your cart is empty</h3>

                    <p>
                        Please add food before placing your order.
                    </p>

                    <a
                        href="menu.html"
                        class="btn btn-primary"
                        style="margin-top:10px">
                        Go to Menu
                    </a>

                </div>

            `;

            return;
        }


        // Calculate total
        const totals = calculateCartTotal();


        // Create order ID
        const orderId =
            "FB" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        // Create order object
        const order = {

            orderId: orderId,

            items: cart,

            subtotal: totals.subtotal,

            delivery: totals.delivery,

            total: totals.total,

            date: new Date().toLocaleString()

        };


        // Save order
        localStorage.setItem(
            "freshbiteLastOrder",
            JSON.stringify(order)
        );


        // Save order history
        const orderHistory =
            JSON.parse(
                localStorage.getItem("freshbiteOrders")
            ) || [];

        orderHistory.unshift(order);

        localStorage.setItem(
            "freshbiteOrders",
            JSON.stringify(orderHistory)
        );


        // Clear cart
        localStorage.removeItem("freshbiteCart");


        // Update cart number
        updateCartCount();


        // Show confirmation
        checkoutResult.innerHTML = `

            <div class="notice"
                 style="margin-top:20px">

                <h3>🎉 Order Confirmed!</h3>

                <p>
                    Your simulated order has been placed successfully.
                </p>

                <p>
                    <strong>Order ID:</strong>
                    ${orderId}
                </p>

                <p>
                    <strong>Order Total:</strong>
                    ₹${totals.total}
                </p>

                <p>
                    <strong>Delivery:</strong>
                    ₹${totals.delivery}
                </p>

                <a
                    href="index.html"
                    class="btn btn-primary"
                    style="margin-top:15px">
                    Back to Home
                </a>

            </div>

        `;


        // Reset form
        checkoutForm.reset();


        // Update checkout amount
        checkoutTotal.textContent = "₹0";

    });
}


// ======================================================
// ORDER HISTORY
// ======================================================

const orderList =
    document.getElementById("orderList");


function displayOrders() {

    if (!orderList) return;

    const orders =
        JSON.parse(
            localStorage.getItem("freshbiteOrders")
        ) || [];


    orderList.innerHTML = "";


    if (orders.length === 0) {

        orderList.innerHTML = `

            <div class="empty">

                <h3>No orders yet</h3>

                <p>
                    Your confirmed orders will appear here.
                </p>

                <a
                    href="menu.html"
                    class="btn btn-primary"
                    style="margin-top:15px">
                    Browse Menu
                </a>

            </div>

        `;

        return;
    }


    orders.forEach(function (order) {

        let itemsHTML = "";


        order.items.forEach(function (item) {

            itemsHTML += `

                <p>
                    ${item.name}
                    × ${item.quantity}
                    = ₹${item.price * item.quantity}
                </p>

            `;
        });


        orderList.innerHTML += `

            <div class="card"
                 style="
                    padding:20px;
                    margin-bottom:20px;
                 ">

                <h3>
                    🎉 Order Confirmed
                </h3>

                <p>
                    <strong>Order ID:</strong>
                    ${order.orderId}
                </p>

                <p class="small">
                    ${order.date}
                </p>

                <div style="
                    margin-top:15px;
                    padding-top:15px;
                    border-top:1px solid var(--border);
                ">

                    <strong>Items</strong>

                    <div style="margin-top:10px">
                        ${itemsHTML}
                    </div>

                </div>

                <div style="
                    margin-top:15px;
                    padding-top:15px;
                    border-top:1px solid var(--border);
                ">

                    <p>
                        <strong>Total:</strong>
                        ₹${order.total}
                    </p>

                </div>

            </div>

        `;
    });
}


// ======================================================
// INITIAL LOAD
// ======================================================

displayFoods();
displayCart();
displayCheckoutTotal();
displayOrders();
updateCartCount();
