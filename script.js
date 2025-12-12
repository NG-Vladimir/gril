const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const submit = document.getElementById("submit");
const datetimeInput = document.getElementById("datetime");
const fullnameInput = document.getElementById("fullname");
const phoneInput = document.getElementById("phone");

// Открытие модального окна
openModal.onclick = () => {
    modal.classList.add("active");

    // Устанавливаем текущую дату и время
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

    console.log("DATA:", data);
    alert("Данные сохранены!");
    modal.classList.remove("active");
};