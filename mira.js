const search_backround = document.getElementById('search_backround');
const header = document.getElementById('header');

const normal_nav = document.getElementById('normal_nav');
const search_btn = document.getElementById('search_btn');
const cancel_suggestion_ = document.getElementById('cancel_suggestion_');
const suggestion_background = document.getElementById('suggestion_background');
const button_search_confirm = document.getElementById('button_search_confirm');

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



const stor_home = document.querySelector(".stor_home"); 
const img = document.createElement('img');
img.src = 'img/post_insta9.jpg'; 
img.classList="img_stor_home"
stor_home.appendChild(img);

const stor_home_content= document.createElement("div");
stor_home_content.classList="stor_home_content_classList"
stor_home.appendChild(stor_home_content);

const logo_mira_white_stor_ = document.createElement("img");
logo_mira_white_stor_.classList="logo_mira_white_stor__classList";
logo_mira_white_stor_.src = 'img/MIRA white.png';


const title_stor_ = document.createElement("h1");
title_stor_.classList="title_stor_classList";
title_stor_.innerHTML="DECORATION";

const button_stor_ = document.createElement("button");
button_stor_.classList="custom-btn btn-mira"
button_stor_.innerHTML="voire les produits";

const button_stor_hover = document.createElement("div");
button_stor_hover.classList="button_stor_hover_clas";
button_stor_.appendChild(button_stor_hover);




stor_home_content.appendChild(logo_mira_white_stor_);
stor_home_content.appendChild(title_stor_);
stor_home_content.appendChild(button_stor_);




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
        nav_btn_ser.style.color="black";
        search_btn.style.color="black";
    } else {
        header.style.backgroundColor = "transparent";
        header.style.boxShadow="0 .5rem 1rem #0a0a0a00"
        header.style.transition=" 0.3s ease";
        logo_image.style.opacity="0";
        user_nav.style.color="white";
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




