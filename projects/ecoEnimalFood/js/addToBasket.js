const bucketContainer = document.getElementById('bucket');
const counterSelect = document.getElementById('productCount');
const productContainer = document.getElementById('product');
const countBasket = document.getElementById('countBasket');
const BUCKET_KEY = 'bucket';
const bucketProducts = JSON.parse(localStorage.getItem(BUCKET_KEY)) || [];
generateBucket();

let html = ''
products.map((item, index) => {
    html += `<div class="card ${item.animal}">
            <a href="product.html"><div class=" waves-effect waves-block waves-light">
                <img class="activator" src='${item.img}'>
            </div></a>
            <div class="card-content">
                <div class="card-title activator grey-text text-darken-4 title-height">${item.title}
                    <i class="material-icons right">more_vert</i>
                </div>
                <div class="flex space-between margin10">
                    <div class="price">${item.price}.00 р.</div>
                        <button class="shop waves-effect" onclick="addProduct(${index})"><i class="material-icons">shopping_cart</i></button>
                </div>
                <a href="#modal1" class=" modal-trigger"><div class="norm-kormlenia center">узнать норму кормления</div></a>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Состав
                    <i class="material-icons right">close</i></span>
                <p> ${item.composition}</p>
            </div>
        </div>`
})

function generateBucket() {
    let bucketHtml = '';
    let total = 0;
    let counter = 0;
    bucketProducts.forEach((item, index) => {
        total += item.price * item.count;
        bucketHtml += `<div class="basketProduct row1 valign-wrapper">
                    <div><img class="imgBasket" src='${item.img}'></div>
                    <div class="margin-left">${item.title} <br>
                    <button onclick="add(${index}, -1)" class="buttonAdd waves-effect">-</button>
                   ${item.count}
                    <button onclick="add(${index}, 1)" class="buttonAdd waves-effect">+</button><br>
                    <b>Цена</b>: ${item.price}.00 р.<br>
                    <b>Всего: </b> ${item.price * item.count}.00 р.<br>
                    <button onclick="deleteFromBucket(${index})" class="buttonDelete waves-effect">Удалить из корзины</button> </div></div>`
        counter += item.count;
        countBasket.classList.add('countBasketActive');
        countBasket.innerText = counter;
    })
    if (bucketHtml === '') {
        bucketHtml = ` <div class="titleProduct center-align">Здесь будут ваши продукты</div>`
    } else {
        bucketHtml += `<div class="all-price center-align"><b>Всего: </b> ${total}.00 р.</div>`
        bucketHtml += `<div class="center-align"><a href="orders.html"><button class="order waves-effect">Оформить заказ</button></a></div>`
    }

    bucketContainer.innerHTML = bucketHtml;
}


function add(productIndex, num) {
    const product = bucketProducts[productIndex];
    product.count = product.count + num;
    if (product.count === 0) {
        countBasket.classList.remove('countBasketActive');
        bucketProducts.splice(productIndex, 1)
    }
    localStorage.setItem(BUCKET_KEY, JSON.stringify(bucketProducts))
    generateBucket();
}

function deleteFromBucket(bucketItemIndex) {
    bucketProducts.splice(bucketItemIndex, 1);
    localStorage.setItem(BUCKET_KEY, JSON.stringify(bucketProducts))
    countBasket.classList.remove('countBasketActive');
    generateBucket();
}

function addProduct(productIndex) {
    const count = parseInt(counterSelect.value) || 1;
    console.log(productIndex);
    const product = products[productIndex];
    const foundProduct = bucketProducts.find(item => item.title === product.title);
    if (foundProduct) {
        foundProduct.count += count;
    } else {
        product.count = count
        bucketProducts.push(product);
    }
    generateBucket();
    localStorage.setItem(BUCKET_KEY, JSON.stringify(bucketProducts))
}

productContainer.innerHTML = html;