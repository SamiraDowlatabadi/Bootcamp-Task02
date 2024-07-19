// Variable:

let allTransactionsdata = [];
let sort = {
  item: "id",
  order: "asc",
  orderPrice: "desc",
  orderDate: "desc",
  refId_like: "",
};
const URL = "http://localhost:3000/transactions";
const app = axios.create({
  baseURL: URL,
});

//  Query Selector

const showBtn = document.querySelector(".btn--show");

// RUN DOM

document.addEventListener("DOMContentLoaded", () => {
  showBtn.addEventListener("click", () => {
    createInput();
    removeShowBtn();
    getData();
  });
});

//Functions

async function getData() {
  const _url = `?refId_like=${sort.refId_like}&_sort=${sort.item}&_order=${sort.order}`;
  await app
    .get(_url)
    .then((res) => {
      allTransactionsdata = res.data;
      removeShowBtn();
      createTable();
      showTableData(allTransactionsdata);
    })
    .catch((err) => console.log(err));
}

function removeShowBtn() {
  if (document.querySelector(".btn--show"))
    document.querySelector(".btn--show").remove();
  if (document.querySelector(".tbl")) document.querySelector(".tbl").remove();
}

function createInput() {
  const newInput = document.createElement("input");
  newInput.classList.add("header__input--search");
  newInput.classList.add("input");
  newInput.placeholder = "جستجوی تراکنش ...";

  document.querySelector(".header__search").append(newInput);

  newInput.addEventListener("input", (e) => {
    sort.refId_like = e.target.value;
    getData();
  });
}

function createTable() {
  const newTable = document.createElement("table");
  newTable.classList.add("styled-table");
  newTable.classList.add("tbl");
  // console.log(`${sort.orderDate}`);
  newTable.innerHTML = `
        <thead>
            <tr>
              <th>ردیف</th>
              <th>نوع تراکنش</th>
              <th>مبلغ 
              <svg  id="img-price" class="icon-up tbl-sort--price ${sort.orderPrice} "  
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>

                  </th>
              <th>شماره پيگيری</th>
              <th>
                تاریخ تراکنش 
                 <svg  id="img-Date" class="icon-up tbl-sort--date ${sort.orderDate} " 
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              </th>
            </tr>
          </thead>
      <tbody class="tbl-tbody"></tbody>`;
  document.querySelector(".form__box").append(newTable);

  document.querySelector("#img-price").style.transform =
    sort.orderPrice === "desc" ? "rotate(180deg)" : "";
  document.querySelector("#img-Date").style.transform =
    sort.orderDate === "desc" ? "rotate(180deg)" : "";

  document.querySelector(".tbl-sort--price").addEventListener("click", (e) => {
    sort.item = "price";
    sort.orderPrice = sort.orderPrice === "desc" ? "asc" : "desc";
    sort.order = sort.orderPrice;

    getData();

    // document.querySelector("#img").style.transform = "rotate(180deg)";
  });

  document.querySelector(".tbl-sort--date").addEventListener("click", (e) => {
    sort.item = "date";
    sort.orderDate = sort.orderDate === "desc" ? "asc" : "desc";
    sort.order = sort.orderDate;
    getData();
  });
}

function showTableData(_transaction) {
  let color = "color-success";

  _transaction.forEach((items) => {
    items.type == "برداشت از حساب"
      ? (color = "color-error")
      : (color = "color-success");

    const tbltbody = document.createElement("tr");
    tbltbody.innerHTML = "";
    tbltbody.innerHTML = ` 
          <td>${items.id}</td>
          <td class="${color}">${items.type}</td>
          <td>${items.price}</td>
          <td>${items.refId}</td>
          <td>${new Date(items.date).toLocaleDateString(
            "fa-IR"
          )} ساعت ${new Date(items.date).toLocaleTimeString("fa-IR")}</td>
        `;
    document.querySelector(".tbl-tbody").append(tbltbody);
  });
}
