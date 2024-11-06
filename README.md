### Название проекта
**Site-Specific Proxy Manager**

---

### Описание проекта
**Site-Specific Proxy Manager** — это расширение для браузера Google Chrome, позволяющее использовать разные прокси-серверы для определённых сайтов, в то время как весь остальной трафик проходит через обычное соединение без прокси. Это полезно для работы с ресурсами, доступ к которым ограничен или требует особой конфигурации сети.

### Функциональность
- Настройка прокси-серверов для конкретных сайтов через интерфейс настроек.
- Возможность использовать прямое соединение (без прокси) для всех остальных сайтов.
- Простое управление списком сайтов и их прокси-серверов.
- Поддержка различных схем подключения, включая `PROXY`, `SOCKS`, и `DIRECT`.

### Как установить
1. Скачайте и распакуйте файлы проекта.
2. В браузере Google Chrome перейдите в `chrome://extensions/`.
3. Включите «Режим разработчика» (Developer Mode) в верхнем правом углу.
4. Нажмите «Загрузить распакованное расширение» (Load unpacked) и выберите папку с файлами проекта.

### Использование
1. Откройте страницу настроек расширения (Options).
2. Введите URL сайта и адрес прокси-сервера, чтобы добавить его в список.
3. Всякий раз, когда вы посещаете указанные сайты, расширение автоматически перенаправит трафик через соответствующий прокси.

### Пример использования
- Вы можете настроить прокси-сервер для доступа к ресурсам, которые требуют определённого местоположения IP.
- Используйте прямое соединение для всех сайтов, не нуждающихся в прокси.

### Требования
- Браузер Google Chrome.
- Manifest V3 для работы с современными расширениями.

### Поддержка
Если у вас есть вопросы или предложения, создайте новый «Issue» в репозитории.

---

### Лицензия
Проект распространяется под лицензией MIT. Подробности см. в файле LICENSE.

---

### Как внести вклад
1. Форкните репозиторий.
2. Создайте новую ветку (`git checkout -b feature/your-feature`).
3. Внесите изменения и сделайте коммит (`git commit -m 'Add your feature'`).
4. Отправьте изменения в удалённый репозиторий (`git push origin feature/your-feature`).
5. Создайте Pull Request.

---

### Контакты
Для связи: [gunster98@gmail.com - @konstant1nn]