document.addEventListener('DOMContentLoaded', () => {
    const daysContainer = document.getElementById('days');
    const monthDisplay = document.getElementById('month');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function generateDays(month, year) {
        daysContainer.innerHTML = ''; // Очистить текущие дни
        let date = new Date(year, month, 1);
        while (date.getMonth() === month) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = date.getDate();
            daysContainer.appendChild(dayElement);
            date.setDate(date.getDate() + 1);
        }
        monthDisplay.textContent = date.toLocaleString('ru', { month: 'long' }) + ' ' + year;
    }

    generateDays(currentMonth, currentYear);

    let startX;

    daysContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    daysContainer.addEventListener('touchmove', (e) => {
        const moveX = e.touches[0].clientX;
        const diffX = moveX - startX;

        if (Math.abs(diffX) > 50) { // Пороговое значение для свайпа
            if (diffX > 0) {
                // Свайп вправо - предыдущий месяц
                if (currentMonth === 0) {
                    currentMonth = 11;
                    currentYear -= 1;
                } else {
                    currentMonth -= 1;
                }
            } else {
                // Свайп влево - следующий месяц
                if (currentMonth === 11) {
                    currentMonth = 0;
                    currentYear += 1;
                } else {
                    currentMonth += 1;
                }
            }
            generateDays(currentMonth, currentYear);
            startX = null; // Сбросить значение startX
        }
    });
});
