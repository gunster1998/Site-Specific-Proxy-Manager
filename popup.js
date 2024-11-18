// Определяем текущий домен
let currentSite = '';

// Получаем текущий активный таб и домен
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    currentSite = url.hostname;
    document.getElementById('currentSite').textContent = currentSite;
});

// Добавление сайта в список
document.getElementById('addSiteButton').addEventListener('click', () => {
    if (currentSite) {
        chrome.runtime.sendMessage({ action: 'addSite', hostname: currentSite }, (response) => {
            const statusMessage = document.getElementById('statusMessage');
            if (response.success) {
                statusMessage.textContent = `Сайт ${currentSite} добавлен в список.`;
            } else {
                statusMessage.textContent = `Ошибка: ${response.error}`;
            }
        });
    }
});

// Удаление сайта из списка
document.getElementById('removeSiteButton').addEventListener('click', () => {
    if (currentSite) {
        chrome.runtime.sendMessage({ action: 'removeSite', hostname: currentSite }, (response) => {
            const statusMessage = document.getElementById('statusMessage');
            if (response.success) {
                statusMessage.textContent = `Сайт ${currentSite} удалён из списка.`;
            } else {
                statusMessage.textContent = `Ошибка: ${response.error}`;
            }
        });
    }
});
