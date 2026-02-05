const products = [
  {
    id: 1,
    name: "Khamrah 100ml",
    price: 1800,
    stock: 10,
    desc: "Aroma intenso y sofisticado",
    img: "assets/kham suelto.png"
  },
  {
    id: 2,
    name: "Valentino Born in Roma Intense 100ml",
    price: 1500,
    stock: 6,
    desc: "Fragancia floral elegante",
    img: "assets/valennnn.png"
  },
  {
    id: 3,
    name: "QAED AL FURSAN 100ml",
    price: 1600,
    stock: 15,
    desc: "Balance cálido y moderno",
    img: "assets/qaed.png"
  },
  {
    id: 4,
    name: "Valentino Born in Roma Ivory 100ml",
    price: 1700,
    stock: 8,
    desc: "Elegancia nocturna profunda",
    img: "assets/VALENTINO IVORY.png"
  },
  {
    id: 5,
    name: "Phantom 100ml",
    price: 1350,
    stock: 12,
    desc: "Frescura limpia y luminosa",
    img: "assets/PHANTON PARADO.jpeg"
  },
  {
    id: 6,
    name: "Valentino orn in Roma 100ml",
    price: 1650,
    stock: 9,
    desc: "Musk suave y seductor",
    img: "assets/VALENTINO NORML.jpeg"
  },
  {
    id: 7,
    name: "Khamrah MINI 30ml",
    price: 2100,
    stock: 5,
    desc: "Lujo absoluto en cada nota",
    img: "assets/KHAMRAH MINI.jpeg"
  },
  {
    id: 8,
    name: "Yara Candy",
    price: 1400,
    stock: 14,
    desc: "Flores blancas refinadas",
    img: "assets/gooooood yara.png"
  },
  {
    id: 9,
    name: "Aqua Pure",
    price: 1300,
    stock: 18,
    desc: "Frescura acuática moderna",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    id: 10,
    name: "Spice Crown",
    price: 1750,
    stock: 7,
    desc: "Especias intensas y nobles",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
  },
  {
    id: 11,
    name: "White Leather",
    price: 1850,
    stock: 6,
    desc: "Cuero limpio y elegante",
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
  },
  {
    id: 12,
    name: "Mystic Oud",
    price: 1950,
    stock: 4,
    desc: "Oud oriental envolvente",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6"
  },
  {
    id: 13,
    name: "Pure Signature",
    price: 1550,
    stock: 11,
    desc: "Identidad limpia y atemporal",
    img: "https://images.unsplash.com/photo-1585238342028-4bbc4b9b8c77"
  }
];

const productBox = document.getElementById("products");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

let cart = [];

function renderProducts(){
  productBox.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <strong>$${p.price}</strong><br>
      <button class="btn" onclick="addToCart(${p.id})">Agregar</button>
    `;
    productBox.appendChild(div);
  });
}

function addToCart(id){
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);

  if(item){
    if(item.qty < product.stock) item.qty++;
  } else {
    cart.push({...product, qty: 1});
  }
  updateCart();
}

function removeFromCart(id){
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart(){
  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.marginBottom = "8px";

    const text = document.createElement("span");
    text.textContent = `${item.name} x${item.qty}`;

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.style.border = "none";
    btn.style.background = "transparent";
    btn.style.color = "#c7a349";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "1rem";
    btn.onclick = (e) => {
      e.stopPropagation();
      removeFromCart(item.id);
    };

    row.appendChild(text);
    row.appendChild(btn);
    cartItems.appendChild(row);
  });

  const iva = subtotal * 0.16;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("iva").textContent = iva.toFixed(2);
  document.getElementById("total").textContent = (subtotal + iva).toFixed(2);
  cartCount.textContent = cart.length;
}

renderProducts();

document.getElementById("cartBtn").onclick = () => {
  cartBox.classList.toggle("hidden");
};

window.addEventListener("click", (e) => {
  if (!cartBox.contains(e.target) && !e.target.closest('#cartBtn')) {
    cartBox.classList.add("hidden");
  }
});
