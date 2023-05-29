const $nameInput = document.getElementById("name");
const $pickupInput = document.getElementById("pickup");
const $btnInsert = document.getElementById("button-car");
const $invalidName = document.getElementById("invalid-name");
const $invalidPickup = document.getElementById("invalid-pickup");
const $invalidData = document.getElementById("invalid-data");
const $invalidFinancing = document.getElementById("invalid-financing");
const $chosenCar = document.getElementById("chosen-car");
const $carBrand = document.getElementsByName("brand");
const $storedPickup = localStorage.getItem("pickupInput");
const $storedName = localStorage.getItem("nameInput");

function addAccessory() {
  const $accessoryName =
    this.parentNode.parentNode.getElementsByTagName("h3")[0].innerHTML;
  const $accessoryPrice =
    this.parentNode.parentNode.getElementsByTagName("h3")[1].innerHTML;
  const $chosenAccessory = document
    .getElementById("chosen-accessories")
    .insertRow();

  const chosenAccessoryName = $chosenAccessory.insertCell(0);
  const chosenAccessoryPrice = $chosenAccessory.insertCell(1);
  const chosenAccessoryRemoveButton = $chosenAccessory.insertCell(2);
  chosenAccessoryName.innerHTML = $accessoryName;
  chosenAccessoryPrice.innerHTML = $accessoryPrice;
  chosenAccessoryRemoveButton.innerHTML =
    '<button class="button-remove">USUŃ</button>';

  chosenAccessoryRemoveButton
    .getElementsByTagName("button")[0]
    .addEventListener("click", removeAccessory);
}

function removeAccessory() {
  this.parentNode.parentNode.remove();
}

const $addButtonList = document.getElementsByClassName("button-add");
for (let i = 0; i < $addButtonList.length; i++) {
  $addButtonList[i].addEventListener("click", addAccessory);
}

const $radioBtns = document.querySelectorAll("input[name='financing']");
const $financingSelected = document.getElementById("financing-selected");
const $leasingValue = document.getElementById("leasing");
const $cashValue = document.getElementById("cash");

const findSelected = () => {
  if ($leasingValue.checked) {
    $financingSelected.textContent = $leasingValue.value;
  } else if ($cashValue.checked) {
    $financingSelected.textContent = $cashValue.value;
  } else {
    $financingSelected.textContent = "Nie wybrano formy finansowania";
  }
};

$radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("change", findSelected);
});

findSelected();

const saveToLocalStorage = () => {
  localStorage.setItem("pickupInput", $pickupInput.value);
  localStorage.setItem("nameInput", $nameInput.value);
};

$btnInsert.addEventListener("click", saveToLocalStorage);

const $buttonsCar = document.querySelectorAll(".button-buy");

$buttonsCar.forEach(function (button) {
  button.addEventListener("click", function () {
    let $brand = this.parentNode.querySelector('h2[name="brand"]').innerText;
    let $carClass = this.parentNode.querySelector(
      'h3[name="car-class"]'
    ).innerText;
    let $carYear = this.parentNode.querySelector(
      'h3[name="car-year"]'
    ).innerText;
    document.getElementById(
      "chosen-car"
    ).innerText = `${$brand} ${$carClass} ${$carYear}`;
    document.getElementById(
      "thank-you-car"
    ).innerText = `Dziękujemy za zakup ${$brand} ${$carClass} ${$carYear}! `;
    let $carImage = this.parentNode
      .querySelector(".car-container-image")
      .cloneNode(true);
    let $thankYouImage = document.getElementById("thank-you-image");
    $thankYouImage.innerHTML = "";
    $thankYouImage.appendChild($carImage);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".button-buy")) {
    document.getElementById("first-screen").style.display = "none";
    document.getElementById("thank-you").style.display = "none";
    document.getElementById("form-buy").style.display = "block";
  }
});

document.addEventListener("click", (e) => {
  let valuePickup = $pickupInput.value.trim();
  let valueName = $nameInput.value.trim();
  if (valuePickup.length === 0 || valueName.length === 0) {
    $invalidData.innerText = "Nie podano wszystkich danych";
  } else if (e.target.matches("#button-car")) {
    document.getElementById("first-screen").style.display = "none";
    document.getElementById("thank-you").style.display = "block";
    document.getElementById("form-buy").style.display = "none";
  }
});

function bindBuyButtons() {
  const $carPrices = document.querySelectorAll('[name="car-price"]');
  const $buyButtons = document.querySelectorAll(".button-buy");

  $buyButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const $totalPriceElement = document.getElementById("total-price");
      const $totalPriceElement2 = document.getElementById("price-selected");
      const price = $carPrices[index].textContent;
      $totalPriceElement.textContent = price;
      $totalPriceElement2.textContent = price;
    });
  });
}

document.addEventListener("DOMContentLoaded", bindBuyButtons);

const $backButton = document.getElementById("button-back");
const $firstScreen = document.getElementById("first-screen");
const $formBuy = document.getElementById("form-buy");

$backButton.addEventListener("click", function () {
  $firstScreen.style.display = "block";
  $formBuy.style.display = "none";
});
