



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
const titlenumberCommands = document.getElementById("titlenumberCommands");
const notifbtn = document.getElementById("notifbtn");
const commandsbtn = document.getElementById("commandsbtn");
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

// Référence à la barre de recherche
const searchInput = document.getElementById("searchInput");

// Ajout d'un gestionnaire d'événements pour écouter les modifications dans la barre de recherche
searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase(); // Convertir le texte de recherche en minuscules
    // Boucle à travers tous les produits pour les filtrer en fonction du texte de recherche
    const produits = document.querySelectorAll(".produit_in_home");
    produits.forEach(produit => {
        const title = produit.querySelector(".title__sub h3").textContent.toLowerCase(); // Titre du produit
        const sousTitle = produit.querySelector(".title__sub p").textContent.toLowerCase(); // Sous-titre du produit

        // Afficher ou masquer le produit en fonction du texte de recherche
        if (title.includes(searchText) || sousTitle.includes(searchText)) {
            produit.style.display = "flex"; // Afficher le produit
        } else {
            produit.style.display = "none"; // Masquer le produit
        }
    });
});
const loader_for_produit = document.getElementById("loader_for_produit");
// Fonction asynchrone pour exécuter le code
const fetchData = async () => {
    loader_for_produit.style.display="flex";
    // Référence à la collection principale dans Firestore
    const querySnapshot = await getDocs(collection(db, 'items'));
    

    // Boucle for...of pour parcourir les documents de la collection principale
    for (const doc of querySnapshot.docs) {
        const id = doc.id; 
        console.log("ID de l'élément principal:", id);
        
        // Référence à la sous-collection 'produits' pour chaque document de la collection principale
        const subCollectionQuery = await getDocs(collection(db, 'items', id, 'produits'));
        
        // Boucle for...of pour parcourir les documents de la sous-collection 'produits'
        for (const subDoc of subCollectionQuery.docs) {
            const subId = subDoc.id; 
            console.log("ID du collection :", subId);

            const subCollectionQuery_ = await getDocs(collection(db, 'items', id, 'produits',subId, 'produits'));
        
            // Boucle for...of pour parcourir les documents de la sous-collection 'produits'
            for (const subDoc of subCollectionQuery_.docs) {
                const sub_pId = subDoc.id; 
                const data = subDoc.data(); // Récupérer toutes les données du document
            
                const image1 = data.imageUrl_produit_1; 
                const title = data.Titre;
                const soustitle = data.Sous_titre;
                const quantiteproduit = data.quantiteproduit;
                const promotion = data.promotion;


            

                console.log("ID du produit :", sub_pId);
                console.log("Image du produit :", image1);
            
                // Création des éléments HTML

                const toutLesproduitBG = document.querySelector(".toutLesproduitBG");

 

                const produit_in_home = document.createElement("div");
                produit_in_home.className = "produit_in_home";
                if(quantiteproduit<10){
                    produit_in_home.style.backgroundColor="#ffbebe";
                } 
                if(promotion>0){
                    produit_in_home.style.borderRight= "10px solid orange";
                }
                const imgProduit = document.createElement("div");
                imgProduit.className = "imgProduit";
                const imgProduitimg = document.createElement("img");
                imgProduitimg.src = image1;
                imgProduit.appendChild(imgProduitimg);
                produit_in_home.appendChild(imgProduit);
            
                const title__sub = document.createElement("div");
                title__sub.className = "title__sub";
                const titleHeading = document.createElement("h3");
                titleHeading.textContent = title;
                title__sub.appendChild(titleHeading);

                const SoustitleHeading = document.createElement("p");
                SoustitleHeading.textContent = soustitle;
                title__sub.appendChild(SoustitleHeading);

                
                const IdleHeading = document.createElement("p");
                IdleHeading.textContent = sub_pId;
                title__sub.appendChild(IdleHeading);

                produit_in_home.appendChild(title__sub);

                const btn_cop = document.createElement("button");
                btn_cop.className = "copy_id_home";
                const btn_cop_i = document.createElement("i");
                btn_cop_i.className = "bx bx-copy";
                btn_cop.appendChild(btn_cop_i);
                produit_in_home.appendChild(btn_cop);

                    // Ajout d'un gestionnaire d'événements pour copier l'ID du produit au clic
                btn_cop.addEventListener("click", function() {
                    // Copier l'ID du produit dans le presse-papiers
                    navigator.clipboard.writeText(sub_pId)
                        .then(() => {
                            IdleHeading.style.color="orange";
                            IdleHeading.style.transition="0.5s ease";
                            btn_cop_i.style.color="orange";
                            btn_cop_i.style.transition="0.5s ease";
                            setTimeout(function() {
                                btn_cop_i.style.color="green";
                                IdleHeading.style.color="black";


                            }, 2000); // 3000 milliseconds = 3 seconds                            

                        })
                        .catch(err => {
                            console.error("Erreur lors de la copie de l'ID du produit :", err);
                            alert("Erreur lors de la copie de l'ID du produit. Veuillez réessayer !");
                        });
                });

                toutLesproduitBG.appendChild(produit_in_home);

                title__sub.addEventListener('click', () => {
                    window.location.href = `updateproduct.html?store=${id}&collection_pr=${subId}&id=${sub_pId}`; 
                }); 
                imgProduit.addEventListener('click', () => {
                    window.location.href = `updateproduct.html?store=${id}&collection_pr=${subId}&id=${sub_pId}`; 
                }); 

            }
            
        }
    }
};

// Appel de la fonction fetchData() pour récupérer les données
fetchData().then(() => {
    // Changer le display du loader une fois que fetchData() est terminé
    loader_for_produit.style.display = "none"; // Supposons que loader_for_produit est l'élément qui représente le loader
}).catch(error => {
    // En cas d'erreur lors de l'exécution de fetchData()
    console.error("Une erreur s'est produite lors de la récupération des données :", error);
    // Tu peux également ajouter ici un code pour gérer l'erreur, comme afficher un message d'erreur à l'utilisateur
});



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

const commandsnumberRef = doc(db, "commands_no_users", "n_comm_notif");
const comDocSnapshot = await getDoc(commandsnumberRef);
if (comDocSnapshot.exists()) {
    const num_notifcomm = comDocSnapshot.data().num_notifcomm;
    if(num_notifcomm===0){
        titlenumberCommands.style.display="none";
    }else{
        titlenumberCommands.innerText= num_notifcomm;
        titlenumberCommands.style.display="flex";
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

commandsbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const notifinumberRef = doc(db, "commands_no_users", "n_comm_notif");
    var numeroprim = 0;
    await updateDoc(notifinumberRef, {
        num_notifcomm: numeroprim
    });
    window.location.href = 'commends.html';
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



const  anuller_modification_store = document.getElementById("anuller_modification_store");
const  cree_stor_btn = document.getElementById("cree_stor_btn");
const  cree_stor_in_mira_bg = document.getElementById("cree_stor_in_mira_bg");


anuller_modification_store.addEventListener("click", async (e) => {
    e.preventDefault();
    cree_stor_in_mira_bg.style.display="none";

});

cree_stor_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    cree_stor_in_mira_bg.style.display="block";

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
            const Nom_store_ = document.getElementById("Nom_store").value;
            const Nom_store = convertToLowerCase(Nom_store_);



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
function convertToLowerCase(text) {
    return text.toLowerCase();
}












const querySnapshot = await getDocs(collection(db, 'items'));
querySnapshot.forEach((doc) => {
    // Ajouter les options au premier select
    addOption(cree_une_collection_, doc.id, doc.id);

});
cree_une_collection_.addEventListener('change', async function () {
    const selectedId1 = cree_une_collection_.value;
    const  Nom_collection_ = document.getElementById("Nom_collection");
    const Nom_collection = convertToLowerCase(Nom_collection_);

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
            const Nom_collection_ = document.getElementById("Nom_collection").value;
            const Nom_collection = convertToLowerCase(Nom_collection_);

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













ScrollReveal().reveal('.produit_in_home', {
    origin: 'top',
    reset: true,
    distance: '40px',
    duration: 1500,
    delay: 200,
    interval: 200 // Pour animer les éléments l'un après l'autre
});



