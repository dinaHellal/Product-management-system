let title = document.getElementById("title");
let price = document.getElementById("price");
let NumberOfPieces = document.getElementById("NumberOfPieces");
let count = document.getElementById("count");
let Category = document.getElementById("Category");
let submit = document.getElementById("submit");

let mood = "اضافة";
let tmp;

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    NumberOfPieces: NumberOfPieces.value,
    count: count.value,
    Category: Category.value.toLowerCase(),
  };
  if(title.value != "" 
    && price.value != ""
    && newPro.count <= 100 ){
    if (mood === "اضافة") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
      clearData();

  }
  } else {
    dataPro[tmp] = newPro;
    mood = "اضافة";
    submit.innerHTML = "اضافة";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  NumberOfPieces.value = "";
  count.value = "";
  Category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
          <th>اسم المنتج</th>
          <th>السعر</th>
          <th>عدد القطع</th>
          <th>الصنف</th>
          <th></th>
          <th></th>

        </tr>
    <tr>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].NumberOfPieces}</td>
            <td>${dataPro[i].Category}</td>
            <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="deleteData(${i} )" id="delete">حذف</button></td>
          </tr>
  `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");

  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
<button onclick="deleteAll()">حذف الكل(${dataPro.length})</button>

`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  NumberOfPieces.value = dataPro[i].NumberOfPieces;

  count.style.display = "none";
  Category.value = dataPro[i].Category;
  submit.innerHTML = "تحديث";
  mood = "تحديث";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "اسم المنتج";
  } else {
    searchMood = "الصنف";
  }
  search.placeholder = " البحث بواسطه " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
            <th>اسم المنتج</th>
            <th>السعر</th>
            <th>عدد القطع</th>
            <th>الصنف</th>
            <th></th>
            <th></th>

          </tr>
      <tr>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].NumberOfPieces}</td>
              <td>${dataPro[i].Category}</td>
              <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
              <td><button onclick="deleteData(${i} )" id="delete">حذف</button></td>
            </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].Category.includes(value.toLowerCase())) {
        table += `
        <tr>
            <th>اسم المنتج</th>
            <th>السعر</th>
            <th>عدد القطع</th>
            <th>الصنف</th>
            <th></th>
            <th></th>

          </tr>
      <tr>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].NumberOfPieces}</td>
              <td>${dataPro[i].Category}</td>
              <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
              <td><button onclick="deleteData(${i} )" id="delete">حذف</button></td>
            </tr>
    `;
      }
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
