/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

let isOnline = true;

const popUp = document.querySelector("#connection-pop-up") as HTMLDivElement;
const reconnectBtn = document.querySelector("#connection-pop-up button") as HTMLDivElement;
let connectionInterval: NodeJS.Timer;
let time = 10;

const statusPopUp = () => {
    if (!isOnline) {
        popUp.querySelector("h2")!.innerText = "Lost Connection";
        popUp.querySelector<HTMLSpanElement>("#info")!.innerText = "Your internet connection is unavailable.";
        popUp.querySelector("#timer")!.innerHTML = `Reconnecting in <strong>10</strong> seconds.`;
        popUp.classList.remove("pop-up-success");
        popUp.classList.add("pop-up-shown");
    } else {
        if (popUp.className.includes("pop-up-shown")) {
            popUp.querySelector("h2")!.innerText = "Connection Restored";
            popUp.querySelector<HTMLSpanElement>("#info")!.innerText = "Your are now connected to network.";
            popUp.querySelector("#timer")!.innerHTML = "";
            popUp.classList.add("pop-up-success");
            setTimeout(() => popUp.classList.remove("pop-up-shown"), 1500);
        }
        return;
    }
    connectionInterval = setInterval(() => {
        time--;
        if (time < 0) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            checkConnection();
            time = 10;
        }
        document.querySelector<HTMLSpanElement>("#connection-pop-up strong")!.innerText = String(time);
    }, 1000);
};

const checkConnection = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/albums/1");
        isOnline = res.status >= 200 && res.status < 300;
    } catch {
        isOnline = false;
    }
    time = 10;
    clearInterval(connectionInterval);
    statusPopUp();
};

setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);
