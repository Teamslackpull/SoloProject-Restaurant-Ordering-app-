import {MenuArray} from "./Data.js"

// listening for clicks on the document

document.addEventListener("click", E => {

   if(E.target.id ==='PizzaID'|| E.target.id === 'HamburgerID'|| E.target.id === 'MilkshakeID'){
       FindFoodArray(E.target.id)
       ShowOrderContainer()
   }
   if(E.target.id === 'PlaceOrder'){
       ShowFormModal()
   }
   if(E.target.classList.contains("Remove")){
       SubtractPriceFromTotal(E.target.dataset.remove)
       E.target.closest(".Orders").remove()
   }


})

// building a Thank-you message for when the order is shipped
document.getElementById('PaymentForm').addEventListener("submit", e => {
    const NameInput = document.getElementById('PaymentName')
    const Customer = NameInput.value
    e.preventDefault()
    document.getElementById('Container').innerHTML = `
    <div class="OrderPlaced">
    <h1>Thank you for your order ${Customer}</h1>
     </div>
    `
    HideFormModal()
    HideOrderContainer()
})

// short Functions for showing and closing the modals

function ShowOrderContainer(){
    document.getElementById("OrderContainer").style.display = "block"
}
function HideOrderContainer(){
    document.getElementById("OrderContainer").style.display = "none"
}
function ShowFormModal(){
    document.getElementById("FormModal").style.display = "block"
}
function HideFormModal(){
    document.getElementById("FormModal").style.display = "none"
}


// Calculating the Total Price
let TotalPrice = 0

const CalculateTotalPrice = (Item, Discount = 0) => {

    const TotalAmount = document.getElementById("TotalPriceCount")
    TotalPrice += Item
    TotalAmount.textContent = `$${TotalPrice}`

    if(TotalPrice > 20){
        TotalAmount.textContent = `Discount $${Discount} $${TotalPrice - Discount}`
    }

}


const subtract = (item , Discount = 0 ) => {
    const TotalAmount = document.getElementById("TotalPriceCount")
    TotalPrice -= item

    if (TotalPrice <= 0) {
        HideOrderContainer()
    }
    if(TotalPrice > 20 ){
        TotalAmount.textContent = `Discount -$${Discount} $${TotalPrice - Discount}`

    } else if( TotalPrice < 20) {
        TotalAmount.textContent = `$${TotalPrice}`
    }
}


const SubtractPriceFromTotal = DishID2 => {
    const FindPriceInArray = MenuArray.find(Item => Item.id === DishID2)
    subtract(FindPriceInArray.price,5)
}

const FindFoodArray = DishID => {

    const FindArray = MenuArray.filter(Food => Food.id === DishID)

    FindArray.forEach( Dish => {
        const {name,price,id} = Dish
        const PlacedOrders = document.getElementById("PlacedOrders")
        const div = document.createElement("div")
        div.classList = 'Orders Container'
        div.id = 'Orders'
        const DivContent = `
            <div id="Order" class="order">
              <h2 class="DivMenuItems">${name}</h2>
              <h2 class="Remove" data-Remove="${id}">Remove</h2>
             
              <h2 class="MenuItemPrice">$${price}</h2>
              </div>      
            `
        div.innerHTML = DivContent
        PlacedOrders.append(div)
        CalculateTotalPrice(price,5)
    })
}


function RenderMenuCard() {
    return MenuArray.map(Item => {
        const {image, name, ingredients, Calories, price, id} = Item
        return `<section class="Menu">  
                    <div id="MenuInner" class="MenuInner">
                      <img class="menuImg" src="${image}">
                     <div class="FoodItems">
                        <h2 class="MenuName">${name}</h2>
                        <p class="MenuIngredients">${ingredients}</p> 
                         
                        <div class="DishAdd-Price"> 
                            <div class="DishPrice">
                                <p class="MenuPrice">$${price}</p>
                            </div>
                               <div class="IconContainer">
                                <i class="fa-solid fa-plus" id="${id}"></i>
                            </div>                                       
                         </div>    
                                            
                        <p class="DishCals"> kcal ${Calories}</p>   
                                                             
                    </div>  
                                                  
            </section>`

    }).join('')
}

document.getElementById('Container').innerHTML = RenderMenuCard()




