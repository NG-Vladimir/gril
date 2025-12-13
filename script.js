const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const orderForm = document.getElementById("orderForm");
const datetimeInput = document.getElementById("datetime");
const fullnameInput = document.getElementById("fullname");
const phoneInput = document.getElementById("phone");

// Маска телефона +375(XX)XXX-XX-XX (гибкая)
phoneInput.addEventListener("input", (e) => {
    let cursorPos = phoneInput.selectionStart;
    let value = phoneInput.value.replace(/\D/g, ''); // оставляем только цифры

    // Всегда начинаем с 375
    if (!value.startsWith("375")) value = "375";

    let formatted = "+375";
    if (value.length > 3) formatted += "(" + value.slice(3, 5);
    if (value.length >= 5) formatted += ")" + value.slice(5, 8);
    if (value.length >= 8) formatted += "-" + value.slice(8, 10);
    if (value.length >= 10) formatted += "-" + value.slice(10, 12);

    phoneInput.value = formatted;

    // Попытка сохранить курсор в удобном месте
    phoneInput.selectionStart = phoneInput.selectionEnd = cursorPos;
});

// Автоподстановка даты при открытии модалки
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

// Обработка submit формы
orderForm.addEventListener("submit", (e) => {
    e.preventDefault(); // предотвращаем перезагрузку

    const data = {
        fullname: fullnameInput.value.trim(),
        phone: phoneInput.value.trim(),
        datetime: datetimeInput.value
    };

    // Проверка на пустые поля
    if (!data.fullname || !data.phone || !data.datetime) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Проверка длины телефона
    if (data.phone.length < 16) {
        alert("Введите корректный номер телефона, например +375(33)334-13-92");
        return;
    }

    // Сохраняем в localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(data);
    localStorage.setItem("orders", JSON.stringify(orders));

    console.log("DATA:", data);
    alert("Данные сохранены!");

    // Сброс формы
    orderForm.reset();
    phoneInput.value = "+375";

    modal.classList.remove("active");
});