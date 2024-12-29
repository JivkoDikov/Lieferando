let menus = [
  {
    image: "./img/suppe.jpg",
    name: "Supa Topcheta",
    description:
      "Suppe aus Rindbrühe mit Rind-Schweinefleischbällchen, Paprika, Tomaten, Zwiebeln, Reis und aromatischen Gewürzen",
    price: 5.5,
    addbutton: "./img/addbutton.jpg",
  },
  {
    image: "./img/salata.jpg",
    name: "Ovcharska Salata",
    description:
      "Gemischter Salat aus Gurken, Tomaten, Zwiebeln, Paprika, Schafkäse, Pilzen, Eiern und Schinken",
    price: 6.5,
    addbutton: "./img/addbutton.jpg",
  },
  {
    image: "./img/chushki.jpg",
    name: "Palneni Chushki",
    description:
      "Gefüllte Paprika mit Reis und Schweinsfaschiertem in einer schmackhaften hausgemachten Tomatensoße",
    price: 7.0,
    addbutton: "./img/addbutton.jpg",
  },
  {
    image: "./img/kuifteta.jpg",
    name: "Kiufteta s Garnitura",
    description: "Fleischlaibchen aus Schweinefleisch mit Beilage nach Wahl",
    price: 9.5,
    addbutton: "./img/addbutton.jpg",
  },
  {
    image: "./img/brot.webp",
    name: "Parlenka",
    description: "Hausgemachtes Brot",
    price: 1.5,
    addbutton: "./img/addbutton.jpg",
  },
  {
    image: "./img/creme.jpg",
    name: "Krem Karamel",
    description: "Süßer Pudding",
    price: 3.5,
    addbutton: "./img/addbutton.jpg",
  },
];

let foodnames = [];
let prices = [];
let amounts = [];

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


function render() {
  includeHTML();
  for (let i = 0; i < menus.length; i++) {
    let element = menus[i];
    document.getElementById("menu").innerHTML += /*html*/ `
          <div class="card">
            <div>
              <img class="menu-images"src=${element["image"]}>
            </div>
            <div class="description">
              <b>${element["name"]}</b>
              <i>${element["description"]}</i>
              <b>${element["price"].toFixed(2)} €</b>
            </div>
            <div>
              <img onclick="addToBasket(${i})" class="addbutton" src=${element["addbutton"]}>
            </div>
          </div>`;
  }
  renderBasket();
}
function renderBasket() {
  let contentright = document.getElementById("content-right");
  contentright.innerHTML = "";
  contentright.innerHTML += /*html*/ `
        <h1 id="headline-basket" class="headline-basket">Warenkorb</h1>
        <div onclick="deleteResponsiveBasket()"class="close-basket d-none">x</div>
        <div id="basket" class="basket">
          <img id="img-basket"class="img-basket" src="./img/basket.png">
          <p id="basket-description"class="basket-description">Füge durch einen Klick auf den + Button im Menu deine Speise hinzu.</p>
        <div>
    `;
}

function addToBasket(indexMenus) {
  document.getElementById("basket").innerHTML = "";
  let menu = menus[indexMenus];
  let x = foodnames.indexOf(menu.name);
  let price = menu.price;
  if (x == -1) {
    foodnames.push(menu["name"]);
    prices.push(price);
    amounts.push(1);
  } else {
    amounts[x]++;
  }
  renderMenuBasket();
  addAmountHeaderBasket();
}

function addAmountHeaderBasket() {
  let amount = 0;
  for (let i = 0; i < amounts.length; i++) {
    amount += amounts[i];
  }
  document.getElementById("amount-headerbasket").innerHTML = /*html*/ `
  <div id="amount-headerbasket" class ="amount-headerbasket">${amount}</div>`;
}

function deleteAmountHeaderBasket() {
  addAmountHeaderBasket(-1);
}

function renderMenuBasket() {
  document.getElementById("basket").innerHTML = "";
  for (let i = 0; i < foodnames.length; i++) {
    document.getElementById("basket").innerHTML += /*html*/ `
       <div id="shoppingcart${i}" class= "shoppingcart">
         <div class ="amount-food">
           <div>${amounts[i]}</div>
           <div>${foodnames[i]}</div>
         </div>
         <div class ="plus-minus">
            <div onclick ="addToShoppingCart(${i})"class ="plus">+</div>
            <div onclick ="deleteFromShoppingCart(${i})"class ="minus">-</div>
          </div>
          <div class ="price-trash">${getPrice(i)} €
            <img onclick="deleteMenu(${i})"class ="trash"src="./img/trash.jpg">
          </div>
        </div>
`;
  }
  document.getElementById("basket").innerHTML += /*html*/ `
    <div class="info-costs">
      <div class="sum">
        <div>Zwischensumme:</div>
        <div id ="sum"></div>
      </div>
      <div class="sum">
        <div>Lieferkosten:</div>
        <div>5.90 €</div>
      </div>
      <div class="sum">
        <div>Gesamtsumme:</div>
        <div id ="finalsum"></div>
      </div>
      <div class="pay-button-container"><button onclick="orderMenu()" class="pay-button">Bestellen</button></div>
    </div>
`;
  updateShoppingBasket();
}

function getPrice(indexBasket) {
  return (prices[indexBasket] * amounts[indexBasket]).toFixed(2);
}

function updateShoppingBasket() {
  let sum = 0;
  for (let i = 0; i < prices.length; i++) {
    sum += prices[i] * amounts[i];
  }

  let finalsum = sum + 5.9;
  document.getElementById("sum").innerHTML = `${sum.toFixed(2)} €`;
  document.getElementById("finalsum").innerHTML = `${finalsum.toFixed(2)} €`;
}

function deleteMenu(i) {
  foodnames.splice(i, 1);
  amounts.splice(i, 1);
  prices.splice(i, 1);
  if (foodnames.length == 0) {
    renderBasket();
    deleteResponsiveBasket();
    deleteFromShoppingCart();
    document.getElementById('amount-headerbasket').innerHTML ='';
  } else {
    renderMenuBasket();
    updateShoppingBasket();
    deleteAmountHeaderBasket();
  }
}

function addToShoppingCart(indexBasket) {
  amounts[indexBasket]++;
  renderMenuBasket();
  addAmountHeaderBasket();
}

function deleteFromShoppingCart(indexBasket) {
  amounts[indexBasket]--;
  renderMenuBasket();
  deleteAmountHeaderBasket();
  if (amounts[indexBasket] == 0) {
    deleteMenu(indexBasket);
   
  }
}

function orderMenu() {
  document.getElementById("amount-headerbasket").innerHTML = "";
  document.getElementById("content-right").innerHTML = "";
  document.getElementById("content-right").innerHTML += /*html*/ `
    <div class ="order">
      <div>Danke für deine Bestellung</div>
      <a class="back-homepage" href="index.html">Zurück zur Hauptseite</a>
      </div>
      `;
}

function showOrder() {
  if (amounts.length <= 0) {
    alert(
      "Der Warenkorb ist leer. Füge durch einen Klick auf den + Button im Menu deine Speise hinzu."
    );
  } else {
    document.getElementById("content-left").classList.add("d-none");
    document.getElementById("content-right").classList.remove("responsive-basket-container");
   
}
save();
load();
}
function deleteResponsiveBasket() {
  /*document.getElementById("amount-headerbasket").innerHTML = "";*/
  document.getElementById("content-left").classList.remove("d-none");
  document.getElementById("content-right").classList.add("responsive-basket-container");
  save();
  load();
}

function save(){
  let foodnamesAsText = JSON.stringify(foodnames);
  localStorage.setItem("foodnames",foodnamesAsText);
  let pricesAsText = JSON.stringify(prices);
  localStorage.setItem("prices",pricesAsText);
  let amountsAsText = JSON.stringify(amounts);
  localStorage.setItem("amounts",amountsAsText);
}


function load(){
  let foodnamesAsText = localStorage.getItem('foodnames');
  let pricesAsText = localStorage.getItem('prices');
  let amountsAsText = localStorage.getItem('amounts');
    if(foodnamesAsText&&pricesAsText&&amountsAsText){
      foodnames = JSON.parse(foodnamesAsText);
      prices = JSON.parse(pricesAsText);
      amounts = JSON.parse(amountsAsText);
    }
}
