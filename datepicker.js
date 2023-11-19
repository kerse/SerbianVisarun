document.addEventListener('DOMContentLoaded', () => {
    const monthSelector = document.getElementById('monthSelector');
    const daySelector = document.getElementById('daySelector');
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    months.forEach(month => {
        const monthElement = document.createElement('div');
        monthElement.classList.add('scroll-item');
        monthElement.textContent = month;
        monthSelector.appendChild(monthElement);
    });

    function generateDays(monthIndex) {
        daySelector.innerHTML = '';
        let date = new Date(new Date().getFullYear(), monthIndex, 1);
        while (date.getMonth() === monthIndex) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('scroll-item');
            dayElement.textContent = date.getDate();
            daySelector.appendChild(dayElement);
            date.setDate(date.getDate() + 1);
        }
    }

    generateDays(new Date().getMonth());

    function selectItemInCenter(container, itemClass) {
        let containerRect = container.getBoundingClientRect();
        let center = containerRect.left + containerRect.width / 2;

        let items = container.getElementsByClassName(itemClass);
        let selectedItem = null;
        Array.from(items).forEach(item => {
            let itemRect = item.getBoundingClientRect();
            if (itemRect.left < center && itemRect.right > center) {
                selectedItem = item;
            }
            item.classList.remove('selected');
        });
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }

    monthSelector.addEventListener('scroll', () => {
        selectItemInCenter(monthSelector, 'scroll-item');
    });

    daySelector.addEventListener('scroll', () => {
        selectItemInCenter(daySelector, 'scroll-item');
    });

    setTimeout(() => {
        selectItemInCenter(monthSelector, 'scroll-item');
        selectItemInCenter(daySelector, 'scroll-item');
    }, 100);

    [monthSelector, daySelector].forEach(selector => {
        let isDown = false;
        let startX;
        let scrollLeft;

        selector.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - selector.offsetLeft;
            scrollLeft = selector.scrollLeft;
        });
        selector.addEventListener('mouseleave', () => {
            isDown = false;
        });
        selector.addEventListener('mouseup', () => {
            isDown = false;
        });
        selector.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - selector.offsetLeft;
            const walk = (x - startX) * 3;
            selector.scrollLeft = scrollLeft - walk;
        });
    });
});
