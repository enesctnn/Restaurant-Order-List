
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

function handleFoodButtonClicks(name, price, info) {
  countSameOrders(name, price);

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
    },
    count: 1
  });
  displayOrders();
}

const sameOrdersCount = JSON.parse(localStorage.getItem('sameOrdersCount')) || [];

function countSameOrders(name, price) {
  let isTrue = true;
  sameOrdersCount.forEach(function (sameOrdersCountObject) {
    const name1 = sameOrdersCountObject.name;
    const price1 = sameOrdersCountObject.price;
    if (name1 === name && price1 === price) {
      isTrue = false;
      sameOrdersCountObject.count++;
    }
  });
  if (isTrue) {
    sameOrdersCount.push({
      name,
      price,
      count: 1
    });
  }

}

function deleteFromTotal(num) {
  localStorage.removeItem('totalOrderedInfo');
  localStorage.removeItem('sameOrdersCount');
  sameOrdersCount.forEach(function (sameOrdersCountObject, index) {
    const { name } = sameOrdersCountObject;
    if (name === totalOrderedInfo[num].name) {
      if ((sameOrdersCountObject.count - 1) === 0) {
        sameOrdersCount.splice(index, 1);
      } else sameOrdersCountObject.count--;
    }
  });

  totalOrderedInfo.splice(num, 1);
  displayOrders();
}

function displayOrders() {
  localStorage.setItem('totalOrderedInfo', JSON.stringify(totalOrderedInfo));
  localStorage.setItem('sameOrdersCount', JSON.stringify(sameOrdersCount));
  const displayOrdersElement = document.getElementById('display-orders-element');
  displayOrdersElement.innerHTML = ``;
  totalOrderedInfo.forEach(function (order, index) {
    const orderListObject = order;
    const { name, price } = orderListObject;
    displayOrdersElement.innerHTML += `<div class="order-details-container">
    <div class="food-name">${name}</div><div class="food-price">: ${price}&#8378;</div><button class="trash-button" onclick="deleteFromTotal(${index});"><i class="fa fa-trash-o"></i></button>
    </div>`;
  });
  console.log(sameOrdersCount);

}

localStorage.removeItem('totalOrderedInfo');

displayOrders();

setInterval(function () {
  location.reload();
}, 20000);
