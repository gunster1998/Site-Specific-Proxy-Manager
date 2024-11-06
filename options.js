document.getElementById("add").addEventListener("click", () => {
    const site = document.getElementById("site").value;
    const proxy = document.getElementById("proxy").value;
  
    if (site && proxy) {
      chrome.storage.sync.get("proxies", (data) => {
        const proxies = data.proxies || [];
        proxies.push({ site, proxy });
        chrome.storage.sync.set({ proxies }, () => {
          alert("Прокси добавлен!");
          displayProxies();
        });
      });
    }
  });
  
  function displayProxies() {
    chrome.storage.sync.get("proxies", (data) => {
      const proxyList = document.getElementById("proxyList");
      proxyList.innerHTML = "";
      (data.proxies || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.site}: ${item.proxy}`;
        proxyList.appendChild(li);
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", displayProxies);
  