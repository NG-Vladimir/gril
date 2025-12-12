const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const submit = document.getElementById("submit");
const datetimeInput = document.getElementById("datetime");
const fullnameInput = document.getElementById("fullname");
const phoneInput = document.getElementById("phone");

// Автоподстановка кода телефона и форматирование +375(XX)XXX-XX-XX
phoneInput.value = "+375";
phoneInput.addEventListener("input", () => {
    let digits = phoneInput.value.replace(/\D/g, ''); // оставляем только цифры
    if (!digits.startsWith('375')) digits = '375';

    let formatted = '+375';
    if (digits.length > 3) formatted += '(' + digits.slice(3, 5);
    if (digits.length >= 5) formatted += ')' + digits.slice(5, 8);
    if (digits.length >= 8) formatted += '-' + digits.slice(8, 10);
    if (digits.length >= 10) formatted += '-' + digits.slice(10, 12);

    phoneInput.value = formatted;
});

// Открытие модального окна
openModal.onclick = () => {
    modal.classList.add("active");

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    datetimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Закрытие модалки при клике вне контента
modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
};

// Сбор данных и проверка перед отправкой
submit.onclick = () => {
    const data = {
        fullname: fullnameInput.value.trim(),
        phone: phoneInput.value.trim(),
        datetime: datetimeInput.value
    };

    if (!data.fullname || !data.phone || !data.datetime) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Проверка на корректную длину номера: +375(XX)XXX-XX-XX = 16 символов
    if (data.phone.length !== 16) {
        alert("Введите корректный номер телефона, например +375(33)334-13-92");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(data);
    localStorage.setItem("orders", JSON.stringify(orders));

    console.log("DATA:", data);
    alert("Данные сохранены!");
    modal.classList.remove("active");

    fullnameInput.value = "";
    phoneInput.value = "+375";
    datetimeInput.value = "";
};