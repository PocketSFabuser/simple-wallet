// Определение устройства и загрузка соответствующего CSS
function loadDeviceSpecificCSS() {
    const screenWidth = window.innerWidth;
    let cssFile = 'style-pc.css';
    let deviceClass = 'device-desktop';

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        cssFile = 'style-phone.css';
        deviceClass = screenWidth < 768 ? 'device-mobile' : 'device-tablet';
    }

    // Добавляем класс к тегу body
    document.body.classList.remove('device-desktop', 'device-mobile', 'device-tablet');
    document.body.classList.add(deviceClass);

    // Остальной код загрузки CSS без изменений
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `styles/${cssFile}`;
    link.id = 'device-css';
    
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