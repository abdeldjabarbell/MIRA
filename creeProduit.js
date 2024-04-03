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

const  AjouterProduitForm = document.getElementById("AjouterProduitForm");

const  retourner_au_home = document.getElementById("retourner_au_home");

const  select_action = document.getElementById("select_action");

const  typeproduit = document.getElementById("typeproduit");
const  produitcollection = document.getElementById("produitcollection");
const  produitselect = document.getElementById("produitselect");

const  fileInput1 = document.getElementById("fileInput1");
const  gallery1 = document.getElementById("gallery1");
const  imagge1 = document.getElementById("imagge1");

const  fileInput2 = document.getElementById("fileInput2");
const  gallery2 = document.getElementById("gallery2");
const  imagge2 = document.getElementById("imagge2");

const  fileInput3 = document.getElementById("fileInput3");
const  gallery3 = document.getElementById("gallery3");
const  imagge3 = document.getElementById("imagge3");

const  fileInput4 = document.getElementById("fileInput4");
const  gallery4 = document.getElementById("gallery4");
const  imagge4 = document.getElementById("imagge4");


const  btnn_save = document.getElementById("btnn_save");
const  btnn_edit = document.getElementById("btnn_edit");

const  originalpartager = document.getElementById("originalpartager");
const  loaderpartager = document.getElementById("loaderpartager");
const  Donepartager = document.getElementById("Donepartager");

const  loaderedit = document.getElementById("loaderedit");
const  originaledit = document.getElementById("originaledit");
const  Doneedit = document.getElementById("Doneedit");

const  message_cree_produit = document.getElementById("message_cree_produit");




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
fileInput2.addEventListener('change', async function(event) {
    const file = event.target.files[0];

    // Conversion de l'image redimensionnée en URL de données (data URL)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imageUrl = reader.result;
      gallery2.style.display="flex";
      imagge2.innerHTML="";

      // Affichage de l'image dans la galerie
      const img = document.createElement('img');
      img.src = imageUrl;
      imagge2.appendChild(img);
    };
 
 
});
fileInput3.addEventListener('change', async function(event) {
    const file = event.target.files[0];

    // Conversion de l'image redimensionnée en URL de données (data URL)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imageUrl = reader.result;
      gallery3.style.display="flex";
      imagge3.innerHTML="";

      // Affichage de l'image dans la galerie
      const img = document.createElement('img');
      img.src = imageUrl;
      imagge3.appendChild(img);
    };
 
 
});
fileInput4.addEventListener('change', async function(event) {
    const file = event.target.files[0];

    // Conversion de l'image redimensionnée en URL de données (data URL)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imageUrl = reader.result;
      gallery4.style.display="flex";
      imagge4.innerHTML="";
      // Affichage de l'image dans la galerie
      const img = document.createElement('img');
      img.src = imageUrl;
      imagge4.appendChild(img);
    };
 
 
});

select_action.addEventListener('change', async function(event) {
    if (select_action.value === "ajouter") {
        btnn_save.style.display = "block";
        btnn_edit.style.display = "none";
        produitselect.style.display = "none";

    }
    else if (select_action.value === "modifier") {
        btnn_save.style.display = "none"; 
        btnn_edit.style.display = "block";
        produitselect.style.display = "block";
    }
});


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


// Fonction pour ajouter des options à un select
function addOption(select, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
}

// Lorsque la page est chargée
document.addEventListener('DOMContentLoaded', async function () {
    // Récupérer les identifiants de la première collection
    try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        querySnapshot.forEach((doc) => {
            // Ajouter les options au premier select
            addOption(typeproduit, doc.id, doc.id);
        });
    } catch (error) {
        message_cree_produit.innerHTML="Erreur lors de la récupération des données :"+ error;
        message_cree_produit.style.color="red";
        originalpartager.style.display="block"
        loaderpartager.style.display="none"
    }
});

// Lorsque l'utilisateur sélectionne un identifiant dans le premier select
typeproduit.addEventListener('change', async function () {
    const selectedId = typeproduit.value;
    // Effacer les options précédentes du deuxième select
    produitcollection.innerHTML = '<option value="" selected disabled>Choisir une ollection</option>';

    // Récupérer les identifiants de la sous-collection correspondante
    try {
        const querySnapshot = await getDocs(collection(db, 'items', selectedId, 'produits'));
        querySnapshot.forEach((doc) => {
            // Ajouter les options au deuxième select
            addOption(produitcollection, doc.id, doc.id);
        });
    } catch (error) {
        message_cree_produit.innerHTML="Erreur lors de la récupération des données de la sous-collection :"+ error;
        message_cree_produit.style.color="red";
        originalpartager.style.display="block"
        loaderpartager.style.display="none"
    }
});

// Lorsque l'utilisateur sélectionne un identifiant dans le deuxième select
produitcollection.addEventListener('change', async function () {
    const selectedId2 = produitcollection.value;
    const selectedId = typeproduit.value;

    // Effacer les options précédentes du troisième select
    produitselect.innerHTML = '<option value="" selected disabled>Choisir un produit</option>';

    // Récupérer les identifiants de la sous-collection correspondante
    try {
        const querySnapshot = await getDocs(collection(db, 'items', selectedId, 'produits', selectedId2, 'produits'));
        querySnapshot.forEach((doc) => {
          const prenomAdm = doc.data().Titre;
            // Ajouter les options au troisième select
            addOption(produitselect, doc.id, prenomAdm);

        });
    } catch (error) {
        
        console.error("Erreur lors de la récupération des données de la sous-collection :", error);
    }
});

produitselect.addEventListener('change', async function () {
    const selectedId3 = produitselect.value;
    const selectedId2 = produitcollection.value;
    const selectedId = typeproduit.value;


    try {
        const querySnapshot = await getDocs(collection(db, 'items', selectedId, 'produits', selectedId2, 'produits'), selectedId3);
        querySnapshot.forEach((doc) => {
            const data = doc.data(); // Stocker les données du document dans une variable pour éviter de répéter doc.data()

            const Titreedit_ = data.Titre;
            const Sous_titre_ = data.Sous_titre;
            const Description_ = data.Description;
            const prix_ = data.prix;
            const promotion_ = data.promotion;
            const quantiteproduit_ = data.quantiteproduit;
            const colors_in_stock_ = data.colors_in_stock;
            const colors_number_ = data.colors_number;
            const idproduitSimilaire_1 = data.idproduitSimilaire1;
            const idproduitSimilaire_2 = data.idproduitSimilaire2;
            const idproduitSimilaire_3 = data.idproduitSimilaire3;
            const downloadURL_1 = data.imageUrl_produit_1; 
            const downloadURL_2 = data.imageUrl_produit_2;
            const downloadURL_3 = data.imageUrl_produit_3;
            const downloadURL_4 = data.imageUrl_produit_4;


            const Titre = document.getElementById("Titre");
            const Soustitre = document.getElementById("Soustitre");
            const Description = document.getElementById("Description");
            const prix = document.getElementById("prix");
            const promotion = document.getElementById("promotion");
            const quantiteproduit = document.getElementById("quantiteproduit");
            const idproduitSimilaire1 = document.getElementById("idproduitSimilaire1");
            const idproduitSimilaire2 = document.getElementById("idproduitSimilaire2");
            const idproduitSimilaire3 = document.getElementById("idproduitSimilaire3");

            Titre.value=Titreedit_;
            Soustitre.value=Sous_titre_;
            Description.value=Description_;
            prix.value=prix_;
            promotion.value=promotion_;
            quantiteproduit.value=quantiteproduit_;
            idproduitSimilaire1.value=idproduitSimilaire_1;
            idproduitSimilaire2.value=idproduitSimilaire_2;
            idproduitSimilaire3.value=idproduitSimilaire_3;
            console.log("data image 1 :", downloadURL_1);

            // Récupérer les éléments de la galerie d'images
            const gallery1 = document.getElementById('gallery1');
            const gallery2 = document.getElementById('gallery2');
            const gallery3 = document.getElementById('gallery3');
            const gallery4 = document.getElementById('gallery4');

            const imagge1 = document.getElementById('imagge1');
            const imagge2 = document.getElementById('imagge2');
            const imagge3 = document.getElementById('imagge3');
            const imagge4 = document.getElementById('imagge4');

            // Créer et ajouter les éléments img à chaque galerie
            const imgElement1 = document.createElement('img');
            imgElement1.src = downloadURL_1;
            const imgElement2 = document.createElement('img');
            imgElement2.src = downloadURL_2;
            const imgElement3 = document.createElement('img');
            imgElement3.src = downloadURL_3;
            const imgElement4 = document.createElement('img');
            imgElement4.src = downloadURL_4;

            // Afficher les galeries et mettre à jour les images
            gallery1.style.display = "flex";
            imagge1.innerHTML = ''; 
            imagge1.appendChild(imgElement1);
            gallery2.style.display = "flex";
            imagge2.innerHTML = ''; 
            imagge2.appendChild(imgElement2);
            gallery3.style.display = "flex";
            imagge3.innerHTML = ''; 
            imagge3.appendChild(imgElement3);
            gallery4.style.display = "flex";
            imagge4.innerHTML = ''; 
            imagge4.appendChild(imgElement4);


            


        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données de la sous-collection :", error);
    }


});



document.addEventListener('DOMContentLoaded', function() {
    const addcolor = document.getElementById("addcolor");
    const delectcolor = document.getElementById("delectcolor");
    let colors_in_stock = [];
    let n_colors = 0;
    
    if(n_colors=0){
        delectcolor.style.display="none"
    }
    if(n_colors>0){
        delectcolor.style.display="flex"
    }

    addcolor.addEventListener('click', function(event) {
        n_colors++;
        addColorInput();
    });

    delectcolor.addEventListener('click', function(event) {
        if (n_colors > 0) {
            const lastColor = document.getElementById("add_colorbg_" + n_colors);
            lastColor.remove();
            n_colors--;
        }

    });

    function addColorInput() {
        const inputs_add_inputs = document.getElementById("inputs_add_inputs");
        const add_colorbg_ = document.createElement("div");
        add_colorbg_.classList.add("inpts_produit");
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

    btnn_save.addEventListener("click", async (e) => {
        e.preventDefault();
        originalpartager.style.display="none"
        loaderpartager.style.display="block"
        const selec1 = typeproduit.value;
        const selec2 = produitcollection.value;
        console.log( "select:"+selec1+";"+selec2+";");
        if (n_colors > 0) {
            for (let i = 0; i < n_colors; i++) {
                var inputid = "color_input" + (i + 1); 
                var inputvalue = document.getElementById(inputid).value;
                colors_in_stock.push(inputvalue);
            }
            console.log(colors_in_stock);
            if(selec2==="collection du produit"){
                message_cree_produit.innerHTML="choisir une collection pour votre  produit";
                message_cree_produit.style.color="red";
                originalpartager.style.display="block"
                loaderpartager.style.display="none"
            }
            else{
                uploadImage();
            }

        } else {
            message_cree_produit.innerHTML="Ajoutez une couleur";
            message_cree_produit.style.color="red";
            originalpartager.style.display="block"
            loaderpartager.style.display="none"
        }
         //------------- photos produits
         async function uploadImage() {
            message_cree_produit.innerHTML = "Opération de partage de produit en cours...";
            message_cree_produit.style.color = "green";
        
            const fileInput1 = document.getElementById('fileInput1');
            const file1 = fileInput1.files[0];
            const fileInput2 = document.getElementById('fileInput2');
            const file2 = fileInput2.files[0];
            const fileInput3 = document.getElementById('fileInput3');
            const file3 = fileInput3.files[0];
            const fileInput4 = document.getElementById('fileInput4');
            const file4 = fileInput4.files[0];
        
            try {
        
                // Upload des images dans le stockage Firebase
                const storageRef1 = ref(storage, 'images/' + file1.name);
                await uploadBytes(storageRef1, file1);
                const storageRef2 = ref(storage, 'images/' + file2.name);
                await uploadBytes(storageRef2, file2);
                const storageRef3 = ref(storage, 'images/' + file3.name);
                await uploadBytes(storageRef3, file3);
                const storageRef4 = ref(storage, 'images/' + file4.name);
                await uploadBytes(storageRef4, file4);
        
                // Récupération des URLs de téléchargement des images
                const downloadURL1 = await getDownloadURL(storageRef1);
                const downloadURL2 = await getDownloadURL(storageRef2);
                const downloadURL3 = await getDownloadURL(storageRef3);
                const downloadURL4 = await getDownloadURL(storageRef4);
                
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
                
                // Enregistrement des données dans Firestore
                const docRef = await addDoc(collection(db, 'items', selec1, 'produits', selec2, 'produits'), {
                    Titre: Titre,
                    Sous_titre: Soustitre,
                    Description: Description,
                    prix: prix,
                    promotion: promotion,
                    quantiteproduit: quantiteproduit,
                    colors_number: n_colors,
                    colors: colors_in_stock,
                    etoile: 0,
                    idproduit_Similaire1: idproduitSimilaire1,
                    idproduit_Similaire2: idproduitSimilaire2,
                    idproduit_Similaire3: idproduitSimilaire3,
                    imageUrl_produit_1: downloadURL1,
                    imageUrl_produit_2: downloadURL2,
                    imageUrl_produit_3: downloadURL3,
                    imageUrl_produit_4: downloadURL4,
                    timestamp: serverTimestamp()
                });
        


                message_cree_produit.innerHTML = 'Le produit a été partagé sur MIRA store';
                message_cree_produit.style.color = "green";
        
                Donepartager.style.display = "block";
                loaderpartager.style.display = "none";
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
                            title_notif: "🚀 Nouveau produit", 
                            notification: "🚀 Nouveau produit partagé par l'administrateur " + prenomAdm + " " + nomAdm,
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
                }, 1300);
            } catch (error) {
                message_cree_produit.innerHTML = 'Erreur lors du partage du produit: ' + error.message;
                message_cree_produit.style.color = "red";
        
                originalpartager.style.display = "block";
                loaderpartager.style.display = "none";
                Donepartager.style.display = "none";

                const informationproduitBG = document.getElementById("informationproduitBG");
                informationproduitBG.style.borderLeft="2px solid red";
            }
        }
        
         
           

            

    
    
    });



    






    function refreshPage() {
        window.location.reload(); 
    }

    
});












