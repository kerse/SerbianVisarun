document.addEventListener('DOMContentLoaded', (event) => {
    const inputDateElement = document.getElementById('inputDate');
    inputDateElement.addEventListener('change', addDays);

    function addDays() {
        if (!inputDateElement.value) {
            alert('Пожалуйста, выберите дату');
            return;
        }

        const inputDate = new Date(inputDateElement.value);
        inputDate.setDate(inputDate.getDate() + 29);

        document.getElementById('newDate').textContent = formatDate(inputDate);

        const today = new Date();
        document.getElementById('currentDate').textContent = formatDate(today);
        document.getElementById('daysDifference').textContent = Math.ceil((startOfDay(inputDate) - startOfDay(today)) / (1000 * 60 * 60 * 24));
    }

    function formatDate(date) {
        const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
        return `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    function startOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    document.getElementById('inputDate').addEventListener('change', addDays);
});
