
const tokenCookieName = "accesstoken";
const signoutBtn = document.getElementById("signout-btn");
const RoleCookieName = "role";

signoutBtn.addEventListener("click", signOut);

const apiURL = "http://127.0.0.1:8000/api/";

function getRole(){
    return getCookie(RoleCookieName);
}

function signOut() {
    eraseCookie(tokenCookieName);
    eraseCookie("RoleCookieName");
    globalThis.location.replace("/");
}

function setToken(token) {
    setCookie(tokenCookieName, token, 7); 
    // Le token est stocké pendant 7 jours
}

function getToken(){
    return getCookie(tokenCookieName);
}

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    if(getToken() == null || getToken() == undefined){
        return false;
    }
    else{
        return true;
    }
}

//Rendre apparents ou non des éléments selon le rôle de l'utilisateur
function showAndHideElementsForRoles() {
    const userconnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll("[data-show]");

    allElementsToEdit.forEach(element => {
        const showFor = element.dataset.show;

        let shouldShow = false;

        switch(showFor){
            case 'disconnected':
                shouldShow = !userconnected;
                break;

            case 'connected':
                shouldShow = userconnected;
                break;

            case 'admin':
                if(userconnected && role == "admin"){
                    shouldShow = true;
                }
                break;

            case 'client':
                if(userconnected && role == "client"){
                    shouldShow = true;
                }
                break;
        }

        if(shouldShow){
            element.classList.remove("d-none");
        } else {
            element.classList.add("d-none");
        }
    });
}

//Assainissement des entrées client pour éviter une faille XSS
function sanitizeHtml(text){
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

//Récupération des infos utilisateur
function getInfosUser(){
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch(apiURL+"account/me", requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations de l'utilisateur")
        }
    })
    .then(result => {
        return result;
    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}