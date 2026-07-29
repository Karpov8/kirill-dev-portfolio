# Kirill Dev — коммерческое портфолио разработчика

Одностраничный статический сайт на Astro и TypeScript для получения заявок на сайты, Telegram-ботов, автоматизации, личные кабинеты, мини-CRM и AI-инструменты.

Проект собран без backend, базы данных, CMS и платных API. Основной контент доступен без JavaScript; JS используется только для меню, фильтров, конфигуратора, формы, активной навигации и лёгких интерфейсных состояний.

## Быстрый запуск

Требуется Node.js 22.12 или новее.

```bash
npm install
npm run dev
```

Astro покажет локальный адрес в терминале. Для production-проверки:

```bash
npm run build
npm run preview
```

Готовая статическая сборка появляется в `dist/`.

## Команды

| Команда | Назначение |
| --- | --- |
| `npm run dev` | локальная разработка с hot reload |
| `npm run build` | production-сборка |
| `npm run preview` | локальный просмотр содержимого `dist/` |
| `npm start` | алиас для `npm run dev` |

## Где менять контент

Весь основной редактируемый контент находится в одном файле:

```text
src/data/portfolio.ts
```

Там меняются:

- `profile.name` — имя;
- `profile.brand` — бренд `Kirill Dev`;
- `profile.positioning`, `profile.description`, `profile.status` — позиционирование и статус;
- `contacts.telegramUsername`, `contacts.telegramUrl` — Telegram;
- `contacts.kworkUrl` — Kwork;
- `contacts.githubUrl` — GitHub;
- `contacts.email` — email;
- `services` — услуги, категории, функции, цены, бейджи и CTA;
- `pricing` — тарифные ориентиры;
- `faq` — вопросы и ответы;
- `competencies`, `solutions`, `process`, `tech` — остальные секции;
- `seo.title`, `seo.description`, `seo.themeColor` — поисковые метаданные и цвет темы браузера.

Пустые и placeholder-контакты не выводятся как рабочие ссылки. Перед публикацией замените значения `USERNAME`, `YOUR_EMAIL`, `YOUR_KWORK_LINK`, `YOUR_GITHUB_LINK` либо оставьте соответствующие поля пустыми.

### Как добавить услугу

Добавьте новый объект в массив `services.items` по образцу существующих. Обязательные поля: идентификатор, категория, название, описание, функции, цена, бейдж и CTA. Фильтр использует категорию услуги, поэтому она должна совпадать с одной из категорий из `services.filters`.

### Как изменить цены

- цены конкретных услуг — `services[].price`;
- карточки уровней бюджета — `pricing.tiers`;
- ориентиры конфигуратора — `configurator.priceGuides`.

Сайт намеренно не рассчитывает точную итоговую цену: она зависит от ролей, интерфейса, логики и интеграций.

## Дизайн и стили

Главная таблица стилей:

```text
src/styles/global.css
```

Цвета начинаются с `--kd-` и соответствуют Figma-токенам. Основные:

- `--kd-color-background-page`;
- `--kd-color-background-surface`;
- `--kd-color-text-primary`;
- `--kd-color-text-secondary`;
- `--kd-color-action-primary`;
- `--kd-color-border-default`.

Для изменения темы сначала обновите primitive-переменные в `:root`, затем semantic aliases. Размеры, интервалы и радиусы также собраны в `:root`.

### Скриншоты и mockup-интерфейсы

Текущие mockups собраны из семантического HTML и CSS, поэтому не требуют внешних изображений. Чтобы заменить конкретный mockup своим скриншотом:

1. положите оптимизированный файл WebP/AVIF в `public/images/`;
2. добавьте `<picture>`/`<img>` в нужный компонент из `src/components/`;
3. задайте точные `width`, `height`, информативный `alt` и `loading="lazy"` для изображений ниже первого экрана;
4. используйте путь с `import.meta.env.BASE_URL`, чтобы asset работал в подпапке GitHub Pages.

Не добавляйте случайные стоковые изображения: визуальная система рассчитана на интерфейсы и архитектурные схемы.

## Контактная форма и Telegram

Форма статическая. После проверки полей она формирует URL-encoded сообщение и пытается открыть Telegram.

- Если валидный `telegramUsername`/`telegramUrl` задан, используется Telegram-ссылка.
- Если контакт пустой или остался placeholder, сообщение копируется в буфер обмена и показывается понятное уведомление.
- Данные формы не отправляются на сервер и не сохраняются.

Как проверить:

1. укажите реальный username без `@` и URL вида `https://t.me/username`;
2. запустите `npm run dev`;
3. заполните форму русским текстом и спецсимволами;
4. убедитесь, что Telegram получает читаемое сообщение без сломанной кодировки;
5. временно очистите Telegram-поля и проверьте fallback-копирование.

Для серверного приёма заявок в будущем можно добавить Formspree, собственный endpoint или Telegram Bot API. Для этого потребуется отдельное безопасное хранение секретов; токен бота нельзя помещать в клиентский код.

## Переменные окружения

Используются две публичные build-time переменные:

```env
PUBLIC_SITE_URL=https://example.com
PUBLIC_BASE_PATH=/
```

`PUBLIC_SITE_URL` — origin без пути: `https://example.com` или `https://username.github.io`.

`PUBLIC_BASE_PATH`:

- `/` для Vercel, собственного домена и репозитория `username.github.io`;
- `/repository-name` для обычного GitHub Pages project site.

Они используются Astro для canonical URL, sitemap, favicon/asset paths и сборки в подпапке.

Локальная проверка подпапки в PowerShell:

```powershell
$env:PUBLIC_SITE_URL="https://username.github.io"
$env:PUBLIC_BASE_PATH="/repository-name"
npm run build
```

## Деплой на Vercel

1. Создайте GitHub-репозиторий и загрузите в него этот проект.
2. В Vercel выберите **Add New → Project** и импортируйте репозиторий.
3. Framework Preset: **Astro**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Добавьте переменные:
   - `PUBLIC_SITE_URL=https://ваш-домен.vercel.app`;
   - `PUBLIC_BASE_PATH=/`.
7. Запустите deploy и проверьте итоговый URL, canonical, sitemap и Telegram-ссылки.

Для собственного домена добавьте его в Vercel, замените `PUBLIC_SITE_URL` и выполните redeploy.

## Деплой на GitHub Pages

Workflow уже находится в `.github/workflows/deploy.yml`.

1. Создайте репозиторий и push в ветку `main`.
2. В GitHub откройте **Settings → Pages**.
3. В **Build and deployment → Source** выберите **GitHub Actions**.
4. В **Settings → Secrets and variables → Actions → Variables** добавьте:
   - `PUBLIC_SITE_URL=https://USERNAME.github.io`;
   - `PUBLIC_BASE_PATH=/REPOSITORY`.
5. Запустите workflow вручную или сделайте push в `main`.
6. Проверьте `https://USERNAME.github.io/REPOSITORY/`.

Если репозиторий называется `USERNAME.github.io`, используйте `PUBLIC_BASE_PATH=/`.

### Собственный домен на GitHub Pages

1. Настройте домен в **Settings → Pages → Custom domain**.
2. Добавьте DNS-записи по инструкции GitHub.
3. Установите `PUBLIC_SITE_URL=https://your-domain.ru` и `PUBLIC_BASE_PATH=/`.
4. Выполните новый workflow run.

## Структура

```text
.
├─ .github/workflows/deploy.yml
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ images/
├─ src/
│  ├─ components/
│  ├─ data/portfolio.ts
│  ├─ layouts/Layout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  └─ sitemap.xml.ts
│  ├─ scripts/interactions.ts
│  └─ styles/global.css
├─ astro.config.mjs
├─ package.json
└─ tsconfig.json
```

## Перед публикацией

- замените контактные placeholders;
- задайте обе environment variables;
- запустите `npm run build`;
- проверьте форму, конфигуратор, фильтры, FAQ и мобильное меню;
- проверьте ширины 320, 375, 430, 768, 1024, 1440 и 1920 px;
- проверьте режим `prefers-reduced-motion`;
- убедитесь, что canonical и sitemap указывают на production URL.
