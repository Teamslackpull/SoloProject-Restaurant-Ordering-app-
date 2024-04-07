

Ik heb een restaurant Ordering App gemaakt voor het eind project Javascript we sloten de allerlaatse module af met een solo Project.

we kregen basic requirements die ik allemaal gehaald heb en nog wat stretch Goals.

ik ben begonnen aan de stretch goal doormiddel van een Discount offering toe te voegen wanneer de prijs boven een bepaald aantal komt.


Echter heb ik een probleem wanneer ik 2 items toe voeg dus bijvoorbeeld 2 hamburgers toevoeg die beiden 12$ zijn is mijn totaal 12 + 12 -5 = 19  Maar zodra ik 3 of meer hamburger toevoeg en ik er 2 verwijder blijf ik met een totaal van 17 terwijl
ik 1 hamburger van 12 in mn mandje heb.

wat hieronder is staat is alle code die met de functie aftrekken en de discount te maken heeft zie volledige code in de js file 

hier lusiteren we voor clicks en we kijken of E.target.classList de desbetreffende class bevat als dat zo is runnen we de code er onder

: E.target.classList.contains("Remove") ?
               (SubtractPriceFromTotal(E.target.dataset.remove),E.target.closest(".Orders").remove()) : null


 let TotalPrice = 0 
 let HasDiscount = false

dan maken we een function die 2 parameters in neemt Item en een default parameter die nog niet gebruikt wordt
dan halen we het id van Totalprice op uit de DOM
 We voegen TotalPrice tellen totalprice dit is nog null
 hier kijken we of de Gebruiker in aamerking komt voor een discount hier gebruiken we een if statement voor en een logical NOT operator die steeds switched 

const CalculateTotalPrice = (Item, Discount = 0) => {
  
    const TotalAmount = document.getElementById("TotalPriceCount")
    TotalPrice += Item
    TotalAmount.textContent = `$${TotalPrice}`
     
     if (HasDiscount && TotalPrice > 20) {
         TotalPrice -= Discount
         TotalAmount.textContent  = `Discount -$${Discount} $${TotalPrice}`
    
    
     }
     HasDiscount = !HasDiscount
}

hier maken we de subtract function 

const subtract = (item , Discount = 0 )=> {
    const TotalAmount = document.getElementById("TotalPriceCount")
    TotalPrice -= item

    if (TotalPrice <= 0) {
        HideOrderContainer();
    }
    TotalAmount.textContent = `$${TotalPrice}`
         else if (TotalPrice  < 20) {
             TotalPrice -= Discount;
             TotalAmount.textContent = `$${TotalPrice}`;
         }

}

Hier neemt de functie een parameter DishID2 die neemt de data van het argument van E.target.dataset.remove in

const SubtractPriceFromTotal = DishID2 => {
    const FindPriceInArray = MenuArray.find(Item => Item.id === DishID2)
    
   subtract(FindPriceInArray.price, 5)
}

 Het gebruik van Find array method om het desbetreffende element die overeenkomt in de MenuArray
 dan krijgt subtract de prijs van het desbetreffende geklikte product die wordt gegeven aan item

IK hoop dat dit je een goed begrip geeft van het probleem ( de discount wordt niet goed toegevoegd en verwijderd wanneer het totaal bedrag onder de 20 komt )
