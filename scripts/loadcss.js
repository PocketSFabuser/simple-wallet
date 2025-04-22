// Определение устройства и загрузка соответствующего CSS
function loadDeviceSpecificCSS() {
    const screenWidth = window.innerWidth;
    let cssFile = 'style-pc.css'; // По умолчанию для ПК

    // Определение типа устройства
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        cssFile = screenWidth < 768 ? 'style-phone.css' : 'style-phone.css';
    }

    // Создание элемента стилей
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `styles/${cssFile}`;
    link.id = 'device-css';
    
    // Удаление предыдущей версии стилей
    const oldLink = document.getElementById('device-css');
    if (oldLink) oldLink.remove();
    
    document.head.appendChild(link);
}

// Загрузка при старте и при изменении размера
window.addEventListener('DOMContentLoaded', loadDeviceSpecificCSS);
window.addEventListener('resize', () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(loadDeviceSpecificCSS, 250);
});
// Проверка на планшеты (iPad, Android)
const isTablet = /(iPad|Android Tablet)/i.test(navigator.userAgent) && 
               !/Mobile/i.test(navigator.userAgent);