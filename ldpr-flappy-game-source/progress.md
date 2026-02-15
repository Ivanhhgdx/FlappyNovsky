Original prompt: "Привет! У меня к тебе очень интересная задача... разработать игру на HTML, с меню (настройки/играть/об игре/о разработчиках) и Flappy Bird-подобным геймплеем в стилистике ЛДПР, где вместо птички используется голова Владимира Вольфовича Жириновского, с крутым дизайном."

TODO:
- [ ] Сделать первую версию UI меню + экранов.
- [ ] Реализовать игровой цикл Flappy-style.
- [ ] Добавить стилизованные препятствия и визуальные эффекты.
- [ ] Добавить deterministic hooks: window.advanceTime(ms), window.render_game_to_text().
- [ ] Прогнать Playwright client и проверить скриншоты/состояние.
- [ ] Подготовить подстановку пользовательских исходников в assets.

Update (2026-02-11):
- Создан новый проект `/Users/ivanfomin/ldpr-flappy-game`.

Update (2026-02-11, implementation chunk 1):
- Созданы файлы `index.html`, `styles.css`, `game.js`, `assets/zhirinovsky-head.svg`.
- Добавлены экраны: меню, настройки, об игре, о разработчиках.
- Реализована Flappy-механика: gravity/flap, генерация барьеров, подсчёт очков, поражение, рестарт.
- Визуалы оформлены в сине-жёлтой стилистике с динамическим фоном и декоративными элементами.
- Подключены хуки `window.advanceTime(ms)` и `window.render_game_to_text()`.

Update (2026-02-11, testing and stability):
- Обнаружено подвисание тестового клиента на `canvas.toDataURL()` в headless при heavy-canvas path.
- Исправление: `canvas.getContext('2d', { alpha: false, willReadFrequently: true })`.
- Убран `.svg` из runtime-цепочки автопоиска аватара; добавлен стабильный `assets/zhirinovsky-head.png`.
- Прогон через skill-клиент выполнен успешно: `output/run-7/shot-0.png`, `output/run-7/state-0.json`, без `errors-0.json`.

TODO next:
- Подменить `assets/zhirinovsky-head.png` на пользовательский исходник (когда будет предоставлен).
- При желании добавить пост-эффекты и отдельные экранные анимации в меню.

Update (2026-02-11, FlappyNovsky expansion):
- Создан отчет для команды: `/Users/ivanfomin/ldpr-flappy-game/отчёты/параллельный_бриф_для_команды.md`.
- Интегрированы пользовательские текстуры из Desktop/FlappyNovsky/текстуры/Скины в `assets/heads/`.
- Полностью обновлен UI и логика под FlappyNovsky:
  - Главное меню + магазин + достижения.
  - Валюты: медали ЛДПР и редкие медали.
  - Покупка скинов через кнопку «Сафонов, оплатить!».
  - Скины: common/bronze/silver/gold + секретный wave.
  - Пасхалка на 10 кликов по голове в меню.
  - Цитаты для старта/рекорда/победы.
  - Режимы скорости (classic/rush/turbo).
  - Редкий бонус двойного прыжка.
  - Победный сценарий с конфетти при достижении 30 очков.
  - Смена expression лица при состояниях (focus/hurt/victory).
  - Локальное сохранение профиля и достижений через localStorage.
- Исправлена стабильность офлайн-режима: удалены внешние web-font зависимости.
- Добавлен глобальный click-handler для надежной работы кнопок меню/магазина.

Validation:
- Programmatic menu dispatch test: `shop/achievements/settings/about/menu/play` отрабатывают корректно.
- Playwright skill run: `/Users/ivanfomin/ldpr-flappy-game/output/run-8/shot-0.png`, `state-0.json` без ошибок.
- Интеграционный сценарий магазина/скинов/пасхалки: подтвержден через `run-shop-achievements.png`.

Next TODO:
- Подключить реальные аудио-фразы Жириновского и аплодисменты из `assets/audio`.
- Добавить таблицу баланса цен/дропа из командного документа.
- Отдельно нарисовать текстурный пакет труб/фоновых объектов (если команда выберет texture-heavy арт).
