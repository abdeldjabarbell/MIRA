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




  
  
const  wt = document.getElementById("wt");

const  retourner_au_home = document.getElementById("retourner_au_home");




const  btnn_edit = document.getElementById("btnn_edit");


const  loaderedit = document.getElementById("loaderedit");
const  originaledit = document.getElementById("originaledit");
const  Doneedit = document.getElementById("Doneedit");

const  message_cree_produit = document.getElementById("message_cree_produit");







//-------------------------------- firebase opartions -------------------------
retourner_au_home.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = 'homepage.html';

});

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

// Récupérer l'ID du produit et le nom du magasin à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const selectedId3 = urlParams.get('id');
const selectedId = urlParams.get('store');
const selectedId2 = urlParams.get('collection_pr');


let k = 0;

async function fetchDataAndUpdate() {

    verifier_n_colors();

    try {
        const docRef = doc(db, 'items', selectedId, 'produits', selectedId2, 'produits', selectedId3);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("data :", data);
            const Titreedit_ = data.Titre;
            const Sous_titre_ = data.Sous_titre;
            const Description_ = data.Description;
            const prix_ = data.prix;
            const promotion_ = data.promotion;
            const quantiteproduit_ = data.quantiteproduit;
            const n_colors_in_stock_ = data.colors.length;
            const colors_in_stock_ = data.colors;

            console.log("colors_in_stock_ :", colors_in_stock_);
            const inputs_add_inputs = document.getElementById("inputs_add_inputs");
            inputs_add_inputs.innerHTML="";

            for(let nc=0 ; nc<n_colors_in_stock_ ;nc++){

                const add_colorbg_ = document.createElement("div");
                add_colorbg_.classList.add("inpts_produit");
                add_colorbg_.id="inpts_produit"+(nc+1);
                const color_label = document.createElement("label");
                color_label.textContent = "Couleur " + (nc+1) + ":";
                const color_input = document.createElement("input");
                color_input.type = "color";
                color_input.id="color_input"+(nc+1);
                color_input.value= colors_in_stock_[nc];
                color_input.style.width = "50px";
                color_input.style.height = "50px";
                color_input.style.cursor = "pointer";
                const br = document.createElement("br");
        
                add_colorbg_.appendChild(color_label);
                add_colorbg_.appendChild(color_input);
                add_colorbg_.appendChild(br);
        
                inputs_add_inputs.appendChild(add_colorbg_);
            }

            const idproduitSimilaire_1 = data.idproduit_Similaire1;
            const idproduitSimilaire_2 = data.idproduit_Similaire2;
            const idproduitSimilaire_3 = data.idproduit_Similaire3;
            const idproduitSimilaire_4 = data.idproduit_Similaire4;

            const Titre = document.getElementById("Titre");
            const Soustitre = document.getElementById("Soustitre");
            const Description = document.getElementById("Description");
            const prix = document.getElementById("prix");
            const promotion = document.getElementById("promotion");
            const quantiteproduit = document.getElementById("quantiteproduit");
            const idproduitSimilaire1 = document.getElementById("idproduitSimilaire1");
            const idproduitSimilaire2 = document.getElementById("idproduitSimilaire2");
            const idproduitSimilaire3 = document.getElementById("idproduitSimilaire3");
            const idproduitSimilaire4 = document.getElementById("idproduitSimilaire4");

            Titre.value = Titreedit_;
            Soustitre.value = Sous_titre_;
            Description.value = Description_;
            prix.value = prix_;
            promotion.value = promotion_;
            quantiteproduit.value = quantiteproduit_;
            idproduitSimilaire1.value = idproduitSimilaire_1;
            idproduitSimilaire2.value = idproduitSimilaire_2;
            idproduitSimilaire3.value = idproduitSimilaire_3;
            idproduitSimilaire4.value = idproduitSimilaire_4;

            k = 0; // Resetting k at the end of the block

            return k; // Returning k from the function
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données de la sous-collection :", error);
        // Handle error appropriately, maybe display a message to the user
    }
}

// Call the function and handle the returned value
fetchDataAndUpdate().then((result) => {
    console.log("Value of k:", result); // Use the returned value as needed
}).catch((error) => {
    console.error("An error occurred:", error); // Handle any errors that occur during execution
});





async function verifier_n_colors() {

    let n_colors = 0; // Déclarer la variable n_colors ici

    try {
        const docRef = doc(db, 'items', selectedId, 'produits', selectedId2, 'produits', selectedId3);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("docSnap exists");

            const data = docSnap.data();
            n_colors = data.colors.length;
            const delectcolor = document.getElementById("delectcolor");
            if(n_colors ===0){
                delectcolor.style.display="none";
            }
            if(n_colors >0){
                delectcolor.style.display="block";
            }
            console.log(" docSnap exists n_colors =" +n_colors);
        }
        else{
            n_colors =0;
            console.log("docSnap exists pas  n="+n_colors);
        }

    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }

    return n_colors; // Retourner la valeur de n_colors
}

document.addEventListener('DOMContentLoaded', async function() {
    const addcolor = document.getElementById("addcolor");
    const delectcolor = document.getElementById("delectcolor");
    let colors_in_stock = [];
    let Edit_colors_in_stock = [];

    addcolor.addEventListener('click', async function() {
        let snapshot = await verifier_n_colors(); // Attendre la résolution de la promesse
        console.log("snapshot n : " + snapshot);
        let n_colors = 0;

        n_colors = snapshot +k;
        n_colors++;
        console.log("vouveau n_colors = " + n_colors);
        if (n_colors > 0) {
            delectcolor.style.display = "block";
        }
        addColorInput(n_colors);
    
        k++;
        console.log("k: " + k);
        console.log("-----------------");
    });
    
    delectcolor.addEventListener('click', async function() {
        let s = await verifier_n_colors(); // Attendre la résolution de la promesse
        let n_colors = 0;
        n_colors = s + k;
        console.log("s: " + s);
        console.log("k: " + k);
        console.log("n_colors: " + n_colors);
    
        const id_delet_input = "inpts_produit" + n_colors;
        const element_delet_input = document.getElementById(id_delet_input);
        n_colors--;
        console.log("id - = " + id_delet_input);
    
        if (n_colors === 0) {
            delectcolor.style.display = "none";
        }
        const inputs_add_inputs = document.getElementById("inputs_add_inputs");
        inputs_add_inputs.removeChild(element_delet_input);
    
        k--;
        console.log("k: " + k);
        console.log("-----------------");
    });
    


    async function addColorInput(n_colors) {
        const id_delet_input = "inpts_produit" + n_colors;
        console.log("id: " + id_delet_input);

        const inputs_add_inputs = document.getElementById("inputs_add_inputs");
        const add_colorbg_ = document.createElement("div");
        add_colorbg_.classList.add("inpts_produit");
        add_colorbg_.id="inpts_produit"+n_colors;
        const color_label = document.createElement("label");
        color_label.textContent = "Couleur " + n_colors + ":";
        const color_input = document.createElement("input");
        color_input.type = "color";
        color_input.id="color_input"+n_colors;
        color_input.style.width = "50px";
        color_input.style.height = "50px";
        color_input.style.cursor = "pointer";
        const br = document.createElement("br");

        add_colorbg_.appendChild(color_label);
        add_colorbg_.appendChild(color_input);
        add_colorbg_.appendChild(br);

        inputs_add_inputs.appendChild(add_colorbg_);
    }

    function refreshPage() {
        window.location.replace("homepage.html");

       // window.location.reload(); 
    }

    btnn_edit.addEventListener("click", async (e) => {
        e.preventDefault();
        originaledit.style.display="none"
        loaderedit.style.display="block"
        let n_colors = 0;
        let s = await verifier_n_colors(); // verifier nomber des coleur sur databse si lutilisatur import les donnees 
        n_colors = s+k;

        if (n_colors > 0) {
            for (let i = 0; i < n_colors; i++) {
                var inputid_edit = "color_input" + (i + 1); 
                var inputvalue_edit = document.getElementById(inputid_edit).value;
                Edit_colors_in_stock.push(inputvalue_edit);
            }

                edit_operation();

        } else {
            message_cree_produit.innerHTML="Ajoutez une couleur";
            message_cree_produit.style.color="red";
            originaledit.style.display="block"
            loaderedit.style.display="none"
            const informationproduitBG = document.getElementById("informationproduitBG");
            informationproduitBG.style.borderLeft="2px solid red";
        }
         async function edit_operation() {
            message_cree_produit.innerHTML = "Modification de produit en cours...";
            message_cree_produit.style.color = "green";
        
            try {
        

                
                // Récupération des valeurs des champs de formulaire
                const Titre = document.getElementById("Titre").value;
                const Soustitre = document.getElementById("Soustitre").value;
                const Description = document.getElementById("Description").value;
                const prix = parseFloat(document.getElementById("prix").value);
                const promotion = parseFloat(document.getElementById("promotion").value);
                const quantiteproduit = parseInt(document.getElementById("quantiteproduit").value);

                const idproduitSimilaire1 = document.getElementById("idproduitSimilaire1").value;
                const idproduitSimilaire2 = document.getElementById("idproduitSimilaire2").value;
                const idproduitSimilaire3 = document.getElementById("idproduitSimilaire3").value;
                const idproduitSimilaire4 = document.getElementById("idproduitSimilaire4").value;

                const docRef = doc(db, 'items', selectedId, 'produits', selectedId2, 'produits', selectedId3);
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                    const newData = {
                        Titre: Titre,
                        Sous_titre: Soustitre,
                        Description: Description,
                        prix: prix,
                        promotion: promotion,
                        quantiteproduit: quantiteproduit,
                        colors_number: n_colors,
                        colors: Edit_colors_in_stock,
                        idproduit_Similaire1: idproduitSimilaire1,
                        idproduit_Similaire2: idproduitSimilaire2,
                        idproduit_Similaire3: idproduitSimilaire3,
                        idproduit_Similaire4: idproduitSimilaire4,

                    };
                    await updateDoc(docRef, newData);
                    message_cree_produit.innerHTML = 'Les données de l\'élément ont été mises à jour avec succès. 🛠️';
                    message_cree_produit.style.color = "green";
                    Doneedit.style.display = "block";
                    loaderedit.style.display = "none";
                    const informationproduitBG = document.getElementById("informationproduitBG");
                    informationproduitBG.style.borderLeft="2px solid green";
                    const user = auth.currentUser;
                    if (user) {
                        const userId = user.uid;
                        const userRef = doc(db, "admins", userId);
                        const docSnapshot = await getDoc(userRef);
                        if (docSnapshot.exists()) {
                            const nomAdm = docSnapshot.data().nom;
                            const prenomAdm = docSnapshot.data().prenom;
            
                            const timestamp = serverTimestamp();
                            const notificationsCollectionRef = collection(db, 'notifications'); // Référence à la collection de notifications
                            const notificationData = {
                                title_notif: "🛠️ Produit Modifié", 
                                notification: "🛠️ Un produit a été modifié par l'administrateur " + prenomAdm + " " + nomAdm,
                                timestamp: timestamp,
                            };
                            
                            // Créer le numéro de notification
                            const notifNumberRef = doc(db, "notifications", "notif_number");
                            const notifSnapshot = await getDoc(notifNumberRef);
                            if (notifSnapshot.exists()) {
                                const numero = notifSnapshot.data().numero;
                                const numeroprim = numero + 1;
                                await updateDoc(notifNumberRef, {
                                    numero: numeroprim
                                });
                            }
                            
                            await addDoc(notificationsCollectionRef, notificationData);
    
                        }
                    }
                    setTimeout(() => {
                        refreshPage();
                    }, 1500);

                } else {
                    message_cree_produit.innerHTML = 'L\'élément que vous essayez de mettre à jour n\'existe pas dans la base de données.';
                    message_cree_produit.style.color = "red";
                    Doneedit.style.display = "block";
                    loaderedit.style.display = "none";
                    const informationproduitBG = document.getElementById("informationproduitBG");
                    informationproduitBG.style.borderLeft="2px solid red";
                }

            } catch (error) {
                message_cree_produit.innerHTML = 'Erreur lors du partage du produit: ' + error.message;
                message_cree_produit.style.color = "red";
        
                originaledit.style.display = "block";
                loaderedit.style.display = "none";
                Doneedit.style.display = "none";

                const informationproduitBG = document.getElementById("informationproduitBG");
                informationproduitBG.style.borderLeft="2px solid red";
            }
        }



    });
    
});










