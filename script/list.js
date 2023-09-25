const totalOrderedInfo = JSON.parse(localStorage.getItem('totalOrderedInfo')) || [];
let total = 0;
function displayOrders() {
  localStorage.setItem('totalOrderedInfo', JSON.stringify(totalOrderedInfo));
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

    total += Number(price);
    displayTotalElement.innerHTML = total + ` &#8378;`;
  });
}

function deleteOrder(num) {
  localStorage.removeItem('totalOrderedInfo');
  totalOrderedInfo.splice(num, 1);
  displayOrders();
}

displayOrders();

setInterval(function () {
  location.reload();
}, 20000);