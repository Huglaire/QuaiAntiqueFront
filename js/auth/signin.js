console.log("VERSION SIGNIN 17/06");

const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials() {
    // Appel à l'API pour vérifier les credentials
    const dataForm = new FormData(signinForm);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": dataForm.get("email"),
        "password": dataForm.get("mdp")
});

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

console.log("apiURL =", apiURL);

fetch(apiURL + "login", requestOptions)

    fetch(apiURL+"login", requestOptions)
    .then((response) => {
        if(response.ok){
            return response.json();
        }
        else{
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
        }
    })
    .then((result) => {
        const token = result.apiToken;
        setToken(token);
        setCookie(RoleCookieName, result.roles[0], 7);
        globalThis.location.replace("/");
    })
    .catch((error) => console.error(error));
}