const urlId = window.location.search;
// console.log(urlId);

const urlIdParams = new URLSearchParams(urlId);
const productId = urlIdParams.get("id");
// console.log(productId);

fetch(`http://localhost:3000/api/teddies/${productId}`)
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
    document.getElementById("prix-product").innerText = poductCarte.price / 100 + "€";
    document.getElementById("description-product").innerHTML = poductCarte.description;


    let choixCouleur = document.querySelector("select");
    for (let color of poductCarte.colors) {
      choixCouleur.innerHTML += `<option value=${color}>${color}</option>`;
    }


    //*****************récupération produit dans le pannier *************** */


    document.getElementById('envoyerPannier').onclick = () => {

      // monPannier = {
      //   idProduit :  productId,
      //   nomProduit : document.getElementById("nom-product").innerText = poductCarte.name,
      //   couleurProduit:  poductCarte.colors,
      //   prixProduit : document.getElementById("prix-product").innerText = poductCarte.price,
      // };

      // console.log(monPannier);


      //************parametre couleurs*********************//
      const selectCouleur = document.getElementById('color');
      const choisirCouleur = selectCouleur.value;


      //************nombre produit**************************//
      //  let nombreProduit = []

      //  nombreProduit.push(product => {
      //  for (let i = 0; i < product.nombreProduit; i++) {
      //    nombreProduit.push(product.id) 
      //    }
      //  })

      const pannierActuel = JSON.parse(localStorage.getItem("monPannier")) || [];
      //  console.log(JSON);
      let newPannier = pannierActuel.find(
        (element) => element.idProduct === productId);

      if (newPannier) {
        newPannier.quantity++;
      } else {
        pannierActuel.push({
          idProduct: productId,
          imageProduct: poductCarte.imageUrl,
          nameProduct: poductCarte.name,
          colorProduct: choisirCouleur,
          priceProduct: poductCarte.price,

        });

      }

      
      localStorage.setItem('monPannier', JSON.stringify(pannierActuel));
      console.log(pannierActuel);
      alert("Panier ajouté avec Succés !")

    }

  });

  //****************Local Storage*************************************** */
      //*****************récupération produit dans le pannier *************** */