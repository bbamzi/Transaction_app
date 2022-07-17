"use strict";

const addItemsBtn = document.querySelector("#addItems");
const items = document.querySelector(".items");
const selectReceiptBtn = document.querySelector(".receipt");
const selectInvoiceBtn = document.querySelector(".invoice");
const serviceType = document.querySelector("#service_type_hidden");
const checkbox = document.querySelector("input[name=autoGenerate]");
// const autoGenerate = document.getElementById("autoGenerate");

addItemsBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const html = `  <div class="${items}">
  <div>
  <label>Description</label>
  <textarea name="description" cols="20" rows="2"></textarea>
  <label>Unit/Quantity</label>
  <input name="unit"/>
  <label>Price</label>
  <input type="text" name="price"/><br/>
</div>`;
  items.insertAdjacentHTML("afterend", html);
});

selectInvoiceBtn.addEventListener("click", function (e) {
  service_type_hidden.value = "Invoice";
  const invoice_visibility = document.querySelectorAll(".invoice_visibility");
  invoice_visibility.forEach((item) => {
    item.style.display = "block";
  });
  const receipt_visibility = document.querySelectorAll(".receipt_visibility");
  receipt_visibility.forEach((item) => {
    item.style.display = "none";
  });
});

selectReceiptBtn.addEventListener("click", function (e) {
  service_type_hidden.value = "Receipt";
  const receipt_visibility = document.querySelectorAll(".receipt_visibility");
  receipt_visibility.forEach((item) => {
    item.style.display = "block";
    const invoice_visibility = document.querySelectorAll(".invoice_visibility");
    invoice_visibility.forEach((item) => {
      item.style.display = "none";
    });
  });
});

checkbox.addEventListener("change", function () {
  let brandName = document.getElementById("brand_name").value;
  if (this.checked) {
    let nums =
      brandName
        .toLowerCase()
        .split(" ")
        .map((e) => e[0])
        .join("") + "0001";
    document.getElementById("documentNumber").value =
      nums[0].toUpperCase() + nums.slice(1);
  } else {
    document.getElementById("documentNumber").value = "";
  }
});
