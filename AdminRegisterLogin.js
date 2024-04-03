 
 
 //buttons
 const connecter = document.getElementById("connecter");
 const recupereMDP = document.getElementById("recupereMDP");
 const creeCompte = document.getElementById("creeCompte");
 const anuulerRecuperation = document.getElementById("anuulerRecuperation");
 // pages 
 const login_bg = document.getElementById("login_bg");
 const register_bg = document.getElementById("register_bg");
 const recuperation_bg = document.getElementById("recuperation_bg");


 connecter.addEventListener("click", async (e) => {
    e.preventDefault();
    login_bg.style.display = "flex";
    register_bg.style.display = "none";
    recuperation_bg.style.display = "none";
});
recupereMDP.addEventListener("click", async (e) => {
    e.preventDefault();
    login_bg.style.display = "none";
    register_bg.style.display = "none";
    recuperation_bg.style.display = "flex";
});
creeCompte.addEventListener("click", async (e) => {
    e.preventDefault();
    login_bg.style.display = "none";
    register_bg.style.display = "flex";
    recuperation_bg.style.display = "none";
});
anuulerRecuperation.addEventListener("click", async (e) => {
    e.preventDefault();
    login_bg.style.display = "flex";
    register_bg.style.display = "none";
    recuperation_bg.style.display = "none";
});
const message_firebase_recuperation = document.getElementById("message_firebase_recuperation");
const message_firebase_register = document.getElementById("message_firebase_register");
const message_firebase_login = document.getElementById("message_firebase_login");

const original = document.getElementById("original");
const loader = document.getElementById("loader");
const Done = document.getElementById("Done");

const original1 = document.getElementById("original1");
const loader1 = document.getElementById("loader1");
const Done1 = document.getElementById("Done1");

const original2 = document.getElementById("original2");
const loader2 = document.getElementById("loader2");
const Done2 = document.getElementById("Done2");


const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const recuperationForm = document.getElementById("recuperationForm");

const wating = document.getElementById("wating");






//---------------------------------------------- registration

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,sendPasswordResetEmail,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getFirestore, doc, setDoc, query, where , collection, getDocs} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDu_UWSfMLfSMO17f3zD_pFF6STW4ZIBPk",
    authDomain: "mira-dz.firebaseapp.com",
    projectId: "mira-dz",
    storageBucket: "mira-dz.appspot.com",
    messagingSenderId: "47453902449",
    appId: "1:47453902449:web:f1f296c3700ace1ba86dd0",
    measurementId: "G-DQTBCNNNHJ"
  };

// Initialiser Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    original1.style.display="none"
    loader1.style.display="block"
    signUpAndLogin(); 
});

async function signUpAndLogin() {
    try {
        // Inscription de l'utilisateur
        await signUp();
        // Connexion après l'inscription
        await loginAfterRegister();
    } catch (error) {
        console.error('Erreur lors de l\'inscription ou de la connexion :', error);
        // Gérer les erreurs d'inscription ou de connexion
    }
}



// Fonction pour s'inscrire avec email et mot de passe
async function signUp() {
    const registerNom = document.getElementById("registerNom").value;
    const registerPrenom = document.getElementById("registerPrenom").value;
    const registerEmail = document.getElementById("registerEmail").value;
    const registerPassword = document.getElementById("registerPassword").value;
    
    try {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 11; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "abdeldjabarportfolio@gmail.com",
            Password : "F23FF9C5884BB101841AB262DC6AB2A5AC26",
            To : registerEmail,
            From : 'abdeldjabarportfolio@gmail.com',
            Subject : "Confirmation de votre compte",
            Body : 
                "Cher admin "+registerPrenom+" "+registerNom +",<br>"
    
                +"<br> Merci de vous être inscrit sur notre plateforme. Pour confirmer votre compte, veuillez utiliser le code de vérification suivant :"
    
                +"<br> Code de vérification : <p>"+code+"</p>"
    
                +"<br>Veuillez admin ce code dans notre interface utilisateur pour confirmer votre compte. Si vous n'avez pas initié cette demande, veuillez ignorer ce message.<br>"
    
                +"<br>Cordialement,<br>"
                +"<br>L'équipe de MIRA"
            
        }).then(
            console.log('message envoiyer')
        );


        const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        // Enregistrer les données utilisateur dans Firestore
        await setDoc(doc(db, "admins", userCredential.user.uid), {
            nom: registerNom,
            prenom: registerPrenom,
            email: registerEmail,
            mot_de_passe: registerPassword,
            statut_du_compte: "desactive",
            code : code
        });




        // button loder
        loader1.style.display="none"
        Done1.style.display="block"
        // message
        message_firebase_register.style.color="green"
        message_firebase_register.innerHTML="Inscription réussie !";
        setTimeout(() => {
             // message & loder
            message_firebase_register.textContent = "";
            original1.style.display="block"
            Done1.style.display="none"
        }, 3000);

    } catch (error) {
        // Gérer les erreurs d'inscription
        message_firebase_register.style.color="red"
        message_firebase_register.innerHTML= error.message;
        original1.style.display="block"
        Done1.style.display="none"
        loader1.style.display="none"
    }
}


recuperationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    original2.style.display="none"
    loader2.style.display="block"
    envoyerEmail();
});

async function envoyerEmail() {
    const recuperationEmail = document.getElementById('recuperationEmail').value;
    try {
    await sendPasswordResetEmail(auth, recuperationEmail)
    .then(() => {
        // Email envoyé avec succès
        loader2.style.display = "none";
        Done2.style.display = "block";
        setTimeout(() => {
           original2.style.display="block"
           Done2.style.display="none"
       }, 3000);
        message_firebase_recuperation.style.color="green"
        message_firebase_recuperation.innerHTML="Un email de récupération de mot de passe a été envoyé à " + recuperationEmail;
    })
    } catch (error) {
    
        loader2.style.display = "none";
        original2.style.display = "block";
        Done2.style.display = "none";

        message_firebase_recuperation.style.color="red"
        message_firebase_recuperation.innerHTML= error.message;
    }
}

async function loginAfterRegister() {
    const registerEmail = document.getElementById("registerEmail").value;
    const registerPassword = document.getElementById("registerPassword").value;
    wating.style.display="flex"

    try {

        const userCredential = await signInWithEmailAndPassword(auth, registerEmail, registerPassword);
        // Connexion réussie
        const user = userCredential.user;
        console.log('Connecté en tant que:', user.email);
        setTimeout(() => {   
            wating.style.display="none"
            window.location.replace("homepage.html");
        }, 2000);

        // Redirigez ici vers une autre page ou effectuez d'autres actions après la connexion réussie
    } catch (error) {
        // Gestion des erreurs lors de la connexion
        const errorMessage = error.message;
        console.error('Erreur de connexion:', errorMessage);
        wating.style.display="none"

        // Affichez un message d'erreur à l'utilisateur ou effectuez d'autres actions en fonction de l'erreur
    }
}

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    original.style.display="none"
    loader.style.display="block"
    const loginEmail = document.getElementById("loginEmail").value;

    // Vérification si le email existe dans la collection "users"
    const q = query(collection(db, "admins"), where("email", "==", loginEmail));
    getDocs(q)
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                login();
            } else {
                original.style.display="block"
                loader.style.display="none"
                message_firebase_login.style.color="red";
                message_firebase_login.innerHTML="Vous n'êtes pas autorisé à accéder à cette fonctionnalité.";
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification du email :", error);
        });
    
});

async function login() {
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
    try {

        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        // Connexion réussie
        const user = userCredential.user;
        message_firebase_login.style.color="green";
        message_firebase_login.innerHTML='Connecté en tant que:', user.email;
        loader.style.display="none"
        Done.style.display="block"
        setTimeout(() => {   
            window.location.replace("homepage.html");
        }, 2000);

        // Redirigez ici vers une autre page ou effectuez d'autres actions après la connexion réussie
    } catch (error) {
        // Gestion des erreurs lors de la connexion
        message_firebase_login.style.color="red";
        message_firebase_login.innerHTML= error.message;  

        original.style.display="block"
        loader.style.display="none"

        // Affichez un message d'erreur à l'utilisateur ou effectuez d'autres actions en fonction de l'erreur
    }
}
