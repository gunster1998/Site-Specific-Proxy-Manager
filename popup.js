let currentSite = '';

// Получаем текущий активный таб и домен
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    currentSite = url.hostname;
    document.getElementById('currentSite').textContent = currentSite;

    // Проверяем, есть ли сайт в списке
    chrome.runtime.sendMessage({ action: 'checkSite', hostname: currentSite }, (response) => {
        const statusIndicator = document.getElementById('statusIndicator');
        if (response.inList) {
            statusIndicator.classList.remove('red');
            statusIndicator.classList.add('green');
        } else {
            statusIndicator.classList.remove('green');
            statusIndicator.classList.add('red');
        }
    });
});

// Добавление сайта в список
document.getElementById('addSiteButton').addEventListener('click', () => {
    if (currentSite) {
        chrome.runtime.sendMessage({ action: 'addSite', hostname: currentSite }, (response) => {
            const statusMessage = document.getElementById('statusMessage');
            if (response.success) {
                statusMessage.textContent = `Сайт ${currentSite} добавлен в список.`;
                document.getElementById('statusIndicator').classList.remove('red');
                document.getElementById('statusIndicator').classList.add('green');
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
                document.getElementById('statusIndicator').classList.remove('green');
                document.getElementById('statusIndicator').classList.add('red');
            } else {
                statusMessage.textContent = `Ошибка: ${response.error}`;
            }
        });
    }
});
