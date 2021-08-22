let prenomRecup = JSON.parse(localStorage.getItem("infos-users")) || [];

let idRecupe = JSON.parse(localStorage.getItem("orderId")) || [];

// let totalPrice = JSON.parse(localStorage.getItem("totalFinal")) || [];
 let totalPlus = JSON.parse(localStorage.getItem('totalPlus'))|| [];
 let totalMoin = JSON.parse(localStorage.getItem('totalMoin'))|| [];
// mettre ses infos dans HTML de la page confirmation

document.getElementById("prenom").innerHTML = `Chère : ${prenomRecup.firstName} !`;
document.getElementById("confirmation-form").innerHTML =`Transaction N° : ${idRecupe}`;
document.getElementById('prix-total').innerText = `total TTC : ${totalPlus}€`
document.getElementById('prix-total').innerText = `Total TTC : ${totalMoin}€`
// console.log(idRecupe)
// document.getElementById("prix-total").innerHTML = `Total TTC : ${totalPrice}€`;
// console.log(totalPrice)
//  localStorage.clear();


