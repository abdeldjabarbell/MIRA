
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore, doc, getDoc,collection,addDoc ,serverTimestamp} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

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
        const id4 = detailsProduit.idproduit_Similaire4;


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
            acheter_btn1.innerHTML= "Acheter: "+pricePromo+ "DA";
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

            if (text.length > 300) {
                const shortenedText = text.substring(0, 300);
                const remainingText = text.substring(300);

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


        const titre_of_page5 = document.createElement('h1');
        titre_of_page5.className="titre_of_page";
        titre_of_page5.innerHTML="Produit similaire : ";
        produitDetailles_bg.appendChild(titre_of_page5);


        const prdct_simlr = [id1,id2,id3,id4];

        for(let p=0 ; p<4;p++){
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
 
                const items_dispo = document.querySelector(".items_dispo");
                 const message_prod_smilair = document.createElement("p");
                 message_prod_smilair.style.color="red";
                 message_prod_smilair.innerHTML="";
                 message_prod_smilair.innerHTML="cest pas possible de telecharger d'autre produits similaires"
                 items_dispo.appendChild(message_prod_smilair);

                console.log("cest pas possible de telecharger d'autre produits similaires");
                return null;
            }
        }

         //facture ----------------------------------------------------------

         const coleur_fa = document.getElementById("coleur_fa");
         const nomeetprenom= document.getElementById("nomeetprenom");
         const phone_n= document.getElementById("phone_n");
         const Adresse_= document.getElementById("Adresse_");
         const Total_facture= document.getElementById("Total_facture");
         const QuantitéFac = document.getElementById("QuantitéFac");
         const nomDeProduitFac= document.getElementById("nomDeProduitFac");
         const produit_image_facture= document.getElementById("produit_image_facture");
        
        
        const img_fa_ =document.createElement("img");
        img_fa_.src= image1;
        produit_image_facture.appendChild(img_fa_);
        nomDeProduitFac.innerHTML=titre;


         const select_your_color= document.getElementById("select_your_color");
         const Nom_prenome = document.getElementById("Nom_prenome");
         const numerotelephone= document.getElementById("numerotelephone");
         const adressPersonelle= document.getElementById("adressPersonelle");
         const EmailFacture= document.getElementById("EmailFacture");

         const Quantite_de_produit_in = document.getElementById("Quantite_de_produit_in");
         const moinsbutton_fa = document.getElementById("moinsbutton_fa");
         const plusbutton_fa = document.getElementById("plusbutton_fa");

         Total_facture.innerHTML="";
         const n_p_demande = Quantite_de_produit_in.value         
         if(promotion>0){
             Total_facture.innerHTML= n_p_demande*pricePromo+"DA";
 
         }
         if(promotion===0){
             Total_facture.innerHTML= n_p_demande*priceOriginale+"DA";
 
         }
         
         moinsbutton_fa.addEventListener('click', function() {
             let Quantite_de_produit_inval = parseInt(Quantite_de_produit_in.value);
             if (Quantite_de_produit_inval > 1) {
                 Quantite_de_produit_inval--;
                 Quantite_de_produit_in.value = Quantite_de_produit_inval;
                 QuantitéFac.innerHTML = Quantite_de_produit_in.value;

                 Total_facture.innerHTML="";
                 const n_p_demande = Quantite_de_produit_in.value   

                 if(promotion>0){
                     Total_facture.innerHTML= n_p_demande*pricePromo+"DA";
         
                 }
                 if(promotion===0){
                     Total_facture.innerHTML= n_p_demande*priceOriginale+"DA";
         
                 }

             }
         });
         let tot=0;     

         plusbutton_fa.addEventListener('click', function() {
             let Quantite_de_produit_inval = parseInt(Quantite_de_produit_in.value);
             Quantite_de_produit_inval++;
             Quantite_de_produit_in.value = Quantite_de_produit_inval;
             QuantitéFac.innerHTML = Quantite_de_produit_in.value;

             Total_facture.innerHTML="";
             const n_p_demande = Quantite_de_produit_in.value ;
             if(promotion>0){
                 Total_facture.innerHTML= n_p_demande*pricePromo+"DA";
                 tot=n_p_demande*pricePromo;
                 return tot;
             }
             if(promotion===0){
                 Total_facture.innerHTML= n_p_demande*priceOriginale+"DA";
                 tot=n_p_demande*priceOriginale;
                 return tot;
             }

         });
         Quantite_de_produit_in.addEventListener('input', function() {
            QuantitéFac.innerHTML = Quantite_de_produit_in.value;

            Total_facture.innerHTML="";
            const n_p_demande = Quantite_de_produit_in.value         
            if(promotion>0){
                Total_facture.innerHTML= n_p_demande*pricePromo+"DA";
    
            }
            if(promotion===0){
                Total_facture.innerHTML= n_p_demande*priceOriginale+"DA";
    
            }
        });
        
        let colorselected ="";
        let CC=0;

        for (let c = 0; c < N__color; c++) {
            const color_input = document.createElement("div");
            color_input.className = "color_input";
            color_input.style.backgroundColor = colors[c];
            select_your_color.appendChild(color_input);
        
            color_input.addEventListener('click', function() {
                CC=CC+1;
                console.log('cc='+CC);
                coleur_fa.style.backgroundColor = colors[c];
                colorselected = colors[c];
                const allColorInputs = document.querySelectorAll(".color_input");
                allColorInputs.forEach(input => input.classList.remove("active"));
                color_input.classList.add("active");
                console.log('color=' + colorselected);
                return colorselected;
            });
        }

        
        
        Nom_prenome.addEventListener('input', function() {
            nomeetprenom.innerHTML = "";
            nomeetprenom.innerHTML = Nom_prenome.value;
        });
        numerotelephone.addEventListener('input', function() {
            phone_n.innerHTML = "";
            phone_n.innerHTML = numerotelephone.value;
        });

        adressPersonelle.addEventListener('input', function() {
            Adresse_.innerHTML = "";
            Adresse_.innerHTML = adressPersonelle.value;
        });


    //<div class="inpts_produit" style="width: 100%;">
    //    <label for="EmailFacture">Email</label>
    //    <input type="email" id="EmailFacture" required>
    //</div>
    

    const backgroundProdect_page = document.getElementById("backgroundProdect_page");
    const anullerfacture_= document.getElementById("anullerfacture_");
    const formulaire_d_achat= document.getElementById("formulaire_d_achat");

    acheter_btn1.addEventListener('click', function() {
        formulaire_d_achat.style.display = "flex";
        backgroundProdect_page.style.display = "none";
    });
    
    anullerfacture_.addEventListener('click', function() {
        formulaire_d_achat.style.display = "none";
        backgroundProdect_page.style.display = "flex";

    });

    const affichefacture_ = document.getElementById('affichefacture_');
    affichefacture_.addEventListener('click', async function() {

        if (Nom_prenome.value === "" && numerotelephone.value === "" && adressPersonelle.value === "") {
            alert("Veuillez remplir au moins un champ." );

            
        } else if (CC < 1) {
            alert("Veuillez choisir une couleur.");
        } else {
         const achat_wating = document.getElementById('achat_wating');
         achat_wating.style.display="flex"
         const  messageenvoiyerfacture =document.getElementById('messageenvoiyerfacture');
         messageenvoiyerfacture.innerHTML="Votre commande est en cours d'envoi.....";

         
            console.log(CC)
            const collectionRef = collection(db, 'commands_no_users'); // Reference to the collection
    
            const data = {
                fullName: Nom_prenome.value, 
                adress: adressPersonelle.value,
                telNumber: numerotelephone.value,
                colorCom: colorselected,
                prixTot: tot,
                quantiteCom: Quantite_de_produit_in.value,
                produitPhoto: image1,
                titre_prod: titre,
                timestamp: serverTimestamp()
            };
        
            try {
                await addDoc(collectionRef, data); // Use addDoc() instead of setDoc()
                console.log("Document added successfully!");
                messageenvoiyerfacture.innerHTML="Nous vous informons que votre commande a été correctement reçue. Nous vous contacterons dès que possible , merci";
                messageenvoiyerfacture.style.color='green';
                const envoyerLaFacture_div = document.getElementById('envoyerLaFacture_div');
                envoyerLaFacture_div.style.display="block";
                
                const anulerEnvoyerLaFacture= document.getElementById('anulerEnvoyerLaFacture');
                anulerEnvoyerLaFacture.style.display="block";
                 anulerEnvoyerLaFacture.addEventListener('click', async function() {
                    messageenvoiyerfacture.innerHTML="";
                    achat_wating.style.display="none";
                });

                const emailfacture= document.getElementById('emailfacture');

                const envoyerLaFacture= document.getElementById('envoyerLaFacture');
                
                envoyerLaFacture.addEventListener('click', async function() {
                    generateAndSendPDF();
                    messageenvoiyerfacture.innerHTML="terminer";
                    messageenvoiyerfacture.style.color='green';
                    messageenvoiyerfacture.style.fontSize="1.5rem";
                    setTimeout(function() {
                        messageenvoiyerfacture.innerHTML="";
                        achat_wating.style.display="none"
                    }, 2000);
                });

                function generateAndSendPDF() {
                    var content = document.getElementById('la_facture_de_commend');
                    var opt = {
                        margin:       1,
                        filename:     'document.pdf',
                        image:        { type: 'jpeg', quality: 0.98 },
                        html2canvas:  { scale: 2 },
                        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };
                    const dateMaintenant = new Date();

                    // Génération du PDF
                    html2pdf().from(content).set(opt).outputPdf('datauristring').then(function(pdfString) {
                        // Envoi de l'e-mail
                        Email.send({
                            Host: "smtp.elasticemail.com",
                            Username: "abdeldjabarportfolio@gmail.com",
                            Password: "F23FF9C5884BB101841AB262DC6AB2A5AC26",
                            To: emailfacture.value,
                            From: 'abdeldjabarportfolio@gmail.com',
                            Subject: "Confirmation de votre compte",
                            Body: 
                            +'Bonjour '+Nom_prenome.value+',\n'
                            +"Veuillez trouver ci-joint le fichier PDF de votre facture d'achat. N'hésitez pas à nous contacter si vous avez des questions ou des préoccupations.\n"
                            +'Cordialement,\n'
                            +"L'équipe de MIRA\n",
                            
                            Attachments: [
                                {
                                    name: "MIRA_FACTURE_"+Nom_prenome.value+"_"+dateMaintenant+".pdf",
                                    data: pdfString
                                }
                            ]
                        }).then(function() {
                            console.log('E'+Nom_prenome);

                            console.log('E-mail !'+emailfacture);

                            console.log('E-mail envoyé avec succès !');
                            
                        }).catch(function(error) {
                            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
                        });
                    });
                }
            } catch (error) {

                console.error("Error adding document: ", error);
            }
        }

    });
    
    
    

    
    





        
        









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




