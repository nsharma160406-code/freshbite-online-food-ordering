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
// MENU DATA
// ===============================

const foods = [
    {
        id: "pizza",
        name: "FreshBite Veg Pizza",
        category: "Pizza",
        diet: "Veg",
        price: 199,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "paneer-pizza",
        name: "Paneer Tikka Pizza",
        category: "Pizza",
        diet: "Veg",
        price: 249,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "momos",
        name: "Veg Momos",
        category: "Momos",
        diet: "Veg",
        price: 120,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "chicken-momos",
        name: "Chicken Momos",
        category: "Momos",
        diet: "Non-Veg",
        price: 160,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1626776876729-bab436e7b9c8?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "thali",
        name: "Himachali Veg Thali",
        category: "Thali",
        diet: "Veg",
        price: 220,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "chicken-thali",
        name: "Chicken Thali",
        category: "Thali",
        diet: "Non-Veg",
        price: 280,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    }
];


// ===============================
// DISPLAY FOOD ITEMS
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
            food.diet === selectedDiet;

        return matchesSearch && matchesDiet;
    });


    // No result message
    if (filteredFoods.length === 0) {

        foodGrid.innerHTML = `
            <div class="empty" style="grid-column:1/-1">
                <h3>No food found 😔</h3>
                <p>Try searching for pizza, momos or thali.</p>
            </div>
        `;

        return;
    }


    // Display food cards
    foodGrid.innerHTML = filteredFoods.map(function (food) {

        return `
            <article class="card">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                >

                <div class="card-body">

                    <span class="badge ${food.diet === "Veg" ? "green" : ""}">
                        ${food.diet}
                    </span>

                    <h3>${food.name}</h3>

                    <div class="meta">
                        <span>⭐ ${food.rating}</span>
                        <span>${food.category}</span>
                    </div>

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-top:14px;
                    ">

                        <span class="price">
                            ₹${food.price}
                        </span>

                        <button
                            class="btn btn-primary"
                            onclick="addToCart('${food.id}')"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");
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
// CART
// ===============================

function addToCart(foodId) {

    const food = foods.find(function (item) {
        return item.id === foodId;
    });

    if (!food) return;

    let cart = JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    const existingItem = cart.find(function (item) {
        return item.id === foodId;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1
        });
    }

    localStorage.setItem("freshbiteCart", JSON.stringify(cart));

    updateCartCount();

    showToast(food.name + " added to cart!");
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    const totalItems = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    document.querySelectorAll(".cart-count").forEach(function (element) {
        element.textContent = totalItems;
    });
}


// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2000);
}


// ===============================
// INITIAL LOAD
// ===============================

displayFoods();
updateCartCount();
