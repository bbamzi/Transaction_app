'use strict';
const add_receipt_items = document.querySelector('#add_receipt_items');
const add_invoice_items = document.querySelector('#add_invoice_items');
const invoicePage = document.querySelector('.invoice_page');
const receiptPage = document.querySelector('.receipt_page');
const invoice_item = document.querySelector('.invoice_item');
const receipt_item = document.querySelector('.receipt_item');
const selectReceiptBtn = document.querySelector('.receipt');
const selectInvoiceBtn = document.querySelector('.invoice');

// console.log(add_receipt_items);

add_receipt_items.addEventListener('click', function (e) {
  e.preventDefault();

  const html = `  <div class="${add_receipt_items}">
      <div>
        <label>Description</label>
        <textarea name="description" cols="20" rows="2"></textarea>
      </div>
      <div>
        <label>Unit/Quantity</label>
        <input name="Unit" />
      </div>
      <div>
        <label>Price</label>
        <input type="text" name="price" />
      </div>
    </div>`;
  receipt_item.insertAdjacentHTML('afterend', html);
});

add_invoice_items.addEventListener('click', function (e) {
  e.preventDefault();

  const html = `  <div class="${add_invoice_items}">
      <div>
        <label>Description</label>
        <textarea name="description" cols="20" rows="2"></textarea>
      </div>
      <div>
        <label>Unit/Quantity</label>
        <input name="Unit" />
      </div>
      <div>
        <label>Price</label>
        <input type="text" name="price" />
      </div>
    </div>`;
  invoice_item.insertAdjacentHTML('afterend', html);
});
selectInvoiceBtn.addEventListener('click', function (e) {
  e.preventDefault();
  receiptPage.style.display = 'none';
  invoicePage.style.display = 'block';
  console.log('hi');
});

selectReceiptBtn.addEventListener('click', function (e) {
  e.preventDefault();
  receiptPage.style.display = 'block';
  invoicePage.style.display = 'none';
});
