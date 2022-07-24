"use strict";

const addItemsBtn = document.querySelector("#addItems");
const items = document.querySelector(".items");
const selectReceiptBtn = document.querySelector(".receipt");
const selectInvoiceBtn = document.querySelector(".invoice");
const serviceType = document.querySelector("#service_type_hidden");
const checkbox = document.querySelector("input[name=autoGenerate]");
const paymentMethodSelect = document.getElementById("paymentMethodSelect");
const delete_payment_detail = document.getElementById("delete_payment_detail");
const paymentIfOther = document.getElementById("paymentIfOther");
const editTransaction = document.getElementById("edit_transaction");

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
  items.insertAdjacentHTML("beforeend", html);
});

const showReceipt = function (e) {
  paymentMethodSelect.addEventListener("change", function (e) {
    if (this.value === "other") {
      paymentIfOther.disabled = false;
      paymentIfOther.focus();
      document.getElementById("payment_details").style.display = "block";
    } else if (this.value === "Bank") {
      document.getElementById("payment_details").style.display = "block";
    } else {
      paymentIfOther.disabled = true;
      document.getElementById("payment_details").style.display = "none";
    }
  });
  service_type_hidden.value = "Receipt";
  const receipt_visibility = document.querySelectorAll(".receipt_visibility");
  receipt_visibility.forEach((item) => {
    item.style.display = "block";
    const invoice_visibility = document.querySelectorAll(".invoice_visibility");
    invoice_visibility.forEach((item) => {
      item.style.display = "none";
    });
  });
};

const showInvoice = function (e) {
  paymentMethodSelect.addEventListener("change", function (e) {
    if (this.value === "other") {
      paymentIfOther.disabled = false;
      paymentIfOther.focus();
      document.getElementById("payment_details").style.display = "block";
    } else if (this.value === "Bank") {
      document.getElementById("payment_details").style.display = "block";
    } else {
      paymentIfOther.disabled = true;
      document.getElementById("payment_details").style.display = "none";
    }
  });
  service_type_hidden.value = "Invoice";
  const invoice_visibility = document.querySelectorAll(".invoice_visibility");
  invoice_visibility.forEach((item) => {
    item.style.display = "block";
  });
  const receipt_visibility = document.querySelectorAll(".receipt_visibility");
  receipt_visibility.forEach((item) => {
    item.style.display = "none";
  });
};

if (serviceType.value === "Receipt") {
  showReceipt();
} else {
  showInvoice();
}
selectInvoiceBtn.addEventListener("click", showInvoice);
selectReceiptBtn.addEventListener("click", showReceipt);

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

editTransaction.addEventListener("click", (e) => {
  document.getElementById("edit_form_fieldset").disabled = false;
});

delete_payment_detail.addEventListener("click", (e) => {
  document.getElementById("payment_details").style.display = "none";
});
