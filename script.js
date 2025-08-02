// JavaScript code for a simple CRUD application
// كود جافا سكريبت لتطبيق CRUD بسيط
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let hello = document.getElementById("hello")
let body = document.getElementById("body");
let theme = document.getElementById("theme");
let mood = "create"; // وضع متغير لتحديد الوضع الحالي
// A variable to determine the current mode
let tmp;
// متغير لتخزين الفهرس المؤقت للمنتج الذي سيتم تحديثه
// A variable to store the temporary index of the product to be updated 


// get total 


// عند تغيير اي حقل من حقول السعر والضرائب والاعلانات والخصم
// When changing any field of price, taxes, ads, and discount
// حساب المجموع
function getTotal() {
// اذا كان السعر غير فارغ
    // if price not empty
    if (price.value != '') {
// احسب نتيجة المجموع
        // calculate total
// علامة الجمع امام كل قيمة هي تعني تحويلها الى رقم
        // The plus sign before each value converts it to a number
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
// ضع النتيجة في المجموع
        // Set the result in the total
        total.innerHTML = result;
// تغيير لون المجموع الى اللون الاخضر
        // Change the total color to green
        total.style.background = "#040";
// اذا كان السعر فارغ
    }else {
// اذا كان المجموع فارغ
        // If the price is empty
        total.innerHTML = '';
// تغيير لون المجموع الى اللون الاحمر
        // Change the total color to red
        total.style.background = "#a00d02";
    }
}

// create product

let dataPro ;
if (localStorage.product != null) {
        // اذا كان هناك بيانات في التخزين المحلي
        // If there is data in local storage
    dataPro = JSON.parse(localStorage.product);
}else {
        // اذا لم يكن هناك بيانات في التخزين المحلي
        // If there is no data in local storage
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        discount: +discount.value,
        total: total.innerHTML,
        count: +count.value,
        category: category.value.toLowerCase()
    }
    // count
    // clean data
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100000 && newPro.count <= 100000 ) {
        //   و عدد المنتجات اقل من 100اذا كانت جميع الحقول المطلوبة غير فارغة 
        // If all required fields are not empty and count is less than 100
    if (mood === "create") { 
        // اذا كان الوضع هو انشاء منتج جديد
        // If the mode is to create a new product
    if (newPro.count > 1) {
        // اذا كان عدد المنتجات اكبر من 1
        // If the number of products is greater than 1
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    } else {
        // اذا كان عدد المنتجات اقل من او يساوي 1
        // If the number of products is less than or equal to 1
        // اضافة المنتج الى المصفوفة
        // Add the product to the array
dataPro.push(newPro);
    }
} else {
        // اذا كان الوضع هو تعديل منتج موجود
        // If the mode is to update an existing product
        // تحديث المنتج في المصفوفة
        // Update the product in the array
        // mood هو الوضع الحالي
        // mood is the current mode
        dataPro[tmp] = newPro;
        // mood هو رقم الفهرس للمنتج الذي سيتم تحديثه
        // mood is the index number of the product to be updated
        mood = "create"; // تغيير الوضع الى انشاء منتج جديد
        // Change the mode to create a new product

        // تغيير زر التحديث الى زر انشاء منتج جديد
        // Change the update button to the create new product button
        submit.innerHTML = "Create"; // تغيير زر الاضافة الى زر انشاء منتج جديد
        // Change the add button to the create new product button
        count.style.display = "block"; // اظهار حقل عدد المنتجات عند التحديث
        // Show the count field when updating
        
}
        clearData();
    }

    // save local storage
    localStorage.setItem("product", JSON.stringify(dataPro));

        showData();

}
// clear inputs

function clearData() {
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
}

//  read

function showData() {
        getTotal(); // حساب المجموع عند عرض البيانات
        // Calculate the total when displaying the data
        let table = '';
        for (let i = 0; i < dataPro.length; i++) {

            table += `
            <tr>
                <td>${ i+1 }</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
        }
        document.getElementById("tbody").innerHTML = table;
// delete all

        let btnDelete = document.getElementById("deleteAll");
        // اذا كان هناك بيانات في المصفوفة
        // If there is data in the array
        if (dataPro.length > 0) {
            btnDelete.innerHTML = `
                <button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
        } else {
                btnDelete.innerHTML = '';
                }
        
}
// delete 

function deleteData(i) {
        // حذف العنصر من المصفوفة
        // Delete the item from the array
        // splice تستخدم لحذف عنصر من المصفوفة
        // The splice method is used to delete an item from the array
    dataPro.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();
}
showData();

function deleteAll() {
    // حذف جميع البيانات من المصفوفة
    // Delete all data from the array
    dataPro.splice(0);
    localStorage.clear();
    showData();
}

// update

function updateData(i) {
        // تحديث البيانات في المصفوفة
        // Update the data in the array
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;
        getTotal();
        count.style.display = "none"; // اخفاء حقل عدد المنتجات عند التحديث
        // Hide the count field when updating
        category.value = dataPro[i].category;
        // تغيير زر الاضافة الى زر التحديث
        // Change the add button to the update button
        submit.innerHTML = "Update";
        mood = "update"; // تغيير الوضع الى تحديث
        // Change the mode to update
        tmp = i; // تخزين الفهرس المؤقت للمنتج الذي سيتم تحديثه
        // Store the temporary index of the product to be updated
scroll({
            top: 0,
            behavior: "smooth"
        }); // التمرير الى الاعلى
        // Scroll to the top
}


    // count
    let newPro= {
    title: title.value.toLowerCase(),
    price: +price.value,
    taxes: +taxes.value,
    ads: +ads.value,
    discount: +discount.value,
    total: total.innerHTML,
    count: +count.value,
    category: category.value.toLowerCase()
};

    if (newPro.count > 1) { 
        // اذا كان عدد المنتجات اكبر من 1
        // If the number of products is greater than 1
        for (let j = 0; j < newPro.count; j++) {
            dataPro[i] = newPro;
        }
    } else {
        // اذا كان عدد المنتجات اقل من او يساوي 1
        // If the number of products is less than or equal to 1
        dataPro[tmp] = newPro;
}

// search
let searchMood = 'title'; // وضع متغير لتحديد وضع البحث
// A variable to determine the search mode

function getSearchMood(id) {
    let search = document.getElementById("Search");
    if (id === 'searchTitle') {
        // اذا كان البحث عن العنوان
        // If the search is by title
        searchMood = 'title';
    } else {
        // اذا كان البحث عن الفئة
        // If the search is by category
        searchMood = "category";

    }
        search.placeholder = "Search By" + searchMood ; // تغيير نص العنصر حسب وضع البحث
    search.focus();
    search.value = ''; // مسح قيمة حقل البحث
    showData(); // عرض البيانات بعد تغيير وضع البحث
}

function searchData(value) {
if (searchMood === 'title') {
        // اذا كان البحث عن العنوان
        // If the search is by title
        let table = '';
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`;
            }
        }
        document.getElementById("tbody").innerHTML = table;
    }else {
        // اذا كان البحث عن الفئة
        // If the search is by category
        let table = '';
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`;
            }
        }
        document.getElementById("tbody").innerHTML = table;
    }

}

if (localStorage.getItem("theme") === "light") {
    body.classList.add("theme");
    hello.innerHTML = "🌞";
} else {
    hello.innerHTML = "🌙";
}

hello.onclick = function () {
    body.classList.toggle("theme");

    if (body.classList.contains("theme")) {
        // وضع النهار
        localStorage.setItem("theme", "light");
        hello.innerHTML = "🌞";
    } else {
        // وضع الليل
        localStorage.setItem("theme", "dark");
        hello.innerHTML = "🌙";
    }
}








