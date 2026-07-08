// ==============================
// LASTELLA SHOPPING CART
// ==============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add Product
function addToCart(name, price, image){

    price = parseFloat(price);

    let existing = cart.find(item => item.name === name);

    if(existing){
        existing.quantity++;
    }else{
        cart.push({
            name,
            price,
            image,
            quantity:1
        });
    }

    saveCart();

    alert(name + " added to cart!");
}

// Save

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    renderCart();

}

// Cart Counter

function updateCartCount(){

    let total=0;

    cart.forEach(item=>{

        total+=item.quantity;

    });

    const badge=document.getElementById("cart-count");

    if(badge){

        badge.innerText=total;

    }

}

// Open Cart

function toggleCart(){

    document
    .getElementById("cart-sidebar")
    .classList
    .toggle("open");

    renderCart();

}

// Render Cart
function renderCart() {

    const container = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    if (!container || !total) return;

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {

        // Convert price safely to number
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        subtotal += price * quantity;

        container.innerHTML += `
            <div class="cart-product">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h4>${item.name}</h4>

                    <p>R.O ${price.toFixed(3)}</p>

                    <div class="qty">

                        <button onclick="decrease(${index})">−</button>

                        <span>${quantity}</span>

                        <button onclick="increase(${index})">+</button>

                    </div>

                </div>

                <span class="remove" onclick="removeItem(${index})">✕</span>

            </div>
        `;
    });

    total.innerHTML = "R.O " + subtotal.toFixed(3);
}
// Increase

function increase(i){

    cart[i].quantity++;

    saveCart();

}   

// Decrease

function decrease(i){

    cart[i].quantity--;

    if(cart[i].quantity<=0){

        cart.splice(i,1);

    }

    saveCart();

}

// Remove

function removeItem(i){

    cart.splice(i,1);

    saveCart();

}

window.onload=function(){

    updateCartCount();

    renderCart();

}
// ==========================
// View Cart
// ==========================
function viewCart(){

window.location.href="cart.html";

}
// ==========================
// WhatsApp Order
// ==========================

function orderWhatsApp(){

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    let message="Hello LASTELLA!%0A%0AI want to order:%0A%0A";

    let total=0;

    cart.forEach(item=>{

        message+=
        item.name+
        " x"+
        item.quantity+
        " - R.O "+
        (item.price*item.quantity).toFixed(3)+
        "%0A";

        total+=item.price*item.quantity;

    });

    message+="%0A--------------------%0A";

    message+="Total: R.O "+total.toFixed(3);

    window.open(
        "https://wa.me/96875029949?text="+message,
        "_blank"
    );

}