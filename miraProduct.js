
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
        const id1 = detailsProduit.idproduit_Similaire1;
        const id2 = detailsProduit.idproduit_Similaire2;
        const id3 = detailsProduit.idproduit_Similaire3;

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
        const pricePromoMoins = parseFloat((priceOriginale * (promotion / 100)).toFixed(2));
        const pricePromo = parseFloat((priceOriginale - pricePromoMoins).toFixed(2));
        const acheter_btn1 = document.getElementById('acheter_btn1');
        if(promotion>0){
            const prixstyel = document.createElement('p');
            prixstyel.className="prixstyel";
            prixstyel.innerHTML= pricePromo +"DA";
            prix_prixpromo.appendChild(prixstyel);
     
            const prixstyel_promo = document.createElement('p');
            prixstyel_promo.className="prixstyel_promo";
            prixstyel_promo.innerHTML= priceOriginale+"DA";
            prix_prixpromo.appendChild(prixstyel_promo);
            acheter_btn1.innerHTML=pricePromo+ " DA";
        }
        if(promotion===0){
            const prixstyel = document.createElement('p');
            prixstyel.className="prixstyel";
            prixstyel.innerHTML= priceOriginale+"DA";
            prix_prixpromo.appendChild(prixstyel);
            acheter_btn1.innerHTML=priceOriginale+ " DA";

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

        const titre_of_page4 = document.createElement('h1');
        titre_of_page4.className="titre_of_page";
        titre_of_page4.innerHTML="La disponibilité : ";
        produitDetailles_bg.appendChild(titre_of_page4);

        const disponibilite_ = document.createElement('p');
        disponibilite_.className = "dicreptionstyel";

        
        if (quantiteproduit === 0) {
            disponibilite_.innerHTML = "Non disponible";
            disponibilite_.style.color = "red";

            acheter_btn1.style.color=" rgba(115, 115, 114, 0.709)";  
            acheter_btn1.style.border="1px solid  rgba(115, 115, 114, 0.709)";
            acheter_btn1.disabled = false;

        } else if (quantiteproduit < 10 && quantiteproduit > 0) {
            disponibilite_.innerHTML = "Limité : " + quantiteproduit;
            disponibilite_.style.color = "red";
        } else {
            disponibilite_.innerHTML = "Disponible";
            disponibilite_.style.color = "green";
        }
        
        produitDetailles_bg.appendChild(disponibilite_);

        const titre_of_page5 = document.createElement('h1');
        titre_of_page5.className="titre_of_page";
        titre_of_page5.innerHTML="Produit similaire : ";
        produitDetailles_bg.appendChild(titre_of_page5);


        const prdct_simlr = [id1,id2,id3];

        for(let p=0 ; p<3;p++){
            const docRef = doc(db, 'items', storeName, 'produits', collect_p, 'produits', prdct_simlr[p]);
            const collection_produit = collect_p;

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                
                const data = docSnap.data(); // Correction ici
                     
                // Récupération des données
                const image_produit = data.imageUrl_produit_1;
                const time_produit = data.timestamp; // Conversion en objet Date

                const titre_de_produit = data.Titre;
                const prix_de_produit = data.prix;
                const promotion_produit = data.promotion;
                const colors_produit = data.colors;
                const n_colors_produit = data.colors_number;
                const quantiteproduit = data.quantiteproduit;


                const items_dispo = document.querySelector(".items_dispo");
                const bg_item = document.createElement("div");
                bg_item.className = 'bg_item';
            
                const bg_item_img = document.createElement("div");
                bg_item_img.className = "bg_item_img";
                const img_produi = document.createElement("img");
                img_produi.src = image_produit;

                const time_produit_mj = new Date(time_produit.seconds * 1000);
                const dateNow = new Date();

                const differenceInMillis = Math.abs(time_produit_mj - dateNow); // Différence en millisecondes
                const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24); // Conversion en jours
                  


                if (differenceInDays < 4) { 
                    const new_produit = document.createElement("div");
                    new_produit.className = "new_produit";
                    const p_new_produit = document.createElement("p");
                    p_new_produit.innerText = "Nouveau";
                    new_produit.appendChild(p_new_produit);
                    bg_item_img.appendChild(new_produit);
                }
                if (quantiteproduit > 0 && quantiteproduit < 10) { 
                    const limited_edition = document.createElement("div");
                    limited_edition.className = "limited_edition";
                    const p_limited_edition = document.createElement("p");
                    p_limited_edition.innerText = "Édition limitée : " + quantiteproduit;
                    limited_edition.appendChild(p_limited_edition);
                    bg_item_img.appendChild(limited_edition);

                } else if (quantiteproduit === 0) { 
                    const limited_edition = document.createElement("div");
                    limited_edition.className = "limited_edition";
                    const p_limited_edition = document.createElement("p");
                    p_limited_edition.innerText = "non disponible";
                    limited_edition.appendChild(p_limited_edition);
                    bg_item_img.appendChild(limited_edition);
                }
                


                
            
                bg_item_img.appendChild(img_produi);
                bg_item.appendChild(bg_item_img);

                const colleection_name = document.createElement("div");
                colleection_name.className = "colleection_name";
                const p_colleection_name = document.createElement("p");
                p_colleection_name.innerText = collection_produit ;
                colleection_name.appendChild(p_colleection_name);
                bg_item_img.appendChild(colleection_name);
            
                // Titre du produit
                const bg_item_titre = document.createElement("div");
                bg_item_titre.className = "bg_item_titre";
                const p_bg_item_titre = document.createElement("p");
                p_bg_item_titre.innerHTML = titre_de_produit;
                p_bg_item_titre.className="p_bg_item_titre";
                bg_item_titre.appendChild(p_bg_item_titre);
                bg_item.appendChild(bg_item_titre);
            
                // Prix du produit
                const bg_item_prix = document.createElement("div");
                bg_item_prix.className = "bg_item_prix";
            
                if (promotion_produit === 0) { // Pas de promotion
                    const p_bg_item_prix_originale = document.createElement("p");
                    p_bg_item_prix_originale.innerHTML = prix_de_produit+"DA";
                    p_bg_item_prix_originale.className = "p_bg_item_prix_originale";

                    bg_item_prix.appendChild(p_bg_item_prix_originale);
                } else { // Avec promotion
                    const promotion_bar = document.createElement("div");
                    promotion_bar.className = "promotion_bar";
                    const p_promotion = document.createElement("p");
                    p_promotion.innerHTML = "Promotion";
                    promotion_bar.appendChild(p_promotion);
                    bg_item_img.appendChild(promotion_bar);
            
                    const nouveauPrix = prix_de_produit * (1 - promotion_produit / 100);
                    const p_bg_item_prix_originale = document.createElement("p");
                    p_bg_item_prix_originale.className = "p_bg_item_prix_originale";
                    p_bg_item_prix_originale.innerHTML = nouveauPrix+"DA"; // Affichage avec deux décimales
                    bg_item_prix.appendChild(p_bg_item_prix_originale);
                    //ancien prix
                    const p_bg_item_prix_promotion = document.createElement("p");
                    p_bg_item_prix_promotion.innerHTML = prix_de_produit +"DA";
                    p_bg_item_prix_promotion.className = "p_bg_item_prix_promotion";
                    bg_item_prix.appendChild(p_bg_item_prix_promotion);

                }
            
                bg_item.appendChild(bg_item_prix);
            
                // Couleurs du produit
                const bg_item_coleurs = document.createElement("div");
                bg_item_coleurs.className = "bg_item_coleurs";
                for (let i = 0; i < n_colors_produit; i++) {
                    const color_dispo = document.createElement("div");
                    color_dispo.className = "color_dispo";
                    color_dispo.style.backgroundColor = colors_produit[i];
                    bg_item_coleurs.appendChild(color_dispo);
                }
                bg_item.appendChild(bg_item_coleurs);
                items_dispo.appendChild(bg_item);
            
                bg_item.addEventListener('click', () => {
                    // Redirection vers la page du produit avec les paramètres nécessaires
                    window.location.href = `miraProduct.html?store=${storeName}&collection_pr=${collection_produit}&id=${prdct_simlr[p]}`;
                });  
         
            
            } else {
                console.log("Aucun document trouvé avec cet ID de produit.");
                return null;
            }
        }












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

const logo_image = document.getElementById("logo_image");

logo_image.addEventListener('click', function() {
    window.location.href = `mira_stors.html?`; // Redirection vers la page du produit avec l'ID du produit
    //window.history.back();
});




