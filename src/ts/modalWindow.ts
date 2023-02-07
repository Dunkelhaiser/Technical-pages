export {};

const modalOverlay = document.querySelectorAll(".overlay");
const modalWindow = document.querySelectorAll(".modal-window");
const modalCloseBtn = document.querySelectorAll(".close-modal");
const modalOpenBtn = document.querySelectorAll(".open-modal");

const openModal = (i: number) => {
    modalOverlay[i].classList.remove("hidden");
    modalWindow[i].classList.remove("hidden");
};
const closeModal = (i: number) => {
    modalOverlay[i].classList.add("hidden");
    modalWindow[i].classList.add("hidden");
};

modalOpenBtn.forEach((btn, index) => btn.addEventListener("click", () => openModal(index)));

modalCloseBtn.forEach((btn, index) => btn.addEventListener("click", () => closeModal(index)));

modalOverlay.forEach((btn, index) => btn.addEventListener("click", () => closeModal(index)));

modalOverlay.forEach((_btn, index) =>
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modalWindow[index].classList.contains("hidden")) closeModal(index);
    })
);
