
const savedFoodsListObject = JSON.parse(localStorage.getItem('savedFoodsListObject')) || [];

rebuildFoodList();

function rebuildFoodList() {
  const displayElement = document.getElementById('button-container');
  displayElement
    .innerHTML = ``;
  savedFoodsListObject.forEach(function (foodObject) {
    const { name, info, price } = foodObject;
    displayElement.innerHTML += `<button class="food-button" onclick="handleFoodButtonClicks('${name}', '${price}','${info}');"><h2 class="food-header">${name}</h2>
    <div class="info">${info}</div>
    <h3 class="price">${price}&#8378;</h3>
    </button>
    `;
  })
}

const totalOrderedInfo = JSON.parse(localStorage.getItem('totalOrderedInfo')) || [];
displayOrders();

function handleFoodButtonClicks(name, price, info) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  totalOrderedInfo.push({
    name,
    price,
    info,
    date: {
      day,
      month,
      year,
      hour,
      minute
    }
  });
  displayOrders();
}

function deleteFromTotal(num) {
  localStorage.removeItem('totalOrderedInfo');
  totalOrderedInfo.splice(num, 1);
  displayOrders();
}

function displayOrders() {
  localStorage.setItem('totalOrderedInfo', JSON.stringify(totalOrderedInfo));
  const displayOrdersElement = document.getElementById('display-orders-element');
  displayOrdersElement.innerHTML = ``;
  totalOrderedInfo.forEach(function (order, index) {
    const orderListObject = order;
    const { name, price } = orderListObject;
    displayOrdersElement.innerHTML += `<div class="order-details-container">
    <div class="food-name">${name}</div><div>: ${price}&#8378;</div><button class="trash-button" style="font-size:35px; color:white;" onclick="deleteFromTotal(${index});"><i class="fa fa-trash-o"></i></button>
    </div>`;
  });
}

setInterval(function () {
  location.reload();
}, 20000);
