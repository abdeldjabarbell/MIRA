
//nav bar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};





// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getFirestore, doc, getDoc,query, where , getDocs,updateDoc ,addDoc ,collection ,serverTimestamp, orderBy, limit, startAfter} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";
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




const notification = document.getElementById("notification");
const notificationbg_space = document.getElementById("notificationbg_space");
const image_notif_bg = document.getElementById("image_notif_bg");
const text_notif_bg = document.getElementById("text_notif_bg");
const time_and_titre = document.getElementById("time_and_titre");
const notification_titre = document.getElementById("notification_titre");
const date_noti = document.getElementById("date_noti");
const notification_text_content = document.getElementById("notification_text_content");

const voir_plus_de_notif = document.getElementById("voir_plus_de_notif");
const wt = document.getElementById("wt");

const retourner_au_home = document.getElementById("retourner_au_home");

auth.onAuthStateChanged(async (user) => {
    if (user) {

        // Récupération de l'adresse e-mail de l'utilisateur connecté
        const mail = user.email;

        // Vérification si l'e-mail existe dans la collection "admins"
        const q = query(collection(db, "admins"), where("email", "==", mail));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const watingAccount = document.getElementById("wt");
                watingAccount.style.display = "flex";
                const userId = user.uid;
                const userRef = doc(db, "admins", userId);
                const docSnapshot = await getDoc(userRef);

                if (docSnapshot.exists()) {
                    // Correction : récupération de l'e-mail depuis docSnapshot.data()
                    const nomAdm = docSnapshot.data().nom;
                    const prenomAdm = docSnapshot.data().prenom;
                    const nom_prenom_admin = document.getElementById("nom_prenom_admin");
                    nom_prenom_admin.innerHTML = "ADMIN : " + prenomAdm.toUpperCase() + " " + nomAdm.toUpperCase() + " .";
                    wt.style.display="none";

                }
            } else {
                console.log("vers la page d'aceuille  en cours ...")
                window.location.href = 'homepage.html';
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du email :", error);
        }
    } else {
        window.location.href = 'index.html';
    }
});
//-------------------------------- firebase opartions -------------------------
retourner_au_home.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = 'homepage.html';
});



let lastVisibleDoc = null;
const itemsPerPage = 10;
 
function formatDate(timestamp) {
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${day}/${month}/${year} at ${hour}:${minute} ${ampm}`;
}

async function fetchItems() {
    const itemsCollectionRef = collection(db, 'notifications');
    let queryRef;

    if (lastVisibleDoc === null) {
        queryRef = query(itemsCollectionRef, orderBy('timestamp', 'desc'), limit(itemsPerPage));
    } else {
        queryRef = query(itemsCollectionRef, orderBy('timestamp', 'desc'), startAfter(lastVisibleDoc), limit(itemsPerPage));
    }

    const querySnapshot = await getDocs(queryRef);

    const notificationbg_space = document.getElementById('notificationbg_space');
    notificationbg_space.innerHTML = ''; // Pour vider la liste avant d'ajouter de nouveaux éléments

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const formattedTimestamp = formatDate(data.timestamp);



    });

    lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; // Met à jour la dernière référence de document visible
}

const loadMoreBtn = document.getElementById('voir_plus_de_notif');
loadMoreBtn.addEventListener('click', fetchItems);

// Au chargement initial de la page, récupérer les premiers 10 éléments
fetchItems();


