type ConfigSelections = Record<string, string[]>;

const $ = <T extends Element>(selector: string, root: ParentNode = document) =>
  root.querySelector<T>(selector);

const $$ = <T extends Element>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const joinHuman = (items: string[]) => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} и ${items.at(-1)}`;
};

const normalizeTelegramUsername = (value: string | undefined) => {
  const username = (value ?? "")
    .trim()
    .replace(/^https?:\/\/(?:www\.)?t\.me\//i, "")
    .replace(/^@/, "")
    .split(/[/?#]/)[0];

  if (!username || /^(username|your_|telegram|placeholder)/i.test(username)) return "";
  return /^[a-zA-Z0-9_]{5,32}$/.test(username) ? username : "";
};

const telegramUrl = (username: string, message: string) =>
  `https://t.me/${username}?text=${encodeURIComponent(message)}`;

const openExternal = (url: string) => {
  const popup = window.open("", "_blank");
  if (!popup) return false;
  popup.opener = null;
  popup.location.href = url;
  return true;
};

const copyText = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Use the selection fallback below.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();

  let copied = false;
  try {
    const execCommand = Reflect.get(document, "execCommand");
    copied = typeof execCommand === "function"
      ? Boolean(execCommand.call(document, "copy"))
      : false;
  } finally {
    textarea.remove();
  }
  return copied;
};

const initMotionPreference = () => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sync = () => {
    document.documentElement.dataset.motion = query.matches ? "reduced" : "full";
  };
  sync();
  query.addEventListener?.("change", sync);
};

const initPageProgress = () => {
  const indicator = $<HTMLElement>("[data-page-progress]");
  const header = $<HTMLElement>("[data-site-header]");
  if (!indicator && !header) return;

  let scheduled = false;
  const update = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
    indicator?.style.setProperty("--page-progress", String(progress));
    header?.classList.toggle("is-compact", window.scrollY > 24);
    scheduled = false;
  };

  const requestUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
};

const initMobileMenu = () => {
  const header = $<HTMLElement>("[data-site-header]");
  const toggle = $<HTMLButtonElement>("[data-menu-toggle]", header ?? document);
  const menu = $<HTMLElement>("[data-mobile-menu]", header ?? document);
  if (!header || !toggle || !menu) return;

  const label = $<HTMLElement>("[data-menu-label]", toggle);
  let open = false;

  const setOpen = (next: boolean, returnFocus = false) => {
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    if (label) label.textContent = open ? "Закрыть" : "Меню";
    menu.hidden = !open;
    header.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("menu-open", open);

    if (open) {
      window.requestAnimationFrame(() => $<HTMLAnchorElement>("a", menu)?.focus());
    } else if (returnFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => setOpen(!open, open));
  menu.addEventListener("click", (event) => {
    if ((event.target as Element).closest("a")) setOpen(false);
  });
  document.addEventListener("pointerdown", (event) => {
    if (open && !header.contains(event.target as Node)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (open && event.key === "Escape") setOpen(false, true);
  });
  window.addEventListener("resize", () => {
    if (open && window.innerWidth > 980) setOpen(false);
  }, { passive: true });
};

const initSmoothAnchors = () => {
  document.addEventListener("click", (event) => {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;
    const hash = anchor.getAttribute("href");
    if (!hash || hash === "#") return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    const isSkipLink = anchor.classList.contains("skip-link");
    target.scrollIntoView({
      behavior: isSkipLink || reducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    if (isSkipLink) {
      target.focus({ preventScroll: true });
      // Some browsers restore focus to the activated link after the click event.
      // Re-assert the intended skip target after the activation task completes.
      window.setTimeout(() => target.focus({ preventScroll: true }), 0);
    }
    if (history.replaceState) history.replaceState(null, "", hash);
  });
};

const initActiveNavigation = () => {
  const navLinks = $$<HTMLAnchorElement>("[data-nav-link]");
  const targets = navLinks
    .map((link) => link.hash && document.getElementById(link.hash.slice(1)))
    .filter((target): target is HTMLElement => Boolean(target));
  if (targets.length === 0 || !("IntersectionObserver" in window)) return;

  const setActive = (id: string) => {
    navLinks.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target.id) setActive(visible.target.id);
  }, { rootMargin: "-24% 0px -62%", threshold: [0.01, 0.15, 0.35] });

  targets.forEach((target) => observer.observe(target));
};

const initServiceFilters = () => {
  const filters = $$<HTMLButtonElement>("[data-service-filter]");
  const cards = $$<HTMLElement>("[data-service-card]");
  if (filters.length === 0 || cards.length === 0) return;

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = (button.dataset.serviceFilter || "all").toLocaleLowerCase("ru");
      filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      cards.forEach((card) => {
        const categories = (card.dataset.category || "")
          .toLocaleLowerCase("ru")
          .split(",")
          .map((item) => item.trim());
        const visible = selected === "all" || selected === "все" || categories.includes(selected);
        card.hidden = !visible;
        card.setAttribute("aria-hidden", String(!visible));
      });
    });
  });
};

const initDetails = () => {
  $$<HTMLDetailsElement>("details[data-service-details], details.service-details").forEach((details) => {
    details.addEventListener("toggle", () => {
      details.dataset.open = details.open ? "true" : "false";
    });
  });

  const faqRoot = $<HTMLElement>("[data-faq]");
  if (faqRoot) {
    const detailsItems = $$<HTMLDetailsElement>("details", faqRoot);
    detailsItems.forEach((details) => {
      const summary = $("summary", details);
      summary?.setAttribute("aria-expanded", String(details.open));
      details.addEventListener("toggle", () => {
        summary?.setAttribute("aria-expanded", String(details.open));
        if (!details.open) return;
        detailsItems.forEach((other) => {
          if (other !== details) other.open = false;
        });
      });
    });
  }

  $$<HTMLButtonElement>("[data-accordion-trigger]").forEach((trigger) => {
    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });
};

const initContactPrefill = () => {
  const form = $<HTMLFormElement>("[data-contact-form]");
  if (!form) return;
  const projectType = form.elements.namedItem("projectType") as HTMLSelectElement | null;
  const budget = form.elements.namedItem("budget") as HTMLSelectElement | null;
  const description = form.elements.namedItem("description") as HTMLTextAreaElement | null;

  document.addEventListener("click", (event) => {
    const source = (event.target as Element).closest<HTMLElement>(
      "[data-project-type], [data-budget], [data-form-note], [data-service-title], [data-service-name]",
    );
    if (!source) return;

    const serviceName = source.dataset.serviceTitle || source.dataset.serviceName;
    const requestedType = source.dataset.projectType || serviceName;
    if (requestedType && projectType) {
      const exact = Array.from(projectType.options).find((option) => option.value === requestedType);
      if (exact) projectType.value = exact.value;
    }
    if (source.dataset.budget && budget) {
      const exact = Array.from(budget.options).find((option) => option.value === source.dataset.budget);
      if (exact) budget.value = exact.value;
    }
    if (source.dataset.formNote && description && !description.value.trim()) {
      description.value = source.dataset.formNote;
      description.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (serviceName && description && !description.value.trim()) {
      description.value = `Интересует услуга «${serviceName}». `;
      description.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
};

const sourcePhrases: Record<string, string> = {
  "Сайт": "с сайта",
  "Telegram": "из Telegram",
  "Форма": "через форму",
  "Реклама": "из рекламы",
  "Внешний сервис": "из внешнего сервиса",
};

const processingPhrases: Record<string, string> = {
  "Telegram-бот": "Telegram-бота",
  "AI-консультант": "AI-консультанта",
  "Калькулятор": "калькулятора",
  "Квалификация заявки": "квалификации заявки",
  "Проверка данных": "проверки данных",
  "n8n-сценарий": "n8n-сценария",
};

const storagePhrases: Record<string, string> = {
  "Google Sheets": "Google Sheets",
  "CRM": "CRM",
  "База данных": "база данных",
  "Личный кабинет": "личный кабинет",
};

const resultPhrases: Record<string, string> = {
  "Уведомление менеджеру": "отправляет уведомление менеджеру",
  "Автоматический ответ": "отправляет автоматический ответ",
  "Создание сделки": "создаёт сделку",
  "Формирование документа": "формирует документ",
  "Отчёт": "готовит отчёт",
  "Запись клиента": "записывает клиента",
};

const selectedValues = (group: HTMLElement) =>
  $$<HTMLInputElement>('input[type="checkbox"]:checked', group).map((input) => input.value);

const getConfigSelections = (form: HTMLFormElement): ConfigSelections => {
  const result: ConfigSelections = {};
  $$<HTMLElement>("[data-config-group]", form).forEach((group) => {
    const key = group.dataset.configGroup;
    if (key) result[key] = selectedValues(group);
  });
  return result;
};

const naturalSummary = (selections: ConfigSelections) => {
  const source = selections.source ?? [];
  const processing = selections.processing ?? [];
  const storage = selections.storage ?? [];
  const result = selections.result ?? [];
  const sentences: string[] = [];

  if (source.includes("Не знаю")) {
    sentences.push("Подходящий источник данных определим после обсуждения задачи.");
  } else if (source.length > 0) {
    sentences.push(`Система получает данные ${joinHuman(source.map((item) => sourcePhrases[item] ?? item.toLocaleLowerCase("ru")))}.`);
  }

  if (processing.includes("Не знаю")) {
    sentences.push("Способ обработки Кирилл предложит после анализа процесса.");
  } else if (processing.length > 0) {
    sentences.push(`Обработка выполняется с помощью ${joinHuman(processing.map((item) => processingPhrases[item] ?? item.toLocaleLowerCase("ru")))}.`);
  }

  if (storage.includes("Не знаю")) {
    sentences.push("Способ хранения подберём с учётом объёма данных и доступов.");
  } else if (storage.includes("Без хранения")) {
    sentences.push("Данные не сохраняются после выполнения сценария.");
  } else if (storage.length > 0) {
    sentences.push(`Для хранения используются ${joinHuman(storage.map((item) => storagePhrases[item] ?? item.toLocaleLowerCase("ru")))}.`);
  }

  if (result.includes("Не знаю")) {
    sentences.push("Финальный результат уточним вместе перед проектированием.");
  } else if (result.length > 0) {
    sentences.push(`В результате система ${joinHuman(result.map((item) => resultPhrases[item] ?? item.toLocaleLowerCase("ru")))}.`);
  }

  return sentences.join(" ") || "Выберите элементы слева — здесь появится понятное описание будущей системы.";
};

const calculateComplexity = (selections: ConfigSelections) => {
  const values = Object.values(selections).flat().filter((value) => value !== "Не знаю");
  const weights: Record<string, number> = {
    "Внешний сервис": 2,
    "Telegram-бот": 2,
    "AI-консультант": 4,
    "Квалификация заявки": 2,
    "Проверка данных": 2,
    "n8n-сценарий": 2,
    "CRM": 3,
    "База данных": 3,
    "Личный кабинет": 4,
    "Создание сделки": 2,
    "Формирование документа": 2,
  };
  const multiSelectWeight = Object.values(selections).reduce(
    (total, group) => total + Math.max(0, group.filter((value) => value !== "Не знаю").length - 1),
    0,
  );
  const score = values.reduce((total, value) => total + (weights[value] ?? 1), 0) + multiSelectWeight;
  if (values.length === 0) return "Не рассчитана";
  if (score <= 5) return "Простая";
  if (score <= 11) return "Средняя";
  return "Расширенная";
};

const configMessage = (selections: ConfigSelections, complexity: string, summary: string) => {
  const line = (key: string) => (selections[key]?.length ? selections[key].join(", ") : "Не выбрано");
  return [
    "Привет! Хочу обсудить проект.",
    "",
    `Источник: ${line("source")}`,
    `Обработка: ${line("processing")}`,
    `Хранение: ${line("storage")}`,
    `Результат: ${line("result")}`,
    `Предварительная сложность: ${complexity}`,
    "",
    summary,
  ].join("\n");
};

const initConfigurator = () => {
  const section = $<HTMLElement>("[data-configurator]");
  const form = $<HTMLFormElement>("[data-configurator-form]", section ?? document);
  if (!section || !form) return;

  const groups = $$<HTMLElement>("[data-config-group]", form);
  const architecture = $<HTMLElement>("[data-config-architecture]", form);
  const summaryOutput = $<HTMLElement>("[data-config-summary]", form);
  const complexityOutput = $<HTMLOutputElement>("[data-config-complexity]", form);
  const error = $<HTMLElement>("[data-config-error]", form);
  const status = $<HTMLElement>("[data-config-status]", form);
  const copyButton = $<HTMLButtonElement>("[data-config-copy]", form);
  const username = normalizeTelegramUsername(section.dataset.telegramUsername);

  const update = () => {
    const selections = getConfigSelections(form);
    groups.forEach((group) => {
      const key = group.dataset.configGroup || "";
      const stage = architecture?.querySelector<HTMLElement>(`[data-architecture-stage="${key}"] strong`);
      if (stage) stage.textContent = selections[key]?.length ? joinHuman(selections[key]) : "Выберите вариант";
    });
    const summary = naturalSummary(selections);
    if (summaryOutput) summaryOutput.textContent = summary;
    if (complexityOutput) complexityOutput.value = calculateComplexity(selections);
    if (error) error.hidden = true;
  };

  const validate = () => {
    const missing = groups.find((group) => selectedValues(group).length === 0);
    if (!missing) return true;
    if (error) error.hidden = false;
    missing.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
    $<HTMLInputElement>("input", missing)?.focus({ preventScroll: true });
    return false;
  };

  const buildMessage = () => {
    const selections = getConfigSelections(form);
    const summary = naturalSummary(selections);
    return configMessage(selections, calculateComplexity(selections), summary);
  };

  const setStatus = (message: string) => {
    if (status) status.textContent = message;
  };

  $$<HTMLInputElement>("[data-config-option]", form).forEach((input) => {
    input.addEventListener("change", () => {
      const group = input.closest<HTMLElement>("[data-config-group]");
      if (!group || !input.checked) {
        update();
        return;
      }
      if (input.dataset.unknown === "true") {
        $$<HTMLInputElement>("[data-config-option]", group).forEach((other) => {
          if (other !== input) other.checked = false;
        });
      } else {
        const unknown = $<HTMLInputElement>('[data-config-option][data-unknown="true"]', group);
        if (unknown) unknown.checked = false;
      }
      update();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validate()) return;
    const message = buildMessage();
    if (username && openExternal(telegramUrl(username, message))) {
      setStatus("Telegram открыт с готовой конфигурацией.");
      return;
    }
    const copied = await copyText(message);
    setStatus(copied
      ? "Telegram не настроен или недоступен. Конфигурация скопирована — вставьте её в удобный мессенджер."
      : "Не удалось открыть Telegram. Нажмите «Скопировать конфигурацию» и отправьте её вручную.");
  });

  copyButton?.addEventListener("click", async () => {
    if (!validate()) return;
    const copied = await copyText(buildMessage());
    setStatus(copied ? "Конфигурация скопирована." : "Не удалось скопировать автоматически. Выделите текст описания вручную.");
  });

  update();
};

const contactMessage = (form: HTMLFormElement) => {
  const data = new FormData(form);
  return [
    "Привет! Хочу обсудить проект.",
    "",
    `Имя: ${String(data.get("name") ?? "").trim()}`,
    `Тип проекта: ${String(data.get("projectType") ?? "").trim()}`,
    `Бюджет: ${String(data.get("budget") ?? "").trim()}`,
    `Задача: ${String(data.get("description") ?? "").trim()}`,
    `Контакт: ${String(data.get("contact") ?? "").trim()}`,
  ].join("\n");
};

const initContactForm = () => {
  const section = $<HTMLElement>("[data-contact-section]");
  const form = $<HTMLFormElement>("[data-contact-form]", section ?? document);
  if (!section || !form) return;

  const status = $<HTMLElement>("[data-contact-status]", form);
  const copyButton = $<HTMLButtonElement>("[data-contact-copy]", form);
  const description = form.elements.namedItem("description") as HTMLTextAreaElement | null;
  const count = $<HTMLElement>("[data-description-count]", form);
  const username = normalizeTelegramUsername(section.dataset.telegramUsername);
  const fieldMessages: Record<string, string> = {
    name: "Укажите имя — достаточно двух символов.",
    contact: "Укажите Telegram, email или телефон для ответа.",
    projectType: "Выберите тип проекта.",
    budget: "Выберите бюджет или вариант «нужна оценка».",
    description: "Кратко опишите задачу — минимум 10 символов.",
  };

  const fields = Object.keys(fieldMessages)
    .map((name) => form.elements.namedItem(name))
    .filter((field): field is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
      field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement,
    );

  const validateField = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    const valid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!valid));
    const error = $<HTMLElement>(`[data-field-error="${field.name}"]`, form);
    if (error) error.textContent = valid ? "" : fieldMessages[field.name];
    return valid;
  };

  const validateForm = () => {
    const firstInvalid = fields.find((field) => !validateField(field));
    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  };

  const setStatus = (message: string) => {
    if (status) status.textContent = message;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("change", () => validateField(field));
  });

  description?.addEventListener("input", () => {
    if (count) count.textContent = `${description.value.length} символов`;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const message = contactMessage(form);
    if (username && openExternal(telegramUrl(username, message))) {
      setStatus("Telegram открыт с готовым сообщением.");
      return;
    }
    const copied = await copyText(message);
    setStatus(copied
      ? "Telegram не настроен или недоступен. Сообщение скопировано — отправьте его удобным способом."
      : "Не удалось открыть Telegram. Нажмите «Скопировать сообщение» и отправьте его вручную.");
  });

  copyButton?.addEventListener("click", async () => {
    if (!validateForm()) return;
    const copied = await copyText(contactMessage(form));
    setStatus(copied ? "Сообщение скопировано." : "Не удалось скопировать автоматически. Проверьте разрешение браузера.");
  });
};

const initFloatingContact = () => {
  const root = $<HTMLElement>("[data-floating-contact]");
  const toggle = $<HTMLButtonElement>("[data-floating-toggle]", root ?? document);
  const panel = $<HTMLElement>("[data-floating-panel]", root ?? document);
  const close = $<HTMLButtonElement>("[data-floating-close]", root ?? document);
  if (!root || !toggle || !panel) return;

  let open = false;
  let heroVisible = true;
  let contactVisible = false;

  const syncVisibility = () => {
    root.classList.toggle("is-visible", window.scrollY > Math.min(520, window.innerHeight * 0.58));
    root.classList.toggle("is-suppressed", heroVisible || contactVisible || document.body.classList.contains("menu-open"));
  };

  const setOpen = (next: boolean, returnFocus = false) => {
    open = next;
    root.classList.toggle("is-open", open);
    panel.hidden = !open;
    toggle.hidden = open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) window.requestAnimationFrame(() => $<HTMLElement>("a, button", panel)?.focus());
    else if (returnFocus) toggle.focus();
    syncVisibility();
  };

  toggle.addEventListener("click", () => setOpen(true));
  close?.addEventListener("click", () => setOpen(false, true));
  panel.addEventListener("click", (event) => {
    if ((event.target as Element).closest("a")) setOpen(false);
  });
  document.addEventListener("pointerdown", (event) => {
    if (open && !root.contains(event.target as Node)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (open && event.key === "Escape") setOpen(false, true);
  });
  window.addEventListener("scroll", syncVisibility, { passive: true });
  window.addEventListener("resize", syncVisibility, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if ((entry.target as HTMLElement).matches("[data-hero]")) heroVisible = entry.isIntersecting;
        if ((entry.target as HTMLElement).matches("[data-contact-section]")) contactVisible = entry.isIntersecting;
      });
      if ((heroVisible || contactVisible) && open) setOpen(false);
      syncVisibility();
    }, { threshold: 0.08 });
    const hero = $<HTMLElement>("[data-hero]");
    const contact = $<HTMLElement>("[data-contact-section]");
    if (hero) observer.observe(hero);
    else heroVisible = false;
    if (contact) observer.observe(contact);
  } else {
    heroVisible = false;
  }

  syncVisibility();
};

const initProcessTimeline = () => {
  const timeline = $<HTMLElement>("[data-process-timeline]");
  if (!timeline) return;

  let scheduled = false;
  const update = () => {
    if (reducedMotion()) {
      timeline.style.setProperty("--process-progress", "1");
      scheduled = false;
      return;
    }

    const rect = timeline.getBoundingClientRect();
    const startLine = window.innerHeight * 0.78;
    const endLine = window.innerHeight * 0.22;
    const travel = Math.max(1, rect.height + startLine - endLine);
    const progress = Math.min(1, Math.max(0, (startLine - rect.top) / travel));
    timeline.style.setProperty("--process-progress", progress.toFixed(4));
    scheduled = false;
  };

  const requestUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change", requestUpdate);
};

const initReveal = () => {
  const targets = $$<HTMLElement>("[data-reveal]");
  if (targets.length === 0) return;
  if (reducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  targets.forEach((target) => observer.observe(target));
};

const init = () => {
  if (document.documentElement.dataset.interactionsReady === "true") return;
  document.documentElement.dataset.interactionsReady = "true";
  initMotionPreference();
  initPageProgress();
  initMobileMenu();
  initSmoothAnchors();
  initActiveNavigation();
  initServiceFilters();
  initDetails();
  initContactPrefill();
  initConfigurator();
  initContactForm();
  initFloatingContact();
  initProcessTimeline();
  initReveal();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
