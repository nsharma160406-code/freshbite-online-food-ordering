alert("JavaScript is working!");
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
                ${food.category === "Pizza" ? "🍕" :
                  food.category === "Momos" ? "🥟" :
                  food.category === "Thali" ? "🍛" :
                  food.category === "Biryani" ? "🍚" : "🍽️"}
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
                    <span class="price">₹${food.price}</span>

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

    let cart = JSON.parse(localStorage.getItem("freshbiteCart")) || [];

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

    localStorage.setItem("freshbiteCart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}


// ===============================
// CART COUNT
// ===============================
function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("freshbiteCart")) || [];

    const totalQuantity = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    document.querySelectorAll(".cart-count").forEach(function (element) {
        element.textContent = totalQuantity;
    });
}


// ===============================
// START MENU
// ===============================
displayFoods();
updateCartCount();
displayFoods();
updateCartCount();
