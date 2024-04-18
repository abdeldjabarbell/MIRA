
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

  const commend_detailes_admin = document.getElementById("commend_detailes_admin");
  const image_cdabg = document.getElementById("image_cdabg");
  const nameProduit_cdabg = document.getElementById("nameProduit_cdabg");
  const coleurProduit_cdabg = document.getElementById("coleurProduit_cdabg");
  const quantiteProduit_cdabg = document.getElementById("quantiteProduit_cdabg");
  const prixProduit_cdabg = document.getElementById("prixProduit_cdabg");
  const depensesProduit_cdabg = document.getElementById("depensesProduit_cdabg");
  const laMarge_cdabg = document.getElementById("laMarge_cdabg");
  const nameClient_cdabg = document.getElementById("nameClient_cdabg");
  const AdressClient_cdabg = document.getElementById("AdressClient_cdabg");
  const TelephoneClient_cdabg = document.getElementById("TelephoneClient_cdabg");
  const EmailClient_cdabg = document.getElementById("EmailClient_cdabg");
  const fermer_f_cdabg  = document.getElementById("fermer_f_cdabg");
  const date_c_cdabg  = document.getElementById("date_c_cdabg");
  const Verification_cdabg  = document.getElementById("Verification_cdabg");
  const verifier_cdabg  = document.getElementById("verifier_cdabg");
  const decision__cdabg  = document.getElementById("decision__cdabg");
  const annuler_cdabg  = document.getElementById("annuler_cdabg");
  const confirmer_cdabg  = document.getElementById("confirmer_cdabg");
  const verifier_cdabg__cdabg  = document.getElementById("verifier_cdabg__cdabg");
  const decisionConfirmer__cdabg  = document.getElementById("decisionConfirmer__cdabg");
  const retour_cdabg  = document.getElementById("retour_cdabg");
  const vender_cdabg  = document.getElementById("vender_cdabg");



  
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


    // Function to fetch data from Firebase and display in HTML table
 async function fetchCommandsData() {
     const commendsBG = document.getElementById('commendsBG');
     const selectFilter = document.getElementById('statusFilter');
     const selectedStatus = selectFilter.value;
     commendsBG.innerHTML = ''; // Clear previous table content
     
     const commandsRef = collection(db, 'commands_no_users');
     const q = query(commandsRef, where('commond', '==', selectedStatus));
     const snapshot = await getDocs(q);
     
     snapshot.forEach((doc) => {
         const data = doc.data();
         const documentId =doc.id; 
         const produitPhoto = data.produitPhoto;
         const titre_prod = data.titre_prod;
         const quantiteCom = data.quantiteCom;
         const prixTot = data.prixTot;
         const depenses = data.depenses;
         const fullName = data.fullName;
         const commond = data.commond;
         const colorCom = data.colorCom;
         const adress = data.adress;
         const telNumber = data.telNumber;
         const Email = data.Email;
         const timestamp = data.timestamp;

         const uneCommend = document.createElement('div');
         uneCommend.className="uneCommend";

         const imagedecommend = document.createElement('div');
         imagedecommend.className="imagedecommend";
         const imagedecommendImg= document.createElement('img');
         imagedecommendImg.src= produitPhoto;
         imagedecommend.appendChild(imagedecommendImg);

         const namedecommend = document.createElement('div');
         namedecommend.className="namedecommend";
         const namedecommendh3 = document.createElement('h3');
         namedecommendh3.innerHTML= titre_prod;
         namedecommend.appendChild(namedecommendh3);

         const margedecommend = document.createElement('div');
         margedecommend.className="namedecommend";
         const marg_tot = prixTot -(depenses*quantiteCom);
         const margedecommendh3 = document.createElement('h3');
         margedecommendh3.innerHTML=marg_tot+"DA";
         if(marg_tot>0){
            margedecommendh3.style.color="green";
         }else{
            margedecommendh3.style.color="red";
         }
         margedecommend.appendChild(margedecommendh3);

         uneCommend.appendChild(imagedecommend);
         uneCommend.appendChild(namedecommend);
         uneCommend.appendChild(margedecommend);


         commendsBG.appendChild(uneCommend);


         const date = new Date(timestamp * 1000);
         const day = ('0' + date.getDate()).slice(-2); // Jour
         const month = ('0' + (date.getMonth() + 1)).slice(-2); // Mois (les mois sont indexés à partir de zéro)
         const year = date.getFullYear(); // Année
         const hours = ('0' + date.getHours()).slice(-2); // Heures
         const minutes = ('0' + date.getMinutes()).slice(-2); // Minutes
         const seconds = ('0' + date.getSeconds()).slice(-2); // Secondes
         const formattedDateTime = `${day} ${month} ${year-1969} ${hours}:${minutes}:${seconds}`;
         
         const  prixProduit_cdabg_ = prixTot/quantiteCom;
         
         uneCommend.addEventListener("click", async (e) => {
            e.preventDefault();
            commend_detailes_admin.style.display="flex";
            decision__cdabg.style.display="none"
            Verification_cdabg.innerHTML = "";
            verifier_cdabg__cdabg.style.display="flex";
            decisionConfirmer__cdabg.style.display="none";
            //------------------------

            verifier_cdabg__cdabg.style.display="flex"
            image_cdabg.src= produitPhoto;
            nameProduit_cdabg.innerHTML=titre_prod;
            coleurProduit_cdabg.style.backgroundColor=colorCom;
            quantiteProduit_cdabg.innerHTML=quantiteCom;
            prixProduit_cdabg.innerHTML=prixProduit_cdabg_;
            depensesProduit_cdabg.innerHTML=depenses;
            laMarge_cdabg.innerHTML=marg_tot;
            if(marg_tot>0){
                laMarge_cdabg.style.color="green";
                laMarge_cdabg.style.fontWeight="600"
            }else{
                laMarge_cdabg.style.color="red";
                laMarge_cdabg.style.fontWeight="600"
            }
            nameClient_cdabg.innerHTML=fullName;
            AdressClient_cdabg.innerHTML=adress;
            TelephoneClient_cdabg.innerHTML=telNumber;
            EmailClient_cdabg.innerHTML=Email;
            date_c_cdabg.innerHTML=formattedDateTime;
            if(selectedStatus==="confirme"){
                verifier_cdabg__cdabg.style.display="none";
                decisionConfirmer__cdabg.style.display="flex";
            }
            verifier_cdabg.addEventListener("click", async (e) => {  
                const clientsCollection = collection(db, 'commands_no_users');
                wt.style.display="flex";


                try {
                    const q = query(clientsCollection, where("commond", "==", "retour"), where("telNumber", "==", telNumber));
                    const querySnapshot = await getDocs(q);
                    
                    if (!querySnapshot.empty) {
                        console.log("Le client existe.");
                        Verification_cdabg.innerHTML = "ce client avec ce numéro de téléphone : " + telNumber + " a au minimum un retour";
                        Verification_cdabg.style.color="red";
                        verifier_cdabg__cdabg.style.display="none";
                        if(selectedStatus==="pending"){
                            decision__cdabg.style.display="flex";
                        }
                        
                        wt.style.display="none";

                    } else {
                        console.log("Le client n'existe pas.");
                        Verification_cdabg.innerHTML="Verifier";
                        Verification_cdabg.style.color="green";
                        verifier_cdabg__cdabg.style.display="none";

                        if(selectedStatus==="pending"){
                            decision__cdabg.style.display="flex";
                        }  

                        wt.style.display="none";
                    }
                } catch (errorFirestore) {
                    console.error("Erreur lors de la vérification du client:", errorFirestore);
                }
            });


            confirmer_cdabg.addEventListener("click", async (e) => {  
                try {
                    await updateCommandStatus(documentId, 'confirme');
                    fetchCommandsData();
                    commend_detailes_admin.style.display="none"
                } catch (error) {
                    console.error("Erreur lors de la mise à jour du document :", error);
                }
            });

            annuler_cdabg.addEventListener("click", async (e) => {  
                try {
                    await updateCommandStatus(documentId, 'annule');
                    fetchCommandsData();
                    commend_detailes_admin.style.display="none"
                } catch (error) {
                    console.error("Erreur lors de la mise à jour du document :", error);
                }
            });
            vender_cdabg.addEventListener("click", async (e) => {  

            });
            retour_cdabg.addEventListener("click", async (e) => {  
                try {
                    await updateCommandStatus(documentId, 'retour');
                    fetchCommandsData();
                    commend_detailes_admin.style.display="none"
                } catch (error) {
                    console.error("Erreur lors de la mise à jour du document :", error);
                }
            });
          
            
        });

     });

     // Si aucune donnée n'est trouvée, affiche un message
     if (commendsBG.innerHTML === '') {
         commendsBG.innerHTML = '<tr><td colspan="3">Aucune donnée disponible</td></tr>';
     }
 }
 // Call the function when the page loads
 window.onload = () => {
     fetchCommandsData(); // Initial fetch
     
     // Add event listener to the select input for filtering
     const selectFilter = document.getElementById('statusFilter');
     selectFilter.addEventListener('change', fetchCommandsData);
 }; 
 fermer_f_cdabg.addEventListener("click", async (e) => {
    e.preventDefault();
    commend_detailes_admin.style.display="none";
});

// Fonction pour mettre à jour le statut de la commande dans Firestore
async function updateCommandStatus(documentId, newStatus) {
    const docRef = doc(db, 'commands_no_users', documentId); // Créez une référence au document
    await updateDoc(docRef, { commond: newStatus}); // Mettez à jour le document avec la nouvelle valeur de commande
}

  