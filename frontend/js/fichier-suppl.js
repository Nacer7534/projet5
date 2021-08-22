//============= PAGE  FORMULAIRE ================================//

// **** ajouter le nombre des produits dans pannier avec calcul *******//

// let calculPanier = 0;
// let nombreAfficher = 1
// clicsPlus = document.getElementById('increment').addEventListener('click' , function(e){
//     e.preventDefault()
//     nombreAfficher ++
//     for(let i = 0; i < validationPannier.length; i ++){

//       calculPanier = nombreAfficher * validationPannier[i].priceProduct /100;

//     }
//     document.getElementById('prix-pannier').innerHTML = `Prix: ${calculPanier} €`;
//     document.getElementById('number').innerHTML = `${nombreAfficher}`;
//     document.getElementById('affichage-prix-total').innerHTML = ` Toto : ${calculPanier} €`;

//      console.log('compteur : ' + nombreAfficher)
//      console.log('prix : '+ calculPanier)

//    })

// let plus = document.querySelectorAll('#increment');
// let moin = document.querySelectorAll('#decrement');

// // nombreAfficher = document.querySelectorAll('#number');

//   for(let i = 0; i < validationPannier.length; i++){
//     let nombreAfficher = 1;
//     for(let p = 0; p < plus.length; p ++){

//     plus[p].addEventListener('click',(event) =>{
//       event.preventDefault()

//       nombreAfficher ++

//        calculPanier = nombreAfficher * validationPannier[i].priceProduct /100;  // clics egale le numéro affiché sur le plus et moin ( il faut le rendre clicable sur toutes les cartes !!!!)
//       //  document.getElementById('prix-pannier').innerHTML = `Prix : ${nombreAfficher} €`;
//        document.getElementById('prix-pannier').innerHTML = `Prix : ${calculPanier} €`;
//        document.getElementById('number').innerHTML = `${nombreAfficher}`;
//        document.getElementById('affichage-prix-total').innerHTML = ` Toto : ${calculPanier} €`;
//        console.log('hada le compteur : ' + nombreAfficher)
//        console.log('hada le calcul ntaa le prix : '+ calculPanier)

//       });
//     }

//   for(let m = 0; m < moin.length; m ++){

//     moin[m].addEventListener('click', (event) =>{
//       event.preventDefault()
//       nombreAfficher --
//     calculPanier = nombreAfficher * validationPannier[i].priceProduct /100;
//     document.getElementById('prix-pannier').innerHTML = `Prix : ${calculPanier} €`;
//     document.getElementById('number').innerHTML = `${nombreAfficher}`;

//     document.getElementById('affichage-prix-total').innerHTML = ` Tota : ${calculPanier} €`;

//     console.log('hada le compteur : ' + nombreAfficher)
//     console.log('hada le calcul ntaa le prix : '+ calculPanier)

//         });
//    }

//   }

// let plus = document.querySelector('#increment');
// let moin = document.querySelector('#decrement');
// let clics = document.getElementById('number');
// clics = document.querySelector('#number');
// let nombreAfficher = 1;

//   plus.addEventListener('click',(event) =>{
//     event.preventDefault()

//      nombreAfficher ++
//      clics.innerHTML = nombreAfficher;  // clics egale le numéro affiché sur le plus et moin ( il faut le rendre clicable sur toutes les cartes !!!!)
//      console.log(nombreAfficher)
//     });

//    moin.addEventListener('click', (event) =>{
//       event.preventDefault()
//         nombreAfficher --
//         clics.innerHTML = nombreAfficher;
//         console.log(nombreAfficher)

//         });




//============= PAGE  product ================================//

const urlId = window.location.search;
// console.log(urlId);

const urlIdParams = new URLSearchParams(urlId);
const id = urlIdParams.get("id");
console.log(id);

fetch(`http://localhost:3000/api/teddies/${id}`)
  .then((response) => response.json())
  // if(response.ok === true){
  //   return response.json()
  // }else {
  //   return Promise.reject('données introuvable!!')
  // }
  .then((poductCarte) => {
    
    console.log(poductCarte);

    document.getElementById("img-product").src = poductCarte.imageUrl;
    document.getElementById("nom-product").innerText = poductCarte.name;
    document.getElementById("prix-product").innerText = poductCarte.price /100 + "€";
    document.getElementById("description-product").innerHTML = poductCarte.description;
     

    let choixCouleur = document.querySelector("select");
    for (let color of poductCarte.colors) {
      choixCouleur.innerHTML += `<option value=${color}>${color}</option>`;
    }

   
    //*****************récupération produit dans le pannier *************** */

   
     document.getElementById('envoyerPannier').onclick = () => {
     

      
      // monPannier = {
      //   idProduit :  id,
      //   nomProduit : document.getElementById("nom-product").innerText = poductCarte.name,
      //   couleurProduit:  poductCarte.colors,
      //   prixProduit : document.getElementById("prix-product").innerText = poductCarte.price,
      //   quantite : 1
        
        
      // };
     
      // console.log(monPannier);
     

     //************parametre couleurs*********************//
     const selectCouleur = document.getElementById('color');
     const choisirCouleur = selectCouleur.value;
    

     //************nombre produit**************************//
     let nombreProduit = []

     nombreProduit.push(product => {
     for (let i = 0; i < product.nombreProduit; i++) {
       nombreProduit.push(product.id) 
       }
     })
    
     const pannierActuel = JSON.parse(localStorage.getItem("monPannier")) || [];
     
    //  console.log(JSON);
     let newPannier = pannierActuel.find(
       (element) => element.id === id);
      
     if(newPannier){
      newPannier.quantity ++;
     }else {
      pannierActuel.push({
        id :  id,
        imageProduct: poductCarte.imageUrl,
        nameProduct : poductCarte.name,
        colorProduct : choisirCouleur,
        priceProduct : poductCarte.price,
        quantity : 1
       });
       
     }

    // ******* on va boucler les panniers afin d'avoir afficher tout les panniers selectionner par les utilisteurs ******* //
    
  // for(let i = 0; i < pannierActuel.length; i++ ){
  //   pannierActuel 
   
  //     // console.log(pannierActuel[i])
    
  // }
     
     localStorage.setItem('monPannier', JSON.stringify(pannierActuel));
     
     console.log(pannierActuel);
     
      
      
    
      

     


 
  }
   

    //****************Local Storage*************************************** */
    //*****************récupération produit dans le pannier *************** */
});


