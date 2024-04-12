
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
        const price=detailsProduit.prix;
        const image1=detailsProduit.imageUrl_produit_1;
        const image2=detailsProduit.imageUrl_produit_2;
        const image3=detailsProduit.imageUrl_produit_3;
        const image4=detailsProduit.imageUrl_produit_4;
        const discreption =detailsProduit.description;
        const n_etoiles =detailsProduit.description;
        const n_evaluation = detailsProduit.description;
        const id1 = detailsProduit.description;
        const id2 = detailsProduit.description;
        const id3 = detailsProduit.description;

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

        const produitDetailles_bg = document.getElementById('produitDetailles_bg');
        
        const showMor = document.getElementById('showMor');
        const showLe = document.getElementById('showLe');

        showMor.addEventListener('click', () => {
            showMore();
        }); 
        showLe.addEventListener('click', () => {
            showLess();
        }); 
        



        function showMore() {
            const pElement = document.querySelector('.dicreptionstyel');
            const text = pElement.textContent;

            if (text.length > 70) {
                const shortenedText = text.substring(0, 70);
                const remainingText = text.substring(70);

                pElement.innerHTML = shortenedText + '<span id="remainingText" style="display: none;">' + remainingText + '</span>';

                showMor.style.display = "none";
                showLe.style.display = "flex";

            }
        }

        function showLess() {
            const pElement = document.querySelector('.dicreptionstyel');
            const remainingText = document.getElementById('remainingText').textContent;

            pElement.innerHTML = remainingText;

 
            showMor.style.display = "flex";
            showLe.style.display = "none";
        }
        showMore();


    //<div class="images_bgr">
    //    <div class="image_prinsipale">
    //        <img src="img/post_insta33.jpg" alt="">
    //    </div>
    //    <div class="image_collections">
    //        <div class="imgPrdt">
    //            <img src="img/post_insta33.jpg" alt="">
    //        </div>
    //        <div class="imgPrdt">
    //            <img src="img/post_insta33.jpg" alt="">
    //        </div>
    //        <div class="imgPrdt">
    //            <img src="img/post_insta33.jpg" alt="">
    //        </div>
    //        <div class="imgPrdt">
    //            <img src="img/post_insta33.jpg" alt="">
    //        </div>
//
    //    </div>
    //</div>

        // Afficher les détails du produit
        //

        //productDiv.innerHTML = `
        //    <h2>${detailsProduit.Titre}</h2>
        //    <p>Prix: ${detailsProduit.prix} $</p>
        //    <img src="${detailsProduit.imageUrl_produit_1}" alt="Image du produit" style="width: 200px;height: 200px;">
        //    <p>Description: ${detailsProduit.description}</p>
        //`;
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





