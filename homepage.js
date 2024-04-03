



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
import { getFirestore, doc, getDoc,query, where , getDocs,updateDoc ,addDoc ,collection ,serverTimestamp} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";

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


const activatoin_compt = document.getElementById("activatoin_compt");
const acive_compt_form = document.getElementById("acive_compt_form");
const deconnecter_acv_msg = document.getElementById("deconnecter_acv_msg");

const creat_project_btnn = document.getElementById("creat_project_btnn");

const message_cerification_consol = document.getElementById("message_cerification");

const loader = document.getElementById("loader");
const original = document.getElementById("original");
const Done = document.getElementById("Done");

const titlenumberNotif = document.getElementById("titlenumberNotif");
const notifbtn = document.getElementById("notifbtn");
const deconection = document.getElementById("deconection");






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
                    const statut_du_compte = docSnapshot.data().statut_du_compte;
                    const nomAdm = docSnapshot.data().nom;
                    const prenomAdm = docSnapshot.data().prenom;
                    const nom_prenom_admin = document.getElementById("nom_prenom_admin");
                    nom_prenom_admin.innerHTML = "ADMIN : " + prenomAdm.toUpperCase() + " " + nomAdm.toUpperCase() + " .";

                    const activatoin_compt = document.getElementById("activatoin_compt");
                    if (statut_du_compte === "desactive") {
                        watingAccount.style.display = "none";
                        activatoin_compt.style.display = "flex";
                    } else {
                        activatoin_compt.style.display = "none";
                        watingAccount.style.display = "none";
                    }
                }
            } else {
                console.log("déconnection en cours ...")
                logout();
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du email :", error);
        }
    } else {
        window.location.href = 'index.html';
    }
});




acive_compt_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    activrmyaccount();
    original.style.display="none"
    loader.style.display="block"

});

  function activrmyaccount() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const userId = user.uid;
            const userRef = doc(db, "admins", userId);
            const docSnapshot = await getDoc(userRef);
            
            if (docSnapshot.exists()) {
                const code = docSnapshot.data().code;
                const nom = docSnapshot.data().nom;
                const prenom = docSnapshot.data().prenom;


                // Vous devez d'abord récupérer la valeur du code_verification à partir d'un formulaire ou d'une autre source
                // Je vais supposer que vous avez déjà cette variable définie quelque part
                const code_verification = document.getElementById("code_verification").value;

                if(code_verification === code) {
                    // Le code de vérification correspond au code dans la base de données
                    const userDocRef = doc(db, 'admins', userId);
                    await updateDoc(userDocRef, {
                        statut_du_compte: "active"
                    });
                    message_cerification_consol.style.color="green";
                    message_cerification_consol.innerHTML="Le compte a été activé avec succès.";
                    Done.style.display="block"
                    loader.style.display="none" 

                    const timestamp = serverTimestamp();
                    const notificationsCollectionRef = collection(db, 'notifications'); // Reference to the collection of notifications
                    const notificationData = {
                        title_notif:"Nouveau Administrateur", 
                        notification: "Un nouveau administrateur a été inscrit avec succès. Bienvenue Mr." + prenom + " " + nom + " à notre nouvelle équipe",
                        timestamp: timestamp,
                    };
                    //creat notif number
                    const notifinumberRef = doc(db, "notifications", "notif_number");
                    const docSnapshot = await getDoc(notifinumberRef);
                    if (docSnapshot.exists()) {
                        const numero = docSnapshot.data().numero;
                        var numeroprim = numero+1;
                        await updateDoc(notifinumberRef, {
                            numero: numeroprim
                        });
                        
                    }

                    
                    await addDoc(notificationsCollectionRef, notificationData);
                    setTimeout(() => {
                        refreshPage();
                    }, 2000);
                    
                } else {
                    // Le code de vérification ne correspond pas au code dans la base de données
                    console.log('Le code de vérification est incorrect.');
                    message_cerification_consol.style.color="red";
                    message_cerification_consol.innerHTML="Le code de vérification est incorrect.";
                    original.style.display="block"
                    loader.style.display="none"
                }
            } else {
                // Aucun document trouvé pour cet utilisateur dans la collection "admins"
                console.log('Aucun document trouvé pour cet Admin.');
                message_cerification_consol.style.color="red";
                message_cerification_consol.innerHTML="Aucun document trouvé pour cet Admin.";
                original.style.display="block"
                loader.style.display="none"
            }
        }
    });
}

// Recharge la page actuelle
function refreshPage() {
    window.location.reload(); 
}

deconnecter_acv_msg.addEventListener("click", async (e) => {
    e.preventDefault();
    logout();
});
// Fonction de déconnexion
function logout() {
    signOut(auth).then(() => {
        console.log('Utilisateur déconnecté');
        window.location.href = 'index.html'; 
    }).catch((error) => {
        console.error('Erreur lors de la déconnexion : ', error);
    });
}

const notifinumberRef = doc(db, "notifications", "notif_number");
const docSnapshot = await getDoc(notifinumberRef);
if (docSnapshot.exists()) {
    const numero = docSnapshot.data().numero;
    if(numero===0){
        titlenumberNotif.style.display="none";
    }else{
        titlenumberNotif.innerText= numero;
        titlenumberNotif.style.display="flex";
    }   
}

notifbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const notifinumberRef = doc(db, "notifications", "notif_number");
    var numeroprim = 0;
    await updateDoc(notifinumberRef, {
        numero: numeroprim
    });
});
deconection.addEventListener("click", async (e) => {
    e.preventDefault();
    wt.style.display="flex"
    logout();
});

creat_project_btnn.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = 'creeProduit.html';

});
