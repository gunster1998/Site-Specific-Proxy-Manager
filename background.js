// Список сайтов для прокси
let proxySites = [
    "chat.openai.com",
    "whoer.net",
    "chatgpt.com",
    "htmlcheatsheet.com"
];

// Сохраняем параметры прокси
window.proxy_auth = {
    address: '213.232.204.12:29416', // Адрес и порт прокси
    proxy_user: 'PlfK8WgpjG',           // Имя пользователя для прокси
    proxy_password: 'pbwqLX67GN'        // Пароль для прокси
};

// Функция для обновления PAC-скрипта
function updatePacScript() {
    const sites = proxySites.map(site => `shExpMatch(host, "${site}")`).join(' || ');
    const pacScript = `
        function FindProxyForURL(url, host) {
            if (${sites}) {
                return "PROXY ${window.proxy_auth.address}";
            }
            return "DIRECT";
        }
    `;

    const config = {
        mode: "pac_script",
        pacScript: { data: pacScript }
    };

    chrome.proxy.settings.set(
        { value: config, scope: "regular" },
        () => {
            if (chrome.runtime.lastError) {
                console.error("Error setting proxy:", chrome.runtime.lastError);
            } else {
                console.log("Proxy settings applied with PAC script.");
            }
        }
    );
}

// Обработчик сообщений от popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'addSite') {
        if (!proxySites.includes(message.hostname)) {
            proxySites.push(message.hostname);
            updatePacScript();
            sendResponse({ success: true });
        } else {
            sendResponse({ success: false, error: "Сайт уже в списке." });
        }
    } else if (message.action === 'removeSite') {
        const index = proxySites.indexOf(message.hostname);
        if (index !== -1) {
            proxySites.splice(index, 1);
            updatePacScript();
            sendResponse({ success: true });
        } else {
            sendResponse({ success: false, error: "Сайт не найден в списке." });
        }
    } else if (message.action === 'checkSite') {
        const inList = proxySites.includes(message.hostname);
        sendResponse({ inList });
    }
    return true;
});

// Начальная установка прокси
chrome.runtime.onInstalled.addListener(() => {
    updatePacScript();
});

chrome.runtime.onStartup.addListener(() => {
    updatePacScript();
});

// Автоматическая аутентификация для установленного прокси
chrome.webRequest.onAuthRequired.addListener(
    (details, callback) => {
        if (details.isProxy && window.proxy_auth) {
            callback({
                authCredentials: {
                    username: window.proxy_auth.proxy_user,
                    password: window.proxy_auth.proxy_password
                }
            });
        } else {
            callback();
        }
    },
    { urls: ['<all_urls>'] },
    ['asyncBlocking']
);
