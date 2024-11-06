// Записываем параметры прокси и аутентификации в глобальную переменную
window.proxy_auth = {
    address: '168.80.201.240:8000', // Адрес и порт прокси
    proxy_user: 'UMQVdS',   // Имя пользователя для прокси
    proxy_password: 'yC1Utf' // Пароль для прокси
  };
  
  // Установка прокси через PAC-скрипт
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Proxy settings initialized.");
  
    // PAC-скрипт для использования прокси на 2ip.ru
    const pacScript = `
      function FindProxyForURL(url, host) {
        if (shExpMatch(host, "chat.openai.com") ||
        shExpMatch(host, "whoer.net") ||
        shExpMatch(host, "chatgpt.com") ||
        shExpMatch(host, "yandex.ru")) {
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
  });
  
  // Автоматическая аутентификация для установленного прокси
  chrome.webRequest.onAuthRequired.addListener(
    (details, callback) => {
      console.log("Auth required for proxy");
  
      // Проверка на аутентификацию для прокси
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
  