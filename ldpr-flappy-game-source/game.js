const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

const hud = document.getElementById("hud");
const scoreValue = document.getElementById("score-value");
const bestScoreValue = document.getElementById("best-score-value");
const runMedalsValue = document.getElementById("run-medals-value");
const runRareValue = document.getElementById("run-rare-value");
const bonusValue = document.getElementById("bonus-value");

const statusBanner = document.getElementById("status-banner");
const quotePopup = document.getElementById("quote-popup");

const menuMedalsValue = document.getElementById("menu-medals-value");
const menuRareValue = document.getElementById("menu-rare-value");
const menuBestValue = document.getElementById("menu-best-value");

const shopMedalsValue = document.getElementById("shop-medals-value");
const shopRareValue = document.getElementById("shop-rare-value");
const shopActiveSkin = document.getElementById("shop-active-skin");

const shopSkins = document.getElementById("shop-skins");
const achievementList = document.getElementById("achievement-list");

const difficultySelect = document.getElementById("difficulty-select");
const speedModeSelect = document.getElementById("speed-mode-select");
const soundToggle = document.getElementById("sound-toggle");
const effectsToggle = document.getElementById("effects-toggle");

const headEasterBtn = document.getElementById("head-easter-btn");
const headEasterImage = document.getElementById("head-easter-image");
const headEasterProgress = document.getElementById("head-easter-progress");

const menuScreen = document.getElementById("menu-screen");
const settingsScreen = document.getElementById("settings-screen");
const aboutGameScreen = document.getElementById("about-game-screen");
const aboutDevsScreen = document.getElementById("about-devs-screen");
const shopScreen = document.getElementById("shop-screen");
const achievementsScreen = document.getElementById("achievements-screen");

const WIDTH = 960;
const HEIGHT = 540;
const PLAYER_X = 228;
const PLAYER_RADIUS = 34;
const PIPE_WIDTH = 122;
const VICTORY_SCORE = 30;

const PROFILE_KEY = "flappyNovskyProfileV2";
const SETTINGS_KEY = "flappyNovskySettingsV2";
const LEGACY_BEST_KEY = "ldprSkyRushBestScore";

const screens = {
  menu: menuScreen,
  settings: settingsScreen,
  "about-game": aboutGameScreen,
  "about-devs": aboutDevsScreen,
  shop: shopScreen,
  achievements: achievementsScreen,
};

const difficultyProfiles = {
  easy: { gravity: 1000, flap: -390, speed: 212, spawnInterval: 1.84, gap: 206 },
  normal: { gravity: 1130, flap: -415, speed: 244, spawnInterval: 1.58, gap: 182 },
  hard: { gravity: 1270, flap: -432, speed: 282, spawnInterval: 1.4, gap: 166 },
};

const speedProfiles = {
  classic: { label: "Классический", speedMult: 1, gravityMult: 1, flapMult: 1 },
  rush: { label: "Ускоренный", speedMult: 1.12, gravityMult: 1.07, flapMult: 1.03 },
  turbo: { label: "Турбо", speedMult: 1.26, gravityMult: 1.12, flapMult: 1.06 },
};

const skinCatalog = {
  common: {
    id: "common",
    name: "Классический ВВЖ",
    rarity: "Обычный",
    price: 0,
    rarePrice: 0,
    src: "./assets/heads/head-common.png",
    ring: "#ffcb2a",
  },
  bronze: {
    id: "bronze",
    name: "Бронзовый",
    rarity: "Редкий",
    price: 140,
    rarePrice: 0,
    src: "./assets/heads/head-bronze.png",
    ring: "#d58e57",
  },
  silver: {
    id: "silver",
    name: "Серебряный",
    rarity: "Эпический",
    price: 280,
    rarePrice: 1,
    src: "./assets/heads/head-silver.png",
    ring: "#d7e4ef",
  },
  gold: {
    id: "gold",
    name: "Золотой",
    rarity: "Легендарный",
    price: 460,
    rarePrice: 2,
    src: "./assets/heads/head-gold.png",
    ring: "#ffdb72",
  },
  wave: {
    id: "wave",
    name: "Пасхальный жест",
    rarity: "Секретный",
    price: 0,
    rarePrice: 0,
    src: "./assets/heads/head-wave.png",
    ring: "#80d4ff",
    hidden: true,
  },
};

const shopOrder = ["common", "bronze", "silver", "gold", "wave"];

const achievementCatalog = [
  {
    id: "first_flight",
    title: "Первый полёт",
    desc: "Запусти первый забег.",
  },
  {
    id: "score_10",
    title: "Высота 10",
    desc: "Набери 10 очков за один забег.",
  },
  {
    id: "new_record",
    title: "Новый рекорд",
    desc: "Побей локальный рекорд в браузере.",
  },
  {
    id: "rich_100",
    title: "Капитал ЛДПР",
    desc: "Накопи 100 медалей ЛДПР.",
  },
  {
    id: "rare_hunter",
    title: "Охотник за редкими",
    desc: "Накопи 5 редких медалей.",
  },
  {
    id: "double_jump_find",
    title: "Редкий бонус",
    desc: "Подбери бонус режима двойного прыжка.",
  },
  {
    id: "skin_collector",
    title: "Коллекционер скинов",
    desc: "Разблокируй бронзовый, серебряный и золотой скины.",
  },
  {
    id: "victory_30",
    title: "Победа FlappyNovsky",
    desc: `Достигни ${VICTORY_SCORE} очков и запусти конфетти-победу.`,
  },
  {
    id: "head_click_10",
    title: "Пасхалка 10/10",
    desc: "Нажми 10 раз по голове в меню.",
  },
];

const quotesNewRecord = [
  "Новый рекорд! История это запомнит.",
  "Рекорд поставлен. Продолжаем давление!",
  "Это уровень лидера. Новый результат зафиксирован.",
  "Отличный прорыв! Рекорд обновлён.",
];

const startPhrases = [
  "Стартуем. Темп держи до конца.",
  "Взлетаем. Работаем на рекорд.",
  "Держи коридор. Без паники.",
  "Тайминг и хладнокровие. Погнали.",
];

const victoryQuotes = [
  "Победа! Конфетти в честь нового полёта.",
  "Цель достигнута. FlappyNovsky празднует.",
  "Финишный рывок идеален. Это победа.",
];

const profile = readProfile();
const settings = readSettings();

const state = {
  mode: "menu",
  activeScreen: "menu",
  elapsed: 0,
  menuFloat: 0,
  score: 0,
  runMedals: 0,
  runRare: 0,
  runRecordBeaten: false,
  pipes: [],
  pickups: [],
  confetti: [],
  spawnTimer: 0,
  crashFlash: 0,
  bannerTimer: 0,
  quoteTimer: 0,
  manualStepping: false,
  bannerText: "",
  quoteText: "",
  headTapCounter: 0,
  doubleJumpCharges: 0,
  pendingBoosts: [],
  player: {
    x: PLAYER_X,
    y: HEIGHT * 0.48,
    vy: 0,
    r: PLAYER_RADIUS,
    angle: 0,
    expression: "neutral",
  },
};

const skins = {};
let audioCtx = null;
let rafLastTs = performance.now();

loadSkinImages();
setupControls();
setUIFromSettings();
renderShop();
renderAchievements();
updateMetaUI();
updateHud();
applyScreen("menu");
showBanner("Нажми Играть, Space или клик по сцене", 0);
updateHeadEasterUI();
updateHeadPreview();
requestAnimationFrame(mainLoop);

function setupControls() {
  document.addEventListener("click", (event) => {
    const openBtn = event.target.closest("[data-open]");
    if (openBtn) {
      onMenuAction(openBtn.getAttribute("data-open"));
      return;
    }

    const buyBtn = event.target.closest("[data-buy-skin]");
    if (buyBtn) {
      purchaseSkin(buyBtn.getAttribute("data-buy-skin"));
      return;
    }

    const equipBtn = event.target.closest("[data-equip-skin]");
    if (equipBtn) {
      equipSkin(equipBtn.getAttribute("data-equip-skin"));
      return;
    }

    if (event.target.closest("#head-easter-btn")) {
      triggerHeadEasterClick();
    }
  });

  difficultySelect.addEventListener("change", () => {
    settings.difficulty = difficultySelect.value;
    saveSettings();
    showBanner(`Сложность: ${difficultySelect.options[difficultySelect.selectedIndex].text}`, 1400);
  });

  speedModeSelect.addEventListener("change", () => {
    settings.speedMode = speedModeSelect.value;
    saveSettings();
    showBanner(`Режим скорости: ${speedModeSelect.options[speedModeSelect.selectedIndex].text}`, 1500);
  });

  soundToggle.addEventListener("change", () => {
    settings.soundOn = Boolean(soundToggle.checked);
    saveSettings();
  });

  effectsToggle.addEventListener("change", () => {
    settings.effectsOn = Boolean(effectsToggle.checked);
    saveSettings();
  });

  window.addEventListener("keydown", (event) => {
    const tag = event.target && event.target.tagName ? event.target.tagName : "";

    if (event.code === "Space") {
      if (tag === "SELECT" || tag === "INPUT" || tag === "TEXTAREA") return;
      event.preventDefault();
      primaryAction();
      return;
    }

    if (event.key.toLowerCase() === "p") {
      if (state.mode === "playing") {
        pauseGame();
      } else if (state.mode === "paused") {
        resumeGame();
      }
      return;
    }

    if (event.key.toLowerCase() === "f") {
      toggleFullscreen();
      return;
    }

    if (event.key === "Escape") {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
        return;
      }

      if (state.mode === "playing" || state.mode === "paused" || state.mode === "gameover" || state.mode === "victory") {
        goToMenu();
        return;
      }

      if (state.activeScreen !== "menu") {
        applyScreen("menu");
        showBanner("Вернулись в меню", 1000);
      }
    }
  });

  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();

    if (state.activeScreen === "menu" && state.mode === "menu") {
      primaryAction();
      return;
    }

    if (state.mode === "playing" || state.mode === "paused" || state.mode === "gameover" || state.mode === "victory") {
      primaryAction();
    }
  });

  headEasterBtn.addEventListener("pointerdown", (event) => {
    event.preventDefault();
  });
}

function onMenuAction(action) {
  if (action === "play") {
    startGame();
    return;
  }

  if (action === "menu") {
    applyScreen("menu");
    showBanner("Главное меню", 900);
    return;
  }

  if (!screens[action]) return;
  applyScreen(action);

  if (action === "shop") {
    renderShop();
  }
  if (action === "achievements") {
    renderAchievements();
  }
}

function primaryAction() {
  if (state.mode === "playing") {
    flap();
    return;
  }

  if (state.mode === "paused") {
    resumeGame();
    return;
  }

  if (state.mode === "gameover" || state.mode === "victory") {
    startGame();
    return;
  }

  if (state.mode === "menu") {
    startGame();
  }
}

function applyScreen(name) {
  for (const panel of Object.values(screens)) {
    panel.classList.remove("active");
  }

  if (name && screens[name]) {
    screens[name].classList.add("active");
    state.activeScreen = name;
    state.mode = name;
    hud.classList.add("hidden");
  } else {
    state.activeScreen = "none";
  }

  if (name === "menu") {
    state.mode = "menu";
    showBanner("Нажми Играть, Space или клик по сцене", 0);
  }

  if (name === "shop") {
    renderShop();
  }

  if (name === "achievements") {
    renderAchievements();
  }

  updateMetaUI();
}

function goToMenu() {
  applyScreen("menu");
  state.player.expression = "neutral";
}

function startGame() {
  state.mode = "playing";
  state.activeScreen = "none";
  state.elapsed = 0;
  state.spawnTimer = 0;
  state.score = 0;
  state.runMedals = 0;
  state.runRare = 0;
  state.runRecordBeaten = false;
  state.pipes = [];
  state.pickups = [];
  state.confetti = [];
  state.pendingBoosts = [];
  state.doubleJumpCharges = 0;
  state.crashFlash = 0;

  state.player.x = PLAYER_X;
  state.player.y = HEIGHT * 0.48;
  state.player.vy = 0;
  state.player.angle = 0;
  state.player.expression = "neutral";

  profile.totalRuns += 1;
  unlockAchievement("first_flight");

  spawnPipe();
  spawnPipe(0.64);

  for (const panel of Object.values(screens)) {
    panel.classList.remove("active");
  }

  hud.classList.remove("hidden");
  clearBanner();

  const phrase = pickRandom(startPhrases);
  showQuote(phrase, 1700);

  playTone(560, 0.05, "triangle", 0.03);
  updateHud();
  updateMetaUI();
  saveProfile();
}

function pauseGame() {
  if (state.mode !== "playing") return;
  state.mode = "paused";
  state.player.expression = "focused";
  showBanner("Пауза. P / Space / клик — продолжить", 0);
}

function resumeGame() {
  if (state.mode !== "paused") return;
  state.mode = "playing";
  clearBanner();
}

function flap() {
  if (state.mode !== "playing") return;
  const tuning = getTuning();

  state.player.vy = tuning.flap;
  state.player.angle = -0.5;
  state.player.expression = "focused";

  if (state.doubleJumpCharges > 0 && state.pendingBoosts.length < 3) {
    state.doubleJumpCharges -= 1;
    state.pendingBoosts.push({ timer: 0.09, impulse: tuning.flap * 0.78 });
    updateBonusLabel();
  }

  playTone(760, 0.04, "square", 0.024);
}

function loseGame(reason) {
  if (state.mode !== "playing") return;

  state.mode = "gameover";
  state.player.expression = "hurt";
  state.crashFlash = 0.27;

  if (state.score >= 10) {
    unlockAchievement("score_10");
  }

  let banner = `Поражение (${reason}). Space/клик — рестарт, Esc — меню`;

  if (state.runRecordBeaten) {
    banner = `Новый рекорд ${profile.bestScore}! Space/клик — новый забег, Esc — меню`;
    showQuote(pickRandom(quotesNewRecord), 4300);
    playApplause();
  }

  showBanner(banner, 0);

  playTone(172, 0.15, "sawtooth", 0.038);
  setTimeout(() => playTone(132, 0.11, "sawtooth", 0.03), 68);

  updateHud();
  updateMetaUI();
  saveProfile();
  renderAchievements();
}

function triggerVictory() {
  if (state.mode !== "playing") return;

  state.mode = "victory";
  state.player.expression = "victory";
  state.player.vy = 0;
  state.pendingBoosts = [];

  addMedals(12);
  if (Math.random() < 0.35) {
    addRareMedals(1);
  }

  unlockAchievement("victory_30");
  spawnConfetti(220);

  showBanner("Победа! Конфетти запущено. Space/клик — новый забег", 0);
  showQuote(pickRandom(victoryQuotes), 3300);

  playVictoryFanfare();
  updateHud();
  updateMetaUI();
  saveProfile();
  renderAchievements();
}

function update(dt) {
  state.elapsed += dt;
  state.menuFloat += dt;

  if (state.bannerTimer > 0) {
    state.bannerTimer = Math.max(0, state.bannerTimer - dt);
    if (state.bannerTimer === 0) {
      clearBanner();
    }
  }

  if (state.quoteTimer > 0) {
    state.quoteTimer = Math.max(0, state.quoteTimer - dt);
    if (state.quoteTimer === 0) {
      clearQuote();
    }
  }

  if (state.crashFlash > 0) {
    state.crashFlash = Math.max(0, state.crashFlash - dt);
  }

  if (state.mode === "playing") {
    updateGameplay(dt);
  }

  if (state.mode === "gameover") {
    for (const pipe of state.pipes) {
      pipe.x -= 88 * dt;
    }
    for (const pickup of state.pickups) {
      pickup.x -= 88 * dt;
    }
  }

  if (state.mode === "victory") {
    updateConfetti(dt);
    state.player.y += Math.sin(state.elapsed * 6) * 0.28;
    for (const pipe of state.pipes) {
      pipe.x -= 54 * dt;
    }
    for (const pickup of state.pickups) {
      pickup.x -= 54 * dt;
    }
  }

  if (state.mode !== "victory") {
    updateConfetti(dt);
  }
}

function updateGameplay(dt) {
  const tuning = getTuning();

  state.spawnTimer += dt;
  if (state.spawnTimer >= tuning.spawnInterval) {
    state.spawnTimer = 0;
    spawnPipe();
  }

  for (const boost of state.pendingBoosts) {
    boost.timer -= dt;
  }

  const readyBoosts = state.pendingBoosts.filter((boost) => boost.timer <= 0);
  if (readyBoosts.length) {
    for (const boost of readyBoosts) {
      state.player.vy = Math.min(state.player.vy, boost.impulse);
      playTone(910, 0.03, "triangle", 0.02);
    }
  }
  state.pendingBoosts = state.pendingBoosts.filter((boost) => boost.timer > 0);

  state.player.vy += tuning.gravity * dt;
  state.player.y += state.player.vy * dt;
  state.player.angle = clamp(state.player.vy / 620, -0.58, 1.06);

  if (state.player.y - state.player.r <= 0) {
    state.player.y = state.player.r;
    loseGame("удар о верхнюю границу");
  }

  if (state.player.y + state.player.r >= HEIGHT) {
    state.player.y = HEIGHT - state.player.r;
    loseGame("удар о нижнюю границу");
  }

  for (const pipe of state.pipes) {
    pipe.x -= tuning.speed * dt;

    if (!pipe.passed && pipe.x + pipe.width < state.player.x) {
      pipe.passed = true;
      onPipePassed();
    }

    if (collidesWithPipe(state.player, pipe)) {
      loseGame("касание барьера");
    }
  }

  for (const pickup of state.pickups) {
    pickup.x -= tuning.speed * dt;
    pickup.phase += dt * 4;

    if (circleCollision(state.player.x, state.player.y, state.player.r, pickup.x, pickup.y, pickup.r)) {
      collectPickup(pickup);
      pickup.collected = true;
    }
  }

  if (state.player.vy > 220) {
    state.player.expression = "neutral";
  }

  state.pipes = state.pipes.filter((pipe) => pipe.x + pipe.width > -40);
  state.pickups = state.pickups.filter((pickup) => pickup.x + pickup.r > -20 && !pickup.collected);

  if (state.score >= VICTORY_SCORE) {
    triggerVictory();
  }
}

function onPipePassed() {
  state.score += 1;
  addMedals(1);

  if (state.score > profile.bestScore) {
    profile.bestScore = state.score;
    state.runRecordBeaten = true;
    unlockAchievement("new_record");
  }

  if (state.score >= 10) {
    unlockAchievement("score_10");
  }

  playTone(930, 0.045, "triangle", 0.024);
  updateHud();
  updateMetaUI();
}

function spawnPipe(phaseOffset = 0) {
  const tuning = getTuning();
  const gap = tuning.gap;

  const topMargin = 76;
  const bottomMargin = 92;
  const minGapCenter = topMargin + gap * 0.5;
  const maxGapCenter = HEIGHT - bottomMargin - gap * 0.5;
  const gapY = random(minGapCenter, maxGapCenter);

  const pipe = {
    x: WIDTH + 66 + phaseOffset * 238,
    width: PIPE_WIDTH,
    gapY,
    gap,
    passed: false,
    seed: Math.random() * 1000,
  };

  state.pipes.push(pipe);
  spawnPickupNearPipe(pipe);
}

function spawnPickupNearPipe(pipe) {
  const roll = Math.random();
  let type = null;

  if (roll < 0.56) {
    type = "medal";
  } else if (roll < 0.69) {
    type = "rare";
  } else if (roll < 0.77) {
    type = "double_jump";
  }

  if (!type) return;

  const yJitter = random(-pipe.gap * 0.2, pipe.gap * 0.2);

  state.pickups.push({
    type,
    x: pipe.x + pipe.width + random(34, 108),
    y: clamp(pipe.gapY + yJitter, 64, HEIGHT - 86),
    r: type === "double_jump" ? 14 : 11,
    phase: Math.random() * Math.PI * 2,
    collected: false,
  });
}

function collectPickup(pickup) {
  if (pickup.type === "medal") {
    addMedals(3);
    showBanner("+3 медали ЛДПР", 900);
    playTone(740, 0.03, "triangle", 0.02);
  }

  if (pickup.type === "rare") {
    addRareMedals(1);
    showBanner("Редкая медаль получена", 1100);
    playTone(980, 0.045, "triangle", 0.024);
  }

  if (pickup.type === "double_jump") {
    state.doubleJumpCharges = Math.min(6, state.doubleJumpCharges + 2);
    unlockAchievement("double_jump_find");
    showBanner(`Бонус: двойной прыжок x${state.doubleJumpCharges}`, 1500);
    playTone(660, 0.05, "square", 0.03);
  }

  updateHud();
  updateMetaUI();
}

function addMedals(amount) {
  profile.medals += amount;
  state.runMedals += amount;

  if (profile.medals >= 100) {
    unlockAchievement("rich_100");
  }

  updateMetaUI();
  updateHud();
}

function addRareMedals(amount) {
  profile.rareMedals += amount;
  state.runRare += amount;

  if (profile.rareMedals >= 5) {
    unlockAchievement("rare_hunter");
  }

  updateMetaUI();
  updateHud();
}

function triggerHeadEasterClick() {
  state.headTapCounter += 1;
  updateHeadEasterUI();
  playTone(600 + state.headTapCounter * 20, 0.02, "triangle", 0.015);

  if (state.headTapCounter < 10) {
    return;
  }

  state.headTapCounter = 0;

  if (!isSkinUnlocked("wave")) {
    unlockSkin("wave");
    profile.selectedSkin = "wave";
    addMedals(25);
    unlockAchievement("head_click_10");
    showQuote("Пасхалка открыта: секретный скин разблокирован.", 3200);
    showBanner("Пасхалка! +25 медалей ЛДПР", 1800);
  } else {
    addMedals(5);
    showBanner("Пасхалка активирована: +5 медалей", 1200);
  }

  updateHeadPreview();
  updateHeadEasterUI();
  renderShop();
  renderAchievements();
  saveProfile();
}

function isSkinUnlocked(id) {
  return profile.unlockedSkins.includes(id);
}

function unlockSkin(id) {
  if (!isSkinUnlocked(id)) {
    profile.unlockedSkins.push(id);
  }
}

function purchaseSkin(id) {
  const skin = skinCatalog[id];
  if (!skin || isSkinUnlocked(id)) {
    return;
  }

  if (profile.medals < skin.price || profile.rareMedals < skin.rarePrice) {
    showBanner("Недостаточно медалей для покупки", 1300);
    playTone(170, 0.08, "sawtooth", 0.025);
    return;
  }

  profile.medals -= skin.price;
  profile.rareMedals -= skin.rarePrice;
  profile.spentMedals += skin.price;
  unlockSkin(id);

  if (["bronze", "silver", "gold"].every((skinId) => isSkinUnlocked(skinId))) {
    unlockAchievement("skin_collector");
  }

  profile.selectedSkin = id;

  showBanner(`${skin.name} разблокирован`, 1700);
  playTone(860, 0.05, "triangle", 0.03);

  updateHeadPreview();
  updateMetaUI();
  renderShop();
  renderAchievements();
  saveProfile();
}

function equipSkin(id) {
  if (!isSkinUnlocked(id)) return;

  profile.selectedSkin = id;
  updateHeadPreview();
  renderShop();
  updateMetaUI();
  saveProfile();

  const skin = skinCatalog[id];
  showBanner(`Скин активирован: ${skin ? skin.name : id}`, 1200);
  playTone(620, 0.03, "triangle", 0.02);
}

function renderShop() {
  const cards = [];

  for (const id of shopOrder) {
    const skin = skinCatalog[id];
    if (!skin) continue;

    const unlocked = isSkinUnlocked(id);
    if (skin.hidden && !unlocked) continue;

    const active = profile.selectedSkin === id;
    const priceText = skin.price === 0 && skin.rarePrice === 0
      ? "Бесплатно"
      : `${skin.price} медалей${skin.rarePrice > 0 ? ` + ${skin.rarePrice} редк.` : ""}`;

    const actions = unlocked
      ? active
        ? `<button class="action-btn skin-action" disabled>Активно</button>`
        : `<button class="action-btn action-btn--primary skin-action" data-equip-skin="${id}">Выбрать</button>`
      : `<button class="action-btn action-btn--primary skin-action" data-buy-skin="${id}">Сафонов, оплатить!</button>`;

    cards.push(`
      <article class="skin-card ${active ? "skin-card--active" : ""}">
        <div class="skin-head-wrap">
          <img class="skin-head" src="${skin.src}" alt="${skin.name}" />
          <div>
            <p class="skin-title">${skin.name}</p>
            <p class="skin-rarity">${skin.rarity}</p>
          </div>
        </div>
        <p class="skin-price">${unlocked ? "Разблокирован" : `Цена: ${priceText}`}</p>
        <div class="skin-actions">
          ${actions}
        </div>
      </article>
    `);
  }

  shopSkins.innerHTML = cards.join("");
}

function renderAchievements() {
  const cards = achievementCatalog.map((item) => {
    const unlockedAt = profile.achievements[item.id] || null;
    const done = Boolean(unlockedAt);
    const doneText = done
      ? `Выполнено ${new Date(unlockedAt).toLocaleDateString("ru-RU")}`
      : "Не выполнено";

    return `
      <article class="achievement-item ${done ? "achievement-item--done" : ""}">
        <div class="achievement-head">
          <p class="achievement-title">${item.title}</p>
          <span class="achievement-state">${doneText}</span>
        </div>
        <p class="achievement-desc">${item.desc}</p>
      </article>
    `;
  });

  achievementList.innerHTML = cards.join("");
}

function unlockAchievement(id) {
  if (!id) return;
  if (profile.achievements[id]) return;

  profile.achievements[id] = Date.now();
  saveProfile();
  renderAchievements();
}

function updateHud() {
  scoreValue.textContent = String(state.score);
  bestScoreValue.textContent = String(profile.bestScore);
  runMedalsValue.textContent = String(state.runMedals);
  runRareValue.textContent = String(state.runRare);
  updateBonusLabel();
}

function updateBonusLabel() {
  bonusValue.textContent = state.doubleJumpCharges > 0 ? `x${state.doubleJumpCharges}` : "-";
}

function updateMetaUI() {
  menuMedalsValue.textContent = String(profile.medals);
  menuRareValue.textContent = String(profile.rareMedals);
  menuBestValue.textContent = String(profile.bestScore);

  shopMedalsValue.textContent = String(profile.medals);
  shopRareValue.textContent = String(profile.rareMedals);

  const activeSkin = skinCatalog[profile.selectedSkin];
  shopActiveSkin.textContent = activeSkin ? activeSkin.name : "-";

  updateBonusLabel();
}

function updateHeadPreview() {
  const activeSkin = skinCatalog[profile.selectedSkin] || skinCatalog.common;
  if (headEasterImage) {
    headEasterImage.src = activeSkin.src;
  }
}

function updateHeadEasterUI() {
  headEasterProgress.textContent = `Пасхалка: ${state.headTapCounter} / 10`;
}

function mainLoop(ts) {
  const dt = Math.min((ts - rafLastTs) / 1000, 0.034);
  rafLastTs = ts;

  if (!state.manualStepping) {
    update(dt);
    render();
  }

  requestAnimationFrame(mainLoop);
}

function render() {
  drawBackground();
  drawCourseFrame();

  for (const pipe of state.pipes) {
    drawPipe(pipe);
  }

  drawPickups();

  const visiblePlayer =
    state.mode === "playing" || state.mode === "paused" || state.mode === "gameover" || state.mode === "victory";

  drawPlayer(visiblePlayer);

  drawConfetti();

  if (state.mode === "paused") {
    ctx.save();
    ctx.fillStyle = "rgba(4, 14, 36, 0.48)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#ffe58c";
    ctx.textAlign = "center";
    ctx.font = "700 44px 'Arial Black', sans-serif";
    ctx.fillText("ПАУЗА", WIDTH * 0.5, HEIGHT * 0.5 - 18);

    ctx.font = "600 19px 'Avenir Next', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("P / Space / клик — продолжить", WIDTH * 0.5, HEIGHT * 0.5 + 24);
    ctx.restore();
  }

  if (state.mode === "gameover") {
    ctx.save();
    ctx.fillStyle = "rgba(5, 11, 26, 0.43)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#ffcb2a";
    ctx.textAlign = "center";
    ctx.font = "700 46px 'Arial Black', sans-serif";
    ctx.fillText("ПОРАЖЕНИЕ", WIDTH * 0.5, HEIGHT * 0.48);

    ctx.font = "700 21px 'Avenir Next', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Счёт: ${state.score}  •  Медали: +${state.runMedals}`, WIDTH * 0.5, HEIGHT * 0.58);
    ctx.restore();
  }

  if (state.mode === "victory") {
    ctx.save();
    ctx.fillStyle = "rgba(6, 17, 38, 0.3)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#ffe58c";
    ctx.textAlign = "center";
    ctx.font = "700 48px 'Arial Black', sans-serif";
    ctx.fillText("ПОБЕДА", WIDTH * 0.5, HEIGHT * 0.46);

    ctx.font = "700 22px 'Avenir Next', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Счёт: ${state.score}  •  Бонус: +12 медалей`, WIDTH * 0.5, HEIGHT * 0.56);
    ctx.restore();
  }

  if (state.crashFlash > 0 && settings.effectsOn) {
    ctx.save();
    ctx.fillStyle = `rgba(255, 214, 94, ${state.crashFlash * 0.5})`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
  }
}

function drawBackground() {
  const tuning = getTuning();
  const shift = (state.elapsed * tuning.speed * 0.23) % 120;

  const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  sky.addColorStop(0, "#2a88f8");
  sky.addColorStop(0.5, "#1858b4");
  sky.addColorStop(1, "#0b2452");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.save();
  ctx.globalAlpha = settings.effectsOn ? 0.25 : 0.16;
  for (let x = -HEIGHT; x < WIDTH + HEIGHT; x += 96) {
    ctx.fillStyle = x % 192 === 0 ? "#ffd44f" : "#ffffff";
    ctx.beginPath();
    ctx.moveTo(x + shift, 0);
    ctx.lineTo(x + shift + 18, 0);
    ctx.lineTo(x + shift - HEIGHT + 18, HEIGHT);
    ctx.lineTo(x + shift - HEIGHT, HEIGHT);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.16;
  for (let i = 0; i < 7; i += 1) {
    const radius = 90 + i * 12;
    ctx.strokeStyle = i % 2 === 0 ? "#ffe58c" : "#f8fbff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(138, 86, radius, Math.PI * 0.1, Math.PI * 1.24);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = "rgba(6, 20, 50, 0.62)";
  ctx.fillRect(0, HEIGHT - 72, WIDTH, 72);

  ctx.fillStyle = "rgba(255, 229, 140, 0.18)";
  for (let i = 0; i < WIDTH; i += 84) {
    const pulse = Math.sin(state.elapsed * 2 + i * 0.04) * 7;
    ctx.fillRect(i + (shift % 84), HEIGHT - 58 + pulse, 26, 44 - pulse * 0.3);
  }
}

function drawCourseFrame() {
  ctx.save();
  ctx.fillStyle = "rgba(6, 20, 50, 0.56)";
  ctx.fillRect(0, 0, WIDTH, 16);
  ctx.fillRect(0, HEIGHT - 16, WIDTH, 16);

  ctx.fillStyle = "#ffcb2a";
  for (let i = 0; i < WIDTH; i += 48) {
    ctx.fillRect(i, 0, 24, 4);
    ctx.fillRect(i + 12, HEIGHT - 4, 24, 4);
  }
  ctx.restore();
}

function drawPipe(pipe) {
  const topHeight = pipe.gapY - pipe.gap * 0.5;
  const bottomY = pipe.gapY + pipe.gap * 0.5;
  drawPipeSegment(pipe.x, 0, pipe.width, topHeight, true, pipe.seed);
  drawPipeSegment(pipe.x, bottomY, pipe.width, HEIGHT - bottomY, false, pipe.seed + 0.2);
}

function drawPipeSegment(x, y, w, h, isTop, seed) {
  if (h <= 0) return;

  const body = ctx.createLinearGradient(x, y, x + w, y);
  body.addColorStop(0, "#082250");
  body.addColorStop(0.5, "#1d68d7");
  body.addColorStop(1, "#0e387d");

  ctx.fillStyle = body;
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = "#ffe58c";
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);

  ctx.save();
  ctx.globalAlpha = 0.28;
  for (let stripe = y + 12; stripe < y + h; stripe += 22) {
    ctx.fillStyle = Math.floor(stripe + seed * 11) % 2 === 0 ? "#ffffff" : "#ffcb2a";
    ctx.fillRect(x + 9, stripe, w - 18, 6);
  }
  ctx.restore();

  const capH = 22;
  const capY = isTop ? y + h - capH : y;
  const cap = ctx.createLinearGradient(x, capY, x + w, capY + capH);
  cap.addColorStop(0, "#ffe58c");
  cap.addColorStop(1, "#ffcb2a");
  ctx.fillStyle = cap;
  ctx.fillRect(x - 8, capY, w + 16, capH);
  ctx.strokeStyle = "#091a3c";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 8, capY, w + 16, capH);

  if (h > 80) {
    const emblemY = y + h * 0.5;

    ctx.beginPath();
    ctx.arc(x + w * 0.5, emblemY, 16, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fill();
    ctx.strokeStyle = "#0a1f45";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#0a1f45";
    ctx.font = "700 9px 'Avenir Next', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ЛДПР", x + w * 0.5, emblemY + 0.4);
  }
}

function drawPickups() {
  for (const pickup of state.pickups) {
    const bob = Math.sin(pickup.phase) * 4;

    if (pickup.type === "medal") {
      drawCoin(pickup.x, pickup.y + bob, pickup.r, "#ffcb2a", "#ffe58c", "Л");
      continue;
    }

    if (pickup.type === "rare") {
      drawCoin(pickup.x, pickup.y + bob, pickup.r + 1, "#eaa957", "#ffd391", "R");
      continue;
    }

    if (pickup.type === "double_jump") {
      drawDoubleJumpToken(pickup.x, pickup.y + bob, pickup.r);
    }
  }
}

function drawCoin(x, y, r, colorA, colorB, mark) {
  const grad = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
  grad.addColorStop(0, colorB);
  grad.addColorStop(1, colorA);

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#0c234f";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#0b1f44";
  ctx.font = "700 10px 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(mark, x, y + 0.5);
}

function drawDoubleJumpToken(x, y, r) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(state.elapsed * 1.4);

  ctx.fillStyle = "#7fd5ff";
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.74, 0);
  ctx.lineTo(0, r);
  ctx.lineTo(-r * 0.74, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#0c2b5d";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#083268";
  ctx.font = "700 9px 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("x2", 0, 0.6);

  ctx.restore();
}

function drawPlayer(visible) {
  if (!visible) {
    const idleY = HEIGHT * 0.52 + Math.sin(state.menuFloat * 2.3) * 16;
    drawHeadSprite(PLAYER_X, idleY, PLAYER_RADIUS * 0.95, -0.08, "neutral");

    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.font = "700 17px 'Avenir Next', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("FlappyNovsky готов к старту", PLAYER_X + 52, idleY + 6);
    return;
  }

  drawHeadSprite(state.player.x, state.player.y, state.player.r, state.player.angle, state.player.expression);
}

function drawHeadSprite(x, y, r, angle, expression) {
  const skin = skinCatalog[profile.selectedSkin] || skinCatalog.common;
  const image = skins[skin.id];

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  const skinGrad = ctx.createLinearGradient(0, -r, 0, r);
  skinGrad.addColorStop(0, "#ffdcb9");
  skinGrad.addColorStop(1, "#f2b277");
  ctx.fillStyle = skinGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  if (image && image.loaded && image.element) {
    drawSkinImageCropped(image.element, r);
  } else {
    drawFallbackFace(r);
  }

  drawExpressionOverlay(r, expression);

  ctx.restore();

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.strokeStyle = skin.ring || "#ffe58c";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, r + 2.2, 0, Math.PI * 2);
  ctx.stroke();

  if (expression === "hurt") {
    ctx.strokeStyle = "rgba(255, 88, 88, 0.82)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, r + 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (expression === "victory") {
    ctx.fillStyle = "rgba(255, 227, 128, 0.54)";
    ctx.beginPath();
    ctx.ellipse(-r - 14, 3, 15, 8, 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawSkinImageCropped(image, r) {
  const sw = image.naturalWidth || image.width;
  const sh = image.naturalHeight || image.height;

  if (!sw || !sh) {
    drawFallbackFace(r);
    return;
  }

  const size = Math.min(sw, sh);
  const sx = (sw - size) * 0.5;
  const sy = (sh - size) * 0.5;

  const prevSmoothing = ctx.imageSmoothingEnabled;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, sx, sy, size, size, -r, -r, r * 2, r * 2);
  ctx.imageSmoothingEnabled = prevSmoothing;
}

function drawExpressionOverlay(r, expression) {
  if (expression === "neutral") {
    return;
  }

  if (expression === "focused") {
    ctx.strokeStyle = "rgba(10, 24, 52, 0.88)";
    ctx.lineWidth = 2.4;

    ctx.beginPath();
    ctx.moveTo(-r * 0.42, -r * 0.2);
    ctx.lineTo(-r * 0.18, -r * 0.27);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(r * 0.42, -r * 0.2);
    ctx.lineTo(r * 0.18, -r * 0.27);
    ctx.stroke();

    return;
  }

  if (expression === "hurt") {
    ctx.strokeStyle = "rgba(86, 18, 18, 0.9)";
    ctx.lineWidth = 2.3;

    ctx.beginPath();
    ctx.moveTo(-r * 0.36, -r * 0.14);
    ctx.lineTo(-r * 0.2, -r * 0.02);
    ctx.moveTo(-r * 0.2, -r * 0.14);
    ctx.lineTo(-r * 0.36, -r * 0.02);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(r * 0.2, -r * 0.14);
    ctx.lineTo(r * 0.36, -r * 0.02);
    ctx.moveTo(r * 0.36, -r * 0.14);
    ctx.lineTo(r * 0.2, -r * 0.02);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, r * 0.2, r * 0.2, 0.12 * Math.PI, 0.88 * Math.PI, true);
    ctx.stroke();
    return;
  }

  if (expression === "victory") {
    ctx.fillStyle = "rgba(255, 224, 104, 0.92)";
    drawStar(-r * 0.24, -r * 0.08, r * 0.08);
    drawStar(r * 0.24, -r * 0.08, r * 0.08);

    ctx.strokeStyle = "rgba(25, 56, 102, 0.9)";
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(0, r * 0.14, r * 0.26, 0.1 * Math.PI, 0.9 * Math.PI, false);
    ctx.stroke();
  }
}

function drawStar(cx, cy, radius) {
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? radius : radius * 0.45;
    const x = cx + Math.cos(angle) * rr;
    const y = cy + Math.sin(angle) * rr;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

function drawFallbackFace(r) {
  ctx.fillStyle = "#f7c89a";
  ctx.fillRect(-r, -r, r * 2, r * 2);

  const hair = ctx.createLinearGradient(0, -r, 0, r * 0.2);
  hair.addColorStop(0, "#fff6de");
  hair.addColorStop(1, "#d6bf92");

  ctx.fillStyle = hair;
  ctx.beginPath();
  ctx.moveTo(-r, -r * 0.15);
  ctx.quadraticCurveTo(0, -r * 1.03, r, -r * 0.05);
  ctx.lineTo(r, -r);
  ctx.lineTo(-r, -r);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#3a2b24";
  ctx.beginPath();
  ctx.arc(-r * 0.25, -r * 0.08, r * 0.09, 0, Math.PI * 2);
  ctx.arc(r * 0.23, -r * 0.04, r * 0.09, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#7f4e3a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, r * 0.12, r * 0.36, 0.12 * Math.PI, 0.92 * Math.PI, false);
  ctx.stroke();

  ctx.fillStyle = "rgba(10, 31, 69, 0.72)";
  ctx.font = "700 17px 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ВВЖ", 0, r * 0.66);
}

function drawConfetti() {
  for (const p of state.confetti) {
    const alpha = clamp(p.life / p.ttl, 0, 1);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size * 0.5, -p.size * 0.3, p.size, p.size * 0.6);
    ctx.restore();
  }
}

function updateConfetti(dt) {
  for (const p of state.confetti) {
    p.life -= dt;
    p.vy += 520 * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.spin * dt;
  }

  state.confetti = state.confetti.filter((p) => p.life > 0 && p.y < HEIGHT + 40);
}

function spawnConfetti(count) {
  const palette = ["#ffcb2a", "#ffe58c", "#ffffff", "#2ea5ff", "#7fd5ff"];

  for (let i = 0; i < count; i += 1) {
    state.confetti.push({
      x: random(120, WIDTH - 120),
      y: random(40, 160),
      vx: random(-180, 180),
      vy: random(-320, -70),
      rot: random(0, Math.PI * 2),
      spin: random(-4.5, 4.5),
      life: random(1.2, 2.4),
      ttl: random(1.2, 2.4),
      size: random(5, 11),
      color: palette[Math.floor(Math.random() * palette.length)],
    });
  }
}

function collidesWithPipe(player, pipe) {
  const topHeight = pipe.gapY - pipe.gap * 0.5;
  const bottomY = pipe.gapY + pipe.gap * 0.5;

  return (
    circleRectCollision(player.x, player.y, player.r, pipe.x, 0, pipe.width, topHeight) ||
    circleRectCollision(player.x, player.y, player.r, pipe.x, bottomY, pipe.width, HEIGHT - bottomY)
  );
}

function getTuning() {
  const base = difficultyProfiles[settings.difficulty] || difficultyProfiles.normal;
  const speedMode = speedProfiles[settings.speedMode] || speedProfiles.classic;

  const speed = base.speed * speedMode.speedMult;
  const gravity = base.gravity * speedMode.gravityMult;
  const flap = base.flap * speedMode.flapMult;
  const spawnInterval = base.spawnInterval / speedMode.speedMult;
  const gap = base.gap;

  return {
    speed,
    gravity,
    flap,
    spawnInterval,
    gap,
  };
}

function showBanner(text, durationMs = 0) {
  state.bannerText = text;
  statusBanner.textContent = text;
  statusBanner.classList.toggle("hidden", !text);
  state.bannerTimer = durationMs > 0 ? durationMs / 1000 : 0;
}

function clearBanner() {
  state.bannerText = "";
  state.bannerTimer = 0;
  statusBanner.textContent = "";
  statusBanner.classList.add("hidden");
}

function showQuote(text, durationMs = 2600) {
  state.quoteText = text;
  quotePopup.textContent = text;
  quotePopup.classList.toggle("hidden", !text);
  state.quoteTimer = durationMs > 0 ? durationMs / 1000 : 0;
}

function clearQuote() {
  state.quoteText = "";
  state.quoteTimer = 0;
  quotePopup.textContent = "";
  quotePopup.classList.add("hidden");
}

function playVictoryFanfare() {
  playTone(660, 0.07, "triangle", 0.028);
  setTimeout(() => playTone(820, 0.07, "triangle", 0.028), 90);
  setTimeout(() => playTone(980, 0.09, "triangle", 0.03), 180);
}

function playApplause() {
  const hits = [
    [420, 0],
    [460, 80],
    [420, 160],
    [480, 260],
    [420, 360],
    [520, 460],
  ];

  for (const [freq, delay] of hits) {
    setTimeout(() => {
      playTone(freq, 0.05, "square", 0.02);
    }, delay);
  }
}

function playTone(freq, durationSec, waveform = "triangle", volume = 0.024) {
  if (!settings.soundOn) return;

  try {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = new Ctx();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = waveform;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  } catch {
    // Audio optional.
  }
}

async function toggleFullscreen() {
  const root = document.getElementById("app-root");

  try {
    if (!document.fullscreenElement && root.requestFullscreen) {
      await root.requestFullscreen();
      showBanner("Fullscreen включён", 700);
      return;
    }

    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
      if (state.mode === "playing") {
        clearBanner();
      }
    }
  } catch {
    // ignore fullscreen errors
  }
}

function loadSkinImages() {
  for (const skin of Object.values(skinCatalog)) {
    const img = new Image();
    skins[skin.id] = {
      loaded: false,
      element: img,
    };

    img.onload = () => {
      skins[skin.id].loaded = true;
    };

    img.onerror = () => {
      skins[skin.id].loaded = false;
    };

    img.src = skin.src;
  }
}

function setUIFromSettings() {
  difficultySelect.value = settings.difficulty;
  speedModeSelect.value = settings.speedMode;
  soundToggle.checked = settings.soundOn;
  effectsToggle.checked = settings.effectsOn;
}

function readProfile() {
  const defaults = {
    medals: 0,
    rareMedals: 0,
    bestScore: 0,
    totalRuns: 0,
    spentMedals: 0,
    selectedSkin: "common",
    unlockedSkins: ["common"],
    achievements: {},
  };

  const legacyBest = Number(localStorage.getItem(LEGACY_BEST_KEY));

  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");

    const unlocked = new Set(["common"]);

    if (Array.isArray(parsed.unlockedSkins)) {
      for (const id of parsed.unlockedSkins) {
        if (skinCatalog[id]) unlocked.add(id);
      }
    }

    if (parsed.unlockedSkins && typeof parsed.unlockedSkins === "object" && !Array.isArray(parsed.unlockedSkins)) {
      for (const [id, flag] of Object.entries(parsed.unlockedSkins)) {
        if (flag && skinCatalog[id]) {
          unlocked.add(id);
        }
      }
    }

    const selectedSkin = skinCatalog[parsed.selectedSkin] ? parsed.selectedSkin : "common";
    if (!unlocked.has(selectedSkin)) {
      unlocked.add(selectedSkin);
    }

    const bestScoreCandidates = [
      Number(parsed.bestScore),
      Number.isFinite(legacyBest) ? legacyBest : 0,
    ].filter((value) => Number.isFinite(value) && value >= 0);

    return {
      medals: Number.isFinite(Number(parsed.medals)) ? Math.max(0, Math.floor(Number(parsed.medals))) : defaults.medals,
      rareMedals: Number.isFinite(Number(parsed.rareMedals))
        ? Math.max(0, Math.floor(Number(parsed.rareMedals)))
        : defaults.rareMedals,
      bestScore: bestScoreCandidates.length ? Math.max(...bestScoreCandidates.map(Math.floor)) : defaults.bestScore,
      totalRuns: Number.isFinite(Number(parsed.totalRuns)) ? Math.max(0, Math.floor(Number(parsed.totalRuns))) : defaults.totalRuns,
      spentMedals: Number.isFinite(Number(parsed.spentMedals))
        ? Math.max(0, Math.floor(Number(parsed.spentMedals)))
        : defaults.spentMedals,
      selectedSkin,
      unlockedSkins: Array.from(unlocked),
      achievements: parsed.achievements && typeof parsed.achievements === "object" ? parsed.achievements : {},
    };
  } catch {
    return {
      ...defaults,
      bestScore: Number.isFinite(legacyBest) && legacyBest > 0 ? Math.floor(legacyBest) : 0,
    };
  }
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function readSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");

    return {
      difficulty: ["easy", "normal", "hard"].includes(parsed.difficulty) ? parsed.difficulty : "normal",
      speedMode: ["classic", "rush", "turbo"].includes(parsed.speedMode) ? parsed.speedMode : "classic",
      soundOn: typeof parsed.soundOn === "boolean" ? parsed.soundOn : true,
      effectsOn: typeof parsed.effectsOn === "boolean" ? parsed.effectsOn : true,
    };
  } catch {
    return {
      difficulty: "normal",
      speedMode: "classic",
      soundOn: true,
      effectsOn: true,
    };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function pickRandom(list) {
  if (!Array.isArray(list) || list.length === 0) return "";
  return list[Math.floor(Math.random() * list.length)];
}

function circleRectCollision(cx, cy, cr, rx, ry, rw, rh) {
  const nearestX = clamp(cx, rx, rx + rw);
  const nearestY = clamp(cy, ry, ry + rh);
  const dx = cx - nearestX;
  const dy = cy - nearestY;
  return dx * dx + dy * dy <= cr * cr;
}

function circleCollision(ax, ay, ar, bx, by, br) {
  const dx = ax - bx;
  const dy = ay - by;
  const rr = ar + br;
  return dx * dx + dy * dy <= rr * rr;
}

window.render_game_to_text = () => {
  const tuning = getTuning();

  const payload = {
    coordinate_system: "origin=(0,0) top-left; +x right; +y down; units=pixels on 960x540 canvas",
    mode: state.mode,
    active_screen: state.activeScreen,
    score: state.score,
    best_score: profile.bestScore,
    currencies: {
      medals: profile.medals,
      rare_medals: profile.rareMedals,
      run_medals: state.runMedals,
      run_rare_medals: state.runRare,
    },
    selected_skin: profile.selectedSkin,
    unlocked_skins: [...profile.unlockedSkins],
    difficulty: settings.difficulty,
    speed_mode: settings.speedMode,
    profile_tuning: {
      gravity: Number(tuning.gravity.toFixed(2)),
      flap: Number(tuning.flap.toFixed(2)),
      speed: Number(tuning.speed.toFixed(2)),
      gap: Number(tuning.gap.toFixed(2)),
      spawn_interval: Number(tuning.spawnInterval.toFixed(3)),
    },
    player: {
      x: Number(state.player.x.toFixed(2)),
      y: Number(state.player.y.toFixed(2)),
      vy: Number(state.player.vy.toFixed(2)),
      r: state.player.r,
      angle: Number(state.player.angle.toFixed(3)),
      expression: state.player.expression,
    },
    obstacles: state.pipes.slice(0, 8).map((pipe) => ({
      x: Number(pipe.x.toFixed(2)),
      width: pipe.width,
      gap_y: Number(pipe.gapY.toFixed(2)),
      gap_size: pipe.gap,
      passed: pipe.passed,
    })),
    pickups: state.pickups.slice(0, 12).map((pickup) => ({
      type: pickup.type,
      x: Number(pickup.x.toFixed(2)),
      y: Number(pickup.y.toFixed(2)),
      r: pickup.r,
    })),
    bonuses: {
      double_jump_charges: state.doubleJumpCharges,
      pending_secondary_flaps: state.pendingBoosts.length,
    },
    achievements_unlocked: Object.keys(profile.achievements).length,
    timers: {
      elapsed: Number(state.elapsed.toFixed(2)),
      spawn_in: Number(Math.max(0, tuning.spawnInterval - state.spawnTimer).toFixed(3)),
      banner_visible: Boolean(state.bannerText),
      quote_visible: Boolean(state.quoteText),
    },
    ui: {
      banner: state.bannerText,
      quote: state.quoteText,
    },
  };

  return JSON.stringify(payload, null, 2);
};

window.advanceTime = async (ms) => {
  const frameMs = 1000 / 60;
  let remaining = Math.max(0, Number(ms) || 0);

  state.manualStepping = true;
  while (remaining > 0) {
    const deltaMs = Math.min(frameMs, remaining);
    update(deltaMs / 1000);
    remaining -= deltaMs;
  }

  render();
  state.manualStepping = false;
};
