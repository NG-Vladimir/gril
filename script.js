const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const submit = document.getElementById("submit");

openModal.onclick = () => {
    modal.classList.add("active");
};

modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
};

submit.onclick = () => {
    const data = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
    };

    console.log("DATA:", data);

    alert("Данные сохранены!");
    modal.classList.remove("active");
};