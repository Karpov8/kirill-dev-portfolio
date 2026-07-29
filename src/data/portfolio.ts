export const budgets = [
  "до 3 000 ₽",
  "3 000–10 000 ₽",
  "10 000–30 000 ₽",
  "30 000–70 000 ₽",
  "от 70 000 ₽",
  "нужна оценка",
] as const;

export const portfolio = {
  profile: {
    name: "Кирилл",
    brand: "Kirill Dev",
    positioning: "Разрабатываю сайты, Telegram-ботов и автоматизации для бизнеса",
    description: "Превращаю ручные процессы в удобные digital-системы",
    status: "Открыт к новым проектам",
  },
  contacts: {
    telegramUsername: "KnifeRanger",
    telegramUrl: "https://t.me/KIRILL1DEV",
    email: "",
    kworkUrl: "https://kwork.ru/user/dive",
    githubUrl: "",
  },
  seo: {
    title: "Кирилл — разработка сайтов, Telegram-ботов и автоматизаций",
    description:
      "Разрабатываю сайты, Telegram-ботов, личные кабинеты, мини-CRM, AI-консультантов и автоматизации для бизнеса",
    themeColor: "#050505",
  },
  nav: [
    { label: "Услуги", href: "#services" },
    { label: "Решения", href: "#solutions" },
    { label: "Процесс", href: "#process" },
    { label: "Стоимость", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", href: "#contact" },
  ],
  hero: {
    badge: "Freelance Developer · AI · Automation",
    title: "Разрабатываю digital-системы для бизнеса",
    accentTitle: "digital-системы",
    titleBefore: "Разрабатываю ",
    highlight: "digital-системы",
    titleAfter: " для бизнеса",
    subtitle: "От простой автоматизации до личного кабинета и мини-CRM",
    description:
      "Создаю сайты, Telegram-ботов, автоматизации, калькуляторы, личные кабинеты и внутренние веб-системы. Беру на себя проектирование, разработку, интеграции и запуск",
    primaryCta: { label: "Обсудить задачу", href: "#contact" },
    secondaryCta: { label: "Посмотреть услуги", href: "#services" },
    status: "Открыт к новым проектам",
    note: "Можно начать с небольшой задачи или MVP",
    availabilityNote: "Можно начать с небольшой задачи или MVP",
  },
  competencies: {
    title: "Разработка на пересечении бизнеса и технологий",
    items: [
      {
        index: "01",
        title: "Web Development",
        description: "Лендинги, сервисы, личные кабинеты, внутренние системы и веб-приложения",
      },
      {
        index: "02",
        title: "Telegram Development",
        description: "Боты, заявки, уведомления, квизы, запись клиентов и автоматические сценарии",
      },
      {
        index: "03",
        title: "Automation",
        description: "API, webhooks, n8n, Google Sheets, CRM и интеграции между сервисами",
      },
      {
        index: "04",
        title: "AI Integration",
        description: "AI-консультанты, обработка обращений, базы знаний и интеллектуальные сценарии",
      },
    ],
    approach:
      "Я не ограничиваюсь написанием кода. Сначала определяю, какой процесс нужно улучшить, а затем подбираю оптимальное техническое решение",
    digitalExperience:
      "Практический опыт работы с digital-платформами помогает учитывать путь пользователя, удержание внимания и конверсию в заявку",
  },
  services: {
    title: "Что я могу разработать",
    subtitle: "От небольшой доработки до полноценной внутренней системы",
    filters: ["Все", "Web", "Telegram", "Automation", "AI"],
    sharedNote: "Срок и финальная стоимость определяются после обсуждения логики и интеграций",
    items: [
      {
        id: "client-portal",
        category: "Web",
        title: "Личный кабинет для клиентов",
        description:
          "Разработаю защищённый личный кабинет, в котором клиент сможет просматривать данные, документы, заявки, статусы, оплаты и другую необходимую информацию",
        features: [
          "авторизация",
          "роли пользователей",
          "профиль клиента",
          "заявки",
          "документы",
          "статусы",
          "уведомления",
          "адаптивный интерфейс",
          "административная панель",
        ],
        price: "от 35 000 ₽",
        badge: "Под ключ",
        cta: "Обсудить личный кабинет",
        featured: true,
        mockup: {
          label: "Кабинет клиента",
          title: "Проект #KD-24",
          rows: [
            { label: "Статус", value: "В разработке" },
            { label: "Готовность", value: "68%" },
            { label: "Документы", value: "4 файла" },
          ],
        },
      },
      {
        id: "mini-crm",
        category: "Web",
        title: "Мини-CRM для заявок и клиентов",
        description:
          "Создам простую CRM под конкретные процессы бизнеса без перегруженного интерфейса и лишних функций",
        features: [
          "база клиентов",
          "заявки",
          "статусы",
          "комментарии",
          "поиск",
          "фильтры",
          "роли сотрудников",
          "история изменений",
          "отчёты",
          "экспорт данных",
        ],
        price: "от 30 000 ₽",
        badge: "Для бизнеса",
        cta: "Обсудить CRM",
        featured: true,
        mockup: {
          label: "Воронка заявок",
          title: "12 активных сделок",
          rows: [
            { label: "Новые", value: "5" },
            { label: "В работе", value: "4" },
            { label: "Согласование", value: "3" },
          ],
        },
      },
      {
        id: "ai-consultant",
        category: "AI",
        title: "AI-консультант для клиентов 24/7",
        description:
          "Создам AI-помощника, который отвечает на частые вопросы, консультирует клиентов, собирает заявки и передаёт сложные обращения менеджеру",
        features: [
          "база знаний",
          "сбор контактов",
          "квалификация заявки",
          "передача менеджеру",
          "история диалогов",
          "интеграция с Telegram",
          "подключение к сайту",
          "ограничения и правила ответов",
        ],
        price: "от 19 000 ₽",
        badge: "AI-интеграция",
        cta: "Обсудить AI-консультанта",
        featured: true,
        mockup: {
          label: "AI-консультант",
          title: "Диалог с клиентом",
          rows: [
            { label: "Вопрос", value: "Подобрать решение" },
            { label: "Контакт", value: "Получен" },
            { label: "Менеджер", value: "Подключён" },
          ],
        },
      },
      {
        id: "google-sheets",
        category: "Automation",
        title: "Автоматизация Google Таблиц",
        description:
          "Автоматизирую расчёты, отчёты, уведомления, перенос данных, обработку форм и другие повторяющиеся операции",
        features: [
          "формулы",
          "Google Apps Script",
          "автоматические отчёты",
          "API",
          "уведомления",
          "синхронизация",
          "обработка форм",
          "генерация документов",
        ],
        price: "от 1 000 ₽",
        badge: "Быстрый запуск",
        cta: "Автоматизировать таблицу",
        featured: false,
        mockup: {
          label: "Автоотчёт",
          title: "Данные синхронизированы",
          rows: [
            { label: "Строк", value: "248" },
            { label: "Ошибок", value: "0" },
          ],
        },
      },
      {
        id: "cost-calculator",
        category: "Web",
        title: "Калькулятор стоимости для сайта",
        description:
          "Разработаю интерактивный калькулятор, который помогает клиенту рассчитать стоимость услуги и оставить заявку",
        features: [
          "несколько параметров",
          "формулы расчёта",
          "динамическая стоимость",
          "адаптивность",
          "отправка результата",
          "форма заявки",
          "аналитика",
          "Telegram-интеграция",
        ],
        price: "от 1 500 ₽",
        badge: "Для сайта",
        cta: "Заказать калькулятор",
        featured: false,
        mockup: {
          label: "Расчёт",
          title: "Предварительная оценка",
          rows: [
            { label: "Опции", value: "4 выбрано" },
            { label: "Результат", value: "Готов" },
          ],
        },
      },
      {
        id: "n8n-automation",
        category: "Automation",
        title: "Автоматизация процессов в n8n",
        description:
          "Соединю сервисы и настрою сценарий, который выполняет повторяющиеся действия без участия сотрудника",
        features: [
          "webhooks",
          "Telegram",
          "Google Sheets",
          "API",
          "CRM",
          "email",
          "формы",
          "уведомления",
          "обработка данных",
        ],
        price: "от 2 500 ₽",
        badge: "Интеграции",
        cta: "Обсудить автоматизацию",
        featured: false,
        mockup: {
          label: "Workflow",
          title: "Сценарий выполнен",
          rows: [
            { label: "Узлов", value: "6" },
            { label: "Статус", value: "Успешно" },
          ],
        },
      },
      {
        id: "site-to-telegram",
        category: "Automation",
        title: "Отправка заявок с сайта в Telegram",
        description: "Настрою мгновенную передачу заявок с сайта владельцу или менеджеру в Telegram",
        features: [
          "имя",
          "телефон",
          "email",
          "выбранная услуга",
          "источник",
          "страница",
          "UTM-метки",
          "защита от спама",
          "форматированное сообщение",
        ],
        price: "от 1 500 ₽",
        badge: "Быстрый запуск",
        cta: "Настроить заявки",
        featured: false,
        mockup: {
          label: "Новая заявка",
          title: "Передана менеджеру",
          rows: [
            { label: "Источник", value: "Сайт" },
            { label: "Канал", value: "Telegram" },
          ],
        },
      },
      {
        id: "telegram-fix",
        category: "Telegram",
        title: "Исправление и доработка Telegram-ботов",
        description: "Найду ошибку, восстановлю работу существующего бота или добавлю новую функцию",
        features: [
          "диагностика",
          "исправление ошибок",
          "новые команды",
          "кнопки",
          "базы данных",
          "API",
          "платежи",
          "уведомления",
          "рефакторинг",
        ],
        price: "от 500 ₽",
        badge: "Доработка",
        cta: "Показать проблему",
        featured: false,
        mockup: {
          label: "Диагностика",
          title: "Бот снова в работе",
          rows: [
            { label: "Проверки", value: "12 / 12" },
            { label: "Ошибки", value: "Исправлены" },
          ],
        },
      },
      {
        id: "telegram-business-bot",
        category: "Telegram",
        title: "Telegram-бот для бизнеса",
        description:
          "Разработаю Telegram-бота для приёма заявок, записи клиентов, консультаций, уведомлений и автоматизации работы",
        features: [
          "анкеты",
          "квизы",
          "запись",
          "каталог",
          "заявки",
          "интеграции",
          "роли",
          "административное управление",
          "API",
          "CRM",
        ],
        price: "от 3 500 ₽",
        badge: "Под ключ",
        cta: "Обсудить Telegram-бота",
        featured: false,
        mockup: {
          label: "Бизнес-бот",
          title: "Заявка принята",
          rows: [
            { label: "Сценарий", value: "Квалификация" },
            { label: "Следующий шаг", value: "Менеджер" },
          ],
        },
      },
    ],
  },
  configurator: {
    title: "Соберите свою систему",
    subtitle: "Выберите необходимые элементы и получите предварительную архитектуру проекта",
    groups: [
      { id: "source", label: "Источник", options: ["Сайт", "Telegram", "Форма", "Реклама", "Внешний сервис"] },
      {
        id: "processing",
        label: "Обработка",
        options: ["Telegram-бот", "AI-консультант", "Калькулятор", "Квалификация заявки", "Проверка данных", "n8n-сценарий"],
      },
      { id: "storage", label: "Хранение", options: ["Google Sheets", "CRM", "База данных", "Личный кабинет", "Без хранения"] },
      {
        id: "result",
        label: "Результат",
        options: ["Уведомление менеджеру", "Автоматический ответ", "Создание сделки", "Формирование документа", "Отчёт", "Запись клиента"],
      },
    ],
    priceGuides: [
      "небольшая доработка — от 500 ₽",
      "простая интеграция — от 1 500 ₽",
      "автоматизация — от 2 500 ₽",
      "Telegram-бот — от 3 500 ₽",
      "AI-решение — от 19 000 ₽",
      "CRM или личный кабинет — от 30 000 ₽",
    ],
    disclaimer: "Финальная стоимость зависит от интерфейса, логики, количества ролей и интеграций",
    cta: "Отправить конфигурацию",
  },
  advantages: {
    title: "Разработка, которая решает задачу",
    basic: {
      title: "Просто написать код",
      items: [
        "реализовать только перечисленные функции",
        "не анализировать текущий процесс",
        "не учитывать путь пользователя",
        "не предлагать альтернатив",
        "закончить работу после передачи файлов",
      ],
    },
    approach: {
      title: "Мой подход",
      items: [
        "разобраться в бизнес-процессе",
        "определить реальную проблему",
        "убрать лишние ручные действия",
        "предложить простую архитектуру",
        "учитывать пользовательский путь",
        "предусмотреть дальнейшее развитие",
        "объяснить, как управлять системой",
      ],
    },
    note:
      "Иногда бизнесу не нужна большая система. Достаточно правильно связать форму, таблицу и Telegram, чтобы убрать часы повторяющейся работы",
  },
  solutions: {
    title: "Как могут выглядеть решения",
    subtitle: "Демонстрационные концепции и типовые архитектуры",
    disclaimer: "Это демонстрационные интерфейсы и архитектуры, а не вымышленные коммерческие кейсы",
    items: [
      {
        id: "portal",
        type: "portal",
        label: "Демонстрация 01",
        title: "Личный кабинет",
        description: "Профиль, заявки, документы и оплаты собраны в одном понятном интерфейсе",
        cta: "Нужен похожий кабинет",
        mockup: {
          navigation: ["Профиль", "Заявки", "Документы", "Оплаты", "Уведомления", "История"],
          title: "Активные заявки",
          status: "В разработке",
          progress: "68%",
        },
      },
      {
        id: "crm",
        type: "crm",
        label: "Демонстрация 02",
        title: "Мини-CRM",
        description: "Клиенты, воронка, задачи и активность менеджеров без лишней сложности",
        cta: "Обсудить CRM",
        mockup: {
          columns: [
            { title: "Новые", count: "6" },
            { title: "В работе", count: "4" },
            { title: "Согласование", count: "2" },
          ],
          controls: ["Поиск", "Фильтры", "Задачи", "Активность менеджеров"],
        },
      },
      {
        id: "bot",
        type: "bot",
        label: "Демонстрация 03",
        title: "Telegram-бот",
        description: "Квалифицирует запрос, задаёт вопросы и передаёт заявку менеджеру",
        cta: "Заказать бота",
        mockup: {
          firstMessage: "Здравствуйте! Какая услуга вас интересует?",
          options: ["Разработка сайта", "Telegram-бот", "Автоматизация", "Другое"],
          secondMessage: "Опишите задачу",
          finalMessage: "Заявка отправлена менеджеру",
        },
      },
      {
        id: "automation",
        type: "automation",
        label: "Демонстрация 04",
        title: "Автоматизация",
        description: "Заявка проходит проверку, сохраняется и попадает в рабочие сервисы",
        cta: "Автоматизировать процесс",
        mockup: {
          nodes: ["Форма сайта", "webhook", "проверка данных", "Google Sheets", "Telegram", "CRM"],
        },
      },
    ],
  },
  process: {
    title: "Как проходит разработка",
    items: [
      { number: "01", title: "Обсуждение", description: "Вы кратко описываете задачу, текущий процесс и желаемый результат" },
      { number: "02", title: "Проектирование", description: "Я предлагаю структуру, функции, интеграции и оптимальный формат реализации" },
      { number: "03", title: "Прототип", description: "Согласовываем интерфейс, логику и основные пользовательские сценарии" },
      { number: "04", title: "Разработка", description: "Создаю решение, подключаю интеграции и проверяю основные и крайние сценарии" },
      { number: "05", title: "Запуск", description: "Передаю готовый проект, инструкции и объясняю, как управлять системой" },
    ],
  },
  tech: {
    title: "Инструменты, которые использую",
    subtitle: "Подбираю стек под задачу, а не заставляю задачу подстраиваться под один инструмент",
    note: "Работаю с этими инструментами и подбираю их под задачу, архитектуру и бюджет проекта",
    groups: [
      { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Astro", "React", "адаптивная вёрстка", "REST API"] },
      { category: "Backend", items: ["Python", "Node.js", "API", "webhooks", "базы данных", "авторизация", "серверная логика"] },
      { category: "Telegram", items: ["Telegram Bot API", "aiogram", "webhooks", "inline-кнопки", "состояния", "уведомления", "интеграции"] },
      { category: "Automation", items: ["n8n", "Google Sheets", "Google Apps Script", "CRM", "REST API", "webhooks", "email", "формы"] },
      { category: "AI", items: ["ChatGPT", "Codex", "AI-assisted development", "API языковых моделей", "AI-консультанты", "базы знаний", "обработка текста"] },
      { category: "Deployment", items: ["GitHub", "Vercel", "GitHub Pages", "Docker", "переменные окружения", "статический хостинг"] },
    ],
  },
  pricing: {
    title: "Можно начать с небольшой задачи",
    tiers: [
      {
        title: "Небольшая доработка",
        suitableFor: ["исправления ошибки", "формы", "отправки заявки", "простого скрипта", "калькулятора", "небольшой автоматизации"],
        price: "от 500 ₽",
        cta: "Обсудить задачу",
      },
      {
        title: "Готовый инструмент",
        suitableFor: ["Telegram-бота", "автоматизации", "интеграции", "небольшого сайта", "внутреннего инструмента", "MVP"],
        price: "от 3 500 ₽",
        cta: "Получить оценку",
      },
      {
        title: "Система под бизнес",
        suitableFor: ["личного кабинета", "мини-CRM", "сложной автоматизации", "нескольких ролей", "базы данных", "административной панели"],
        price: "от 30 000 ₽",
        cta: "Обсудить систему",
      },
    ],
    disclaimer: "Цены являются ориентировочными. Финальная оценка зависит от количества экранов, ролей, интеграций и сложности логики",
    aiNote: "AI-консультант — отдельное решение стоимостью от 19 000 ₽",
  },
  faq: {
    title: "Частые вопросы",
    items: [
      { question: "Какие проекты можно заказать?", answer: "Сайты, Telegram-ботов, личные кабинеты, мини-CRM, автоматизации, калькуляторы, интеграции, AI-консультантов и внутренние веб-инструменты" },
      { question: "Можно начать с маленькой задачи?", answer: "Да. Часто лучше сначала реализовать небольшую рабочую версию, проверить её в реальном процессе и затем расширять" },
      { question: "Что нужно для начала?", answer: "Достаточно кратко описать текущую проблему, желаемый результат и сервисы, которыми вы уже пользуетесь" },
      { question: "Нужно ли готовое техническое задание?", answer: "Нет. После обсуждения я могу предложить структуру проекта, функции, интеграции и этапы реализации" },
      { question: "Можно доработать существующий проект?", answer: "Да. Можно исправить ошибку, добавить новую функцию, подключить интеграцию или провести рефакторинг" },
      { question: "Можно подключить Telegram и Google Sheets?", answer: "Да. Можно настроить приём заявок, уведомления, автоматическую запись данных, отчёты и изменение статусов" },
      { question: "Сколько занимает разработка?", answer: "Срок зависит от сложности. Небольшая доработка и полноценная CRM требуют разного объёма работы. Точный срок определяется после обсуждения" },
      { question: "Можно разместить проект бесплатно?", answer: "Некоторые сайты и статические проекты можно разместить на бесплатных тарифах Vercel или GitHub Pages. Для ботов, баз данных и серверной логики может потребоваться отдельный хостинг" },
      { question: "Используется ли AI при разработке?", answer: "AI используется для ускорения анализа, разработки, тестирования и подготовки материалов. Архитектура, проверка и итоговая реализация контролируются вручную" },
    ],
  },
  contact: {
    title: "Опишите задачу — я предложу решение",
    subtitle: "Необязательно готовить техническое задание. Расскажите, что сейчас приходится делать вручную или какой инструмент вы хотите получить",
    projectTypes: ["Сайт", "Telegram-бот", "Автоматизация", "Личный кабинет", "CRM", "AI-консультант", "Доработка", "Другое"],
    budgets,
    cta: "Отправить в Telegram",
    telegramCta: "Написать в Telegram",
    kworkCta: "Посмотреть профиль на Kwork",
    fallbackMessage: "Telegram пока не указан. Скопируйте сообщение и отправьте его удобным способом",
    messageTemplate: "Привет! Хочу обсудить проект.",
  },
  budgets,
  footer: {
    tagline: "Сайты, Telegram-боты и автоматизации для задач бизнеса",
  },
} as const;

const placeholderPattern = /^(?:USERNAME|YOUR_|PLACEHOLDER|https?:\/\/(?:example\.com|t\.me\/USERNAME))/i;

export function hasContactValue(value: string | undefined): value is string {
  if (!value) return false;
  const normalized = value.trim();
  return Boolean(normalized) && !placeholderPattern.test(normalized);
}

const telegramUsernamePattern = /^[a-zA-Z0-9_]{5,32}$/;

export function resolveTelegramUsername(
  username: string | undefined,
  url: string | undefined,
): string {
  const direct = username?.trim().replace(/^@/, "") ?? "";
  if (hasContactValue(direct) && telegramUsernamePattern.test(direct)) return direct;

  if (!hasContactValue(url)) return "";
  try {
    const parsed = new URL(url);
    if (!["t.me", "www.t.me", "telegram.me", "www.telegram.me"].includes(parsed.hostname.toLowerCase())) {
      return "";
    }
    const candidate = parsed.pathname.split("/").filter(Boolean)[0] ?? "";
    return telegramUsernamePattern.test(candidate) ? candidate : "";
  } catch {
    return "";
  }
}

export function resolveTelegramUrl(
  username: string | undefined,
  url: string | undefined,
): string {
  if (hasContactValue(url)) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.toString();
    } catch {
      // Fall through to the normalized username.
    }
  }
  const normalizedUsername = resolveTelegramUsername(username, url);
  return normalizedUsername ? `https://t.me/${normalizedUsername}` : "";
}

export type Portfolio = typeof portfolio;
export type ServiceCategory = Exclude<(typeof portfolio.services.filters)[number], "Все">;
