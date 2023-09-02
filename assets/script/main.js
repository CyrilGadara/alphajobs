if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/sw.js", { scope: "/alphajobs" })
        .then((result) => {
            console.log("Service Workers Registered Successfully");
            console.log(`Scope: ${result.scope}`);
        })
        .catch((error) => {
            console.log("Service Worker Registration Failed");
            console.log(error);
        });
} else {
    console.log("Service Workers Not Supported");
}

let installEvent;

window.addEventListener("beforeinstallprompt", (event) => {
    console.log("Before Install Prompt");
    installEvent = event;

    event.preventDefault();
    document.querySelector("#addToHomeScreen").style.display = "flex";
});

function hidePrompt() {
    document.querySelector("#addToHomeScreen").style.display = "none";
}

function installApp() {
    hidePrompt();
    installEvent.prompt();
    installEvent.userChoice.then((result) => {
        if (result.outcome === "accepted") {
            console.log("App Installed");
        } else {
            console.log("Failed to install app");
        }
    });
}

window.addEventListener("appinstalled", (event) => {
    console.log("App Already Installed");
});
