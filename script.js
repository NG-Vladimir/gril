const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const orderForm = document.getElementById("orderForm");
const datetimeInput = document.getElementById("datetime");
const fullnameInput = document.getElementById("fullname");
const phoneInput = document.getElementById("phone");

// Префикс +375 фиксирован
phoneInput.value = "+375(";

// Фокус на телефоне
phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value.startsWith("+375(")) phoneInput.value = "+375(";
    setTimeout(() => phoneInput.selectionStart = phoneInput.selectionEnd = phoneInput.value.length, 0);
});

// Маска телефона: можно полностью стирать после +375
phoneInput.addEventListener("input", () => {
    let cursorPos = phoneInput.selectionStart;
    let value = phoneInput.value;

    // Убираем все кроме цифр после +375
    let digits = value.replace(/\D/g, '');
    if (!digits.startsWith("375")) digits = "375";

    digits = digits.slice(0,12);

    let formatted = "+375";
    if (digits.length > 3) formatted += "(" + digits.slice(3,5);
    if (digits.length >= 5) formatted += ")" + digits.slice(5,8);
    if (digits.length >= 8) formatted += "-" + digits.slice(8,10);
    if (digits.length >= 10) formatted += "-" + digits.slice(10,12);

    phoneInput.value = formatted;
    phoneInput.selectionStart = phoneInput.selectionEnd = phoneInput.value.length;
});

// Открытие модалки
openModal.onclick = () => {
    modal.classList.add("active");

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2,'0');
    const day = String(now.getDate()).padStart(2,'0');
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    datetimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;

    setTimeout(() => phoneInput.focus(), 100);
};

// Закрытие модалки при клике вне контента
modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
};

// Отправка формы
orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
        fullname: fullnameInput.value.trim(),
        phone: phoneInput.value.trim(),
        datetime: datetimeInput.value
    };

    if (!data.fullname || !data.phone || !data.datetime) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    if (data.phone.length < 16) {
        alert("Введите корректный номер телефона, например +375(29)123-45-67");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(data);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Данные сохранены!");
    orderForm.reset();
    phoneInput.value = "+375(";
    modal.classList.remove("active");
});