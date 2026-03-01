const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

const hud = document.getElementById("hud");
const scoreValue = document.getElementById("score-value");
const bestScoreValue = document.getElementById("best-score-value");
const runMedalsValue = document.getElementById("run-medals-value");
const runRareValue = document.getElementById("run-rare-value");
const bonusValue = document.getElementById("bonus-value");
const livesHud = document.getElementById("lives-hud");
const lifeHeartNodes = Array.from(document.querySelectorAll(".life-heart"));

const statusBanner = document.getElementById("status-banner");
const quotePopup = document.getElementById("quote-popup");
const resultOverlay = document.getElementById("result-overlay");
const resultTitle = document.getElementById("result-title");
const resultSubtitle = document.getElementById("result-subtitle");
const resultScoreValue = document.getElementById("result-score-value");
const resultMedalsValue = document.getElementById("result-medals-value");
const resultRareValue = document.getElementById("result-rare-value");
const introSplash = document.getElementById("intro-splash");
const introVideo = document.getElementById("intro-video");
const introTap = document.getElementById("intro-tap");

const menuMedalsValue = document.getElementById("menu-medals-value");
const menuRareValue = document.getElementById("menu-rare-value");
const menuBestValue = document.getElementById("menu-best-value");
const menuPresetValue = document.getElementById("menu-preset-value");
const menuHeartsCapValue = document.getElementById("menu-hearts-cap-value");
const menuCouponsValue = document.getElementById("menu-coupons-value");

const shopMedalsValue = document.getElementById("shop-medals-value");
const shopRareValue = document.getElementById("shop-rare-value");
const shopCouponsValue = document.getElementById("shop-coupons-value");
const shopActiveSkin = document.getElementById("shop-active-skin");
const shopActivePreset = document.getElementById("shop-active-preset");
const shopHeartsCapValue = document.getElementById("shop-hearts-cap-value");
const shopLocLevel = document.getElementById("shop-loc-level");
const shopActiveLocation = document.getElementById("shop-active-location");

const shopSkins = document.getElementById("shop-skins");
const shopEvents = document.getElementById("shop-events");
const boostPresets = document.getElementById("boost-presets");
const boostInventory = document.getElementById("boost-inventory");
const boostMarket = document.getElementById("boost-market");
const boostPacks = document.getElementById("boost-packs");
const dailyShop = document.getElementById("daily-shop");
const dailyShopTimer = document.getElementById("daily-shop-timer");
const craftGrid = document.getElementById("craft-grid");
const heartUpgrade = document.getElementById("heart-upgrade");
const boostRotationHint = document.getElementById("boost-rotation-hint");
const boostCouponToggle = document.getElementById("boost-coupon-toggle");
const shopTabButtons = Array.from(document.querySelectorAll("[data-shop-tab]"));
const achievementList = document.getElementById("achievement-list");

const difficultyValue = document.getElementById("difficulty-value");
const speedModeValue = document.getElementById("speed-mode-value");
const cycleButtons = Array.from(document.querySelectorAll("[data-cycle-target]"));
const soundToggle = document.getElementById("sound-toggle");
const effectsToggle = document.getElementById("effects-toggle");
const settingsLocationLevel = document.getElementById("settings-location-level");
const settingsLocationHint = document.getElementById("settings-location-hint");

const headEasterBtn = document.getElementById("head-easter-btn");
const headEasterImage = document.getElementById("head-easter-image");
const headEasterProgress = document.getElementById("head-easter-progress");

const menuScreen = document.getElementById("menu-screen");
const settingsScreen = document.getElementById("settings-screen");
const aboutGameScreen = document.getElementById("about-game-screen");
const aboutDevsScreen = document.getElementById("about-devs-screen");
const shopScreen = document.getElementById("shop-screen");
const achievementsScreen = document.getElementById("achievements-screen");

const BASE_WIDTH = 960;
const BASE_HEIGHT = 540;
let WIDTH = BASE_WIDTH;
let HEIGHT = BASE_HEIGHT;
let PLAYER_X = 228;
let PLAYER_RADIUS = 34;
let PIPE_WIDTH = 108;
let PIPE_SPACING = 306;
let PIPE_SHIFT_LIMIT = 76;
let PIPE_TOP_MARGIN = 76;
let PIPE_BOTTOM_MARGIN = 92;
let MIN_PIPE_GAP = PLAYER_RADIUS * 2 + 34;
let IS_PORTRAIT_LAYOUT = false;
const MAX_LIVES = 5;
const RUN_SPEED_RAMP_PER_SEC = 0.03;
const RUN_SPEED_RAMP_MAX = 2.35;
const PLAYER_PIPE_HITBOX_SCALE = 0.76;
const HEART_CAPACITY_PRICE_BY_LEVEL = {
  2: 110,
  3: 210,
  4: 360,
  5: 560,
};

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
const rewardDifficultyMult = {
  easy: 0.92,
  normal: 1,
  hard: 1.28,
};
const rewardSpeedMult = {
  classic: 1,
  rush: 1.14,
  turbo: 1.28,
};
const difficultyOrder = ["easy", "normal", "hard"];
const difficultyLabel = {
  easy: "Лёгкая",
  normal: "Нормальная",
  hard: "Хардкор",
};
const speedModeOrder = ["classic", "rush", "turbo"];

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

const backgroundThemes = {
  ldpr_classic: {
    label: "Классика ЛДПР",
    folder: "clouds2",
    layers: 4,
    tintTop: "#5f64c4",
    tintBottom: "#2f1f74",
  },
  sunny_forum: {
    label: "Солнечный форум",
    folder: "clouds1",
    layers: 4,
    tintTop: "#3599f8",
    tintBottom: "#19498b",
  },
  lavender_night: {
    label: "Лавандовая ночь",
    folder: "clouds3",
    layers: 4,
    tintTop: "#685ad2",
    tintBottom: "#2b1e6d",
  },
  sky_mobilization: {
    label: "Небесная мобилизация",
    folder: "clouds4",
    layers: 4,
    tintTop: "#4e87ef",
    tintBottom: "#274c96",
  },
  soft_twilight: {
    label: "Мягкие сумерки",
    folder: "clouds5",
    layers: 5,
    tintTop: "#7f7ec9",
    tintBottom: "#4a477f",
  },
  golden_hour: {
    label: "Золотой час",
    folder: "clouds6",
    layers: 6,
    tintTop: "#b0826e",
    tintBottom: "#5c3c5a",
  },
  storm_session: {
    label: "Штормовая сессия",
    folder: "clouds7",
    layers: 4,
    tintTop: "#5b6d95",
    tintBottom: "#2f3556",
  },
  retro_poster: {
    label: "Ретро-постер",
    folder: "clouds8",
    layers: 6,
    tintTop: "#528ce4",
    tintBottom: "#1c3a7e",
  },
};
const locationOrder = [
  "ldpr_classic",
  "sunny_forum",
  "lavender_night",
  "sky_mobilization",
  "soft_twilight",
  "golden_hour",
  "storm_session",
  "retro_poster",
];
const locationMusicByTheme = {
  ldpr_classic: "./assets/audio/locations/location-04.mp3",
  sunny_forum: "./assets/audio/locations/location-01.mp3",
  lavender_night: "./assets/audio/locations/location-02.mp3",
  sky_mobilization: "./assets/audio/locations/location-03.mp3",
  soft_twilight: "./assets/audio/locations/location-05.mp3",
  golden_hour: "./assets/audio/locations/location-06.mp3",
  storm_session: "./assets/audio/locations/location-07.mp3",
  retro_poster: "./assets/audio/locations/location-08.mp3",
};
const eventCatalog = {
  ldpr_classic: { id: "ldpr_classic", price: 0, rarePrice: 0, desc: "Базовый стартовый ивент." },
  sunny_forum: { id: "sunny_forum", price: 90, rarePrice: 0, desc: "Светлая дневная площадка." },
  lavender_night: { id: "lavender_night", price: 130, rarePrice: 0, desc: "Лавандовый вечерний рейд." },
  sky_mobilization: { id: "sky_mobilization", price: 170, rarePrice: 1, desc: "Боевой небесный темп." },
  soft_twilight: { id: "soft_twilight", price: 210, rarePrice: 1, desc: "Сумеречный марафон." },
  golden_hour: { id: "golden_hour", price: 250, rarePrice: 2, desc: "Золотой сезон рекордов." },
  storm_session: { id: "storm_session", price: 300, rarePrice: 2, desc: "Штормовой хардкор-ивент." },
  retro_poster: { id: "retro_poster", price: 360, rarePrice: 3, desc: "Финальный ретро-ивент." },
};
const boostCatalog = {
  shield_start: {
    id: "shield_start",
    name: "Щит старта",
    rarity: "common",
    rarityLabel: "Обычный",
    price: 42,
    rarePrice: 0,
    desc: "Даёт неуязвимость на старте забега.",
    effects: { startInvulnerability: 1.4 },
  },
  jump_cache: {
    id: "jump_cache",
    name: "Запас прыжка",
    rarity: "common",
    rarityLabel: "Обычный",
    price: 55,
    rarePrice: 0,
    desc: "Стартовые +2 заряда двойного прыжка.",
    effects: { startDoubleJump: 2 },
  },
  medal_lens: {
    id: "medal_lens",
    name: "Линза фарма",
    rarity: "common",
    rarityLabel: "Обычный",
    price: 64,
    rarePrice: 0,
    desc: "Больше медалей за пролёты и подборы.",
    effects: { medalAwardMult: 1.16 },
  },
  medal_magnet: {
    id: "medal_magnet",
    name: "Медаль-магнит",
    rarity: "rare",
    rarityLabel: "Редкий",
    price: 96,
    rarePrice: 0,
    desc: "Увеличивает радиус сбора медалей.",
    effects: { pickupRadiusMult: 1.22 },
  },
  rare_scanner: {
    id: "rare_scanner",
    name: "Сканер редких",
    rarity: "rare",
    rarityLabel: "Редкий",
    price: 112,
    rarePrice: 1,
    desc: "Повышает шанс спавна редких медалей.",
    effects: { rareChanceMult: 1.38 },
  },
  insurance: {
    id: "insurance",
    name: "Страховка забега",
    rarity: "rare",
    rarityLabel: "Редкий",
    price: 132,
    rarePrice: 1,
    desc: "Компенсирует часть медалей при окончании забега.",
    effects: { insuranceRate: 0.26 },
  },
  turbo_risk: {
    id: "turbo_risk",
    name: "Турбо-риск",
    rarity: "epic",
    rarityLabel: "Эпик",
    price: 162,
    rarePrice: 2,
    desc: "Сразу ускоряет темп и повышает награду.",
    effects: { speedRampBonus: 0.24, medalAwardMult: 1.22 },
  },
  jackpot: {
    id: "jackpot",
    name: "Джекпот",
    rarity: "epic",
    rarityLabel: "Эпик",
    price: 182,
    rarePrice: 2,
    desc: "Сильный буст к фарму медалей и редких.",
    effects: { medalAwardMult: 1.42, rareChanceMult: 1.2 },
  },
  ghost_entry: {
    id: "ghost_entry",
    name: "Фантом-вход",
    rarity: "epic",
    rarityLabel: "Эпик",
    price: 174,
    rarePrice: 2,
    desc: "Длинная стартовая неуязвимость и доп. прыжки.",
    effects: { startInvulnerability: 2.4, startDoubleJump: 2 },
  },
};
const boostPresetsCatalog = {
  safe: {
    id: "safe",
    name: "Сейв",
    desc: "Больше шансов пережить начало.",
    boosts: ["shield_start", "insurance", "jump_cache"],
  },
  farm: {
    id: "farm",
    name: "Фарм",
    desc: "Максимум медалей в стабильном темпе.",
    boosts: ["medal_lens", "medal_magnet", "rare_scanner"],
  },
  risk: {
    id: "risk",
    name: "Риск",
    desc: "Агрессивный старт и высокий профит.",
    boosts: ["turbo_risk", "ghost_entry", "jackpot"],
  },
};
const boostPresetOrder = ["safe", "farm", "risk"];
const boostPacksCatalog = {
  starter_set: {
    id: "starter_set",
    name: "Набор новичка",
    rarity: "common",
    price: 130,
    rarePrice: 0,
    desc: "Базовый сейв-комплект на 5 бустов.",
    contents: { shield_start: 2, jump_cache: 2, medal_lens: 1 },
  },
  farm_set: {
    id: "farm_set",
    name: "Набор фарма",
    rarity: "rare",
    price: 255,
    rarePrice: 1,
    desc: "Дешевле, чем покупать бусты фарма по одному.",
    contents: { medal_lens: 2, medal_magnet: 2, rare_scanner: 1 },
  },
  risk_set: {
    id: "risk_set",
    name: "Набор риска",
    rarity: "epic",
    price: 372,
    rarePrice: 3,
    desc: "Боевой комплект под рекордный темп.",
    contents: { turbo_risk: 1, ghost_entry: 1, jackpot: 1 },
  },
};
const boostPackOrder = ["starter_set", "farm_set", "risk_set"];
const craftRecipesCatalog = {
  medal_to_rare: {
    id: "medal_to_rare",
    name: "Крафт редкой медали",
    desc: "130 медалей -> 1 редкая медаль.",
    costMedals: 130,
    costRare: 0,
    rewardType: "rare_medal",
    rewardAmount: 1,
  },
  rare_to_medal: {
    id: "rare_to_medal",
    name: "Размен редкой",
    desc: "1 редкая -> 80 медалей.",
    costMedals: 0,
    costRare: 1,
    rewardType: "medal",
    rewardAmount: 80,
  },
  rare_to_coupon: {
    id: "rare_to_coupon",
    name: "Купон из редких",
    desc: "2 редкие -> 1 купон скидки.",
    costMedals: 0,
    costRare: 2,
    rewardType: "coupon",
    rewardAmount: 1,
  },
  random_boost: {
    id: "random_boost",
    name: "Случайный буст",
    desc: "90 медалей + 1 редкая -> 1 случайный буст.",
    costMedals: 90,
    costRare: 1,
    rewardType: "random_boost",
    rewardAmount: 1,
  },
};
const craftRecipeOrder = ["medal_to_rare", "rare_to_medal", "rare_to_coupon", "random_boost"];
const boostRotationByTheme = {
  ldpr_classic: ["shield_start", "jump_cache", "medal_lens", "medal_magnet"],
  sunny_forum: ["medal_lens", "medal_magnet", "rare_scanner", "insurance"],
  lavender_night: ["shield_start", "rare_scanner", "insurance", "ghost_entry"],
  sky_mobilization: ["jump_cache", "medal_magnet", "insurance", "turbo_risk"],
  soft_twilight: ["medal_lens", "rare_scanner", "insurance", "jackpot"],
  golden_hour: ["medal_lens", "medal_magnet", "jackpot", "turbo_risk"],
  storm_session: ["shield_start", "insurance", "turbo_risk", "ghost_entry"],
  retro_poster: ["rare_scanner", "turbo_risk", "jackpot", "ghost_entry"],
};
const pipeThemeMap = {
  ldpr_classic: "blue",
  sunny_forum: "blue",
  lavender_night: "darkBlue",
  sky_mobilization: "blue",
  soft_twilight: "metal",
  golden_hour: "metal",
  storm_session: "orange",
  retro_poster: "violet",
};
const pipeTextureCatalog = {
  blue: "./assets/pipes/pipe-blue.png",
  darkBlue: "./assets/pipes/pipe-dark-blue.png",
  metal: "./assets/pipes/pipe-metal.png",
  orange: "./assets/pipes/pipe-orange.png",
  violet: "./assets/pipes/pipe-violet.png",
};

const parallaxSpeedByLayer = [0.015, 0.04, 0.07, 0.1, 0.145, 0.2];
const parallaxAlphaByLayer = [1, 0.95, 0.9, 0.84, 0.8, 0.76];

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
    title: "Марафон 30",
    desc: "Набери 30 очков в бесконечном режиме.",
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
  lives: MAX_LIVES,
  invulnerabilityTimer: 0,
  respawnFlashTimer: 0,
  pendingBoosts: [],
  shopTab: "skins",
  couponArmed: false,
  runTime: 0,
  runBoostsConsumed: [],
  runBoostEffects: createEmptyRunBoostEffects(),
  runMaxLives: 1,
  player: {
    x: PLAYER_X,
    y: HEIGHT * 0.48,
    vy: 0,
    r: PLAYER_RADIUS,
    angle: 0,
    expression: "neutral",
  },
};
ensureProfileBoostState();

const skins = {};
const parallaxLayers = [];
const pipeTextures = {};
const uiSprites = {
  heart: { element: null, loaded: false, src: "./assets/ui/heart.png", crop: null },
  medal: { element: null, loaded: false, src: "./assets/ui/pickups/medal.png", crop: null },
  rareMedal: { element: null, loaded: false, src: "./assets/ui/pickups/rare-medal.png", crop: null },
  x2: { element: null, loaded: false, src: "./assets/ui/pickups/x2.png", crop: null },
};
const viewport = {
  dpr: 1,
  cssWidth: BASE_WIDTH,
  cssHeight: BASE_HEIGHT,
  pixelWidth: BASE_WIDTH,
  pixelHeight: BASE_HEIGHT,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
};
const perf = {
  mode: "auto",
  lowQuality: false,
  fpsEMA: 60,
  lowQualityHintShown: false,
};
const audioSources = {
  menuBgm: "./assets/audio/menu-bgm.mp3",
  menuClick: "./assets/audio/menu-click.mp3",
  cannotBuy: "./assets/audio/cannot-buy.mp3",
  settingsSave: "./assets/audio/settings-save.mp3",
  purchase: "./assets/audio/purchase.mp3",
  applause: "./assets/audio/applause.mp3",
  lose: "./assets/audio/lose.mp3",
  reward: "./assets/audio/reward.mp3",
  notify: "./assets/audio/notify.mp3",
  heartLost: "./assets/audio/heart-lost.mp3",
  heartPickup: "./assets/audio/heart-pickup.mp3",
};
const intro = {
  active: true,
  fallbackShown: false,
};
const audioState = {
  menuBgm: null,
  gameplayBgm: null,
  gameplayTheme: "",
  fadeToken: 0,
  runFadeToken: 0,
};
let audioCtx = null;
let rafLastTs = performance.now();
let activeBackgroundTheme = "ldpr_classic";

document.body.classList.add("intro-running");

loadSkinImages();
loadPipeTextures();
loadUiSprites();
applySelectedEventTheme();
initAudio();
setupControls();
setupViewport();
setupIntroSplash();
setUIFromSettings();
setShopTab("skins");
renderShop();
renderAchievements();
updateMetaUI();
updateHud();
updateLivesUI();
applyScreen("menu");
showBanner("Нажми Играть, Space или клик по сцене", 0);
updateHeadEasterUI();
updateHeadPreview();
requestAnimationFrame(mainLoop);

function setupControls() {
  document.addEventListener("click", (event) => {
    if (isIntroActive()) {
      return;
    }

    const resultAction = event.target.closest("[data-result-action]");
    if (resultAction) {
      playSfx("menuClick", 0.85);
      const action = resultAction.getAttribute("data-result-action");
      if (action === "restart") {
        startGame();
      } else if (action === "menu") {
        goToMenu();
      }
      return;
    }

    const openBtn = event.target.closest("[data-open]");
    if (openBtn) {
      if (openBtn.id === "settings-save-btn") {
        playSfx("settingsSave", 0.9);
      } else {
        playSfx("menuClick", 0.85);
      }
      onMenuAction(openBtn.getAttribute("data-open"));
      return;
    }

    const buyBtn = event.target.closest("[data-buy-skin]");
    if (buyBtn) {
      playSfx("menuClick", 0.85);
      purchaseSkin(buyBtn.getAttribute("data-buy-skin"));
      return;
    }

    const buyEventBtn = event.target.closest("[data-buy-event]");
    if (buyEventBtn) {
      playSfx("menuClick", 0.85);
      purchaseEvent(buyEventBtn.getAttribute("data-buy-event"));
      return;
    }

    const buyBoostBtn = event.target.closest("[data-buy-boost]");
    if (buyBoostBtn) {
      playSfx("menuClick", 0.85);
      purchaseBoostSingle(buyBoostBtn.getAttribute("data-buy-boost"));
      return;
    }

    const buyPackBtn = event.target.closest("[data-buy-boost-pack]");
    if (buyPackBtn) {
      playSfx("menuClick", 0.85);
      purchaseBoostPack(buyPackBtn.getAttribute("data-buy-boost-pack"));
      return;
    }

    const buyDailyBtn = event.target.closest("[data-buy-daily-offer]");
    if (buyDailyBtn) {
      playSfx("menuClick", 0.85);
      purchaseDailyOffer(buyDailyBtn.getAttribute("data-buy-daily-offer"));
      return;
    }

    const presetBtn = event.target.closest("[data-select-preset]");
    if (presetBtn) {
      playSfx("menuClick", 0.85);
      selectBoostPreset(presetBtn.getAttribute("data-select-preset"));
      return;
    }

    const craftBtn = event.target.closest("[data-craft-recipe]");
    if (craftBtn) {
      playSfx("menuClick", 0.85);
      craftRecipe(craftBtn.getAttribute("data-craft-recipe"));
      return;
    }

    const heartUpgradeBtn = event.target.closest("[data-upgrade-hearts]");
    if (heartUpgradeBtn) {
      playSfx("menuClick", 0.85);
      upgradeHeartCapacity();
      return;
    }

    if (event.target.closest("[data-toggle-coupon]")) {
      toggleCouponUsage();
      playSfx("menuClick", 0.8);
      return;
    }

    const equipBtn = event.target.closest("[data-equip-skin]");
    if (equipBtn) {
      playSfx("menuClick", 0.85);
      equipSkin(equipBtn.getAttribute("data-equip-skin"));
      return;
    }

    const selectEventBtn = event.target.closest("[data-select-event]");
    if (selectEventBtn) {
      playSfx("menuClick", 0.85);
      selectEventTheme(selectEventBtn.getAttribute("data-select-event"));
      return;
    }

    if (event.target.closest("#head-easter-btn")) {
      playSfx("menuClick", 0.75);
      triggerHeadEasterClick();
    }
  });

  for (const btn of cycleButtons) {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-cycle-target");
      const dir = Number(btn.getAttribute("data-cycle-dir")) || 1;
      if (target === "difficulty") {
        settings.difficulty = cycleValue(difficultyOrder, settings.difficulty, dir);
        renderSettingsCycleValues();
        saveSettings();
        showBanner(`Сложность: ${difficultyLabel[settings.difficulty] || "Нормальная"}`, 1300);
        playSfx("menuClick", 0.72);
        return;
      }
      if (target === "speed") {
        settings.speedMode = cycleValue(speedModeOrder, settings.speedMode, dir);
        renderSettingsCycleValues();
        saveSettings();
        showBanner(`Режим скорости: ${(speedProfiles[settings.speedMode] || speedProfiles.classic).label}`, 1300);
        playSfx("menuClick", 0.72);
      }
    });
  }

  soundToggle.addEventListener("change", () => {
    settings.soundOn = Boolean(soundToggle.checked);
    saveSettings();
    syncMenuMusicState();
  });

  effectsToggle.addEventListener("change", () => {
    settings.effectsOn = Boolean(effectsToggle.checked);
    saveSettings();
  });

  for (const btn of shopTabButtons) {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-shop-tab");
      setShopTab(tab);
      playSfx("menuClick", 0.7);
    });
  }

  window.addEventListener("keydown", (event) => {
    const tag = event.target && event.target.tagName ? event.target.tagName : "";

    if (isIntroActive()) {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        startIntroPlayback();
      } else if (event.key === "Escape") {
        event.preventDefault();
        finishIntroSplash();
      }
      return;
    }

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

    if (isIntroActive()) {
      return;
    }

    if (state.mode === "playing" || state.mode === "paused") {
      primaryAction();
    }
  });

  headEasterBtn.addEventListener("pointerdown", (event) => {
    event.preventDefault();
  });
}

function isIntroActive() {
  return intro.active && introSplash && !introSplash.classList.contains("hidden");
}

function setupIntroSplash() {
  if (!introSplash || !introVideo) {
    intro.active = false;
    document.body.classList.remove("intro-running");
    syncMenuMusicState();
    return;
  }

  introVideo.muted = false;
  introVideo.volume = 1;
  introVideo.currentTime = 0;

  introVideo.addEventListener("ended", () => {
    finishIntroSplash();
  });

  introVideo.addEventListener("error", () => {
    finishIntroSplash(true);
  });

  introSplash.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isIntroActive()) {
      startIntroPlayback();
    }
  });

  setTimeout(() => {
    if (!isIntroActive()) return;
    if (introVideo.readyState <= 1) {
      showIntroTapFallback();
    }
  }, 900);

  startIntroPlayback();
}

function showIntroTapFallback() {
  if (introTap) {
    introTap.classList.remove("hidden");
  }
  intro.fallbackShown = true;
}

function hideIntroTapFallback() {
  if (introTap) {
    introTap.classList.add("hidden");
  }
  intro.fallbackShown = false;
}

function startIntroPlayback() {
  if (!isIntroActive() || !introVideo) return;

  hideIntroTapFallback();
  const promise = introVideo.play();
  if (promise && typeof promise.catch === "function") {
    promise.catch(() => {
      showIntroTapFallback();
    });
  }
}

function finishIntroSplash(isError = false) {
  if (!isIntroActive()) {
    intro.active = false;
    document.body.classList.remove("intro-running");
    document.body.classList.remove("intro-reveal");
    syncMenuMusicState();
    return;
  }

  intro.active = false;
  hideIntroTapFallback();

  if (introVideo && !introVideo.paused) {
    introVideo.pause();
  }

  if (isError) {
    introSplash.classList.add("hidden");
    document.body.classList.remove("intro-running");
    document.body.classList.remove("intro-reveal");
    syncMenuMusicState();
    return;
  }

  // Start synchronized crossfade: intro fades out while menu/UI fades in.
  applyScreen("menu");
  document.body.classList.add("intro-reveal");
  requestAnimationFrame(() => {
    document.body.classList.remove("intro-running");
    syncMenuMusicState();
  });
  introSplash.classList.add("intro-splash--fade");
  setTimeout(() => {
    introSplash.classList.add("hidden");
    introSplash.classList.remove("active");
    introSplash.classList.remove("intro-splash--fade");
    document.body.classList.remove("intro-reveal");
    syncMenuMusicState();
  }, 780);
}

function setupViewport() {
  applyViewportMetrics();

  let resizeRaf = 0;
  const handleResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      applyViewportMetrics();
    });
  };

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("orientationchange", handleResize, { passive: true });
}

function applyViewportMetrics() {
  const prevWidth = WIDTH;
  const prevHeight = HEIGHT;

  const cssWidth = Math.max(320, Math.floor(window.innerWidth || document.documentElement.clientWidth || BASE_WIDTH));
  const cssHeight = Math.max(320, Math.floor(window.innerHeight || document.documentElement.clientHeight || BASE_HEIGHT));
  const nativeDpr = window.devicePixelRatio || 1;

  IS_PORTRAIT_LAYOUT = cssHeight > cssWidth;
  WIDTH = IS_PORTRAIT_LAYOUT ? 540 : BASE_WIDTH;
  HEIGHT = IS_PORTRAIT_LAYOUT
    ? Math.round(clamp(WIDTH * (cssHeight / cssWidth), 980, 1260))
    : BASE_HEIGHT;

  PLAYER_RADIUS = Math.round(Math.min(WIDTH, HEIGHT) * (IS_PORTRAIT_LAYOUT ? 0.067 : 0.063));
  PLAYER_X = Math.round(WIDTH * (IS_PORTRAIT_LAYOUT ? 0.27 : 0.2375));
  PIPE_WIDTH = Math.round(WIDTH * (IS_PORTRAIT_LAYOUT ? 0.208 : 0.14));
  PIPE_SPACING = Math.round(WIDTH * (IS_PORTRAIT_LAYOUT ? 0.62 : 0.319));
  PIPE_SHIFT_LIMIT = Math.round(HEIGHT * (IS_PORTRAIT_LAYOUT ? 0.07 : 0.14));
  PIPE_TOP_MARGIN = Math.round(HEIGHT * 0.13);
  PIPE_BOTTOM_MARGIN = Math.round(HEIGHT * 0.16);
  MIN_PIPE_GAP = PLAYER_RADIUS * 2 + Math.round(HEIGHT * (IS_PORTRAIT_LAYOUT ? 0.06 : 0.05));

  const perfScale = perf.lowQuality ? 0.84 : 1;
  const dprCap = IS_PORTRAIT_LAYOUT ? 1.2 : 1.4;
  const dpr = Math.min(nativeDpr, dprCap) * perfScale;

  viewport.dpr = dpr;
  viewport.cssWidth = cssWidth;
  viewport.cssHeight = cssHeight;
  viewport.pixelWidth = Math.max(1, Math.round(cssWidth * dpr));
  viewport.pixelHeight = Math.max(1, Math.round(cssHeight * dpr));

  canvas.width = viewport.pixelWidth;
  canvas.height = viewport.pixelHeight;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  if (IS_PORTRAIT_LAYOUT) {
    viewport.scale = viewport.pixelWidth / WIDTH;
    viewport.offsetX = 0;
    viewport.offsetY = (viewport.pixelHeight - HEIGHT * viewport.scale) * 0.5;
  } else {
    viewport.scale = Math.max(viewport.pixelWidth / WIDTH, viewport.pixelHeight / HEIGHT);
    viewport.offsetX = (viewport.pixelWidth - WIDTH * viewport.scale) * 0.5;
    viewport.offsetY = (viewport.pixelHeight - HEIGHT * viewport.scale) * 0.5;
  }

  const hudScale = clamp(IS_PORTRAIT_LAYOUT ? cssWidth / 420 : cssWidth / 1280, 0.86, 1.14);
  document.documentElement.style.setProperty("--hud-scale", hudScale.toFixed(3));

  const scaleX = prevWidth > 0 ? WIDTH / prevWidth : 1;
  const scaleY = prevHeight > 0 ? HEIGHT / prevHeight : 1;

  state.player.r = PLAYER_RADIUS;
  state.player.x = PLAYER_X;
  state.player.y = clamp((state.player.y || HEIGHT * 0.48) * scaleY, state.player.r + 6, HEIGHT - state.player.r - 6);
  state.player.vy *= scaleY;

  for (const pipe of state.pipes) {
    pipe.x *= scaleX;
    pipe.width = PIPE_WIDTH;
    pipe.gapY = clamp(pipe.gapY * scaleY, PIPE_TOP_MARGIN + pipe.gap * 0.5, HEIGHT - PIPE_BOTTOM_MARGIN - pipe.gap * 0.5);
    pipe.gap = Math.max(Math.round(pipe.gap * scaleY), MIN_PIPE_GAP);
  }

  for (const pickup of state.pickups) {
    pickup.x *= scaleX;
    pickup.y *= scaleY;
    pickup.r = Math.max(8, Math.round(pickup.r * Math.min(scaleX, scaleY)));
  }

  for (const piece of state.confetti) {
    piece.x *= scaleX;
    piece.y *= scaleY;
    piece.size *= Math.min(scaleX, scaleY);
  }

  if (state.mode === "playing" || state.mode === "paused" || state.mode === "gameover" || state.mode === "victory") {
    ensurePipeStream();
  }

}

function onMenuAction(action) {
  if (isIntroActive()) return;

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
  if (isIntroActive()) return;

  if (state.mode === "playing") {
    flap();
    return;
  }

  if (state.mode === "paused") {
    resumeGame();
    return;
  }

  if (state.mode === "menu") {
    startGame();
    return;
  }

  if (state.mode === "gameover" || state.mode === "victory") {
    startGame();
  }
}

function applyScreen(name) {
  if (!isIntroActive()) {
    document.body.classList.remove("intro-running");
  }

  for (const panel of Object.values(screens)) {
    panel.classList.remove("active");
  }

  if (name && screens[name]) {
    screens[name].classList.add("active");
    state.activeScreen = name;
    state.mode = name;
    hud.classList.add("hidden");
    livesHud.classList.add("hidden");
    if (name !== "none") {
      stopGameplayMusic();
    }
  } else {
    state.activeScreen = "none";
  }

  if (name === "menu") {
    state.mode = "menu";
    showBanner("Нажми Играть, Space или клик по сцене", 0);
    syncMenuMusicState();
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
  state.lives = getHeartCapacity();
  state.runMaxLives = getHeartCapacity();
  state.invulnerabilityTimer = 0;
  state.respawnFlashTimer = 0;
  state.runTime = 0;
  state.runBoostsConsumed = [];
  state.runBoostEffects = createEmptyRunBoostEffects();
  stopGameplayMusic();
  syncMenuMusicState();
  updateLivesUI();
  hideResultOverlay();
}

function startGame() {
  const runTheme = getSelectedEventTheme();
  loadParallaxImagesForTheme(runTheme);
  activeBackgroundTheme = runTheme;
  profile.selectedEvent = runTheme;
  settings.backgroundTheme = runTheme;

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
  state.runTime = 0;
  state.runBoostsConsumed = [];
  state.runBoostEffects = createEmptyRunBoostEffects();
  state.runMaxLives = getHeartCapacity();
  state.lives = state.runMaxLives;
  state.invulnerabilityTimer = 0;
  state.respawnFlashTimer = 0;
  state.crashFlash = 0;

  state.player.x = PLAYER_X;
  state.player.y = HEIGHT * 0.48;
  state.player.vy = 0;
  state.player.angle = 0;
  state.player.expression = "neutral";

  profile.totalRuns += 1;
  unlockAchievement("first_flight");
  applyPresetBeforeRun();

  initializePipeStream();

  for (const panel of Object.values(screens)) {
    panel.classList.remove("active");
  }

  hud.classList.remove("hidden");
  livesHud.classList.remove("hidden");
  hideResultOverlay();
  clearBanner();

  const phrase = pickRandom(startPhrases);
  showQuote(phrase, 1700);

  playTone(560, 0.05, "triangle", 0.03);
  playSfx("notify", 0.4);
  fadeMenuMusicTo(0, 220);
  playGameplayMusicForTheme(runTheme);
  updateHud();
  updateMetaUI();
  saveProfile();
  saveSettings();
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
  livesHud.classList.add("hidden");
  state.player.expression = "hurt";
  // Launch a short death-fall arc, then let the head drop below the screen.
  state.player.vy = Math.min(state.player.vy * 0.35, -180);
  state.player.angle = Math.min(state.player.angle, -0.25);
  state.crashFlash = 0.27;

  if (state.score >= 10) {
    unlockAchievement("score_10");
  }

  let banner = `Забег завершён (${reason}). Space/клик — рестарт, Esc — меню`;
  let insuranceText = "";
  const insuranceRate = state.runBoostEffects.insuranceRate || 0;
  if (insuranceRate > 0 && state.runMedals > 0) {
    const comp = Math.max(1, Math.round(state.runMedals * insuranceRate));
    profile.medals += comp;
    insuranceText = ` Страховка вернула +${comp} медалей.`;
  }

  if (state.runRecordBeaten) {
    banner = `Новый рекорд ${profile.bestScore}! Space/клик — новый забег, Esc — меню`;
    showQuote(pickRandom(quotesNewRecord), 4300);
    playApplause();
  }

  showBanner(banner, 0);
  showResultOverlay("Игра окончена", {
    score: state.score,
    medals: state.runMedals,
    rare: state.runRare,
    subtitle: `Попробуй ещё раз и поставь новый рекорд.${insuranceText}`,
  });

  playSfx("lose", 0.7);
  playTone(172, 0.15, "sawtooth", 0.038);
  setTimeout(() => playTone(132, 0.11, "sawtooth", 0.03), 68);

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
    state.player.vy += 1650 * dt;
    state.player.y += state.player.vy * dt;
    state.player.angle = clamp(state.player.angle + 3.6 * dt, -0.9, 1.85);
    const abyssY = HEIGHT + state.player.r * 8.5;
    if (state.player.y > abyssY) {
      state.player.y = abyssY;
      state.player.vy = 0;
    }

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
  state.runTime += dt;
  const tuning = getTuning();
  const pipeCollisionRadius = getPlayerPipeCollisionRadius();
  const pickupCollisionRadius = Math.max(8, state.player.r * (state.runBoostEffects.pickupRadiusMult || 1));
  state.invulnerabilityTimer = Math.max(0, state.invulnerabilityTimer - dt);
  state.respawnFlashTimer = Math.max(0, state.respawnFlashTimer - dt);

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
    handlePlayerDamage("удар о верхнюю границу");
  }

  if (state.player.y + state.player.r >= HEIGHT) {
    state.player.y = HEIGHT - state.player.r;
    handlePlayerDamage("удар о нижнюю границу");
  }

  for (const pipe of state.pipes) {
    pipe.x -= tuning.speed * dt;

    if (!pipe.passed && pipe.x + pipe.width < state.player.x) {
      pipe.passed = true;
      onPipePassed();
    }

    if (collidesWithPipe(state.player, pipe, pipeCollisionRadius)) {
      handlePlayerDamage("касание барьера");
      if (state.mode !== "playing") {
        break;
      }
    }
  }

  for (const pickup of state.pickups) {
    pickup.x -= tuning.speed * dt;
    pickup.phase += dt * 4;

    if (circleCollision(state.player.x, state.player.y, pickupCollisionRadius, pickup.x, pickup.y, pickup.r)) {
      collectPickup(pickup);
      pickup.collected = true;
    }
  }

  if (state.player.vy > 220) {
    state.player.expression = "neutral";
  }

  state.pipes = state.pipes.filter((pipe) => pipe.x + pipe.width > -40);
  state.pickups = state.pickups.filter((pickup) => pickup.x + pickup.r > -20 && !pickup.collected);
  ensurePipeStream();

}

function handlePlayerDamage(reason) {
  if (state.mode !== "playing") return;
  if (state.invulnerabilityTimer > 0) return;

  if (state.lives > 1) {
    state.lives -= 1;
    state.invulnerabilityTimer = 1.2;
    state.respawnFlashTimer = 1.2;
    state.player.x = PLAYER_X;
    state.player.y = HEIGHT * 0.5;
    state.player.vy = -40;
    state.player.angle = -0.22;
    state.player.expression = "neutral";
    state.pendingBoosts = [];
    state.doubleJumpCharges = 0;
    // Do not reposition pipes on hit: this caused visible teleports and overlaps.
    // Invulnerability window is enough for safe recovery while pipes keep natural spacing.

    playSfx("heartLost", 0.85);
    showBanner(`Минус сердечко. Осталось: ${state.lives}`, 900);
    updateLivesUI();
    updateHud();
    return;
  }

  state.lives = 0;
  updateLivesUI();
  loseGame(reason);
}

function onPipePassed() {
  state.score += 1;
  addMedals(1, { scaled: true });

  if (state.score > profile.bestScore) {
    profile.bestScore = state.score;
    state.runRecordBeaten = true;
    unlockAchievement("new_record");
  }

  if (state.score >= 10) {
    unlockAchievement("score_10");
  }
  if (state.score >= 30) {
    unlockAchievement("victory_30");
  }

  playTone(930, 0.045, "triangle", 0.024);
  updateHud();
  updateMetaUI();
}

function createPipe(spawnX, prevGapY) {
  const tuning = getTuning();
  const gap = Math.max(tuning.gap, MIN_PIPE_GAP);
  const minGapCenter = PIPE_TOP_MARGIN + gap * 0.5;
  const maxGapCenter = HEIGHT - PIPE_BOTTOM_MARGIN - gap * 0.5;
  const targetCenter = clamp(prevGapY + random(-PIPE_SHIFT_LIMIT, PIPE_SHIFT_LIMIT), minGapCenter, maxGapCenter);

  return {
    x: spawnX,
    width: PIPE_WIDTH,
    gapY: targetCenter,
    gap,
    passed: false,
    seed: Math.random() * 1000,
  };
}

function initializePipeStream() {
  state.pipes = [];
  state.pickups = [];

  // Keep first obstacle close to viewport so gameplay doesn't feel empty at start.
  let spawnX = WIDTH + 56;
  let prevGapY = HEIGHT * 0.52;

  for (let i = 0; i < 4; i += 1) {
    const pipe = createPipe(spawnX, prevGapY);
    state.pipes.push(pipe);
    spawnPickupNearPipe(pipe);
    prevGapY = pipe.gapY;
    spawnX += PIPE_SPACING;
  }
}

function ensurePipeStream() {
  if (state.pipes.length === 0) {
    initializePipeStream();
    return;
  }

  let last = state.pipes[state.pipes.length - 1];
  while (last.x < WIDTH + PIPE_SPACING * 2) {
    const nextPipe = createPipe(last.x + PIPE_SPACING, last.gapY);
    state.pipes.push(nextPipe);
    spawnPickupNearPipe(nextPipe);
    last = nextPipe;
  }
}

function spawnPickupNearPipe(pipe) {
  const roll = Math.random();
  const rareChance = clamp(0.13 * (state.runBoostEffects.rareChanceMult || 1), 0.08, 0.38);
  const medalChance = clamp(0.56 + Math.max(0, (state.runBoostEffects.medalAwardMult || 1) - 1) * 0.08, 0.48, 0.68);
  const doubleJumpChance = 0.08;
  const heartChance = 0.05;
  const rareThreshold = medalChance + rareChance;
  const jumpThreshold = rareThreshold + doubleJumpChance;
  const heartThreshold = jumpThreshold + heartChance;
  let type = null;

  if (roll < medalChance) {
    type = "medal";
  } else if (roll < rareThreshold) {
    type = "rare";
  } else if (roll < jumpThreshold) {
    type = "double_jump";
  } else if (roll < heartThreshold) {
    type = "heart";
  }

  if (!type) return;

  const yJitter = random(-pipe.gap * 0.2, pipe.gap * 0.2);

  state.pickups.push({
    type,
    x: pipe.x + pipe.width + random(34, 108),
    y: clamp(pipe.gapY + yJitter, 64, HEIGHT - 86),
    r: type === "double_jump" ? 14 : type === "heart" ? 13 : 11,
    phase: Math.random() * Math.PI * 2,
    collected: false,
  });
}

function collectPickup(pickup) {
  if (pickup.type === "medal") {
    const granted = addMedals(3, { scaled: true });
    showBanner(`+${granted} медали ЛДПР`, 900);
    playSfx("reward", 0.5);
    playTone(740, 0.03, "triangle", 0.02);
  }

  if (pickup.type === "rare") {
    const granted = addRareMedals(1, { scaled: true });
    showBanner(`Редкие медали +${granted}`, 1100);
    playSfx("reward", 0.62);
    playTone(980, 0.045, "triangle", 0.024);
  }

  if (pickup.type === "double_jump") {
    state.doubleJumpCharges = Math.min(6, state.doubleJumpCharges + 2);
    unlockAchievement("double_jump_find");
    showBanner(`Бонус: двойной прыжок x${state.doubleJumpCharges}`, 1500);
    playSfx("notify", 0.52);
    playTone(660, 0.05, "square", 0.03);
  }

  if (pickup.type === "heart") {
    const maxLivesThisRun = Math.max(1, state.runMaxLives || getHeartCapacity());
    if (state.lives < maxLivesThisRun) {
      state.lives += 1;
      showBanner(`Сердечко +1 (${state.lives}/${maxLivesThisRun})`, 1200);
      playSfx("heartPickup", 0.86);
    } else {
      const granted = addMedals(2, { scaled: true });
      showBanner(`Сердечки полные: +${granted} медалей`, 1000);
      playSfx("notify", 0.5);
    }
    updateLivesUI();
  }

  updateHud();
  updateMetaUI();
}

function addMedals(amount, options = {}) {
  const { scaled = false } = options;
  const granted = computeAwardAmount(amount, scaled);
  profile.medals += granted;
  state.runMedals += granted;

  if (profile.medals >= 100) {
    unlockAchievement("rich_100");
  }

  updateMetaUI();
  updateHud();
  return granted;
}

function addRareMedals(amount, options = {}) {
  const { scaled = false } = options;
  const granted = computeAwardAmount(amount, scaled);
  profile.rareMedals += granted;
  state.runRare += granted;

  if (profile.rareMedals >= 5) {
    unlockAchievement("rare_hunter");
  }

  updateMetaUI();
  updateHud();
  return granted;
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

function getProgressPoints() {
  const achievements = Object.keys(profile.achievements).length;
  return (
    profile.bestScore * 1.2 +
    profile.totalRuns * 2.4 +
    profile.rareMedals * 6 +
    achievements * 8
  );
}

function getLocationLevel() {
  const points = getProgressPoints();
  return clamp(1 + Math.floor(points / 36), 1, locationOrder.length);
}

function getAutoUnlockedThemeIds() {
  const level = getLocationLevel();
  return locationOrder.slice(0, level);
}

function isEventUnlocked(themeId) {
  if (getAutoUnlockedThemeIds().includes(themeId)) return true;
  return Array.isArray(profile.unlockedEvents) && profile.unlockedEvents.includes(themeId);
}

function unlockEvent(themeId) {
  if (!Array.isArray(profile.unlockedEvents)) {
    profile.unlockedEvents = ["ldpr_classic"];
  }
  if (!profile.unlockedEvents.includes(themeId)) {
    profile.unlockedEvents.push(themeId);
  }
}

function getSelectedEventTheme() {
  const selected = profile.selectedEvent;
  if (selected && backgroundThemes[selected] && isEventUnlocked(selected)) {
    return selected;
  }
  const unlocked = locationOrder.filter((id) => isEventUnlocked(id));
  return unlocked[unlocked.length - 1] || "ldpr_classic";
}

function applySelectedEventTheme() {
  const themeId = getSelectedEventTheme();
  profile.selectedEvent = themeId;
  settings.backgroundTheme = themeId;
  loadParallaxImagesForTheme(themeId);
}

function purchaseSkin(id) {
  const skin = skinCatalog[id];
  if (!skin || isSkinUnlocked(id)) {
    return;
  }

  if (profile.medals < skin.price || profile.rareMedals < skin.rarePrice) {
    showBanner("Недостаточно медалей для покупки", 1300);
    playSfx("cannotBuy", 0.9);
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
  playSfx("purchase", 0.82);
  playTone(860, 0.05, "triangle", 0.03);

  updateHeadPreview();
  updateMetaUI();
  renderShop();
  renderAchievements();
  saveProfile();
}

function purchaseEvent(themeId) {
  const eventItem = eventCatalog[themeId];
  if (!eventItem || isEventUnlocked(themeId)) return;

  if (profile.medals < eventItem.price || profile.rareMedals < eventItem.rarePrice) {
    showBanner("Недостаточно медалей для покупки ивента", 1400);
    playSfx("cannotBuy", 0.9);
    playTone(170, 0.08, "sawtooth", 0.025);
    return;
  }

  profile.medals -= eventItem.price;
  profile.rareMedals -= eventItem.rarePrice;
  profile.spentMedals += eventItem.price;
  unlockEvent(themeId);
  profile.selectedEvent = themeId;
  settings.backgroundTheme = themeId;

  showBanner(`Ивент "${backgroundThemes[themeId].label}" открыт`, 1700);
  playSfx("purchase", 0.82);
  playTone(860, 0.05, "triangle", 0.03);

  applySelectedEventTheme();
  updateMetaUI();
  renderShop();
  saveProfile();
  saveSettings();
}

function selectEventTheme(themeId) {
  if (!backgroundThemes[themeId] || !isEventUnlocked(themeId)) return;
  profile.selectedEvent = themeId;
  settings.backgroundTheme = themeId;
  applySelectedEventTheme();
  renderShop();
  updateMetaUI();
  saveProfile();
  saveSettings();
  showBanner(`Локация активирована: ${backgroundThemes[themeId].label}`, 1400);
}

function setShopTab(tab) {
  state.shopTab = tab === "events" || tab === "boosts" ? tab : "skins";
  const skinsView = document.getElementById("shop-skins-view");
  const eventsView = document.getElementById("shop-events-view");
  const boostsView = document.getElementById("shop-boosts-view");
  if (skinsView) skinsView.classList.toggle("active", state.shopTab === "skins");
  if (eventsView) eventsView.classList.toggle("active", state.shopTab === "events");
  if (boostsView) boostsView.classList.toggle("active", state.shopTab === "boosts");
  for (const btn of shopTabButtons) {
    const isActive = btn.getAttribute("data-shop-tab") === state.shopTab;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  }
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
  playSfx("menuClick", 0.75);
  playTone(620, 0.03, "triangle", 0.02);
}

function renderShop() {
  setShopTab(state.shopTab);
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

  const level = getLocationLevel();
  const points = getProgressPoints();
  const autoUnlocked = new Set(getAutoUnlockedThemeIds());
  const eventCards = [];

  for (let idx = 0; idx < locationOrder.length; idx += 1) {
    const themeId = locationOrder[idx];
    const theme = backgroundThemes[themeId];
    const eventData = eventCatalog[themeId];
    const unlockedByLevel = autoUnlocked.has(themeId);
    const unlocked = isEventUnlocked(themeId);
    const active = getSelectedEventTheme() === themeId;
    const neededLevel = idx + 1;
    const canAfford =
      profile.medals >= eventData.price && profile.rareMedals >= eventData.rarePrice;
    const priceText =
      eventData.price === 0 && eventData.rarePrice === 0
        ? "Бесплатно"
        : `${eventData.price} медалей${eventData.rarePrice > 0 ? ` + ${eventData.rarePrice} редк.` : ""}`;

    let action = "";
    if (unlocked) {
      action = active
        ? `<button class="action-btn skin-action" disabled>Активно</button>`
        : `<button class="action-btn action-btn--primary skin-action" data-select-event="${themeId}">Выбрать ивент</button>`;
    } else {
      action = `<button class="action-btn action-btn--primary skin-action" data-buy-event="${themeId}" ${
        canAfford ? "" : ""
      }>Сафонов, оплатить!</button>`;
    }

    const statusText = unlocked
      ? unlockedByLevel
        ? `Открыто по уровню ${neededLevel}`
        : "Открыто покупкой"
      : `Откроется на уровне ${neededLevel} или покупкой`;

    eventCards.push(`
      <article class="event-card ${active ? "event-card--active" : ""} ${unlocked ? "" : "event-card--locked"}">
        <p class="event-title">${theme.label}</p>
        <p class="event-subtitle">Локация ${idx + 1}/8</p>
        <p class="event-meta"><strong>${statusText}</strong></p>
        <p class="event-meta">Цена: ${priceText}</p>
        <p class="event-hint">${eventData.desc}</p>
        <div class="skin-actions">${action}</div>
      </article>
    `);
  }

  if (shopEvents) {
    shopEvents.innerHTML = eventCards.join("");
  }
  if (shopLocLevel) {
    shopLocLevel.textContent = String(level);
    shopLocLevel.title = `Очки прогресса: ${Math.round(points)}`;
  }
  if (shopActiveLocation) {
    shopActiveLocation.textContent = backgroundThemes[getSelectedEventTheme()].label;
  }

  renderBoostsShop();
}

function createEmptyRunBoostEffects() {
  return {
    startInvulnerability: 0,
    startDoubleJump: 0,
    pickupRadiusMult: 1,
    rareChanceMult: 1,
    medalAwardMult: 1,
    speedRampBonus: 0,
    insuranceRate: 0,
  };
}

function ensureProfileBoostState() {
  profile.maxLives = clamp(Math.floor(Number(profile.maxLives) || 1), 1, MAX_LIVES);
  profile.selectedBoostPreset = boostPresetsCatalog[profile.selectedBoostPreset] ? profile.selectedBoostPreset : "safe";
  profile.discountCoupons = Math.max(0, Math.floor(Number(profile.discountCoupons) || 0));
  profile.boostInventory = profile.boostInventory && typeof profile.boostInventory === "object" ? profile.boostInventory : {};
  profile.dailyShop = profile.dailyShop && typeof profile.dailyShop === "object" ? profile.dailyShop : {};
  profile.dailyShop.key = String(profile.dailyShop.key || "");
  profile.dailyShop.offers = Array.isArray(profile.dailyShop.offers) ? profile.dailyShop.offers : [];
  profile.dailyShop.purchased = Array.isArray(profile.dailyShop.purchased) ? profile.dailyShop.purchased : [];
  profile.achievementCouponClaimed =
    profile.achievementCouponClaimed && typeof profile.achievementCouponClaimed === "object"
      ? profile.achievementCouponClaimed
      : {};

  for (const id of Object.keys(boostCatalog)) {
    profile.boostInventory[id] = Math.max(0, Math.floor(Number(profile.boostInventory[id]) || 0));
  }

  for (const achId of Object.keys(profile.achievements || {})) {
    if (profile.achievementCouponClaimed[achId]) continue;
    profile.achievementCouponClaimed[achId] = 1;
    profile.discountCoupons += 1;
  }

  if (state.couponArmed && profile.discountCoupons <= 0) {
    state.couponArmed = false;
  }
}

function getHeartCapacity() {
  return clamp(Math.floor(Number(profile.maxLives) || 1), 1, MAX_LIVES);
}

function getLocationBoostPool(themeId = getSelectedEventTheme()) {
  const pool = boostRotationByTheme[themeId];
  if (Array.isArray(pool) && pool.length > 0) {
    return pool.filter((id) => boostCatalog[id]);
  }
  return Object.keys(boostCatalog);
}

function getBoostInventoryCount(id) {
  ensureProfileBoostState();
  return Math.max(0, Math.floor(Number(profile.boostInventory[id]) || 0));
}

function addBoostToInventory(id, amount) {
  if (!boostCatalog[id]) return 0;
  ensureProfileBoostState();
  const delta = Math.max(0, Math.floor(Number(amount) || 0));
  if (delta <= 0) return 0;
  profile.boostInventory[id] = getBoostInventoryCount(id) + delta;
  return delta;
}

function consumeBoostFromInventory(id, amount = 1) {
  if (!boostCatalog[id]) return false;
  ensureProfileBoostState();
  const qty = Math.max(1, Math.floor(Number(amount) || 1));
  const have = getBoostInventoryCount(id);
  if (have < qty) return false;
  profile.boostInventory[id] = have - qty;
  return true;
}

function applyBoostEffectsById(id) {
  const boost = boostCatalog[id];
  if (!boost) return;
  const effects = boost.effects || {};
  if (effects.startInvulnerability) {
    state.runBoostEffects.startInvulnerability = Math.max(
      state.runBoostEffects.startInvulnerability,
      effects.startInvulnerability
    );
  }
  if (effects.startDoubleJump) {
    state.runBoostEffects.startDoubleJump += effects.startDoubleJump;
  }
  if (effects.pickupRadiusMult) {
    state.runBoostEffects.pickupRadiusMult *= effects.pickupRadiusMult;
  }
  if (effects.rareChanceMult) {
    state.runBoostEffects.rareChanceMult *= effects.rareChanceMult;
  }
  if (effects.medalAwardMult) {
    state.runBoostEffects.medalAwardMult *= effects.medalAwardMult;
  }
  if (effects.speedRampBonus) {
    state.runBoostEffects.speedRampBonus += effects.speedRampBonus;
  }
  if (effects.insuranceRate) {
    state.runBoostEffects.insuranceRate = Math.max(state.runBoostEffects.insuranceRate, effects.insuranceRate);
  }
}

function applyPresetBeforeRun() {
  ensureProfileBoostState();
  const preset = boostPresetsCatalog[profile.selectedBoostPreset] || boostPresetsCatalog.safe;
  state.runBoostsConsumed = [];

  for (const boostId of preset.boosts) {
    if (!consumeBoostFromInventory(boostId, 1)) continue;
    state.runBoostsConsumed.push(boostId);
    applyBoostEffectsById(boostId);
  }

  if (state.runBoostEffects.startInvulnerability > 0) {
    state.invulnerabilityTimer = Math.max(state.invulnerabilityTimer, state.runBoostEffects.startInvulnerability);
    state.respawnFlashTimer = Math.max(state.respawnFlashTimer, Math.min(1.8, state.runBoostEffects.startInvulnerability));
  }

  if (state.runBoostEffects.startDoubleJump > 0) {
    state.doubleJumpCharges = Math.min(10, state.doubleJumpCharges + state.runBoostEffects.startDoubleJump);
  }

  if (state.runBoostsConsumed.length > 0) {
    const names = state.runBoostsConsumed.map((id) => boostCatalog[id]?.name).filter(Boolean);
    showBanner(`Пресет "${preset.name}": активировано ${names.join(", ")}`, 1800);
  }
}

function getAchievementDiscountRate() {
  const unlocked = Object.keys(profile.achievements || {}).length;
  return clamp(unlocked * 0.015, 0, 0.22);
}

function getCouponDiscountRate() {
  return state.couponArmed && profile.discountCoupons > 0 ? 0.18 : 0;
}

function getDiscountSummary(extraRate = 0) {
  const ach = getAchievementDiscountRate();
  const coupon = getCouponDiscountRate();
  const total = clamp(ach + coupon + extraRate, 0, 0.72);
  return { ach, coupon, total, couponUsed: coupon > 0 };
}

function applyDiscountedPrice(medals, rare, discountRate) {
  const d = clamp(discountRate, 0, 0.72);
  const finalMedals = Math.max(0, Math.round(Math.max(0, medals) * (1 - d)));
  const finalRare = Math.max(0, Math.round(Math.max(0, rare) * (1 - d * 0.6)));
  return { medals: finalMedals, rare: finalRare };
}

function formatPriceText(medals, rare) {
  if (medals <= 0 && rare <= 0) return "Бесплатно";
  if (rare > 0) return `${medals} медалей + ${rare} редк.`;
  return `${medals} медалей`;
}

function trySpendWithDiscount(baseMedals, baseRare, extraDiscount = 0) {
  const summary = getDiscountSummary(extraDiscount);
  const cost = applyDiscountedPrice(baseMedals, baseRare, summary.total);

  if (profile.medals < cost.medals || profile.rareMedals < cost.rare) {
    return null;
  }

  profile.medals -= cost.medals;
  profile.rareMedals -= cost.rare;
  profile.spentMedals += cost.medals;

  if (summary.couponUsed) {
    profile.discountCoupons = Math.max(0, profile.discountCoupons - 1);
    state.couponArmed = false;
  }

  return {
    spentMedals: cost.medals,
    spentRare: cost.rare,
    discount: summary.total,
    couponUsed: summary.couponUsed,
  };
}

function getHeartUpgradePrice(nextLevel) {
  const medals = HEART_CAPACITY_PRICE_BY_LEVEL[nextLevel] || 0;
  const rare = nextLevel >= 4 ? nextLevel - 3 : 0;
  return { medals, rare };
}

function toggleCouponUsage() {
  ensureProfileBoostState();
  if (profile.discountCoupons <= 0) {
    state.couponArmed = false;
    showBanner("Купонов нет. Открой достижения или скрафть купон.", 1400);
    playSfx("cannotBuy", 0.88);
    return;
  }
  state.couponArmed = !state.couponArmed;
  showBanner(state.couponArmed ? "Купон включён для следующей покупки" : "Купон выключен", 1100);
  renderShop();
}

function selectBoostPreset(id) {
  ensureProfileBoostState();
  if (!boostPresetsCatalog[id]) return;
  profile.selectedBoostPreset = id;
  saveProfile();
  renderShop();
  updateMetaUI();
  showBanner(`Пресет активирован: ${boostPresetsCatalog[id].name}`, 1200);
}

function purchaseBoostSingle(id, extraDiscount = 0) {
  ensureProfileBoostState();
  const boost = boostCatalog[id];
  if (!boost) return false;

  const spent = trySpendWithDiscount(boost.price, boost.rarePrice, extraDiscount);
  if (!spent) {
    showBanner("Недостаточно медалей для покупки буста", 1300);
    playSfx("cannotBuy", 0.9);
    return false;
  }

  addBoostToInventory(id, 1);
  saveProfile();
  updateMetaUI();
  renderShop();
  showBanner(`${boost.name} добавлен в инвентарь`, 1250);
  playSfx("purchase", 0.8);
  return true;
}

function purchaseBoostPack(packId, extraDiscount = 0) {
  ensureProfileBoostState();
  const pack = boostPacksCatalog[packId];
  if (!pack) return false;

  const spent = trySpendWithDiscount(pack.price, pack.rarePrice, extraDiscount);
  if (!spent) {
    showBanner("Недостаточно медалей для покупки набора", 1300);
    playSfx("cannotBuy", 0.9);
    return false;
  }

  for (const [boostId, qty] of Object.entries(pack.contents)) {
    addBoostToInventory(boostId, qty);
  }

  saveProfile();
  updateMetaUI();
  renderShop();
  showBanner(`${pack.name} куплен: +${Object.keys(pack.contents).length} типов бустов`, 1500);
  playSfx("purchase", 0.84);
  return true;
}

function purchaseDailyOffer(offerId) {
  ensureProfileBoostState();
  ensureDailyShopOffers();
  const offer = profile.dailyShop.offers.find((item) => item.offerId === offerId);
  if (!offer) return;
  if (profile.dailyShop.purchased.includes(offerId)) {
    showBanner("Этот товар дня уже куплен", 1100);
    return;
  }

  let ok = false;
  if (offer.kind === "boost") {
    ok = purchaseBoostSingle(offer.targetId, offer.discount || 0);
  } else if (offer.kind === "pack") {
    ok = purchaseBoostPack(offer.targetId, offer.discount || 0);
  } else if (offer.kind === "heart") {
    ok = upgradeHeartCapacity(offer.discount || 0);
  }

  if (!ok) return;
  profile.dailyShop.purchased.push(offerId);
  saveProfile();
  renderShop();
}

function upgradeHeartCapacity(extraDiscount = 0) {
  ensureProfileBoostState();
  if (profile.maxLives >= MAX_LIVES) {
    showBanner("Максимум сердец уже открыт (5/5)", 1300);
    return false;
  }

  const nextLevel = profile.maxLives + 1;
  const price = getHeartUpgradePrice(nextLevel);
  const spent = trySpendWithDiscount(price.medals, price.rare, extraDiscount);
  if (!spent) {
    showBanner(`Не хватает ресурсов на сердце ${nextLevel}/5`, 1300);
    playSfx("cannotBuy", 0.9);
    return false;
  }

  profile.maxLives = nextLevel;
  saveProfile();
  updateMetaUI();
  renderShop();
  showBanner(`Лимит сердец увеличен: ${profile.maxLives}/5`, 1500);
  playSfx("purchase", 0.84);
  return true;
}

function pickRandomBoostId() {
  const entries = Object.values(boostCatalog);
  if (entries.length === 0) return "";
  const roll = Math.random();
  let pool = entries;
  if (roll < 0.6) {
    pool = entries.filter((item) => item.rarity === "common");
  } else if (roll < 0.9) {
    pool = entries.filter((item) => item.rarity === "rare");
  } else {
    pool = entries.filter((item) => item.rarity === "epic");
  }
  if (pool.length === 0) pool = entries;
  return pool[Math.floor(Math.random() * pool.length)].id;
}

function craftRecipe(recipeId) {
  ensureProfileBoostState();
  const recipe = craftRecipesCatalog[recipeId];
  if (!recipe) return;

  if (profile.medals < recipe.costMedals || profile.rareMedals < recipe.costRare) {
    showBanner("Недостаточно ресурсов для крафта", 1300);
    playSfx("cannotBuy", 0.88);
    return;
  }

  profile.medals -= recipe.costMedals;
  profile.rareMedals -= recipe.costRare;
  profile.spentMedals += recipe.costMedals;

  if (recipe.rewardType === "rare_medal") {
    profile.rareMedals += recipe.rewardAmount;
    showBanner(`Крафт: +${recipe.rewardAmount} редкая медаль`, 1300);
  } else if (recipe.rewardType === "medal") {
    profile.medals += recipe.rewardAmount;
    showBanner(`Крафт: +${recipe.rewardAmount} медалей`, 1300);
  } else if (recipe.rewardType === "coupon") {
    profile.discountCoupons += recipe.rewardAmount;
    showBanner(`Крафт: +${recipe.rewardAmount} купон`, 1300);
  } else if (recipe.rewardType === "random_boost") {
    const picked = pickRandomBoostId();
    if (picked) {
      addBoostToInventory(picked, recipe.rewardAmount);
      showBanner(`Крафт: случайный буст "${boostCatalog[picked].name}"`, 1500);
    }
  }

  saveProfile();
  updateMetaUI();
  renderShop();
  playSfx("reward", 0.72);
}

function getDateKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getTimeToDailyResetLabel() {
  const now = new Date();
  const reset = new Date(now);
  reset.setHours(24, 0, 0, 0);
  const ms = Math.max(0, reset.getTime() - now.getTime());
  const hh = Math.floor(ms / 3600000);
  const mm = Math.floor((ms % 3600000) / 60000);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function hashStringSeed(input) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function ensureDailyShopOffers() {
  ensureProfileBoostState();
  const themeId = getSelectedEventTheme();
  const key = `${getDateKey()}::${themeId}`;
  if (profile.dailyShop.key === key && Array.isArray(profile.dailyShop.offers) && profile.dailyShop.offers.length === 3) {
    return;
  }

  const pool = getLocationBoostPool(themeId);
  const candidates = [];
  for (const boostId of pool) {
    candidates.push({ kind: "boost", targetId: boostId, key: `boost:${boostId}` });
  }
  for (const packId of boostPackOrder) {
    const pack = boostPacksCatalog[packId];
    const intersects = Object.keys(pack.contents).some((boostId) => pool.includes(boostId));
    if (intersects) {
      candidates.push({ kind: "pack", targetId: packId, key: `pack:${packId}` });
    }
  }
  if (getHeartCapacity() < MAX_LIVES) {
    candidates.push({ kind: "heart", targetId: "heart_upgrade", key: "heart:upgrade" });
  }

  const rnd = seededRandom(hashStringSeed(key));
  const offers = [];
  const used = new Set();
  const maxOffers = Math.min(3, candidates.length);
  while (offers.length < maxOffers) {
    const pick = candidates[Math.floor(rnd() * candidates.length)];
    if (!pick || used.has(pick.key)) continue;
    used.add(pick.key);
    offers.push({
      offerId: `daily-${offers.length + 1}-${pick.kind}-${pick.targetId}`,
      kind: pick.kind,
      targetId: pick.targetId,
      discount: 0.16 + rnd() * 0.2,
    });
  }

  profile.dailyShop.key = key;
  profile.dailyShop.offers = offers;
  profile.dailyShop.purchased = [];
  saveProfile();
}

function renderBoostsShop() {
  ensureProfileBoostState();
  ensureDailyShopOffers();

  const selectedTheme = getSelectedEventTheme();
  const locationPool = getLocationBoostPool(selectedTheme);
  const achievementDiscount = Math.round(getAchievementDiscountRate() * 100);
  const couponArmed = state.couponArmed && profile.discountCoupons > 0;

  if (boostRotationHint) {
    boostRotationHint.textContent = `Локация "${backgroundThemes[selectedTheme]?.label || "-"}": доступно ${locationPool.length} бустов.`;
  }
  if (boostCouponToggle) {
    boostCouponToggle.classList.toggle("active", couponArmed);
    boostCouponToggle.textContent = couponArmed
      ? `Купон: включён (-18%), осталось ${profile.discountCoupons}`
      : `Купон: выключен, в наличии ${profile.discountCoupons}`;
  }

  if (boostPresets) {
    const presetCards = boostPresetOrder
      .map((id) => {
        const preset = boostPresetsCatalog[id];
        if (!preset) return "";
        const active = profile.selectedBoostPreset === id;
        const parts = preset.boosts
          .map((boostId) => `${boostCatalog[boostId]?.name || boostId} (${getBoostInventoryCount(boostId)})`)
          .join(", ");
        return `
          <article class="preset-card ${active ? "preset-card--active" : ""}">
            <p class="boost-name">${preset.name}</p>
            <p class="boost-desc">${preset.desc}</p>
            <p class="boost-meta">${parts}</p>
            <button class="action-btn ${active ? "" : "action-btn--primary"}" data-select-preset="${id}" ${
              active ? "disabled" : ""
            }>
              ${active ? "Активно" : "Выбрать пресет"}
            </button>
          </article>
        `;
      })
      .join("");
    boostPresets.innerHTML = presetCards;
  }

  if (boostInventory) {
    const invCards = Object.values(boostCatalog)
      .map((boost) => {
        const qty = getBoostInventoryCount(boost.id);
        return `
          <article class="boost-card">
            <div class="boost-header">
              <p class="boost-name">${boost.name}</p>
              <span class="boost-badge boost-badge--${boost.rarity}">${boost.rarityLabel}</span>
            </div>
            <p class="boost-qty">В инвентаре: <strong>${qty}</strong></p>
            <p class="boost-desc">${boost.desc}</p>
          </article>
        `;
      })
      .join("");
    boostInventory.innerHTML = invCards;
  }

  if (boostMarket) {
    const marketCards = locationPool
      .map((id) => {
        const boost = boostCatalog[id];
        if (!boost) return "";
        const discount = getDiscountSummary(0);
        const price = applyDiscountedPrice(boost.price, boost.rarePrice, discount.total);
        const canAfford = profile.medals >= price.medals && profile.rareMedals >= price.rare;
        return `
          <article class="boost-card">
            <div class="boost-header">
              <p class="boost-name">${boost.name}</p>
              <span class="boost-badge boost-badge--${boost.rarity}">${boost.rarityLabel}</span>
            </div>
            <p class="boost-desc">${boost.desc}</p>
            <p class="boost-price">Цена: ${formatPriceText(price.medals, price.rare)}${achievementDiscount > 0 ? ` (скидка достижений ${achievementDiscount}%)` : ""}</p>
            <button class="action-btn action-btn--primary" data-buy-boost="${boost.id}" ${canAfford ? "" : "disabled"}>
              Купить буст
            </button>
          </article>
        `;
      })
      .join("");
    boostMarket.innerHTML = marketCards;
  }

  if (boostPacks) {
    const packCards = boostPackOrder
      .map((id) => {
        const pack = boostPacksCatalog[id];
        if (!pack) return "";
        let singleMedals = 0;
        let singleRare = 0;
        for (const [boostId, qty] of Object.entries(pack.contents)) {
          const item = boostCatalog[boostId];
          if (!item) continue;
          singleMedals += item.price * qty;
          singleRare += item.rarePrice * qty;
        }
        const saveMedals = Math.max(0, singleMedals - pack.price);
        const saveRare = Math.max(0, singleRare - pack.rarePrice);
        const discount = getDiscountSummary(0);
        const price = applyDiscountedPrice(pack.price, pack.rarePrice, discount.total);
        const canAfford = profile.medals >= price.medals && profile.rareMedals >= price.rare;
        const meta = Object.entries(pack.contents)
          .map(([boostId, qty]) => `${boostCatalog[boostId]?.name || boostId} x${qty}`)
          .join(", ");
        return `
          <article class="boost-card">
            <div class="boost-header">
              <p class="boost-name">${pack.name}</p>
              <span class="boost-badge boost-badge--${pack.rarity}">Пак</span>
            </div>
            <p class="boost-desc">${pack.desc}</p>
            <p class="boost-meta">${meta}</p>
            <p class="boost-price">Цена: ${formatPriceText(price.medals, price.rare)} | Экономия: ${saveMedals} мед.${saveRare > 0 ? ` + ${saveRare} редк.` : ""}</p>
            <button class="action-btn action-btn--primary" data-buy-boost-pack="${pack.id}" ${canAfford ? "" : "disabled"}>
              Купить пакет
            </button>
          </article>
        `;
      })
      .join("");
    boostPacks.innerHTML = packCards;
  }

  if (dailyShop) {
    const dailyCards = profile.dailyShop.offers
      .map((offer) => {
        const purchased = profile.dailyShop.purchased.includes(offer.offerId);
        let title = "Товар дня";
        let desc = "";
        let price = { medals: 0, rare: 0 };
        if (offer.kind === "boost") {
          const boost = boostCatalog[offer.targetId];
          if (!boost) return "";
          title = boost.name;
          desc = `${boost.desc} (дневная скидка ${Math.round(offer.discount * 100)}%)`;
          price = applyDiscountedPrice(boost.price, boost.rarePrice, getDiscountSummary(offer.discount).total);
        } else if (offer.kind === "pack") {
          const pack = boostPacksCatalog[offer.targetId];
          if (!pack) return "";
          title = pack.name;
          desc = `${pack.desc} (дневная скидка ${Math.round(offer.discount * 100)}%)`;
          price = applyDiscountedPrice(pack.price, pack.rarePrice, getDiscountSummary(offer.discount).total);
        } else if (offer.kind === "heart") {
          const nextLevel = getHeartCapacity() + 1;
          const heartPrice = getHeartUpgradePrice(nextLevel);
          title = "Сердце +1 (лимит)";
          desc = `Откроет ${Math.min(nextLevel, MAX_LIVES)}/${MAX_LIVES} сердец (дневная скидка ${Math.round(offer.discount * 100)}%)`;
          price = applyDiscountedPrice(heartPrice.medals, heartPrice.rare, getDiscountSummary(offer.discount).total);
        }
        const canAfford = profile.medals >= price.medals && profile.rareMedals >= price.rare;
        return `
          <article class="boost-card">
            <p class="boost-name">${title}</p>
            <p class="boost-desc">${desc}</p>
            <p class="boost-price">Цена: ${formatPriceText(price.medals, price.rare)}</p>
            <button class="action-btn action-btn--primary" data-buy-daily-offer="${offer.offerId}" ${
              purchased || !canAfford ? "disabled" : ""
            }>
              ${purchased ? "Куплено" : "Купить"}
            </button>
          </article>
        `;
      })
      .join("");
    dailyShop.innerHTML = dailyCards;
  }

  if (dailyShopTimer) {
    dailyShopTimer.textContent = `Три случайных товара дня. Обновление через ${getTimeToDailyResetLabel()}`;
  }

  if (craftGrid) {
    const cards = craftRecipeOrder
      .map((id) => {
        const recipe = craftRecipesCatalog[id];
        if (!recipe) return "";
        const canAfford = profile.medals >= recipe.costMedals && profile.rareMedals >= recipe.costRare;
        return `
          <article class="boost-card">
            <p class="boost-name">${recipe.name}</p>
            <p class="boost-desc">${recipe.desc}</p>
            <p class="boost-price">Цена крафта: ${formatPriceText(recipe.costMedals, recipe.costRare)}</p>
            <button class="action-btn action-btn--primary" data-craft-recipe="${recipe.id}" ${canAfford ? "" : "disabled"}>
              Скрафтить
            </button>
          </article>
        `;
      })
      .join("");
    craftGrid.innerHTML = cards;
  }

  if (heartUpgrade) {
    const current = getHeartCapacity();
    const next = current + 1;
    if (current >= MAX_LIVES) {
      heartUpgrade.innerHTML = `
        <article class="boost-card">
          <p class="boost-name">Лимит сердец: ${MAX_LIVES}/${MAX_LIVES}</p>
          <p class="boost-desc">Максимум открыт. Сердца в забеге пополняются дропом.</p>
          <button class="action-btn" disabled>Максимум</button>
        </article>
      `;
    } else {
      const price = getHeartUpgradePrice(next);
      const discount = getDiscountSummary(0);
      const finalPrice = applyDiscountedPrice(price.medals, price.rare, discount.total);
      const canAfford = profile.medals >= finalPrice.medals && profile.rareMedals >= finalPrice.rare;
      heartUpgrade.innerHTML = `
        <article class="boost-card">
          <p class="boost-name">Улучшение сердец ${current} -> ${next}</p>
          <p class="boost-desc">Каждый следующий слот дороже. Максимум: ${MAX_LIVES}.</p>
          <p class="boost-price">Цена: ${formatPriceText(finalPrice.medals, finalPrice.rare)}</p>
          <button class="action-btn action-btn--primary" data-upgrade-hearts ${canAfford ? "" : "disabled"}>
            Купить сердце
          </button>
        </article>
      `;
    }
  }
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
  updateLivesUI();
}

function updateBonusLabel() {
  bonusValue.textContent = state.doubleJumpCharges > 0 ? `x${state.doubleJumpCharges}` : "-";
}

function updateLivesUI() {
  if (!livesHud || lifeHeartNodes.length === 0) return;

  const isInRun =
    state.mode === "playing" || state.mode === "paused" || state.mode === "gameover" || state.mode === "victory";
  livesHud.classList.toggle("hidden", !isInRun);

  for (let i = 0; i < lifeHeartNodes.length; i += 1) {
    const node = lifeHeartNodes[i];
    const filled = i < state.lives;
    node.classList.toggle("life-heart--empty", !filled);
  }
}

function updateMetaUI() {
  ensureProfileBoostState();
  menuMedalsValue.textContent = String(profile.medals);
  menuRareValue.textContent = String(profile.rareMedals);
  menuBestValue.textContent = String(profile.bestScore);
  if (menuPresetValue) {
    const preset = boostPresetsCatalog[profile.selectedBoostPreset] || boostPresetsCatalog.safe;
    menuPresetValue.textContent = preset.name;
  }
  if (menuHeartsCapValue) {
    menuHeartsCapValue.textContent = String(getHeartCapacity());
  }
  if (menuCouponsValue) {
    menuCouponsValue.textContent = String(profile.discountCoupons);
  }

  shopMedalsValue.textContent = String(profile.medals);
  shopRareValue.textContent = String(profile.rareMedals);
  if (shopCouponsValue) {
    shopCouponsValue.textContent = String(profile.discountCoupons);
  }

  const activeSkin = skinCatalog[profile.selectedSkin];
  shopActiveSkin.textContent = activeSkin ? activeSkin.name : "-";
  if (shopActivePreset) {
    const preset = boostPresetsCatalog[profile.selectedBoostPreset] || boostPresetsCatalog.safe;
    shopActivePreset.textContent = preset.name;
  }
  if (shopHeartsCapValue) {
    shopHeartsCapValue.textContent = String(getHeartCapacity());
  }
  if (shopActiveLocation) {
    const selectedTheme = getSelectedEventTheme();
    shopActiveLocation.textContent = backgroundThemes[selectedTheme]?.label || "-";
  }
  if (shopLocLevel) {
    shopLocLevel.textContent = String(getLocationLevel());
  }
  if (settingsLocationLevel) {
    settingsLocationLevel.textContent = `${getLocationLevel()}/8`;
  }
  if (settingsLocationHint) {
    const points = Math.round(getProgressPoints());
    settingsLocationHint.textContent = `Очки прогресса: ${points}. Повышай рекорд, делай забеги и открывай достижения.`;
  }

  updateBonusLabel();
}

function updateHeadPreview() {
  const activeSkin = skinCatalog[profile.selectedSkin] || skinCatalog.common;
  if (headEasterImage) {
    headEasterImage.src = activeSkin.src;
  }
}

function updateHeadEasterUI() {
  if (headEasterProgress) {
    headEasterProgress.textContent = `Пасхалка: ${state.headTapCounter} / 10`;
  }
}

function mainLoop(ts) {
  if (!isIntroActive()) {
    document.body.classList.remove("intro-running");
  }

  const dt = Math.min((ts - rafLastTs) / 1000, 0.034);
  rafLastTs = ts;
  const instantFps = dt > 0 ? 1 / dt : 60;
  perf.fpsEMA = perf.fpsEMA * 0.92 + instantFps * 0.08;

  if (!perf.lowQuality && perf.fpsEMA < 46) {
    perf.lowQuality = true;
    applyViewportMetrics();
    if (!perf.lowQualityHintShown) {
      perf.lowQualityHintShown = true;
      showBanner("Включён режим производительности", 1400);
    }
  } else if (perf.lowQuality && perf.fpsEMA > 58 && state.mode === "menu") {
    perf.lowQuality = false;
    applyViewportMetrics();
  }

  if (!state.manualStepping) {
    update(dt);
    render();
  }

  requestAnimationFrame(mainLoop);
}

function render() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.setTransform(viewport.scale, 0, 0, viewport.scale, viewport.offsetX, viewport.offsetY);

  drawBackground();

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

  // Game-over / victory text is rendered by DOM result overlay.
  // Keep canvas clean to avoid duplicated ghost text behind the popup.

  if (state.crashFlash > 0 && settings.effectsOn) {
    ctx.save();
    ctx.fillStyle = `rgba(255, 214, 94, ${state.crashFlash * 0.5})`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
  }

  ctx.restore();
}

function drawBackground() {
  const tuning = getTuning();
  const loadedParallax = parallaxLayers.filter((layer) => layer.loaded && layer.img);
  const theme = backgroundThemes[activeBackgroundTheme] || backgroundThemes.ldpr_classic;

  if (perf.lowQuality) {
    ctx.fillStyle = theme.tintTop;
  } else {
    const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    sky.addColorStop(0, theme.tintTop);
    sky.addColorStop(1, theme.tintBottom);
    ctx.fillStyle = sky;
  }
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  if (loadedParallax.length > 0) {
    const maxLayers = perf.lowQuality ? Math.min(3, loadedParallax.length) : loadedParallax.length;
    const prevSmoothing = ctx.imageSmoothingEnabled;
    ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < maxLayers; i += 1) {
      const layer = loadedParallax[i];
      drawParallaxLayer(layer, tuning.speed);
    }

    ctx.imageSmoothingEnabled = prevSmoothing;
  }

  if (!perf.lowQuality) {
    const tone = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    tone.addColorStop(0, "rgba(18, 50, 126, 0.32)");
    tone.addColorStop(0.55, "rgba(11, 33, 78, 0.18)");
    tone.addColorStop(1, "rgba(255, 203, 42, 0.1)");
    ctx.fillStyle = tone;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}

function drawParallaxLayer(layer, speed) {
  const sourceW = layer.img.naturalWidth || layer.img.width;
  const sourceH = layer.img.naturalHeight || layer.img.height;
  if (!sourceW || !sourceH) return;

  const scale = Math.max(WIDTH / sourceW, HEIGHT / sourceH);
  const drawW = sourceW * scale;
  const drawH = sourceH * scale;
  const shift = -((state.elapsed * speed * layer.speedFactor) % drawW);
  const y = HEIGHT - drawH;

  ctx.save();
  ctx.globalAlpha = layer.alpha;
  for (let x = shift - drawW; x < WIDTH + drawW; x += drawW) {
    ctx.drawImage(layer.img, x, y, drawW, drawH);
  }
  ctx.restore();
}

function drawPipe(pipe) {
  const topHeight = pipe.gapY - pipe.gap * 0.5;
  const bottomY = pipe.gapY + pipe.gap * 0.5;
  drawPipeSegment(pipe.x, 0, pipe.width, topHeight, true);
  drawPipeSegment(pipe.x, bottomY, pipe.width, HEIGHT - bottomY, false);
}

function drawPipeSegment(x, y, w, h, isTop) {
  if (h <= 0) return;
  const pipeTexture = getCurrentPipeTexture();

  if (pipeTexture && pipeTexture.loaded && pipeTexture.element) {
    const img = pipeTexture.element;
    const sw = img.naturalWidth || img.width;
    const sh = img.naturalHeight || img.height;
    const crop = pipeTexture.crop || { x: 0, y: 0, w: sw, h: sh };

    if (sw && sh && crop.w > 0 && crop.h > 0) {
      const prevSmoothing = ctx.imageSmoothingEnabled;
      ctx.imageSmoothingEnabled = false;
      ctx.save();

      if (isTop) {
        ctx.translate(x + w * 0.5, y + h * 0.5);
        ctx.scale(1, -1);
        ctx.drawImage(
          img,
          crop.x,
          crop.y,
          crop.w,
          crop.h,
          -w * 0.5,
          -h * 0.5,
          w,
          h
        );
      } else {
        ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, x, y, w, h);
      }

      ctx.restore();
      ctx.imageSmoothingEnabled = prevSmoothing;
      return;
    }
  }

  ctx.fillStyle = "#1d68d7";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "rgba(6, 24, 60, 0.42)";
  ctx.fillRect(x, y, 10, h);
  ctx.fillRect(x + w - 10, y, 10, h);

  ctx.strokeStyle = "#ffe58c";
  ctx.lineWidth = perf.lowQuality ? 2 : 3;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);

  if (!perf.lowQuality) {
    ctx.save();
    ctx.globalAlpha = 0.24;
    for (let stripe = y + 12; stripe < y + h; stripe += 24) {
      ctx.fillStyle = Math.floor(stripe) % 2 === 0 ? "#ffffff" : "#ffcb2a";
      ctx.fillRect(x + 9, stripe, w - 18, 5);
    }
    ctx.restore();
  }

  const capH = 22;
  const capY = isTop ? y + h - capH : y;
  ctx.fillStyle = "#f5d665";
  ctx.fillRect(x - 8, capY, w + 16, capH);
  ctx.strokeStyle = "#091a3c";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 8, capY, w + 16, capH);

  if (!perf.lowQuality && h > 80) {
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

function getCurrentPipeTexture() {
  const key = pipeThemeMap[activeBackgroundTheme] || "blue";
  return pipeTextures[key] || pipeTextures.blue || null;
}

function drawPickups() {
  for (const pickup of state.pickups) {
    const bob = Math.sin(pickup.phase) * 4;
    const spin = state.elapsed * 8 + pickup.phase * 0.85;
    const coinScaleX = 0.24 + Math.abs(Math.sin(spin)) * 0.76;

    if (pickup.type === "medal") {
      drawPickupSprite(uiSprites.medal, pickup.x, pickup.y + bob, pickup.r * 2.45, {
        scaleX: coinScaleX,
        glowColor: "rgba(255, 203, 42, 0.32)",
      });
      continue;
    }

    if (pickup.type === "rare") {
      drawPickupSprite(uiSprites.rareMedal, pickup.x, pickup.y + bob, (pickup.r + 1) * 2.4, {
        scaleX: coinScaleX,
        glowColor: "rgba(255, 170, 92, 0.28)",
      });
      continue;
    }

    if (pickup.type === "double_jump") {
      drawPickupSprite(uiSprites.x2, pickup.x, pickup.y + bob, pickup.r * 2.55, {
        scaleX: 0.9 + Math.sin(spin * 0.5) * 0.08,
        rotation: Math.sin(spin * 0.25) * 0.16,
        glowColor: "rgba(120, 214, 255, 0.25)",
      });
      continue;
    }

    if (pickup.type === "heart") {
      drawHeartPickup(pickup.x, pickup.y + bob, pickup.r);
    }
  }
}

function drawPickupSprite(sprite, x, y, size, options = {}) {
  if (!sprite || !sprite.loaded || !sprite.element) {
    return;
  }

  const rotation = Number.isFinite(options.rotation) ? options.rotation : 0;
  const scaleX = Number.isFinite(options.scaleX) ? options.scaleX : 1;
  const scaleY = Number.isFinite(options.scaleY) ? options.scaleY : 1;
  const glowColor = options.glowColor || "";
  const img = sprite.element;
  const drawSize = Math.max(10, size);
  const sw = img.naturalWidth || img.width;
  const sh = img.naturalHeight || img.height;
  const crop = sprite.crop || { x: 0, y: 0, w: sw, h: sh };

  if (glowColor) {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = glowColor;
    ctx.beginPath();
    ctx.arc(x, y, drawSize * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const prevSmoothing = ctx.imageSmoothingEnabled;
  ctx.imageSmoothingEnabled = false;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(Math.max(0.12, scaleX), Math.max(0.12, scaleY));
  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.w,
    crop.h,
    -drawSize * 0.5,
    -drawSize * 0.5,
    drawSize,
    drawSize
  );
  ctx.restore();
  ctx.imageSmoothingEnabled = prevSmoothing;
}

function drawHeartPickup(x, y, r) {
  const heartImage = uiSprites.heart;
  if (heartImage.loaded && heartImage.element) {
    const sz = r * 2.2;
    const prevSmoothing = ctx.imageSmoothingEnabled;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(heartImage.element, x - sz * 0.5, y - sz * 0.5, sz, sz);
    ctx.imageSmoothingEnabled = prevSmoothing;
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#ff5878";
  ctx.beginPath();
  ctx.moveTo(0, r * 0.85);
  ctx.bezierCurveTo(-r * 1.1, 0, -r * 0.95, -r * 0.95, 0, -r * 0.3);
  ctx.bezierCurveTo(r * 0.95, -r * 0.95, r * 1.1, 0, 0, r * 0.85);
  ctx.fill();
  ctx.restore();
}

function drawPlayer(visible) {
  if (!visible) {
    if (state.activeScreen !== "none") {
      return;
    }

    const idleY = HEIGHT * 0.52 + Math.sin(state.menuFloat * 2.3) * 16;
    drawHeadSprite(PLAYER_X, idleY, PLAYER_RADIUS * 0.95, -0.08, "neutral");

    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.font = "700 17px 'Avenir Next', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("FlappyNovsky готов к старту", PLAYER_X + 52, idleY + 6);
    return;
  }

  if (state.respawnFlashTimer > 0) {
    const blinkOn = Math.floor(state.elapsed * 22) % 2 === 0;
    if (!blinkOn) {
      return;
    }
  }

  drawHeadSprite(state.player.x, state.player.y, state.player.r, state.player.angle, state.player.expression);
}

function drawHeadSprite(x, y, r, angle, expression) {
  const skin = skinCatalog[profile.selectedSkin] || skinCatalog.common;
  const sprite = skins[skin.id];

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  if (sprite && sprite.loaded && sprite.element) {
    drawSkinImageRaw(sprite, r);
  } else {
    drawFallbackFace(r);
  }

  drawExpressionOverlay(r, expression);

  ctx.restore();
}

function drawSkinImageRaw(sprite, r) {
  const image = sprite.element;
  const sw = image.naturalWidth || image.width;
  const sh = image.naturalHeight || image.height;
  const crop = sprite.crop || { x: 0, y: 0, w: sw, h: sh };

  if (!sw || !sh || !crop.w || !crop.h) {
    drawFallbackFace(r);
    return;
  }

  let targetH = r * 2.7;
  let targetW = targetH * (crop.w / crop.h);
  const maxW = r * 3.8;
  if (targetW > maxW) {
    const k = maxW / targetW;
    targetW *= k;
    targetH *= k;
  }

  const prevSmoothing = ctx.imageSmoothingEnabled;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.w,
    crop.h,
    -targetW * 0.5,
    -targetH * 0.56,
    targetW,
    targetH
  );
  ctx.imageSmoothingEnabled = prevSmoothing;
}

function drawExpressionOverlay(r, expression) {
  // Temporary beta mode: disable all procedural face overlays.
  // Expressions will be delivered as dedicated texture skins later.
  void r;
  void expression;
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
  if (perf.lowQuality && state.confetti.length > 120) {
    state.confetti.length = 120;
  }
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
  if (perf.lowQuality) {
    count = Math.min(count, 80);
  }
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

function collidesWithPipe(player, pipe, collisionRadius) {
  const topHeight = pipe.gapY - pipe.gap * 0.5;
  const bottomY = pipe.gapY + pipe.gap * 0.5;
  const r = Math.max(6, collisionRadius || player.r);

  return (
    circleRectCollision(player.x, player.y, r, pipe.x, 0, pipe.width, topHeight) ||
    circleRectCollision(player.x, player.y, r, pipe.x, bottomY, pipe.width, HEIGHT - bottomY)
  );
}

function getPlayerPipeCollisionRadius() {
  return Math.max(6, state.player.r * PLAYER_PIPE_HITBOX_SCALE);
}

function getTuning() {
  const base = difficultyProfiles[settings.difficulty] || difficultyProfiles.normal;
  const speedMode = speedProfiles[settings.speedMode] || speedProfiles.classic;
  const speedRamp = getRunSpeedMultiplier();

  const speed = base.speed * speedMode.speedMult * speedRamp;
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

function getRewardMultiplier() {
  const diff = rewardDifficultyMult[settings.difficulty] || 1;
  const speed = rewardSpeedMult[settings.speedMode] || 1;
  return clamp(diff * speed, 0.8, 2.2);
}

function computeAwardAmount(baseAmount, scaled) {
  const cleanBase = Math.max(0, Number(baseAmount) || 0);
  if (!scaled) return cleanBase;
  const boostMult = state.runBoostEffects && Number.isFinite(state.runBoostEffects.medalAwardMult)
    ? state.runBoostEffects.medalAwardMult
    : 1;
  const mult = getRewardMultiplier() * boostMult;
  if (cleanBase <= 0) return 0;
  return Math.max(1, Math.round(cleanBase * mult));
}

function getRunSpeedMultiplier() {
  if (!(state.mode === "playing" || state.mode === "paused" || state.mode === "gameover")) {
    return 1;
  }
  const bonus = Number.isFinite(state.runBoostEffects.speedRampBonus) ? state.runBoostEffects.speedRampBonus : 0;
  return clamp(1 + state.runTime * RUN_SPEED_RAMP_PER_SEC + bonus, 1, RUN_SPEED_RAMP_MAX);
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

function initAudio() {
  const menuTrack = new Audio(audioSources.menuBgm);
  menuTrack.loop = true;
  menuTrack.preload = "auto";
  menuTrack.volume = 0;
  audioState.menuBgm = menuTrack;
}

function canPlayCustomAudio() {
  return Boolean(settings.soundOn);
}

function playSfx(name, volume = 1) {
  if (!canPlayCustomAudio()) return;
  const src = audioSources[name];
  if (!src) return;

  try {
    const a = new Audio(src);
    a.preload = "auto";
    a.volume = clamp(volume, 0, 1);
    a.play().catch(() => {});
  } catch {
    // Optional audio.
  }
}

function fadeMenuMusicTo(targetVolume, durationMs = 900) {
  if (!audioState.menuBgm) return;
  const track = audioState.menuBgm;
  const target = clamp(targetVolume, 0, 1);
  const token = ++audioState.fadeToken;
  const startVolume = track.volume;
  const startTs = performance.now();

  if (target > 0) {
    track.play().catch(() => {});
  }

  const tick = () => {
    if (token !== audioState.fadeToken) return;

    const progress = clamp((performance.now() - startTs) / Math.max(1, durationMs), 0, 1);
    track.volume = startVolume + (target - startVolume) * progress;

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    if (track.volume <= 0.001) {
      track.pause();
      track.currentTime = 0;
    }
  };

  requestAnimationFrame(tick);
}

function fadeGameplayMusicTo(targetVolume, durationMs = 600) {
  if (!audioState.gameplayBgm) return;
  const track = audioState.gameplayBgm;
  const target = clamp(targetVolume, 0, 1);
  const token = ++audioState.runFadeToken;
  const startVolume = track.volume;
  const startTs = performance.now();

  if (target > 0) {
    track.play().catch(() => {});
  }

  const tick = () => {
    if (token !== audioState.runFadeToken) return;
    const progress = clamp((performance.now() - startTs) / Math.max(1, durationMs), 0, 1);
    track.volume = startVolume + (target - startVolume) * progress;
    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }
    if (track.volume <= 0.001) {
      track.pause();
      track.currentTime = 0;
    }
  };

  requestAnimationFrame(tick);
}

function stopGameplayMusic() {
  if (!audioState.gameplayBgm) return;
  ++audioState.runFadeToken;
  audioState.gameplayBgm.pause();
  audioState.gameplayBgm.currentTime = 0;
  audioState.gameplayBgm = null;
  audioState.gameplayTheme = "";
}

function playGameplayMusicForTheme(themeId) {
  if (!canPlayCustomAudio()) return;
  const src = locationMusicByTheme[themeId];
  if (!src) return;

  if (audioState.gameplayBgm && audioState.gameplayTheme === themeId) {
    fadeGameplayMusicTo(0.26, 280);
    return;
  }

  stopGameplayMusic();

  const runTrack = new Audio(src);
  runTrack.loop = true;
  runTrack.preload = "auto";
  runTrack.volume = 0;
  audioState.gameplayBgm = runTrack;
  audioState.gameplayTheme = themeId;
  fadeGameplayMusicTo(0.26, 420);
}

function syncMenuMusicState() {
  if (!audioState.menuBgm) return;
  if (!canPlayCustomAudio()) {
    fadeMenuMusicTo(0, 200);
    fadeGameplayMusicTo(0, 120);
    return;
  }

  if (isIntroActive()) {
    fadeMenuMusicTo(0, 220);
    return;
  }

  if (state.mode === "playing" || state.mode === "paused" || state.mode === "gameover" || state.mode === "victory") {
    fadeMenuMusicTo(0, 180);
    return;
  }

  fadeMenuMusicTo(0.22, 800);
}

function playVictoryFanfare() {
  playTone(660, 0.07, "triangle", 0.028);
  setTimeout(() => playTone(820, 0.07, "triangle", 0.028), 90);
  setTimeout(() => playTone(980, 0.09, "triangle", 0.03), 180);
}

function playApplause() {
  playSfx("applause", 0.7);
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
      playSfx("menuClick", 0.8);
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
      crop: null,
    };

    img.onload = () => {
      skins[skin.id].loaded = true;
      skins[skin.id].crop = analyzeOpaqueBounds(img);
    };

    img.onerror = () => {
      skins[skin.id].loaded = false;
      skins[skin.id].crop = null;
    };

    img.src = skin.src;
  }
}

function loadPipeTextures() {
  for (const [key, src] of Object.entries(pipeTextureCatalog)) {
    const img = new Image();
    pipeTextures[key] = {
      loaded: false,
      element: img,
      crop: null,
    };

    img.onload = () => {
      pipeTextures[key].loaded = true;
      pipeTextures[key].crop = analyzeOpaqueBounds(img);
    };

    img.onerror = () => {
      pipeTextures[key].loaded = false;
      pipeTextures[key].crop = null;
    };

    img.src = src;
  }
}

function analyzeOpaqueBounds(img) {
  const sw = img.naturalWidth || img.width;
  const sh = img.naturalHeight || img.height;
  if (!sw || !sh) return null;

  const probe = document.createElement("canvas");
  probe.width = sw;
  probe.height = sh;
  const pctx = probe.getContext("2d", { willReadFrequently: true });
  if (!pctx) return null;

  let data;
  try {
    pctx.drawImage(img, 0, 0, sw, sh);
    data = pctx.getImageData(0, 0, sw, sh).data;
  } catch {
    return null;
  }

  let minX = sw;
  let minY = sh;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < sh; y += 1) {
    for (let x = 0; x < sw; x += 1) {
      const a = data[(y * sw + x) * 4 + 3];
      if (a < 16) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    return { x: 0, y: 0, w: sw, h: sh };
  }

  const pad = 1;
  const x = Math.max(0, minX - pad);
  const y = Math.max(0, minY - pad);
  const w = Math.min(sw - x, maxX - minX + 1 + pad * 2);
  const h = Math.min(sh - y, maxY - minY + 1 + pad * 2);
  return { x, y, w, h };
}

function loadUiSprites() {
  for (const [key, sprite] of Object.entries(uiSprites)) {
    const img = new Image();
    sprite.element = img;
    sprite.loaded = false;

    img.onload = () => {
      sprite.loaded = true;
      sprite.crop = analyzeOpaqueBounds(img);
      if (key === "heart") {
        for (const node of lifeHeartNodes) {
          node.style.backgroundImage = `url('${sprite.src}')`;
        }
      }
    };

    img.onerror = () => {
      sprite.loaded = false;
      sprite.crop = null;
    };

    img.src = sprite.src;
  }
}

function loadParallaxImagesForTheme(themeId) {
  const theme = backgroundThemes[themeId] || backgroundThemes.ldpr_classic;
  activeBackgroundTheme = backgroundThemes[themeId] ? themeId : "ldpr_classic";
  parallaxLayers.length = 0;

  for (let i = 1; i <= theme.layers; i += 1) {
    const speedFactor = parallaxSpeedByLayer[i - 1] || 0.2;
    const alpha = parallaxAlphaByLayer[i - 1] || 0.76;
    const src = `./assets/parallax/${theme.folder}/layer${i}.png`;
    const img = new Image();
    const layer = {
      img,
      loaded: false,
      speedFactor,
      alpha,
    };

    img.onload = () => {
      layer.loaded = true;
    };
    img.onerror = () => {
      layer.loaded = false;
    };
    img.src = src;

    parallaxLayers.push(layer);
  }
}

function setUIFromSettings() {
  if (!difficultyOrder.includes(settings.difficulty)) {
    settings.difficulty = "normal";
  }
  if (!speedModeOrder.includes(settings.speedMode)) {
    settings.speedMode = "classic";
  }
  renderSettingsCycleValues();
  soundToggle.checked = settings.soundOn;
  effectsToggle.checked = settings.effectsOn;
}

function renderSettingsCycleValues() {
  if (difficultyValue) {
    difficultyValue.textContent = difficultyLabel[settings.difficulty] || "Нормальная";
  }
  if (speedModeValue) {
    speedModeValue.textContent = (speedProfiles[settings.speedMode] || speedProfiles.classic).label;
  }
}

function cycleValue(order, current, dir) {
  const idx = order.indexOf(current);
  const start = idx >= 0 ? idx : 0;
  const next = (start + dir + order.length) % order.length;
  return order[next];
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
    selectedEvent: "ldpr_classic",
    unlockedEvents: ["ldpr_classic"],
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

    const unlockedEvents = new Set(["ldpr_classic"]);
    if (Array.isArray(parsed.unlockedEvents)) {
      for (const themeId of parsed.unlockedEvents) {
        if (backgroundThemes[themeId]) unlockedEvents.add(themeId);
      }
    }

    if (parsed.unlockedEvents && typeof parsed.unlockedEvents === "object" && !Array.isArray(parsed.unlockedEvents)) {
      for (const [themeId, flag] of Object.entries(parsed.unlockedEvents)) {
        if (flag && backgroundThemes[themeId]) unlockedEvents.add(themeId);
      }
    }

    const selectedEvent = backgroundThemes[parsed.selectedEvent] ? parsed.selectedEvent : "ldpr_classic";
    unlockedEvents.add(selectedEvent);

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
      selectedEvent,
      unlockedEvents: Array.from(unlockedEvents),
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
      backgroundTheme: backgroundThemes[parsed.backgroundTheme] ? parsed.backgroundTheme : "ldpr_classic",
      soundOn: typeof parsed.soundOn === "boolean" ? parsed.soundOn : true,
      effectsOn: typeof parsed.effectsOn === "boolean" ? parsed.effectsOn : true,
    };
  } catch {
    return {
      difficulty: "normal",
      speedMode: "classic",
      backgroundTheme: "ldpr_classic",
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
    coordinate_system: `origin=(0,0) top-left; +x right; +y down; units=pixels on ${WIDTH}x${HEIGHT} logical canvas`,
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
    background_theme: activeBackgroundTheme,
    location_level: getLocationLevel(),
    selected_event_theme: getSelectedEventTheme(),
    profile_tuning: {
      speed_multiplier: Number(getRunSpeedMultiplier().toFixed(3)),
      reward_multiplier: Number(getRewardMultiplier().toFixed(3)),
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
    lives: {
      current: state.lives,
      max: MAX_LIVES,
      invulnerable_for_sec: Number(state.invulnerabilityTimer.toFixed(2)),
      respawn_flash_for_sec: Number(state.respawnFlashTimer.toFixed(2)),
    },
    achievements_unlocked: Object.keys(profile.achievements).length,
    timers: {
      elapsed: Number(state.elapsed.toFixed(2)),
      run_time: Number(state.runTime.toFixed(2)),
      next_pipe_distance: Number(
        state.pipes.length > 0 ? Math.max(0, state.pipes[state.pipes.length - 1].x - WIDTH) : 0
      ),
      banner_visible: Boolean(state.bannerText),
      quote_visible: Boolean(state.quoteText),
    },
    ui: {
      banner: state.bannerText,
      quote: state.quoteText,
      intro_splash_active: isIntroActive(),
    },
    viewport: {
      css_width: viewport.cssWidth,
      css_height: viewport.cssHeight,
      pixel_width: viewport.pixelWidth,
      pixel_height: viewport.pixelHeight,
      render_scale: Number(viewport.scale.toFixed(4)),
      render_offset_x: Number(viewport.offsetX.toFixed(2)),
      render_offset_y: Number(viewport.offsetY.toFixed(2)),
      portrait_layout: IS_PORTRAIT_LAYOUT,
    },
    perf: {
      low_quality: perf.lowQuality,
      fps_ema: Number(perf.fpsEMA.toFixed(2)),
      dpr: Number(viewport.dpr.toFixed(3)),
    },
    audio: {
      sound_enabled: settings.soundOn,
      menu_music_volume: audioState.menuBgm ? Number(audioState.menuBgm.volume.toFixed(3)) : 0,
      gameplay_music_theme: audioState.gameplayTheme || "",
      gameplay_music_volume: audioState.gameplayBgm ? Number(audioState.gameplayBgm.volume.toFixed(3)) : 0,
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

function showResultOverlay(title, subtitle) {
  resultTitle.textContent = title;
  if (subtitle && typeof subtitle === "object") {
    if (resultScoreValue) {
      resultScoreValue.textContent = String(Math.max(0, subtitle.score || 0));
    }
    if (resultMedalsValue) {
      resultMedalsValue.textContent = `+${Math.max(0, subtitle.medals || 0)}`;
    }
    if (resultRareValue) {
      resultRareValue.textContent = `+${Math.max(0, subtitle.rare || 0)}`;
    }
    resultSubtitle.textContent = subtitle.subtitle || "Забег завершён";
  } else {
    resultSubtitle.textContent = String(subtitle || "");
    if (resultScoreValue) {
      resultScoreValue.textContent = String(Math.max(0, state.score || 0));
    }
    if (resultMedalsValue) {
      resultMedalsValue.textContent = `+${Math.max(0, state.runMedals || 0)}`;
    }
    if (resultRareValue) {
      resultRareValue.textContent = `+${Math.max(0, state.runRare || 0)}`;
    }
  }
  resultOverlay.classList.remove("hidden");
}

function hideResultOverlay() {
  resultOverlay.classList.add("hidden");
}
