const totalOrderedInfo = JSON.parse(localStorage.getItem('totalOrderedInfo')) || [];

const sameOrdersCount = JSON.parse(localStorage.getItem('sameOrdersCount')) || [];

let total = 0;

function displayOrders() {
  localStorage.setItem('totalOrderedInfo', JSON.stringify(totalOrderedInfo));
  localStorage.setItem('sameOrdersCount', JSON.stringify(sameOrdersCount));
  const displayTotalElement = document.querySelector('.js-display-total');
  const displayElement = document.querySelector('.display-order-details');
  displayElement.innerHTML = ``;
  total = 0;
  totalOrderedInfo.forEach(function (totalOrderedObject, index) {
    const { name, price, info, date } = totalOrderedObject;
    const { day, month, year, hour, minute } = date;
    displayElement
      .innerHTML += `<div class="details-of-order">
    <span class="price-span">${price}&#8378;</span>
    <span class="date-description-span">
    ${month}/${day}/${year} ${hour}:${minute}
    </span> 
    <span class="food-name-span">${name}</span>
    <span class="info-span">${info}</span>
    <button class="delete-button" onclick="deleteOrder(${index});">
    Sil</button>
    </div>`;

    total += Number(price * 100);
  });
  displayTotalElement.innerHTML = (total / 100) + ` &#8378;`;
  displaySameOrders();
}


function displaySameOrders() {
  const displayElement = document.querySelector('.display-same-order-count');
  displayElement
    .innerHTML = ``;
  sameOrdersCount.forEach(function (sameOrdersCountObject) {
    const { name, price, count } = sameOrdersCountObject;
    displayElement
      .innerHTML += `<div class="order-count-line"><div>Satış : ${name}</div> <div>Satış Adedi : ${count}</div> <div>Ürün Tane Fiyatı : ${price} &#8378;</div> <div>Toplam : ${((price * 100) * count) / 100}&#8378</div></div>`;
  });
}

function deleteOrder(num) {
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


displayOrders();

setInterval(function () {
  location.reload();
}, 20000);
