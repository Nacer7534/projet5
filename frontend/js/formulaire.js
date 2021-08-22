// import nombreProduit from './produit.js';

const validationPannier = JSON.parse(localStorage.getItem("monPannier"));

validationPannier.forEach((element) => {
  console.log(validationPannier);

  var DivProduit = document.createElement("div");

  DivProduit.innerHTML = ` 
  <div id= "panier" class="panier">
    <img id="img-pan" src="${element.imageProduct}">

    <div id="info-pannier">
     <p id="nom-pannier"> ${element.nameProduct}</p>
     <p id="couleur-pannier">Couleur : ${element.colorProduct}</p>
     <p id="prix-pannier">Prix : ${element.priceProduct / 100} €</p>
     <label for="nombres">Quantité:</label>
     
       <div id="container"> 
        <div class='number' id="number">1</div>
        <button class='btn' id="increment">+</button><button class='btn' id="decrement">-</button>
      </div>
  </div> 
    <p id="suppressionPannier" class = "suppressionPannier">
  <i class="far fa-trash-alt"></i></button>
      `;
  mon_pannier.appendChild(DivProduit);
});

//=========================================================================//


let btnClicsPlus = document.querySelectorAll("#increment");
let btnClicsMoin = document.querySelectorAll("#decrement");
for (let i = 0; i < btnClicsPlus.length; i++) {
  let nombreAfficher = 1;
  btnClicsPlus[i].addEventListener("click", (event) => {
    event.preventDefault();
    console.log(btnClicsPlus);
    nombreAfficher++;

    btnClicsPlus = nombreAfficher * validationPannier[i].priceProduct / 100;
    document.getElementById(
      "prix-pannier"
    ).innerHTML = `Prix : ${btnClicsPlus} €`;
    document.getElementById("number").innerHTML = `${nombreAfficher}`;

    document.getElementById(
      "affichage-prix-total"
    ).innerHTML = ` Total : ${btnClicsPlus} €`;

    console.log("increment : " + nombreAfficher);
    console.log("hada le calcul ntaa le prix : " + btnClicsPlus);
    localStorage.setItem("totalPlus", JSON.stringify(btnClicsPlus));
  });

  btnClicsMoin[i].addEventListener("click", (event) => {
    event.preventDefault();
    console.log(btnClicsMoin);
    nombreAfficher--;

    btnClicsMoin = (nombreAfficher * validationPannier[i].priceProduct) / 100;
    document.getElementById(
      "prix-pannier"
    ).innerHTML = `Prix : ${btnClicsMoin} €`;
    document.getElementById("number").innerHTML = `${nombreAfficher}`;

    document.getElementById(
      "affichage-prix-total"
    ).innerHTML = ` Total : ${btnClicsMoin} €`;
    console.log("décrément : " + nombreAfficher);
    console.log("calcul prix : " + btnClicsMoin);
    localStorage.setItem("totalMoin", JSON.stringify(btnClicsMoin));
  });
};

//==============================================================================//

//*************** envoyer le  Formulaire ************************/
let btnEnvoyerFormulaire = document.getElementById("tableau-formulaire");

btnEnvoyerFormulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  // récupérer les données du formulaire

  const infosUser = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    adresse: document.getElementById("adresse").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  localStorage.setItem("infos-users", JSON.stringify(infosUser));

  recupeMonPannier = JSON.parse(localStorage.getItem("monPannier")) || [];
  //*************création nouveau Tableau avec la methode map qui ne contient que les id de produits*********//
  const products = recupeMonPannier.map((produit) => produit.idProduct);
  console.log(products);

  //*****************************************Fin récuperation des valeurs du formulaire de commande pour les mettre dans le local storage********
  //  Envoie de l'objet qui contient la constante products (les id des produits) et la constante contact(valeurs du formulaire)  vers le serveur
  localStorage.setItem("orderId", JSON.stringify(products));
  fetch(`http://localhost:3000/api/teddies/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products,
        infosUser,
      }),
    })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .then(function (value) {
      recupOrderId = value.orderId;
      console.log(recupOrderId);
      // localStorage.setItem("orderId", JSON.stringify(recupOrderId));
    });

  // chargement de la page confirmation
  document.location.href = "confirmation-formulaire.html";
});

//********* fin de l'ajout produit produit pannier ************************************** */

// **** ajouter le nombre des produits dans pannier avec calcul *******//

/****** on va boucler les produits  dans le panier  afin d'avoir afficher tout les paniers selectionner par les utilisteurs */
let panierVide = document.getElementById("affichage-prix-total");

let suppressionPanier = document.querySelectorAll(".suppressionPannier");
// console.log(suppressionPanier);
for (let i = 0; i < suppressionPanier.length; i++) {
  suppressionPanier[i];
  suppressionPanier[i].addEventListener("click", (event) => {
    event.preventDefault();

    let idASupprimer = validationPannier[i].idProduct;
    // console.log(idASupprimer);
    console.log("idASupprimer");
    validationPannier[i] = validationPannier.filter(
      (el) => el.idProduct !== idASupprimer
    );

    // console.log(validationPannier[i]);
    console.log(validationPannier[i]);

    localStorage.setItem("monPannier", JSON.stringify(validationPannier[i]));

   if(window.confirm("voulez-vous vraiment supprimer ce produit !")){ ; 
    window.location.href = "formulaire.html";
  }
  });
 
}

/******** fin selection de l'id du produit qui va etre supprimé en cliquant sur le bouton *********/

/******** déclaration de la variable pour pouvoir y mettre les prix qui sont dans le panier *********/

let prixTotalCalcul = [];
// ** aller chercher les prix dans le panier **//
for (let p = 0; p < validationPannier.length; p++) {
  let prixProduitsdansLePanier = validationPannier[p].priceProduct;
  //Mettre Le prix du pannier dans la variable 'prixTotalCalcul' //
  prixTotalCalcul.push(prixProduitsdansLePanier);
  console.log(prixTotalCalcul);
}

// Additionner les prix dans le tableau de la variable 'prixToatlCalcul'//
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);
console.log("prix total de la fonction calcul " + prixTotal / 100);

// Afficher le Montant Total dans HTML  //
document.getElementById("affichage-prix-total").innerText = `Total : ${
  prixTotal / 100
}€`;
localStorage.setItem("totalFinal", JSON.stringify(prixTotal / 100));

if (prixTotal === 0) {
  // document.getElementById(
  //   "panier-vide"
  // ).src;
  document.getElementById(
    "affichage-prix-total"
  ).innerHTML = ` Votre Panier est Vides !`;
  panierVide.style.color = "red";
}
// export default validationPannier;