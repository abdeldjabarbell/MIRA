import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getFirestore, doc,setDoc, getDoc,query, limit,orderBy,startAt,endAt, where , getDocs,updateDoc ,addDoc ,collection ,serverTimestamp} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-storage.js';

// Initialiser Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDu_UWSfMLfSMO17f3zD_pFF6STW4ZIBPk",
    authDomain: "mira-dz.firebaseapp.com",
    projectId: "mira-dz",
    storageBucket: "mira-dz.appspot.com",
    messagingSenderId: "47453902449",
    appId: "1:47453902449:web:f1f296c3700ace1ba86dd0",
    measurementId: "G-DQTBCNNNHJ"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);


const search_backround = document.getElementById('search_backround');
const header = document.getElementById('header');

const normal_nav = document.getElementById('normal_nav');
const search_btn = document.getElementById('search_btn');
const cancel_suggestion_ = document.getElementById('cancel_suggestion_');
const suggestion_background = document.getElementById('suggestion_background');
const button_search_confirm = document.getElementById('button_search_confirm');

const menu_navbar = document.getElementById('menu_navbar');
const nav_btn_ser = document.getElementById('nav_btn_ser');
const user_nav = document.getElementById('user_nav');
const logo_image = document.getElementById('logo_image');


search_btn.addEventListener("click", async (e) => {
    normal_nav.style.opacity="0";
    normal_nav.style.transition=" 0.3s ease";
    suggestion_background.style.display="flex";
    search_backround.style.opacity="1";
    search_backround.style.transition=" 0.3s ease";
    setTimeout(() => {
        normal_nav.style.display="none";
        search_backround.style.display="flex";
        suggestion_background.style.opacity="1";
        suggestion_background.style.transition=" 0.4s ease";
    }, 300);

});
button_search_confirm.addEventListener("click", async (e) => {
    e.preventDefault();
    closesuggedtionTab();
});
cancel_suggestion_.addEventListener("click", async (e) => {
    e.preventDefault();
    closesuggedtionTab();
});
function closesuggedtionTab(){ 
    normal_nav.style.opacity="1";
    normal_nav.style.transition=" 0.3s ease";
    search_backround.style.opacity="0";
    search_backround.style.transition=" 0.3s ease";
    suggestion_background.style.opacity="0";
    suggestion_background.style.transition=" 0.3s ease";
    setTimeout(() => {
        normal_nav.style.display="flex";
        suggestion_background.style.display="none";
        search_backround.style.display="none";
    }, 300);
}






async function afficherDetailsMagasin(nomMagasin) {
    const docRef = doc(db, 'items', nomMagasin);
    const docSnap = await getDoc(docRef);
    console.log("docSnap :", docSnap);

    if (docSnap.exists()) {
        const stor_home = document.querySelector(".stor_home");
        const stor_content = document.querySelector(".stor_content_");
        //----------------------------------------------------------
        const data = docSnap.data();
        const image_couverture = data.image_couverture;
        const img = document.createElement('img');
        img.src = image_couverture;
        img.classList = "img_stor_home";
        stor_home.appendChild(img);

        const stor_home_content = document.createElement("div");
        stor_home_content.classList = "stor_home_content_classList";
        stor_home.appendChild(stor_home_content);

        const logo_mira_white_stor_ = document.createElement("img");
        logo_mira_white_stor_.classList = "logo_mira_white_stor__classList";
        logo_mira_white_stor_.src = 'img/MIRA white.png';

        const title_stor_ = document.createElement("h1");
        title_stor_.classList = "title_stor_classList";
        title_stor_.textContent = nomMagasin.toUpperCase();
        

        const button_stor_ = document.createElement("button");
        button_stor_.classList = "custom-btn btn-mira";
        button_stor_.innerHTML = "Voir les produits";

        button_stor_.addEventListener("click", async (e) => {
            const headerhight = header.offsetHeight;
            const storhomeImgHight = stor_home.offsetHeight;
            const storhomeImgscroll = storhomeImgHight - headerhight +10;
            window.scrollTo({
                top: storhomeImgscroll,
                behavior: "smooth", // Pour un défilement fluide
                duration: 2000 // Durée de la transition en millisecondes
            });
        });

        const button_stor_hover = document.createElement("div");
        button_stor_hover.classList = "button_stor_hover_clas";
        button_stor_.appendChild(button_stor_hover);

        stor_home_content.appendChild(logo_mira_white_stor_);
        stor_home_content.appendChild(title_stor_);
        stor_home_content.appendChild(button_stor_);

        ScrollReveal({ 
            reset: true ,
            distance: '20px',
            duration:1500,
            delay:200,
            interval: 200 // Pour animer les éléments l'un après l'autre
        
        });
        
        ScrollReveal().reveal('.logo_mira_white_stor__classList', { origin: 'top'});
        ScrollReveal().reveal('.title_stor_classList', { origin: 'right'});
        ScrollReveal().reveal('.custom-btn', { origin: 'bottom'});
        //---------------------------------------------------------
        const stors_dispo_content = document.querySelector(".stors_dispo_content");
        const querySnapshot = await getDocs(collection(db, 'items', nomMagasin, 'produits'));
        
        querySnapshot.forEach((doc) => {
            const Nom_store_ = doc.id; // Accès à l'ID du document
            const stors_dispo_content_a = document.createElement('a');
            stors_dispo_content_a.classList.add("element_stors_dispo");
            const stors_dispo_content_a_p = document.createElement('p');
            stors_dispo_content_a_p.classList.add("p_element_stors_dispo");
            stors_dispo_content_a_p.textContent = Nom_store_; // Utilisation de textContent au lieu de innerHTML pour la sécurité
            const stors_dispo_content_a_i = document.createElement('i');
            stors_dispo_content_a_i.classList.add("bx", "bx-right-arrow-alt");
        
            stors_dispo_content.appendChild(stors_dispo_content_a);
            stors_dispo_content_a.appendChild(stors_dispo_content_a_p);
            stors_dispo_content_a.appendChild(stors_dispo_content_a_i);

            stors_dispo_content_a.addEventListener('click', () => {
                window.location.href = `miraCollection.html?store=${nomMagasin}&collection_pr=${Nom_store_}`; // Redirection vers la page du produit avec l'ID du produit
            }); 
        });

        const h1store_dispo = document.getElementById("h1store_dispo");
        h1store_dispo.innerHTML="Les collection disponible dans cette store : ";
        

        // autre -------------------------------------------------
        
    }
    else {
        console.log("error: Aucune donnée trouvée pour le magasin sélectionné : " + nomMagasin);
    }

//----------------------------------------------------------------------------------
let allTitresProduits = []; // Stocker les titres de produits localement

async function fetchAllTitresProduits() {
    const q_s = query(collection(db, 'items', nomMagasin, 'produits'));
    const querySnapshot_s = await getDocs(q_s);
    
    allTitresProduits = [];
    for (const doc of querySnapshot_s.docs) {
        const q = query(collection(db, 'items', nomMagasin, 'produits', doc.id, 'produits'), orderBy("Titre"), limit(5));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            allTitresProduits.push({ id: doc.id, titre: doc.data().Titre });
        });
    }
    
    console.log("Tous les titres de produits ont été récupérés :", allTitresProduits);
}

async function afficherSuggestions(searchTerm) {
    const suggestionsDiv = document.getElementById('suggestion_');
    suggestionsDiv.innerHTML = ''; // Effacer les anciennes suggestions

    if (!searchTerm) {
        return; // Pas de suggestions si la recherche est vide
    }

    if (allTitresProduits.length === 0) {
        await fetchAllTitresProduits();
    }

    const filteredSuggestions = allTitresProduits.filter(titre =>
        titre.titre.toLowerCase().startsWith(searchTerm.toLowerCase())
    ).slice(0, 5); // Limiter à 5 suggestions maximum

    if (filteredSuggestions.length === 0) {
        suggestionsDiv.innerHTML = '<p style="color: rgba(0, 0, 0, 0.342);">Aucune suggestion trouvée</p>';
        return;
    }

    filteredSuggestions.forEach(titre => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = titre.titre;
        suggestionDiv.classList.add('suggestion_option');
        suggestionDiv.style.cursor= "pointer";
        suggestionDiv.addEventListener('click', () => {
            
            document.getElementById('searchInput').value = titre.titre;
            effectuerRecherche(titre.titre);


        });
        suggestionsDiv.appendChild(suggestionDiv);
    });
}

        
        
        
        function effectuerRecherche(recherche) {
            // Filtrer la liste des achats
            const articles = document.querySelectorAll('#items_dispo div');
        
            articles.forEach((article) => {
                const titreElement = article.querySelector(".p_bg_item_titre");
                
                if (titreElement) {
                    const nomProduit = titreElement.textContent.toLowerCase();
                    console.log('textContent TITLE: ' + nomProduit);
                    
                    if (nomProduit.includes(recherche.toLowerCase())) {
                        article.style.display = 'block';
                    } else {
                        article.style.display = 'none';
                    }
                } else {
                    console.log("L'élément .p_bg_item_titre n'a pas été trouvé dans l'article :", article);
                }
            });
        }
        


        // Fonction pour afficher la liste des achats
        async function afficherListeAchats() {


            const searchInput = document.getElementById('searchInput');
            try {

                 // Référence au document dans Firestore
                const stor_ref = await getDocs(collection(db, 'items', nomMagasin, 'produits'));
                for (const doc of stor_ref.docs) {

                        // Référence au document dans Firestore
                       const docRef = await getDocs(collection(db, 'items', nomMagasin, 'produits',doc.id , 'produits'));
                       const collection_produit = doc.id;

                       // Afficher les documents
                       docRef.forEach((doc) => {
                        const data = doc.data();
                    
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
                            window.location.href = `miraProduct.html?store=${nomMagasin}&collection_pr=${collection_produit}&id=${doc.id}`; // Redirection vers la page du produit avec l'ID du produit
                        });  
                        
                        

                        ScrollReveal({ 
                            reset: true ,
                            distance: '40px',
                            duration:1500,
                            delay:200,
                            interval: 200 // Pour animer les éléments l'un après l'autre
                        
                        });
                        
                        ScrollReveal().reveal('.bg_item', { origin: 'top'});
                        
                
                  
                    });
                    

                }


                // Écouter l'événement de saisie pour la recherche
                searchInput.addEventListener('input', () => {
                    const searchTerm = searchInput.value;
                    afficherSuggestions(searchTerm);
                    effectuerRecherche(searchTerm);

                    
                });

 
                
                // Effacer les suggestions lorsque l'input est vide
                searchInput.addEventListener('blur', () => {
                    if (searchInput.value === '') {
                        const suggestionsDiv = document.getElementById('suggestion_');
                        suggestionsDiv.innerHTML = '';
                    }
                });

                
            } catch (error) {
                console.error("Erreur lors de la récupération des documents:", error);
            }
        }

        // Appel de la fonction pour afficher la liste des achats lors du chargement de la page
        window.onload = afficherListeAchats;

        afficherListeAchats();
        

        

}

const urlParams = new URLSearchParams(window.location.search);
const selected_store = urlParams.get('store');

// Utilisation de la fonction pour afficher les détails du magasin "Femmes"
afficherDetailsMagasin(selected_store);




// Quand l'utilisateur fait défiler la page, exécute la fonction
window.onscroll = function() {
    scrollFunction();
};   
nav_btn_ser.style.cursor="pointer";
search_btn.style.cursor="pointer";

function scrollFunction() {
    const headerhight = header.offsetHeight;
    const storhomeImgHight = stor_home.offsetHeight;
    const storhomeImgscroll = storhomeImgHight - headerhight;
    if (document.body.scrollTop > storhomeImgscroll || document.documentElement.scrollTop > storhomeImgscroll) {
        header.style.backgroundColor = "#fcfcfc";
        header.style.transition=" 0.3s ease";
        header.style.boxShadow="0 .5rem 1rem #00000000";
        logo_image.style.opacity="1";
        user_nav.style.color="black";
        menu_navbar.style.color="black";
        nav_btn_ser.style.color="black";
        search_btn.style.color="black";
    } else {
        header.style.backgroundColor = "transparent";
        header.style.boxShadow="0 .5rem 1rem #00000000";
        header.style.transition=" 0.3s ease";
        logo_image.style.opacity="0";
        user_nav.style.color="white";
        menu_navbar.style.color="white";
        nav_btn_ser.style.color="white";
        search_btn.style.color="white";
    }
}



    const returnButton = document.getElementById('retour');
    returnButton.addEventListener('click', function() {
        window.location.href = `mira_stors.html?`; // Redirection vers la page du produit avec l'ID du produit
        //window.history.back();
    });




















