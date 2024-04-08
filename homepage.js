



//nav bar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};



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
    window.location.href = 'notification.html';
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




const  fileInput1 = document.getElementById("fileInput1");
const  gallery1 = document.getElementById("gallery1");
const  imagge1 = document.getElementById("imagge1");

//creat stor
fileInput1.addEventListener('change', async function(event) {
    const file = event.target.files[0];

    // Conversion de l'image redimensionnée en URL de données (data URL)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imageUrl = reader.result;
      gallery1.style.display="flex";
      imagge1.innerHTML="";

      // Affichage de l'image dans la galerie
      const img = document.createElement('img');
      img.src = imageUrl;
      imagge1.appendChild(img);
    };
 
 
});
const  p_clicker_ici_modifier = document.getElementById("p_clicker_ici_modifier");
const  p_clicker_ici_creer = document.getElementById("p_clicker_ici_creer");
const  clicker_ici_modifier = document.getElementById("clicker_ici_modifier");
const  clicker_ici_creer = document.getElementById("clicker_ici_creer");
const  cree_une_collection_selctor = document.getElementById("cree_une_collection_selctor");
const  selectioner_un_sotore_stor = document.getElementById("selectioner_un_sotore_stor");
const  fileInpsffffffffffut1 = document.getElementById("fileInput1");
const  Nom_store = document.getElementById("Nom_store");
const  button_partager_store = document.getElementById("button_partager_store");
const  button_modifier_store = document.getElementById("button_modifier_store");
const  message_cree_store = document.getElementById("message_cree_store");



const  p_clicker_ici_modifier_collection = document.getElementById("p_clicker_ici_modifier_collection");
const  p_clicker_ici_creer_collection = document.getElementById("p_clicker_ici_creer_collection");
const  clicker_ici_modifier_collection = document.getElementById("clicker_ici_modifier_collection");
const  clicker_ici_creer_collection = document.getElementById("clicker_ici_creer_collection");
const  selectorcree_une_collection_selector = document.getElementById("selectorcree_une_collection_selector");
const  cree_une_collection_modifier = document.getElementById("cree_une_collection_modifier");
const  Nom_collection = document.getElementById("Nom_collection");
const  button_partager_store_collection = document.getElementById("button_partager_store_collection");
const  button_modifier_store_collection = document.getElementById("button_modifier_store_collection");
const  message_cree_collection_store_collection = document.getElementById("message_cree_collection_store_collection");
const  cree_une_collection_ = document.getElementById("cree_une_collection_");
const watingAccount = document.getElementById("wt");



clicker_ici_modifier.addEventListener("click", async (e) => {
    e.preventDefault();
    p_clicker_ici_modifier.style.display="none";
    p_clicker_ici_creer.style.display="block";
    cree_une_collection_selctor.style.display="block";
    button_modifier_store.style.display="block";
    button_partager_store.style.display="none";
    Nom_store.disabled = true;
    Nom_store.style.opacity="0.4";

});
clicker_ici_creer.addEventListener("click", async (e) => {
    e.preventDefault();
    p_clicker_ici_modifier.style.display="block";
    p_clicker_ici_creer.style.display="none";
    cree_une_collection_selctor.style.display="none"
    button_modifier_store.style.display="none";
    button_partager_store.style.display="block";
    Nom_store.disabled = false;
    Nom_store.style.opacity="1";



});
clicker_ici_modifier_collection.addEventListener("click", async (e) => {
    e.preventDefault();
    p_clicker_ici_modifier_collection.style.display="none";
    p_clicker_ici_creer_collection.style.display="block";
    selectorcree_une_collection_selector.style.display="block";
    button_modifier_store_collection.style.display="block";
    button_partager_store_collection.style.display="none";
});
clicker_ici_creer_collection.addEventListener("click", async (e) => {
    e.preventDefault();
    p_clicker_ici_modifier_collection.style.display="block";
    p_clicker_ici_creer_collection.style.display="none";
    selectorcree_une_collection_selector.style.display="none";
    button_modifier_store_collection.style.display="none";
    button_partager_store_collection.style.display="block";

});


button_partager_store.addEventListener("click", async (e) => {
    e.preventDefault();
    const watingAccount = document.getElementById("wt");
    watingAccount.style.display="block";
    partager_store();

     async function partager_store() {
        message_cree_store.innerHTML = "Opération de la creation du store en cours...";
        message_cree_store.style.color = "green";
    
        const fileInput1 = document.getElementById('fileInput1');
        const file1 = fileInput1.files[0];
    
        try {

            const storageRef1 = ref(storage, 'images/' + file1.name);
            await uploadBytes(storageRef1, file1);
            const downloadURL1 = await getDownloadURL(storageRef1);

            
            // Récupération des valeurs des champs de formulaire
            const Nom_store = document.getElementById("Nom_store").value;


             // Enregistrement des données dans Firestore
             const docRef = await setDoc(doc(db, 'items', Nom_store), {
                 Nom_store: Nom_store,
                 image_couverture: downloadURL1,
                 timestamp: serverTimestamp()
             });
             


    


            message_cree_store.innerHTML = 'Le STORE "'+Nom_store+'" a été partagé sur MIRA store';
            message_cree_store.style.color = "green";
    
            watingAccount.style.display = "none";
 
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
                        title_notif: "🏬 Nouveau magasin", 
                        notification : "🎉 Nouveau magasin 🏬 " + Nom_store + " créé par l'administrateur " + prenomAdm + " " + nomAdm,
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
                window.location.reload(); 
            }, 1300);
        } catch (error) {
            message_cree_store.innerHTML = 'Erreur lors du partage du produit: ' + error.message;
            message_cree_store.style.color = "red";
            watingAccount.style.display = "none";


        }
    }
});

// Fonction pour ajouter des options à un select
function addOption(select, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
}
const querySnap = await getDocs(collection(db, 'items'));
querySnap.forEach((doc) => {
    // Ajouter les options au premier select
    addOption(selectioner_un_sotore_stor, doc.id, doc.id);

});
selectioner_un_sotore_stor.addEventListener('change', async function () {
    const selectedId1 = selectioner_un_sotore_stor.value;
    console.log("selectedId1 = "+selectedId1);

    const  Nom_store = document.getElementById("Nom_store");
    Nom_store.value = "";
    imagge1.innerHTML = "";
    try {
        const docRef = doc(db, 'items', selectedId1);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            gallery1.style.display="block"
            const data = docSnap.data();
            console.log("data :", data);
            const image_couverture = data.image_couverture;
            console.log("image_couverture = "+image_couverture);
            const imgeditcouverture = document.createElement("img");
            imgeditcouverture.src=image_couverture;
            imagge1.appendChild(imgeditcouverture);
        }
        else{
            gallery1.style.display="none"

        }
    } catch (error) {
        
        console.error("Erreur lors de la récupération des données de la sous-collection :", error);
    }
});
button_modifier_store.addEventListener("click", async (e) => {
    e.preventDefault();
    watingAccount.style.display="block";
    const selec1 = selectioner_un_sotore_stor.value;
    edit_stor_oprration();
     async function edit_stor_oprration() {
        message_cree_store.innerHTML = "Modification de store en cours...";
        message_cree_store.style.color = "green";
    
        const fileInput1 = document.getElementById('fileInput1');
        const file1 = fileInput1.files[0];
    
        try {
            // Upload des images dans le stockage Firebase
            const storageRef1 = ref(storage, 'images/' + file1.name);
            await uploadBytes(storageRef1, file1);
            // Récupération des URLs de téléchargement des images
            const downloadURL1 = await getDownloadURL(storageRef1);

            const docRef = doc(db, 'items', selec1);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const newData = {
                    image_couverture: downloadURL1,
                };
                await updateDoc(docRef, newData);

                message_cree_store.innerHTML = 'Les données de l\'élément ont été mises à jour avec succès. 🛠️';
                message_cree_store.style.color = "green";
                watingAccount.style.display = "none";

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
                            title_notif: "🔧 Magasin Modifié", 
                            notification: "🔧 Le Magasin de '"+selec1+"'  a été modifié par l'administrateur " + prenomAdm + " " + nomAdm,
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













const querySnapshot = await getDocs(collection(db, 'items'));
querySnapshot.forEach((doc) => {
    // Ajouter les options au premier select
    addOption(cree_une_collection_, doc.id, doc.id);

});
cree_une_collection_.addEventListener('change', async function () {
    const selectedId1 = cree_une_collection_.value;
    const  Nom_collection = document.getElementById("Nom_collection");
    Nom_collection.value = "";

    // Effacer les options précédentes du troisième select
    cree_une_collection_modifier.innerHTML = '<option value="" selected disabled>Choisir une collection</option>';

    // Récupérer les identifiants de la sous-collection correspondante
    try {

        const querySnapshot = await getDocs(collection(db, 'items', selectedId1, 'produits'));
        querySnapshot.forEach((doc) => {
            // Ajouter les options au troisième select
            addOption(cree_une_collection_modifier, doc.id, doc.id);            

        });
    } catch (error) {
        
        console.error("Erreur lors de la récupération des données de la sous-collection :", error);
    }
});

cree_une_collection_modifier.addEventListener('change', function () {
    const selectedId2 = cree_une_collection_modifier.value;
    Nom_collection.value = selectedId2;
});
button_partager_store_collection.addEventListener("click", async (e) => {
    e.preventDefault();
    const watingAccount = document.getElementById("wt");
    watingAccount.style.display="block";
    const selectedId1 = cree_une_collection_.value;
    partager_store_collection();
    
     async function partager_store_collection() {
        message_cree_collection_store_collection.innerHTML = "Opération de la creation du colletion en cours...";
        message_cree_collection_store_collection.style.color = "green";  
        try {
            const Nom_collection = document.getElementById("Nom_collection").value;
            const docRef = await setDoc(doc(db, 'items', selectedId1,'produits',Nom_collection), {
                 Nom_collection: Nom_collection,
                 timestamp: serverTimestamp()
             });

            message_cree_collection_store_collection.innerHTML = 'La collection  "'+Nom_collection+'" pour le magasine "'+selectedId1+'" a été partagé sur MIRA store';
            message_cree_collection_store_collection.style.color = "green";
            watingAccount.style.display = "none";
 
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
                        title_notif: "🛍️ Nouveau colletion", 
                        notification :prenomAdm +" "+nomAdm+ " a créé une nouvelle collection '"+Nom_collection+"' dans le magasin : " + selectedId1,
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
                window.location.reload(); 
            }, 1300);
        } catch (error) {
            message_cree_store.innerHTML = 'Erreur lors du partage du produit: ' + error.message;
            message_cree_store.style.color = "red";
            watingAccount.style.display = "none";


        }
    }
});

















