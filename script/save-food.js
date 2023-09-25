const savedFoodsListObject = JSON.parse(localStorage.getItem('savedFoodsListObject')) || [];

function saveFood() {
  const productElement = document.getElementById('name');
  const name = productElement.value.toUpperCase();
  const infoElement = document.getElementById('info');
  const info = infoElement.value;
  const priceElement = document.getElementById('price');
  const price = priceElement.value;
  savedFoodsListObject.push({
    name,
    info,
    price
  });
  productElement.value = '';
  infoElement.value = '';
  priceElement.value = '';
  displayFood();
}

function displayFood() {
  const displayElement = document.querySelector('.js-display-product');
  displayElement
    .innerHTML = ``;
  savedFoodsListObject.forEach(function (foodObject, index) {
    const { name, info, price } = foodObject;
    displayElement
      .innerHTML += `<div>${name}</div>
    <div>${info}</div>
    <div>${price}&#8378;</div>
    <button class="delete-button" onclick="deleteFromList(${index});">Sil</button>`;
  });
  localStorage.setItem('savedFoodsListObject', JSON.stringify(savedFoodsListObject));
}

function handleKeyboardEvent(key) {
  if (key === 'Enter') {
    saveFood();
  }
}

function deleteFromList(i) {
  localStorage.removeItem('savedFoodListObject');
  savedFoodsListObject.splice(i, 1);
  displayFood();
}

displayFood();