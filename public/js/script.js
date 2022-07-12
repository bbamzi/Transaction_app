"use strict";

const addItemsBtn = document.querySelector("#addItems");
const items = document.querySelector(".items");
const selectReceiptBtn = document.querySelector(".receipt");
const selectInvoiceBtn = document.querySelector(".invoice");
const serviceType = document.querySelector("#service_type_hidden");

addItemsBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const html = `  <div class="${items}">
  <div>
  <label>Description</label>
  <textarea name="description" cols="20" rows="2"></textarea>
  <label>Unit/Quantity</label>
  <input name="Unit"/>
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
