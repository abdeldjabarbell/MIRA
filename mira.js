import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getFirestore, doc,setDoc, getDoc,query, where , getDocs,updateDoc ,addDoc ,collection ,serverTimestamp} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
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
        title_stor_.innerHTML = nomMagasin;

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
        });
    }
    else {
        console.log("error: Aucune donnée trouvée pour le magasin sélectionné : " + nomMagasin);
    }
}
const selected_store = "hahahahahah";



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
        header.style.boxShadow="0 .5rem 1rem #0a0a0a23";
        logo_image.style.opacity="1";
        user_nav.style.color="black";
        menu_navbar.style.color="black";
        nav_btn_ser.style.color="black";
        search_btn.style.color="black";
    } else {
        header.style.backgroundColor = "transparent";
        header.style.boxShadow="0 .5rem 1rem #0a0a0a00"
        header.style.transition=" 0.3s ease";
        logo_image.style.opacity="0";
        user_nav.style.color="white";
        menu_navbar.style.color="white";
        nav_btn_ser.style.color="white";
        search_btn.style.color="white";
    }
}



















ScrollReveal({ 
    reset: true ,
    distance: '80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.logo_mira_white_stor__classList, .custom-btn btn-mira ', { origin: 'top'});
ScrollReveal().reveal('.custom-btn ', { origin: 'bottom'});
ScrollReveal().reveal('.title_stor_classList', { origin: 'left'});
ScrollReveal().reveal('', { origin: 'right'});




