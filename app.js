const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-centent");
const overlay = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart");
const itemTotals = document.querySelector(".item-total");



let cart = [];

let buttonDOM = [];
const products =  [
  {
      "id": 1,
      "title": "The Original Product 1",
      "price": 135,
      "image": "https://logoaz.net/wp-content/uploads/2019/02/quy-tac-chup-anh-san-pham-phong-nen.jpg"
  },
  {
      "id": 2,
      "title": "The Original Product 2",
      "price": 950,
      "image": "https://chupanh.vn/wp-content/uploads/2017/03/kham-pha-cach-tao-hinh-khoi-khi-chup-anh-san-pham-noi-bat3.jpg"
  },
  {
      "id": 3,
      "title": "The Original Product 3",
      "price": 750,
      "image": "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1556110970613-3PYCAIDBTS1NFTZLJHNN/commercial_product_photography_Madison_WI_by_Paulius_Musteikis_Photography-1146.jpg?format=1000w"
  },
  {
      "id": 4,
      "title": "The Original Product 4",
      "price": 999,
      "image": "https://photographer.vn/wp-content/uploads/2020/09/IMG_0124-scaled.jpg"
  },
  {
      "id": 5,
      "title": "The Original Product 5",
      "price": 999,
      "image": "https://photographer.vn/wp-content/uploads/2020/09/IMG_0124-scaled.jpg"
  },
  {
      "id": 6,
      "title": "The Original Product 6",
      "price": 850,
       "image": "https://www.chuphinhsanpham.vn/wp-content/uploads/2019/01/concept-chup-anh-my-pham_2019.jpg"
  },
  {
      "id": 7,
      "title": "The Original Product 7",
      "price": 750,
      "image": "https://xuconcept.com/wp-content/uploads/2018/07/chup-quang-cao.jpg"
  },
  {
      "id": 8,
      "title": "The Original Product 8",
      "price": 650,
        "image": "https://photographer.vn/wp-content/uploads/2020/09/IMG_0124-scaled.jpg"
  },
  {
      "id": 9,
      "title": "The Original Product 9",
      "price": 550,
       "image": "https://photographer.vn/wp-content/uploads/2020/09/IMG_0124-scaled.jpg"

  },
  {
      "id": 10,
      "title": "The Original Product 10",
      "price": 450,
      "image": "https://photographer.vn/wp-content/uploads/2020/09/IMG_0124-scaled.jpg"

  },
]

function takeProduct() {
    let productDOM = document.querySelector(".product-center");
    let result =""
    products.forEach((product) => 
    {
      result += 
      `<!-- Single Product -->
      <div class="product">
        <div class="image-container">
          <img src=${product.image} alt="" />
          <div>
            <span>
              <i class="fas fa-plus-circle" ></i>
            </span>
          </div>  
        </div>
        <div class="product-footer">
          <h1>${product.title}</h1>
          <div class="rating">
            <span>
              <i class="fas fa-star"></i>
            </span>
            <span>
              <i class="fas fa-star"></i>
            </span>
            <span>
              <i class="fas fa-star"></i>
            </span>
            <span>
              <i class="fas fa-star"></i>
            </span>
            <span>
              <i class="fas fa-star-half-alt"></i>
            </span>
          </div>
           <div class="price">$${product.price}</div>
          <div class="bottom">
            <div class="btn-group">
              <button class="btn addToCart" data-id= ${product.id} >Add to Cart</button>
              <button class="btn view">View</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Single Product -->`;
    });
    productDOM.innerHTML = result
    console.log("san pham: ", productDOM)
}

let Storage ={
  saveProduct: function(products){
     localStorage.setItem("products", JSON.stringify(products));
  },
  getProduct: function(id){
    let products = JSON.parse(localStorage.getItem("products"));
    // console.log("hết: ", products)
    // console.log("sản phẩm lấy được : ", products.find(product =>  product.id == parseInt(id)))
    return products.find(product =>  product.id == parseInt(id));
  },
  saveCart: function(cart){
      localStorage.setItem("cart", JSON.stringify(cart));
  },
  getCart: function(){
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  }

}

$(document).ready(function(){
  takeProduct();
  Storage.saveProduct(products);
  setUp();
  getButtons();
  cartLogic();
})


  function getButtons() {
    const buttons = [...document.querySelectorAll(".addToCart")];
    buttonDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id == parseInt(id));
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
        button.classList.add("state")
        let parent =  button.parentNode.parentNode.parentNode.parentNode
         parent.querySelector(".image-container div").style.display = "block"
        // button.style.background = "#c59730"
        // button.style.border = "none"
      }
      button.addEventListener("click", e => {
        e.preventDefault();
        imageFly(e.target)
        e.target.innerHTML = "In Cart";
        e.target.disabled = true;
        e.target.classList.value = "btn state"
        // button.style.background = "#c59730"
        // button.style.border = "none"
        const cartItem = { ...Storage.getProduct(id), amount: 1 };

        cart = [...cart, cartItem];

        Storage.saveCart(cart);

        setItemValues(cart);

        addCartItem(cartItem);

        
      });
    });
  }

  function setItemValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;

    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount;
    });

    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));

    itemTotals.innerText = itemTotal;

  }

  function addCartItem(cartItem) {
    let div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `<img src=${cartItem.image}>
          <div>
            <h3>${cartItem.title}</h3>
            <h3 class="price">$${cartItem.price}</h3>
          </div>
          <div>
            <span class="increase" data-id=${cartItem.id}>
               <i class="fas fa-angle-up"></i>
            </span>
            <p class="item-amount">${cartItem.amount}</p>
            <span class="decrease" data-id=${cartItem.id}>
              <i class="fas fa-angle-down"></i>
            </span>
          </div>

            <span class="remove-item" data-id=${cartItem.id}>
               <i class="fas fa-trash"></i>
            </span>

        </div>`;
    cartContent.appendChild(div);
  }

  function imageFly(e){
    let parent = e.parentNode.parentNode.parentNode.parentNode
    parent.querySelector(".image-container div").style.display = "block"
    let img = document.createElement("img");
    let cartIcon = document.querySelector(".cart-icon");
    img.src = parent.querySelector(".image-container img").src
    img.classList.add("img-product-fly")
    img.style.top = String(e.offsetTop - 40) + "px"
    img.style.left = String(e.offsetLeft + 30) + "px"
    document.querySelector("body").appendChild(img)

    setTimeout(
      function(){
        img.style.top = String(cartIcon.offsetTop + window.pageYOffset) + "px";
        img.style.left = String(cartIcon.offsetLeft) + "px";
        setTimeout(function(){
          document.querySelector(".img-product-fly").remove()
        }, 1000)
      }, 500)

  }

  function show() {
    if(cart.length != 0){
      cartDOM.classList.add("show");
      overlay.classList.add("show");
    }
   else
   {
     document.querySelector(".message").style.display = "flex"
    setTimeout(function(){document.querySelector(".message").style.display = "none"}, 2000)
   }

  }

  function hide() {
    cartDOM.classList.remove("show");
    overlay.classList.remove("show");
  }

  function setUp() {
    cart = Storage.getCart();
    setItemValues(cart);
    populate(cart);
  }

  function populate(cart) {
    cart.forEach(item => addCartItem(item));
  }


  function cartLogic(){
// tính toán trong cart
 cartContent.addEventListener("click", e => {
      const target = e.target.closest("span");
      const targetElement = target.classList.contains("remove-item");
    
      if (!target) return;

      if (targetElement) {
        const id = parseInt(target.dataset.id);
        removeItem(id);
        cartContent.removeChild(target.parentElement);
      }
      else{
           if (target.classList.contains("increase")) {
            const id = parseInt(target.dataset.id);
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount++;
            setItemValues(cart);
            Storage.saveCart(cart);
            target.nextElementSibling.innerText = tempItem.amount;
          }
          else{
            if (target.classList.contains("decrease")) {
              const id = parseInt(target.dataset.id);
              let tempItem = cart.find(item => item.id === id);
              tempItem.amount--;
              console.log("tổng trừ: ", tempItem.amount)
              if (tempItem.amount > 0) {
                  Storage.saveCart(cart);
                  setItemValues(cart);
                  target.previousElementSibling.innerText = tempItem.amount;
              } 
              else {
                removeItem(id);
                cartContent.removeChild(target.parentElement.parentElement);
              } 
          }
        }
      } 
      if(cart.length == 0)
        hide()
    });
  }

  function clearCart() {
    const cartItems = cart.map(item => item.id);
    cartItems.forEach(id => removeItem(id));

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    hide();
  }

  function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    setItemValues(cart);
    Storage.saveCart(cart);

    let button = singleButton(id);
    button.disabled = false;
    button.innerText = "Add to Cart";
     button.classList.remove("state")
  }

  function singleButton(id) {
    return buttonDOM.find(button => parseInt(button.dataset.id) === id);
  }



