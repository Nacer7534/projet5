const carte = document.getElementById('carte');
fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())

  .then(function getArticles(article) {
    console.log(article);
  
    article.forEach((data) => {
   
      let div = document.createElement('div');
      div.innerHTML=
      `
      <div id="carte-js">
           <a href="produit.html?id=${data._id}">
            <div class="image-carte">
                <img id="image-carte" src="${data.imageUrl}">
              </a>
            </div>
            <div class="information">
                <p id="nom"> ${data.name}</p>
                <p id="prix"> ${data.price /100} €</p>
                
            </div>
            
        </div>
      `
      carte.appendChild(div);
    });
  
  });

 
 
 
