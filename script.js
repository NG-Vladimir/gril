const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const orderForm = document.getElementById("orderForm");
const datetimeInput = document.getElementById("datetime");
const fullnameInput = document.getElementById("fullname");
const phoneInput = document.getElementById("phone");

/* ===== ТЕЛЕФОН ===== */
phoneInput.value = "+375";

phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value.startsWith("+375")) {
        phoneInput.value = "+375";
    }
});

phoneInput.addEventListener("input", () => {
    let digits = phoneInput.value.replace(/\D/g, '');

    // всегда оставляем код страны
    if (!digits.startsWith("375")) {
        digits = "375" + digits.replace(/^375/, '');
    }

    // максимум 12 цифр: 375 + 9 цифр номера
    digits = digits.slice(0, 12);

    let formatted = "+375";

    if (digits.length > 3) formatted += "(" + digits.slice(3, 5);
    if (digits.length > 5) formatted += ")" + digits.slice(5, 8);
    if (digits.length > 8) formatted += "-" + digits.slice(8, 10);
    if (digits.length > 10) formatted += "-" + digits.slice(10, 12);

    phoneInput.value = formatted;
});

/* ===== ДАТА И ВРЕМЯ ===== */

function isWorkingTime(date) {
    const day = date.getDay(); // 0 - воскресенье
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = hours + minutes / 60;

    if (day === 0) return false; // воскресенье

    if (day >= 1 && day <= 5) {
        return time >= 10 && time <= 18;
    }

    if (day === 6) {
        return time >= 10 && time <= 17;
    }

    return false;
}

function setInitialDateTime() {
    const now = new Date();
    now.setMinutes(0);

    for (let i = 0; i < 72; i++) {
        const test = new Date(now.getTime() + i * 60 * 60 * 1000);
        if (isWorkingTime(test)) {
            datetimeInput.value = test.toISOString().slice(0, 16);
            break;
        }
    }
}

/* ===== ОТКРЫТИЕ МОДАЛКИ ===== */
openModal.onclick = () => {
    modal.classList.add("active");
    setInitialDateTime();
};

/* ===== ЗАКРЫТИЕ ===== */
modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
};

/* ===== SUBMIT ===== */
orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = fullnameInput.value.trim();
    const phone = phoneInput.value.trim();
    const datetime = datetimeInput.value;

    // 🔴 Проверка: fullname и datetime должны быть заполнены
    if (!fullname || !datetime) {
        alert(
`⚠️ Пожалуйста, заполните все поля регистрации.

Без этих данных мы не сможем принять заказ 🙏`
        );
        return;
    }

    const digits = phone.replace(/\D/g, '');

    if (digits.length !== 12) {
        alert(
`⚠️ Пожалуйста, введите номер телефона полностью.

Пример: +375(29)123-45-67`
        );
        return;
    }

    const date = new Date(datetime);

    // 🔴 Проверка рабочего времени
    if (!isWorkingTime(date)) {
        alert(
`К сожалению, в это время мы не работаем 🙏

🕙 Понедельник–пятница: с 10:00 до 18:00
🕙 Суббота: с 10:00 до 17:00
❌ В воскресенье — выходной

Пожалуйста, выберите удобное рабочее время 💛`
        );
        return;
    }

    const data = {
        fullname,
        phone,
        datetime
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(data);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Заказ принят! Мы свяжемся с вами 😊");

    orderForm.reset();
    phoneInput.value = "+375";
    modal.classList.remove("active");
});