
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDu_UWSfMLfSMO17f3zD_pFF6STW4ZIBPk",
    authDomain: "mira-dz.firebaseapp.com",
    projectId: "mira-dz",
    storageBucket: "mira-dz.appspot.com",
    messagingSenderId: "47453902449",
    appId: "1:47453902449:web:f1f296c3700ace1ba86dd0",
    measurementId: "G-DQTBCNNNHJ"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


// Fonction pour récupérer les détails du produit à partir de l'ID du produit
async function getDetailsProduit(productId, storeName, collect_p) {
    const docRef = doc(db, 'items', storeName, 'produits', collect_p, 'produits', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("Aucun document trouvé avec cet ID de produit.");
        return null;
    }
}


// Fonction pour afficher les détails du produit
async function afficherDetailsProduit(productId, storeName, collect_p) {
    const images_bgr = document.getElementById('images_bgr');

    images_bgr.innerHTML = ''; // Effacer les anciens détails du produit

    const detailsProduit = await getDetailsProduit(productId, storeName, collect_p);

    if (detailsProduit) {
        const titre=detailsProduit.Titre;
        const soustitre=detailsProduit.Sous_titre;
        const price=detailsProduit.prix;
        const quantiteproduit=detailsProduit.quantiteproduit;
        const n_colors=detailsProduit.n_colors;
        const colors=detailsProduit.colors;
        const n_eval_etoile=detailsProduit.n_eval_etoile;
        const n_totale_etoile=detailsProduit.n_totale_etoile;
        const promotion=detailsProduit.promotion;

        const image1=detailsProduit.imageUrl_produit_1;
        const image2=detailsProduit.imageUrl_produit_2;
        const image3=detailsProduit.imageUrl_produit_3;
        const image4=detailsProduit.imageUrl_produit_4;
        const discreption =detailsProduit.Description;
        const id1 = detailsProduit.idproduitSimilaire1;
        const id2 = detailsProduit.idproduitSimilaire2;
        const id3 = detailsProduit.idproduitSimilaire3;

        const images = [image1, image2, image3, image4];



        
        const image_prinsipale = document.createElement('div');
        image_prinsipale.className="image_prinsipale";

        const image_prinsipale_img  = document.createElement('img');
        image_prinsipale_img.src=image1;

        image_prinsipale.appendChild(image_prinsipale_img);

        const image_collections = document.createElement('div');
        image_collections.className="image_collections";

        
        
        for (let i = 0; i < images.length; i++) {
            const imgPrdt = document.createElement('div');
            imgPrdt.className = "imgPrdt";
            const imgPrdt_img = document.createElement('img');
            imgPrdt_img.src = images[i]; // Utilisation de l'indice i pour accéder à chaque image dans le tableau
        
            imgPrdt.appendChild(imgPrdt_img);
            image_collections.appendChild(imgPrdt);
        
            imgPrdt.addEventListener('click', () => {
                image_prinsipale_img.src = images[i]; // Utilisation de l'indice i pour accéder à chaque image dans le tableau
            });
        }
        
        images_bgr.appendChild(image_prinsipale);
        images_bgr.appendChild(image_collections);



       // Titre: Titre,
       // Sous_titre: Soustitre,
       // Description: Description,
       // prix: prix,
       // promotion: promotion,
       // quantiteproduit: quantiteproduit,
       // colors_number: n_colors,
       // colors: colors_in_stock,
       // etoile: 0,
       // n_eval_etoile: 0,
       // idproduit_Similaire1: idproduitSimilaire1,
       // idproduit_Similaire2: idproduitSimilaire2,
       // idproduit_Similaire3: idproduitSimilaire3,
       // imageUrl_produit_1: downloadURL1,
       // imageUrl_produit_2: downloadURL2,
       // imageUrl_produit_3: downloadURL3,
       // imageUrl_produit_4: downloadURL4,
       // timestamp: serverTimestamp()
       const produitDetailles_bg = document.getElementById('produitDetailles_bg');
       const title_all = document.createElement('div');
       title_all.className="title_all";
       const title_allh1 = document.createElement('h1'); 
       title_allh1.innerHTML= titre +': <span>'+soustitre+'</span>';

       title_all.appendChild(title_allh1);
       produitDetailles_bg.appendChild(title_all);

       const stars_ = document.createElement('div');
       stars_.className = "stars_";

       let rating = 0
       if(n_eval_etoile>0){
          rating = n_totale_etoile / n_eval_etoile;
       }
       const etoileComplet = Math.floor(rating);
       const etoileVide = 5 - etoileComplet;
       const halfEtoile = rating - etoileComplet;

       console.log('etoileComplet '+etoileComplet+' etoileVide '+etoileVide+' halfEtoile '+halfEtoile);
       
       for (let i = 0; i < etoileComplet; i++) {
           const stars_complet = document.createElement('i');
           stars_complet.className = "bx bxs-star";
           stars_.appendChild(stars_complet);
       }
       
       if (halfEtoile >= 0.3) {
           const stars_demie = document.createElement('i');
           stars_demie.className = "bx bxs-star-half";
           stars_.appendChild(stars_demie);
       }
       
       for (let i = 0; i < etoileVide; i++) {
           const stars_vide = document.createElement('i');
           stars_vide.className = "bx bx-star";
           stars_.appendChild(stars_vide);
       }
       
       const stars_p = document.createElement('p');
       stars_p.innerHTML = '(' + n_eval_etoile + ')';
       stars_.appendChild(stars_p);
       
       produitDetailles_bg.appendChild(stars_);

       const titre_of_page1 = document.createElement('h1');
       titre_of_page1.className="titre_of_page";
       titre_of_page1.innerHTML="Prix : ";
       produitDetailles_bg.appendChild(titre_of_page1);


        const prix_prixpromo = document.createElement('div');
        prix_prixpromo.className="prix_prixpromo";

        const priceOriginale = price;
        const pricePromo = parseFloat((priceOriginale * (promotion / 100)).toFixed(2));


        if(promotion>0){
            const prixstyel = document.createElement('p');
            prixstyel.className="prixstyel";
            prixstyel.innerHTML= pricePromo +"DA";
            prix_prixpromo.appendChild(prixstyel);
     
            const prixstyel_promo = document.createElement('p');
            prixstyel_promo.className="prixstyel_promo";
            prixstyel_promo.innerHTML= priceOriginale+"DA";
            prix_prixpromo.appendChild(prixstyel_promo);
        }
        if(promotion===0){
            const prixstyel = document.createElement('p');
            prixstyel.className="prixstyel";
            prixstyel.innerHTML= priceOriginale+"DA";
            prix_prixpromo.appendChild(prixstyel);
        }

        
        produitDetailles_bg.appendChild(prix_prixpromo);

        const titre_of_page2 = document.createElement('h1');
        titre_of_page2.className="titre_of_page";
        titre_of_page2.innerHTML="Couleurs disponible :";
        produitDetailles_bg.appendChild(titre_of_page2);


        const coulers_disponible_in_stoc_bg = document.createElement('div');
        coulers_disponible_in_stoc_bg.className = "coulers_disponible_in_stoc_bg";
        
        const N__color = colors.length;
        for (let i = 0; i < N__color; i++) {
            const color_d_i_s = document.createElement('div');
            color_d_i_s.className = "color_d_i_s";
            color_d_i_s.style.backgroundColor = colors[i];
            color_d_i_s.style.marginRight = "10px";

            coulers_disponible_in_stoc_bg.appendChild(color_d_i_s);
        }
        
        produitDetailles_bg.appendChild(coulers_disponible_in_stoc_bg);

        

        const titre_of_page3 = document.createElement('h1');
        titre_of_page3.className="titre_of_page";
        titre_of_page3.innerHTML="Discreption : ";
        produitDetailles_bg.appendChild(titre_of_page3);

        const dicreptionstyel = document.createElement('p');
        dicreptionstyel.className="dicreptionstyel";
        dicreptionstyel.innerHTML= discreption;
        produitDetailles_bg.appendChild(dicreptionstyel);


        const showMor_ = document.createElement('div');
        showMor_.style.display="none";
        showMor_.style.cursor="pointer";
        showMor_.style.color="rgb(11, 0, 47)";
        showMor_.innerHTML="Voir moins";
        showMor_.id="showMor";
        produitDetailles_bg.appendChild(showMor_);

        const showLe_ = document.createElement('div');
        showLe_.style.color="rgb(11, 0, 47)";
        showLe_.style.cursor="pointer";
        showLe_.innerHTML="Voir plus";
        showLe_.id="showLe";
        produitDetailles_bg.appendChild(showLe_);
        


        showMor_.addEventListener('click', () => {
            showMore();
        }); 
        showLe_.addEventListener('click', () => {
            showLess();
        }); 
        



        function showMore() {
            const pElement = document.querySelector('.dicreptionstyel');
            const text = pElement.textContent;

            if (text.length > 70) {
                const shortenedText = text.substring(0, 70);
                const remainingText = text.substring(70);

                pElement.innerHTML = shortenedText + '<span id="remainingText" style="display: none;">' + remainingText + '</span>';

                showMor_.style.display = "none";
                showLe_.style.display = "flex";

            }
        }

        function showLess() {
            const pElement = document.querySelector('.dicreptionstyel');
            const remainingText = document.getElementById('remainingText').textContent;

            pElement.innerHTML = remainingText;

 
            showMor_.style.display = "flex";
            showLe_.style.display = "none";
        }
        showMore();

 } else {
        // Gérer le cas où aucun détail de produit n'est trouvé
        const errorDiv = document.createElement('div');
        errorDiv.textContent = "Détails du produit introuvables.";
        productDetailsDiv.appendChild(errorDiv);
    }
}

// Récupérer l'ID du produit et le nom du magasin à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const storeName = urlParams.get('store');
const collect_p = urlParams.get('collection_pr');


// Appeler la fonction pour afficher les détails du produit lors du chargement de la page
window.onload = () => {
    if (productId && storeName) {
        afficherDetailsProduit(productId, storeName , collect_p);
    } else {
        console.error("Aucun ID de produit ou nom de magasin n'a été fourni dans l'URL.");
    }
};





